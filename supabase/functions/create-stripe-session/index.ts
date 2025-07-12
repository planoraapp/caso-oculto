
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreateSessionRequest {
  type: 'individual' | 'combo' | 'complete'
  packId?: string
  selectedPackIds?: string[]
  userId: string
  couponCode?: string
}

// Mapeamento de tipos para Product IDs específicos do Stripe
const STRIPE_PRODUCTS = {
  individual: 'prod_SeldT3rlYho8CM',   // Pack avulso
  combo: 'prod_SelesxylB4MY0d',        // Combo de 5 Packs - R$ 61,40
  complete: 'prod_Selfa5NcnENffo'      // Acesso Total
}

// Preços corretos em centavos
const PRICES = {
  individual: 1480,  // R$ 14,80
  combo: 6140,       // R$ 61,40
  complete: 11090    // R$ 110,90
}

// Cupons pré-configurados no Stripe (apenas estes serão aceitos)
const VALID_STRIPE_COUPONS = [
  'caso10',    // 10% de desconto
  'valeu',     // 99% de desconto
  'lovable'    // 100% de desconto
];

serve(async (req) => {
  console.log('create-stripe-session called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, packId, selectedPackIds, userId, couponCode }: CreateSessionRequest = await req.json()
    console.log('Request data:', { type, packId, selectedPackIds, userId, couponCode })

    if (!userId) {
      throw new Error('User ID is required')
    }

    if (!['individual', 'combo', 'complete'].includes(type)) {
      throw new Error('Invalid payment type')
    }

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured')
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' })

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Validar cupom apenas se fornecido e está na lista pré-aprovada
    let discounts = undefined
    if (couponCode) {
      const normalizedCoupon = couponCode.toLowerCase().trim()
      console.log('Validating coupon:', normalizedCoupon)
      
      if (VALID_STRIPE_COUPONS.includes(normalizedCoupon)) {
        try {
          // Verificar se o cupom existe no Stripe
          await stripe.coupons.retrieve(normalizedCoupon)
          discounts = [{ coupon: normalizedCoupon }]
          console.log('Valid Stripe coupon applied:', normalizedCoupon)
        } catch (error) {
          console.error('Coupon not found in Stripe:', normalizedCoupon, error)
          throw new Error(`Cupom "${couponCode}" não está configurado no sistema`)
        }
      } else {
        throw new Error(`Cupom "${couponCode}" não é válido`)
      }
    }

    // Buscar o produto e seu preço no Stripe
    const productId = STRIPE_PRODUCTS[type]
    console.log('Using Stripe product ID:', productId)

    const product = await stripe.products.retrieve(productId)
    const prices = await stripe.prices.list({ product: productId, active: true, limit: 1 })
    
    if (prices.data.length === 0) {
      throw new Error(`No active price found for product ${productId}`)
    }

    const price = prices.data[0]
    console.log('Found price:', price.id, 'Amount:', price.unit_amount)

    // Preparar metadata para tracking
    const metadata: Record<string, string> = {
      user_id: userId,
      payment_type: type,
      product_id: productId
    }

    if (type === 'individual' && packId) {
      metadata.pack_id = packId
    } else if (type === 'combo' && selectedPackIds) {
      metadata.selected_pack_ids = JSON.stringify(selectedPackIds)
    }

    if (couponCode) {
      metadata.coupon_code = couponCode.toLowerCase().trim()
    }

    // Preparar line items
    const lineItems = [
      {
        price: price.id,
        quantity: 1,
      }
    ]

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/packs`,
      metadata,
      client_reference_id: userId,
      discounts
    })

    console.log('Stripe session created:', session.id)

    // Salvar sessão de pagamento no banco
    const { error: insertError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: userId,
        pack_id: type === 'individual' ? packId : null,
        selected_pack_ids: type === 'combo' ? selectedPackIds : null,
        payment_type: type,
        stripe_session_id: session.id,
        external_reference: session.id,
        mercadopago_preference_id: '', // Manter compatibilidade
        status: 'pending'
      })

    if (insertError) {
      console.error('Error saving payment session:', insertError)
    }

    // Calcular valores para a tabela compras
    const originalAmount = (price.unit_amount || PRICES[type]) / 100
    let finalAmount = originalAmount
    
    if (discounts && discounts.length > 0) {
      try {
        const coupon = await stripe.coupons.retrieve(discounts[0].coupon)
        if (coupon.percent_off) {
          finalAmount = originalAmount * (1 - coupon.percent_off / 100)
        } else if (coupon.amount_off) {
          finalAmount = Math.max(0, originalAmount - (coupon.amount_off / 100))
        }
      } catch (error) {
        console.error('Error calculating discount:', error)
      }
    }

    // Salvar na tabela compras
    const { error: comprasError } = await supabase
      .from('compras')
      .insert({
        user_id: userId,
        stripe_session_id: session.id,
        pack_id: type === 'individual' ? packId : null,
        selected_pack_ids: type === 'combo' ? selectedPackIds : null,
        payment_type: type,
        valor_original: originalAmount,
        valor_pago: finalAmount,
        cupom_codigo: couponCode?.toLowerCase().trim() || null,
        status: 'pending'
      })

    if (comprasError) {
      console.error('Error saving compra:', comprasError)
    }

    return new Response(JSON.stringify({
      session_id: session.id,
      url: session.url,
      product_name: product.name,
      amount: price.unit_amount,
      currency: price.currency
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('create-stripe-session error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
