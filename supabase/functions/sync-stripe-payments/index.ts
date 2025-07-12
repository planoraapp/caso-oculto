
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details, null, 2)}` : '';
  console.log(`[${timestamp}] [SYNC-PAYMENTS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar se o usuário é admin
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    // Verificar se é admin
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      throw new Error("Access denied: Admin role required");
    }

    logStep('Admin user verified', { userId: user.id });

    // Usar service role para operações administrativas
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Buscar todas as sessões de pagamento com status 'pending'
    const { data: pendingSessions, error: sessionsError } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('status', 'pending')
      .not('stripe_session_id', 'is', null);

    if (sessionsError) {
      throw new Error(`Error fetching sessions: ${sessionsError.message}`);
    }

    logStep('Found pending sessions', { count: pendingSessions?.length || 0 });

    const syncResults = [];

    for (const session of pendingSessions || []) {
      try {
        // Verificar status no Stripe
        const stripeSession = await stripe.checkout.sessions.retrieve(session.stripe_session_id);
        
        logStep('Checking Stripe session', { 
          sessionId: session.stripe_session_id,
          stripeStatus: stripeSession.payment_status 
        });

        if (stripeSession.payment_status === 'paid') {
          // Atualizar status para approved
          await supabase
            .from('payment_sessions')
            .update({ status: 'approved', updated_at: new Date().toISOString() })
            .eq('id', session.id);

          // Atualizar compras
          await supabase
            .from('compras')
            .update({ status: 'approved', updated_at: new Date().toISOString() })
            .eq('stripe_session_id', session.stripe_session_id);

          // Liberar acesso aos packs
          let packIds = [];
          if (session.payment_type === 'individual') {
            packIds = [session.pack_id];
          } else if (session.payment_type === 'combo') {
            packIds = session.selected_pack_ids || [];
          } else if (session.payment_type === 'complete') {
            const { data: allPacks } = await supabase
              .from('packs')
              .select('id')
              .neq('id', 'pack-03');
            packIds = allPacks?.map(p => p.id) || [];

            // Set complete access
            await supabase
              .from('profiles')
              .update({ 
                acesso_total: true, 
                tag: 'Mestre Investigador',
                updated_at: new Date().toISOString()
              })
              .eq('id', session.user_id);
          }

          // Grant pack access
          for (const packId of packIds) {
            if (packId) {
              await supabase
                .from('user_pack_access')
                .upsert({
                  user_id: session.user_id,
                  pack_id: packId,
                  is_active: true,
                  granted_at: new Date().toISOString()
                }, { onConflict: 'user_id,pack_id' });
            }
          }

          // Update profile packs
          const { data: currentProfile } = await supabase
            .from('profiles')
            .select('packs_liberados')
            .eq('id', session.user_id)
            .single();

          const currentPacks = currentProfile?.packs_liberados || [];
          const newPacks = [...new Set([...currentPacks, ...packIds])];

          await supabase
            .from('profiles')
            .update({ 
              packs_liberados: newPacks,
              updated_at: new Date().toISOString()
            })
            .eq('id', session.user_id);

          syncResults.push({
            sessionId: session.id,
            stripeSessionId: session.stripe_session_id,
            status: 'synced',
            packsGranted: packIds.length
          });

          logStep('Session synced successfully', { 
            sessionId: session.id,
            packsGranted: packIds.length 
          });
        } else {
          syncResults.push({
            sessionId: session.id,
            stripeSessionId: session.stripe_session_id,
            status: 'still_pending',
            stripeStatus: stripeSession.payment_status
          });
        }
      } catch (error) {
        logStep('Error syncing session', { 
          sessionId: session.id,
          error: error.message 
        });
        syncResults.push({
          sessionId: session.id,
          stripeSessionId: session.stripe_session_id,
          status: 'error',
          error: error.message
        });
      }
    }

    logStep('Sync completed', { 
      totalSessions: pendingSessions?.length || 0,
      syncedCount: syncResults.filter(r => r.status === 'synced').length
    });

    return new Response(JSON.stringify({
      message: 'Sync completed',
      totalSessions: pendingSessions?.length || 0,
      results: syncResults
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep('CRITICAL ERROR in sync', { 
      message: error.message,
      stack: error.stack 
    });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
