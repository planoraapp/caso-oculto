
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreatePaymentIntentRequest {
  amount: number
  currency: string
  type: 'individual' | 'combo' | 'complete'
  packId?: string
  selectedPackIds?: string[]
  userId: string
}

serve(async (req) => {
  console.log('create-payment-intent called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, type, packId, selectedPackIds, userId }: CreatePaymentIntentRequest = await req.json()
    console.log('Request data:', { amount, currency, type, packId, selectedPackIds, userId })

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

    // Preparar metadata para tracking
    const metadata: Record<string, string> = {
      user_id: userId,
      payment_type: type
    }

    if (type === 'individual' && packId) {
      metadata.pack_id = packId
    } else if (type === 'combo' && selectedPackIds) {
      metadata.selected_pack_ids = JSON.stringify(selectedPackIds)
    }

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    console.log('Payment Intent created:', paymentIntent.id)

    // Salvar intenção de pagamento no banco
    const { error: insertError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: userId,
        pack_id: type === 'individual' ? packId : null,
        selected_pack_ids: type === 'combo' ? selectedPackIds : null,
        payment_type: type,
        stripe_session_id: paymentIntent.id,
        external_reference: paymentIntent.id,
        mercadopago_preference_id: '', // Manter compatibilidade
        status: 'pending'
      })

    if (insertError) {
      console.error('Error saving payment session:', insertError)
      throw new Error('Failed to save payment session')
    }

    return new Response(JSON.stringify({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('create-payment-intent error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
