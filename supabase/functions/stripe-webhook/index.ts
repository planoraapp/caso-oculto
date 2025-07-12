
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

      // Buscar sessão de pagamento (com idempotência)
      const { data: paymentSession, error: sessionError } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('stripe_session_id', session.id)
        .single()

      if (sessionError || !paymentSession) {
        console.error('Payment session not found:', session.id)
        return new Response('Session not found', { status: 404 })
      }

      // Verificar se já foi processado (idempotência)
      if (paymentSession.status === 'approved') {
        console.log('Session already processed:', session.id)
        return new Response('Already processed', { status: 200 })
      }

      console.log('Found payment session:', paymentSession.id)

      // Atualizar status da sessão
      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ status: 'approved' })
        .eq('id', paymentSession.id)

      if (updateError) {
        console.error('Error updating payment session:', updateError)
      }

      // Atualizar status na tabela compras
      const { error: comprasUpdateError } = await supabase
        .from('compras')
        .update({ 
          status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_session_id', session.id)

      if (comprasUpdateError) {
        console.error('Error updating compras:', comprasUpdateError)
      }

      // Liberar acesso aos packs usando APENAS user_pack_access
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
        
        // Set acesso_total flag for complete access
        await supabase
          .from('profiles')
          .update({ 
            acesso_total: true, 
            tag: 'Mestre Investigador',
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentSession.user_id)
        
        console.log('Set complete access for user:', paymentSession.user_id)
      }

      console.log('Granting access to packs:', packIds)

      // Grant access to packs (com verificação de duplicata)
      for (const packId of packIds) {
        if (packId) {
          const { error: accessError } = await supabase
            .from('user_pack_access')
            .upsert({
              user_id: paymentSession.user_id,
              pack_id: packId,
              is_active: true
            }, {
              onConflict: 'user_id,pack_id'
            })

          if (accessError) {
            console.error('Error granting access to pack:', packId, accessError)
          } else {
            console.log('Access granted to pack:', packId)
          }
        }
      }

      // Atualizar campo packs_liberados no perfil (para compatibilidade)
      if (packIds.length > 0) {
        const { data: currentProfile } = await supabase
          .from('profiles')
          .select('packs_liberados')
          .eq('id', paymentSession.user_id)
          .single()

        const currentPacks = currentProfile?.packs_liberados || []
        const newPacks = [...new Set([...currentPacks, ...packIds])]

        await supabase
          .from('profiles')
          .update({ 
            packs_liberados: newPacks,
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentSession.user_id)

        console.log('Updated packs_liberados for user:', paymentSession.user_id)
      }

      console.log('Payment processing completed successfully for user:', paymentSession.user_id)
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
