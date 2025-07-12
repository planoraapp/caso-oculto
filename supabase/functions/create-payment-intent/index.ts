
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT-INTENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  console.log('create-payment-intent called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      logStep("ERROR: Supabase configuration missing");
      throw new Error("Configuração do Supabase faltando");
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body = await req.json();
    logStep("Request body parsed", body);

    const {
      paymentType,
      packId,
      selectedPackIds,
      userId,
      couponCode,
      totalAmount
    } = body;

    if (!userId || !paymentType) {
      logStep("ERROR: Missing required fields", { userId: !!userId, paymentType: !!paymentType });
      throw new Error("Dados obrigatórios faltando (userId ou paymentType)");
    }

    if (!['individual', 'combo', 'complete'].includes(paymentType)) {
      logStep("ERROR: Invalid payment type", { paymentType });
      throw new Error("Tipo de pagamento inválido");
    }

    // Verify payment intent with Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: Stripe key not configured");
      throw new Error("Chave do Stripe não configurada");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    logStep("Stripe initialized");

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      logStep("ERROR: User profile not found", { profileError });
      throw new Error("Perfil do usuário não encontrado");
    }

    logStep("User profile found", { email: profile.email });

    // Calculate amount based on payment type
    let amount = totalAmount ? Math.round(totalAmount * 100) : 0; // Convert to cents
    
    if (!amount) {
      if (paymentType === 'complete') {
        amount = 11090; // R$ 110.90
      } else if (paymentType === 'combo') {
        amount = 6140; // R$ 61.40
      } else if (paymentType === 'individual') {
        amount = 1480; // R$ 14.80
      }
    }

    logStep("Amount calculated", { amount, totalAmount });

    // Apply coupon discount if provided
    if (couponCode) {
      const DEFAULT_COUPONS = {
        'CASO10': { discount_value: 10, discount_type: 'percentage' },
        'VALEU': { discount_value: 99, discount_type: 'percentage' },
        'LOVABLE': { discount_value: 100, discount_type: 'percentage' }
      };

      const coupon = DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS];
      if (coupon && coupon.discount_type === 'percentage') {
        amount = Math.max(50, Math.round(amount * (100 - coupon.discount_value) / 100));
        logStep("Coupon applied", { couponCode, newAmount: amount });
      }
    }

    // Preparar metadata para tracking
    const metadata: Record<string, string> = {
      user_id: userId,
      payment_type: paymentType
    };

    if (paymentType === 'individual' && packId) {
      metadata.pack_id = packId;
    } else if (paymentType === 'combo' && selectedPackIds) {
      metadata.selected_pack_ids = JSON.stringify(selectedPackIds);
    }

    if (couponCode) {
      metadata.coupon_code = couponCode;
    }

    logStep("Creating Payment Intent", { amount, metadata });

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    logStep("Payment Intent created successfully", { paymentIntentId: paymentIntent.id });

    // Salvar intenção de pagamento no banco
    const { error: insertError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: userId,
        pack_id: paymentType === 'individual' ? packId : null,
        selected_pack_ids: paymentType === 'combo' ? selectedPackIds : null,
        payment_type: paymentType,
        stripe_session_id: paymentIntent.id,
        external_reference: paymentIntent.id,
        mercadopago_preference_id: '', // Manter compatibilidade
        status: 'pending'
      });

    if (insertError) {
      logStep("ERROR: Failed to save payment session", { insertError });
      throw new Error("Erro ao salvar sessão de pagamento");
    }

    logStep("Payment session saved successfully");

    return new Response(JSON.stringify({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR: Function failed", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: "Verifique os logs para mais detalhes"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
