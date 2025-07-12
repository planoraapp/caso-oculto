
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
  console.log(`[CREATE-STRIPE-SESSION] ${step}${detailsStr}`);
};

// Cupons padrão do sistema
const DEFAULT_COUPONS = {
  'CASO10': { discount_value: 10, discount_type: 'percentage' },
  'VALEU': { discount_value: 99, discount_type: 'percentage' },
  'LOVABLE': { discount_value: 100, discount_type: 'percentage' }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not configured");
      throw new Error("Chave do Stripe não configurada no servidor");
    }
    logStep("Stripe key found");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      logStep("ERROR: Supabase configuration missing");
      throw new Error("Configuração do Supabase faltando");
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    logStep("Supabase client created");

    // Get user from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header");
      throw new Error("Usuário não autenticado - faça login novamente");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("ERROR: User authentication failed", { error: userError });
      throw new Error("Sessão expirada - faça login novamente");
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const body = await req.json();
    logStep("Request body parsed", body);

    const { 
      paymentType, 
      packId, 
      selectedPackIds, 
      couponCode,
      totalAmount 
    } = body;

    if (!paymentType) {
      logStep("ERROR: Missing payment type");
      throw new Error("Tipo de pagamento não especificado");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    logStep("Stripe initialized");

    // Check if customer exists
    let customerId: string | undefined;
    try {
      const customers = await stripe.customers.list({ 
        email: user.email!,
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Existing customer found", { customerId });
      } else {
        logStep("No existing customer found, will create new one");
      }
    } catch (error) {
      logStep("ERROR: Failed to check existing customers", { error: error.message });
      // Continue without existing customer
    }

    // Prepare line items based on payment type
    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let sessionMetadata: Record<string, string> = {
      user_id: user.id,
      payment_type: paymentType,
      user_email: user.email!,
    };

    try {
      if (paymentType === 'individual' && packId) {
        logStep("Creating individual pack session", { packId });
        sessionMetadata.pack_id = packId;
        
        // Get pack details from database
        const { data: pack, error: packError } = await supabase
          .from('packs')
          .select('*')
          .eq('id', packId)
          .single();

        if (packError || !pack) {
          logStep("ERROR: Pack not found", { packId, error: packError });
          throw new Error(`Pack não encontrado: ${packId}`);
        }

        let unitAmount = Math.round(pack.price * 100); // Convert to cents
        
        // Apply coupon discount if provided
        if (couponCode && DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS]) {
          const coupon = DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS];
          if (coupon.discount_type === 'percentage') {
            unitAmount = Math.max(50, Math.round(unitAmount * (100 - coupon.discount_value) / 100));
          }
          sessionMetadata.coupon_code = couponCode.toUpperCase();
          logStep("Applied default coupon", { coupon: couponCode, newAmount: unitAmount });
        }

        lineItems = [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        }];

      } else if (paymentType === 'combo' && selectedPackIds?.length > 0) {
        logStep("Creating combo packs session", { selectedPackIds });
        sessionMetadata.selected_pack_ids = JSON.stringify(selectedPackIds);
        
        // Get selected packs details
        const { data: packs, error: packsError } = await supabase
          .from('packs')
          .select('*')
          .in('id', selectedPackIds);

        if (packsError || !packs || packs.length === 0) {
          logStep("ERROR: Selected packs not found", { selectedPackIds, error: packsError });
          throw new Error("Packs selecionados não encontrados");
        }

        // Base combo price is R$ 61.40
        let totalComboAmount = 6140; // R$ 61.40 in cents
        
        // Apply coupon discount if provided
        if (couponCode && DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS]) {
          const coupon = DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS];
          if (coupon.discount_type === 'percentage') {
            totalComboAmount = Math.max(50, Math.round(totalComboAmount * (100 - coupon.discount_value) / 100));
          }
          sessionMetadata.coupon_code = couponCode.toUpperCase();
          logStep("Applied default coupon to combo", { coupon: couponCode, newAmount: totalComboAmount });
        }

        lineItems = [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Combo 5 Packs - ${packs.map(p => p.name).join(', ')}`,
              description: 'Combo especial com 5 packs selecionados',
            },
            unit_amount: totalComboAmount,
          },
          quantity: 1,
        }];

      } else if (paymentType === 'complete') {
        logStep("Creating complete access session");
        
        // Base complete price is R$ 110.90
        let completeAmount = 11090; // R$ 110.90 in cents
        
        // Apply coupon discount if provided
        if (couponCode && DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS]) {
          const coupon = DEFAULT_COUPONS[couponCode.toUpperCase() as keyof typeof DEFAULT_COUPONS];
          if (coupon.discount_type === 'percentage') {
            completeAmount = Math.max(50, Math.round(completeAmount * (100 - coupon.discount_value) / 100));
          }
          sessionMetadata.coupon_code = couponCode.toUpperCase();
          logStep("Applied default coupon to complete", { coupon: couponCode, newAmount: completeAmount });
        }
        
        lineItems = [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Acesso Completo - Todos os Packs',
              description: 'Acesso vitalício a todos os packs disponíveis e futuros',
            },
            unit_amount: completeAmount,
          },
          quantity: 1,
        }];

      } else {
        logStep("ERROR: Invalid payment configuration", { paymentType, packId, selectedPackIds });
        throw new Error("Configuração de pagamento inválida");
      }

      logStep("Line items prepared", { count: lineItems.length, totalAmount: lineItems[0]?.price_data?.unit_amount });

    } catch (error) {
      logStep("ERROR: Failed to prepare line items", { error: error.message });
      throw error;
    }

    // Create Stripe session
    const origin = req.headers.get("origin") || "https://casooculto.com.br";
    
    const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email!,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/packs`,
      metadata: sessionMetadata,
      allow_promotion_codes: false, // Disable since we handle coupons manually
      billing_address_collection: 'required',
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    };

    logStep("Creating Stripe session", { 
      customerId, 
      lineItemsCount: lineItems.length,
      unitAmount: lineItems[0]?.price_data?.unit_amount
    });

    const session = await stripe.checkout.sessions.create(sessionCreateParams);
    logStep("Stripe session created successfully", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ 
      sessionId: session.id,
      url: session.url 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR: Function failed", { message: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: "Verifique os logs para mais detalhes"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
