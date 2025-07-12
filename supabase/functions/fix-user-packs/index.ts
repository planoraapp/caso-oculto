
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details, null, 2)}` : '';
  console.log(`[${timestamp}] [FIX-USER-PACKS] ${step}${detailsStr}`);
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

    logStep('Admin access verified', { userId: user.id });

    // Usar service role para operações administrativas
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { userEmail } = await req.json();
    
    if (!userEmail) {
      throw new Error("User email is required");
    }

    logStep('Fixing packs for user', { userEmail });

    // Encontrar o usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', userEmail)
      .single();

    if (profileError || !profile) {
      throw new Error(`User not found: ${userEmail}`);
    }

    logStep('Found user profile', { userId: profile.id, email: profile.email });

    // Remover acessos antigos - função não é mais necessária pois os pack IDs antigos foram limpos
    // mas mantemos para compatibilidade
    const { error: removeError } = await supabase
      .from('user_pack_access')
      .update({ is_active: false, revoked_at: new Date().toISOString() })
      .eq('user_id', profile.id)
      .in('pack_id', ['pack-01', 'pack-02', 'pack-03', 'pack-04', 'pack-05', 'pack-06', 'pack-07']);

    if (removeError) {
      logStep('Error removing old pack access', { error: removeError });
    } else {
      logStep('Removed access to old pack IDs');
    }

    // Liberar os packs corretos do combo (5 packs com novos IDs)
    const comboPacks = ['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-da-noite'];
    
    for (const packId of comboPacks) {
      const { error: accessError } = await supabase
        .from('user_pack_access')
        .upsert({
          user_id: profile.id,
          pack_id: packId,
          is_active: true,
          granted_at: new Date().toISOString(),
          granted_by: user.id
        }, {
          onConflict: 'user_id,pack_id'
        });

      if (accessError) {
        logStep('Error granting access to pack', { packId, error: accessError });
      } else {
        logStep('Access granted to pack', { packId, userId: profile.id });
      }
    }

    // Atualizar packs_liberados no perfil
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ 
        packs_liberados: comboPacks,
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id);

    if (profileUpdateError) {
      logStep('Error updating profile packs_liberados', { error: profileUpdateError });
    } else {
      logStep('Updated profile packs_liberados', { comboPacks });
    }

    // Criar registro na tabela compras se não existir
    const { data: existingCompra } = await supabase
      .from('compras')
      .select('id')
      .eq('user_id', profile.id)
      .eq('payment_type', 'combo')
      .single();

    if (!existingCompra) {
      const { error: compraError } = await supabase
        .from('compras')
        .insert({
          user_id: profile.id,
          payment_type: 'combo',
          selected_pack_ids: comboPacks,
          valor_original: 74.00,
          valor_pago: 0.61,
          status: 'approved',
          stripe_session_id: `manual_fix_${Date.now()}`,
          created_at: new Date().toISOString()
        });

      if (compraError) {
        logStep('Error creating compra record', { error: compraError });
      } else {
        logStep('Created compra record for combo purchase');
      }
    }

    // Criar sessão de pagamento se não existir
    const { data: existingSession } = await supabase
      .from('payment_sessions')
      .select('id')
      .eq('user_id', profile.id)
      .eq('payment_type', 'combo')
      .single();

    if (!existingSession) {
      const { error: sessionError } = await supabase
        .from('payment_sessions')
        .insert({
          user_id: profile.id,
          payment_type: 'combo',
          selected_pack_ids: comboPacks,
          status: 'approved',
          stripe_session_id: `manual_fix_${Date.now()}`,
          mercadopago_preference_id: `manual_fix_${Date.now()}`,
          created_at: new Date().toISOString()
        });

      if (sessionError) {
        logStep('Error creating payment session', { error: sessionError });
      } else {
        logStep('Created payment session for combo purchase');
      }
    }

    logStep('Pack fix completed successfully', { 
      userEmail,
      userId: profile.id,
      packsGranted: comboPacks.length,
      comboPacks
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Packs corrigidos com sucesso',
      userEmail,
      packsGranted: comboPacks
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep('CRITICAL ERROR in fix-user-packs', { 
      message: error.message,
      stack: error.stack 
    });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
