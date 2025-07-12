
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Enhanced logging function
const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details, null, 2)}` : '';
  console.log(`[${timestamp}] [STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  logStep('Webhook called', { method: req.method, url: req.url });
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    
    logStep('Received webhook', { 
      hasSignature: !!signature, 
      bodyLength: body.length,
      headers: Object.fromEntries(req.headers.entries())
    });
    
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!stripeSecretKey) {
      logStep('ERROR: Missing Stripe secret key');
      throw new Error('Stripe secret key not configured')
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' })

    let event
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        logStep('Webhook signature verified successfully');
      } catch (err) {
        logStep('Webhook signature verification failed', { error: err.message });
        return new Response('Webhook signature verification failed', { status: 400 })
      }
    } else {
      event = JSON.parse(body)
      logStep('Processing webhook without signature verification');
    }

    logStep('Processing webhook event', { type: event.type, id: event.id });

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      logStep('Processing completed checkout session', { 
        sessionId: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total
      });

      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (!supabaseUrl || !supabaseKey) {
        logStep('ERROR: Missing Supabase configuration');
        throw new Error('Supabase configuration missing')
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      // Buscar sessão de pagamento pelo stripe_session_id
      const { data: paymentSession, error: sessionError } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('stripe_session_id', session.id)
        .single()

      if (sessionError || !paymentSession) {
        logStep('Payment session not found', { sessionId: session.id, error: sessionError });
        return new Response('Session not found', { status: 404 })
      }

      logStep('Found payment session', { 
        paymentSessionId: paymentSession.id,
        currentStatus: paymentSession.status,
        paymentType: paymentSession.payment_type,
        userId: paymentSession.user_id
      });

      // Verificar se já foi processado (idempotência)
      if (paymentSession.status === 'approved') {
        logStep('Session already processed - skipping', { sessionId: session.id });
        return new Response('Already processed', { status: 200 })
      }

      // Atualizar status da sessão de pagamento
      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', paymentSession.id)

      if (updateError) {
        logStep('Error updating payment session', { error: updateError });
      } else {
        logStep('Payment session updated to approved');
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
        logStep('Error updating compras table', { error: comprasUpdateError });
      } else {
        logStep('Compras table updated successfully');
      }

      // Determinar quais packs liberar
      let packIds = []
      if (paymentSession.payment_type === 'individual') {
        packIds = [paymentSession.pack_id]
        logStep('Individual purchase - releasing single pack', { packId: paymentSession.pack_id });
      } else if (paymentSession.payment_type === 'combo') {
        packIds = paymentSession.selected_pack_ids || []
        logStep('Combo purchase - releasing multiple packs', { packIds });
      } else if (paymentSession.payment_type === 'complete') {
        // Get all pack IDs except pack-03
        const { data: allPacks } = await supabase
          .from('packs')
          .select('id')
          .neq('id', 'pack-03')
        packIds = allPacks?.map(p => p.id) || []
        
        // Set acesso_total flag for complete access
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            acesso_total: true, 
            tag: 'Mestre Investigador',
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentSession.user_id)
        
        if (profileError) {
          logStep('Error updating profile for complete access', { error: profileError });
        } else {
          logStep('Complete access granted to user profile', { userId: paymentSession.user_id });
        }
      }

      logStep('Granting access to packs', { packIds, totalPacks: packIds.length });

      // Grant access to packs
      for (const packId of packIds) {
        if (packId) {
          const { error: accessError } = await supabase
            .from('user_pack_access')
            .upsert({
              user_id: paymentSession.user_id,
              pack_id: packId,
              is_active: true,
              granted_at: new Date().toISOString()
            }, {
              onConflict: 'user_id,pack_id'
            })

          if (accessError) {
            logStep('Error granting access to pack', { packId, error: accessError });
          } else {
            logStep('Access granted to pack', { packId, userId: paymentSession.user_id });
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

        const { error: packsUpdateError } = await supabase
          .from('profiles')
          .update({ 
            packs_liberados: newPacks,
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentSession.user_id)

        if (packsUpdateError) {
          logStep('Error updating packs_liberados', { error: packsUpdateError });
        } else {
          logStep('Updated packs_liberados for user', { 
            userId: paymentSession.user_id, 
            totalPacks: newPacks.length 
          });
        }
      }

      logStep('Payment processing completed successfully', { 
        userId: paymentSession.user_id,
        sessionId: session.id,
        packsGranted: packIds.length
      });
    }

    return new Response('OK', { 
      headers: corsHeaders,
      status: 200 
    })

  } catch (error) {
    logStep('CRITICAL ERROR in webhook processing', { 
      message: error.message,
      stack: error.stack 
    });
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
