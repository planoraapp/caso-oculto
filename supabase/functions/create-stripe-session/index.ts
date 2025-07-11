
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

// Cupons padrão do sistema
const DEFAULT_COUPONS = {
  'CASO10': { discount_value: 10, discount_type: 'percentage' },
  'VALEU': { discount_value: 99, discount_type: 'percentage' },
  'LOVABLE': { discount_value: 100, discount_type: 'percentage' }
};

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
    let affiliateId = null
    
    if (couponCode) {
      console.log('Validating coupon:', couponCode)
      const upperCode = couponCode.toUpperCase()
      
      // Verificar cupons padrão primeiro
      if (DEFAULT_COUPONS[upperCode as keyof typeof DEFAULT_COUPONS]) {
        validCoupon = {
          code: upperCode,
          discount_value: DEFAULT_COUPONS[upperCode as keyof typeof DEFAULT_COUPONS].discount_value,
          discount_type: DEFAULT_COUPONS[upperCode as keyof typeof DEFAULT_COUPONS].discount_type,
          is_valid: true
        }
        console.log('Valid default coupon found:', validCoupon)
      } else {
        // Verificar cupons do banco de dados (afiliados)
        const { data: couponData, error: couponError } = await supabase.rpc('validate_coupon', {
          coupon_code: upperCode
        })

        if (!couponError && couponData && couponData[0]?.is_valid) {
          validCoupon = couponData[0]
          
          // Buscar afiliado se for cupom de afiliado
          const { data: affiliateData } = await supabase
            .from('afiliados')
            .select('id')
            .eq('codigo_cupom', upperCode)
            .single()
          
          if (affiliateData) {
            affiliateId = affiliateData.id
          }
          
          console.log('Valid database coupon found:', validCoupon)
        }
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
    
    if (affiliateId) {
      metadata.affiliate_id = affiliateId
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
        const couponData: any = {
          id: stripeCouponId,
          duration: 'once'
        }
        
        if (validCoupon.discount_type === 'percentage') {
          couponData.percent_off = validCoupon.discount_value
        } else {
          couponData.amount_off = Math.round(validCoupon.discount_value * 100) // converter para centavos
          couponData.currency = 'brl'
        }
        
        await stripe.coupons.create(couponData)
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

    // Calcular valores para salvar no banco
    const originalAmount = price.unit_amount! / 100
    let finalAmount = originalAmount
    
    if (validCoupon) {
      if (validCoupon.discount_type === 'percentage') {
        finalAmount = originalAmount * (1 - validCoupon.discount_value / 100)
      } else {
        finalAmount = Math.max(0, originalAmount - validCoupon.discount_value)
      }
    }

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

    // Salvar na tabela compras também
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
        cupom_codigo: validCoupon?.code || null,
        afiliado_id: affiliateId,
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
