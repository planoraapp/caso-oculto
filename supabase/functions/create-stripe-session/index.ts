
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not configured");
      throw new Error("Stripe não configurado corretamente");
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
      throw new Error("Token de autorização necessário");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("ERROR: User authentication failed", { error: userError });
      throw new Error("Usuário não autenticado");
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
      throw new Error("Tipo de pagamento necessário");
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

        lineItems = [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: Math.round(pack.price * 100), // Convert to cents
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

        lineItems = packs.map(pack => ({
          price_data: {
            currency: 'brl',
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: Math.round(pack.price * 100),
          },
          quantity: 1,
        }));

      } else if (paymentType === 'complete') {
        logStep("Creating complete access session");
        
        lineItems = [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Acesso Completo - Todos os Packs',
              description: 'Acesso vitalício a todos os packs disponíveis e futuros',
            },
            unit_amount: totalAmount ? Math.round(totalAmount * 100) : 9999, // Default fallback
          },
          quantity: 1,
        }];

      } else {
        logStep("ERROR: Invalid payment configuration", { paymentType, packId, selectedPackIds });
        throw new Error("Configuração de pagamento inválida");
      }

      logStep("Line items prepared", { count: lineItems.length });

    } catch (error) {
      logStep("ERROR: Failed to prepare line items", { error: error.message });
      throw error;
    }

    // Handle coupon if provided (simplified logic)
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (couponCode) {
      logStep("Coupon provided", { couponCode });
      try {
        // Simple coupon validation - you might want to enhance this
        const coupons = await stripe.coupons.list({ limit: 100 });
        const validCoupon = coupons.data.find(c => c.id === couponCode);
        
        if (validCoupon) {
          discounts = [{ coupon: couponCode }];
          sessionMetadata.coupon_code = couponCode;
          logStep("Valid coupon applied", { couponCode });
        } else {
          logStep("WARNING: Invalid coupon provided", { couponCode });
          // Don't throw error, just continue without coupon
        }
      } catch (couponError) {
        logStep("WARNING: Coupon validation failed", { error: couponError.message });
        // Continue without coupon
      }
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
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    };

    if (discounts) {
      sessionCreateParams.discounts = discounts;
    }

    logStep("Creating Stripe session", { 
      customerId, 
      lineItemsCount: lineItems.length,
      hasDiscounts: !!discounts 
    });

    const session = await stripe.checkout.sessions.create(sessionCreateParams);
    logStep("Stripe session created successfully", { sessionId: session.id });

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
