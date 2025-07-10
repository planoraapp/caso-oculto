
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Stripe webhook called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured')
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' })

    let event
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return new Response('Webhook signature verification failed', { status: 400 })
      }
    } else {
      event = JSON.parse(body)
    }

    console.log('Webhook event received:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('Processing completed session:', session.id)

      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase configuration missing')
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      // Find payment session by stripe_session_id
      const { data: paymentSession, error: sessionError } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('stripe_session_id', session.id)
        .single()

      if (sessionError || !paymentSession) {
        console.error('Payment session not found:', session.id)
        return new Response('Session not found', { status: 404 })
      }

      console.log('Found payment session:', paymentSession.id)

      // Update payment session status
      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ status: 'approved' })
        .eq('id', paymentSession.id)

      if (updateError) {
        console.error('Error updating payment session:', updateError)
      } else {
        console.log('Payment session updated to approved')
      }

      // Grant access to packs
      let packIds = []
      if (paymentSession.payment_type === 'individual') {
        packIds = [paymentSession.pack_id]
      } else if (paymentSession.payment_type === 'combo') {
        packIds = paymentSession.selected_pack_ids || []
      } else if (paymentSession.payment_type === 'complete') {
        // Get all pack IDs
        const { data: allPacks } = await supabase
          .from('packs')
          .select('id')
        packIds = allPacks?.map(p => p.id) || []
      }

      console.log('Granting access to packs:', packIds)

      // Grant access to packs
      for (const packId of packIds) {
        if (packId) {
          const { error: accessError } = await supabase
            .from('user_pack_access')
            .upsert({
              user_id: paymentSession.user_id,
              pack_id: packId,
              is_active: true
            })

          if (accessError) {
            console.error('Error granting access to pack:', packId, accessError)
          } else {
            console.log('Access granted to pack:', packId)
          }
        }
      }

      // Record coupon usage if applicable
      const couponCode = session.metadata?.coupon_code
      if (couponCode) {
        const discountAmount = parseInt(session.metadata?.discount_amount || '0')
        
        const { error: couponError } = await supabase
          .from('coupon_usage')
          .insert({
            user_id: paymentSession.user_id,
            coupon_id: null, // We'll need to fetch this if needed
            discount_applied: discountAmount / 100, // Convert back to reais
            used_at: new Date().toISOString()
          })

        if (couponError) {
          console.error('Error recording coupon usage:', couponError)
        }

        // Update coupon usage count
        await supabase
          .from('discount_coupons')
          .update({ 
            current_uses: supabase.raw('current_uses + 1'),
            updated_at: new Date().toISOString()
          })
          .eq('code', couponCode)
      }

      console.log('Access granted successfully for user:', paymentSession.user_id)
    }

    return new Response('OK', { 
      headers: corsHeaders,
      status: 200 
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
