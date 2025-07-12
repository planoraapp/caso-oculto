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
  console.log(`[PROCESS-PAYMENT-SUCCESS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Configuração do Supabase faltando");
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body = await req.json();
    logStep("Request body parsed", body);

    const {
      paymentIntentId,
      userId,
      paymentType,
      packId,
      selectedPackIds,
      couponCode
    } = body;

    if (!paymentIntentId || !userId || !paymentType) {
      throw new Error("Dados obrigatórios faltando");
    }

    // Verify payment intent with Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Chave do Stripe não configurada");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new Error("Pagamento não foi bem-sucedido");
    }

    logStep("Payment verified", { 
      paymentIntentId, 
      status: paymentIntent.status,
      amount: paymentIntent.amount 
    });

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      throw new Error("Perfil do usuário não encontrado");
    }

    logStep("User profile found", { email: profile.email });

    // Create purchase record
    const { error: purchaseError } = await supabase.from('compras').insert({
      user_id: userId,
      stripe_session_id: paymentIntentId,
      payment_type: paymentType,
      valor_original: paymentIntent.amount / 100,
      valor_pago: paymentIntent.amount / 100,
      status: 'approved',
      cupom_codigo: couponCode || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    if (purchaseError) {
      logStep("ERROR: Failed to create purchase record", { error: purchaseError });
      throw new Error("Erro ao registrar compra");
    }

    logStep("Purchase record created");

    // Grant pack access based on payment type
    if (paymentType === 'complete') {
      // Grant access to all packs and set complete access
      await supabase
        .from('profiles')
        .update({ acesso_total: true, updated_at: new Date().toISOString() })
        .eq('id', userId);

      // Grant access to all available packs
      const allPacks = [
        'labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 
        'paradoxos-mortais', 'sombras-da-noite', 'sussurros-alem',
        'viagem-sem-volta', 'ironias-destino', 'jogos-corporativos',
        'beco-sem-saida', 'crimes-epoca', 'fim-de-jogo',
        'dossie-confidencial', 'dose-letal', 'absurdamente-real'
      ];

      for (const pack of allPacks) {
        await supabase.from('user_pack_access').upsert({
          user_id: userId,
          pack_id: pack,
          is_active: true,
          granted_at: new Date().toISOString(),
          granted_by: userId
        }, { onConflict: 'user_id,pack_id' });
      }

      logStep("Complete access granted", { packsCount: allPacks.length });

    } else if (paymentType === 'combo' && selectedPackIds) {
      // Grant access to selected packs
      for (const pack of selectedPackIds) {
        await supabase.from('user_pack_access').upsert({
          user_id: userId,
          pack_id: pack,
          is_active: true,
          granted_at: new Date().toISOString(),
          granted_by: userId
        }, { onConflict: 'user_id,pack_id' });
      }

      logStep("Combo packs access granted", { packs: selectedPackIds });

    } else if (paymentType === 'individual' && packId) {
      // Grant access to individual pack
      await supabase.from('user_pack_access').upsert({
        user_id: userId,
        pack_id: packId,
        is_active: true,
        granted_at: new Date().toISOString(),
        granted_by: userId
      }, { onConflict: 'user_id,pack_id' });

      logStep("Individual pack access granted", { packId });
    }

    // Update payment session status
    await supabase
      .from('payment_sessions')
      .update({ 
        status: 'approved', 
        updated_at: new Date().toISOString() 
      })
      .eq('stripe_session_id', paymentIntentId);

    logStep("Payment session updated");

    return new Response(JSON.stringify({ 
      success: true,
      message: "Pagamento processado com sucesso"
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