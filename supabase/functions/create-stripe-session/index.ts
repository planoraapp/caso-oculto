
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Create Stripe session called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json()
    console.log('Request body:', body)

    const { type, packId, selectedPackIds, userId, couponCode } = body

    if (!userId) {
      throw new Error('User ID is required')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    
    if (!supabaseUrl || !supabaseKey || !stripeSecretKey) {
      throw new Error('Missing required environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' })

    // Define prices in cents
    const prices = {
      individual: 1480, // R$ 14,80
      combo: 6140,      // R$ 61,40
      complete: 11090   // R$ 110,90
    }

    let amount = 0
    let description = ''

    switch (type) {
      case 'individual':
        amount = prices.individual
        description = `Pack Individual - ${packId}`
        break
      case 'combo':
        amount = prices.combo
        description = `Combo 5 Packs - ${selectedPackIds?.length || 0} packs selecionados`
        break
      case 'complete':
        amount = prices.complete
        description = 'Acesso Total - Todos os packs'
        break
      default:
        throw new Error('Invalid payment type')
    }

    // Apply coupon if provided
    let discountAmount = 0
    if (couponCode) {
      const { data: coupon } = await supabase
        .from('discount_coupons')
        .select('*')
        .eq('code', couponCode)
        .eq('is_active', true)
        .single()

      if (coupon) {
        const now = new Date()
        const validFrom = new Date(coupon.valid_from)
        const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null

        if (now >= validFrom && (!validUntil || now <= validUntil)) {
          if (!coupon.max_uses || coupon.current_uses < coupon.max_uses) {
            if (!coupon.min_purchase_amount || amount >= (coupon.min_purchase_amount * 100)) {
              if (coupon.discount_type === 'percentage') {
                discountAmount = Math.round((amount * coupon.discount_value) / 100)
              } else {
                discountAmount = coupon.discount_value * 100 // Convert to cents
              }
              amount = Math.max(0, amount - discountAmount)
            }
          }
        }
      }
    }

    // Create external reference for webhook identification
    const externalReference = `${type}_${userId}_${Date.now()}`

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/packs`,
      metadata: {
        external_reference: externalReference,
        payment_type: type,
        user_id: userId,
        pack_id: packId || '',
        selected_pack_ids: selectedPackIds ? selectedPackIds.join(',') : '',
        coupon_code: couponCode || '',
        discount_amount: discountAmount.toString()
      }
    })

    // Create payment session record
    const { data: paymentSession, error: sessionError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: userId,
        pack_id: packId,
        selected_pack_ids: selectedPackIds,
        payment_type: type,
        stripe_session_id: session.id,
        mercadopago_preference_id: '', // Keep for compatibility
        status: 'pending',
        external_reference: externalReference
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Error creating payment session:', sessionError)
      throw new Error('Failed to create payment session')
    }

    console.log('Stripe session created:', session.id)
    console.log('Payment session created:', paymentSession.id)

    return new Response(
      JSON.stringify({
        preference_id: session.id,
        init_point: session.url,
        session_id: session.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in create-stripe-session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
