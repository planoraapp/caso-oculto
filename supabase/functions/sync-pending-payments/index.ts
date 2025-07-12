import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SYNC-PENDING-PAYMENTS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!stripeKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Configuração necessária não encontrada");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get pending payment sessions from last 7 days
    const { data: pendingSessions, error: sessionsError } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('status', 'pending')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (sessionsError) {
      logStep("ERROR: Failed to fetch pending sessions", { error: sessionsError });
      throw new Error("Erro ao buscar sessões pendentes");
    }

    logStep("Found pending sessions", { count: pendingSessions.length });

    let processedCount = 0;
    let successCount = 0;

    for (const session of pendingSessions) {
      try {
        logStep("Processing session", { sessionId: session.stripe_session_id });

        // Check if it's a checkout session or payment intent
        let paymentData;
        let isSucceeded = false;

        try {
          // Try as checkout session first
          const checkoutSession = await stripe.checkout.sessions.retrieve(session.stripe_session_id);
          paymentData = checkoutSession;
          isSucceeded = checkoutSession.payment_status === 'paid';
          logStep("Retrieved as checkout session", { 
            sessionId: session.stripe_session_id, 
            status: checkoutSession.payment_status 
          });
        } catch (checkoutError) {
          try {
            // Try as payment intent
            const paymentIntent = await stripe.paymentIntents.retrieve(session.stripe_session_id);
            paymentData = paymentIntent;
            isSucceeded = paymentIntent.status === 'succeeded';
            logStep("Retrieved as payment intent", { 
              sessionId: session.stripe_session_id, 
              status: paymentIntent.status 
            });
          } catch (paymentError) {
            logStep("ERROR: Could not retrieve from Stripe", { 
              sessionId: session.stripe_session_id,
              checkoutError: checkoutError.message,
              paymentError: paymentError.message
            });
            continue;
          }
        }

        if (isSucceeded) {
          logStep("Payment succeeded, processing", { sessionId: session.stripe_session_id });

          // Update payment session status
          await supabase
            .from('payment_sessions')
            .update({ 
              status: 'approved', 
              updated_at: new Date().toISOString() 
            })
            .eq('id', session.id);

          // Check if purchase record already exists
          const { data: existingPurchase } = await supabase
            .from('compras')
            .select('id')
            .eq('stripe_session_id', session.stripe_session_id)
            .single();

          if (!existingPurchase) {
            // Create purchase record
            const amount = paymentData.amount_total || paymentData.amount || 0;
            await supabase.from('compras').insert({
              user_id: session.user_id,
              stripe_session_id: session.stripe_session_id,
              payment_type: session.payment_type,
              pack_id: session.pack_id,
              selected_pack_ids: session.selected_pack_ids,
              valor_original: amount / 100,
              valor_pago: amount / 100,
              status: 'approved',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

            logStep("Purchase record created", { sessionId: session.stripe_session_id });
          }

          // Grant pack access
          if (session.payment_type === 'complete') {
            // Grant complete access
            await supabase
              .from('profiles')
              .update({ acesso_total: true, updated_at: new Date().toISOString() })
              .eq('id', session.user_id);

            // Grant access to all packs
            const allPacks = [
              'labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 
              'paradoxos-mortais', 'sombras-da-noite', 'sussurros-alem',
              'viagem-sem-volta', 'ironias-destino', 'jogos-corporativos',
              'beco-sem-saida', 'crimes-epoca', 'fim-de-jogo',
              'dossie-confidencial', 'dose-letal', 'absurdamente-real'
            ];

            for (const pack of allPacks) {
              await supabase.from('user_pack_access').upsert({
                user_id: session.user_id,
                pack_id: pack,
                is_active: true,
                granted_at: new Date().toISOString(),
                granted_by: session.user_id
              }, { onConflict: 'user_id,pack_id' });
            }

            logStep("Complete access granted", { userId: session.user_id });

          } else if (session.payment_type === 'combo' && session.selected_pack_ids) {
            // Grant access to selected packs
            for (const pack of session.selected_pack_ids) {
              await supabase.from('user_pack_access').upsert({
                user_id: session.user_id,
                pack_id: pack,
                is_active: true,
                granted_at: new Date().toISOString(),
                granted_by: session.user_id
              }, { onConflict: 'user_id,pack_id' });
            }

            logStep("Combo packs access granted", { 
              userId: session.user_id, 
              packs: session.selected_pack_ids 
            });

          } else if (session.payment_type === 'individual' && session.pack_id) {
            // Grant access to individual pack
            await supabase.from('user_pack_access').upsert({
              user_id: session.user_id,
              pack_id: session.pack_id,
              is_active: true,
              granted_at: new Date().toISOString(),
              granted_by: session.user_id
            }, { onConflict: 'user_id,pack_id' });

            logStep("Individual pack access granted", { 
              userId: session.user_id, 
              packId: session.pack_id 
            });
          }

          successCount++;
        }

        processedCount++;

      } catch (error) {
        logStep("ERROR: Failed to process session", { 
          sessionId: session.stripe_session_id,
          error: error.message 
        });
      }
    }

    logStep("Sync completed", { 
      totalSessions: pendingSessions.length,
      processedCount,
      successCount 
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Sincronização concluída",
      stats: {
        totalSessions: pendingSessions.length,
        processedCount,
        successCount
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR: Function failed", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});