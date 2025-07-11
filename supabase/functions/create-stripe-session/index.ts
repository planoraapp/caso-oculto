
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
  combo: 'prod_SelesxylB4MY0d',        // Combo de 5 Packs
  complete: 'prod_Selfa5NcnENffo'      // Acesso Total
}

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

    // Validar cupom se fornecido
    let validCoupon = null
    if (couponCode) {
      console.log('Validating coupon:', couponCode)
      const { data: couponData, error: couponError } = await supabase.rpc('validate_coupon', {
        coupon_code: couponCode
      })

      if (couponError) {
        console.error('Error validating coupon:', couponError)
      } else if (couponData && couponData[0]?.is_valid) {
        validCoupon = couponData[0]
        console.log('Valid coupon found:', validCoupon)
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

    if (validCoupon) {
      metadata.coupon_code = validCoupon.code
      metadata.discount_amount = validCoupon.discount_value.toString()
    }

    // Preparar line items
    const lineItems = [
      {
        price: price.id,
        quantity: 1,
      }
    ]

    // Aplicar desconto se cupom válido
    let discounts = undefined
    if (validCoupon) {
      // Criar cupom no Stripe se não existir
      let stripeCouponId = validCoupon.code.toLowerCase()
      try {
        await stripe.coupons.retrieve(stripeCouponId)
      } catch (error) {
        // Cupom não existe, criar no Stripe
        await stripe.coupons.create({
          id: stripeCouponId,
          percent_off: validCoupon.discount_value,
          duration: 'once'
        })
        console.log('Created Stripe coupon:', stripeCouponId)
      }
      
      discounts = [{ coupon: stripeCouponId }]
    }

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
      throw new Error('Failed to save payment session')
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
