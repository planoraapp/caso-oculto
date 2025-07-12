
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Enhanced logging function with more detail
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
        amountTotal: session.amount_total,
        metadata: session.metadata
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
        logStep('Payment session not found in database', { 
          sessionId: session.id, 
          error: sessionError,
          searchAttempted: true 
        });
        
        // Tentar encontrar por email se não encontrou por session_id
        if (session.customer_email) {
          logStep('Attempting to find user by email', { email: session.customer_email });
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, email')
            .eq('email', session.customer_email)
            .single()
            
          if (profile) {
            logStep('Found user profile, creating missing payment session', { 
              userId: profile.id, 
              email: profile.email 
            });
            
            // Determinar tipo de pagamento baseado no valor
            let paymentType = 'individual';
            let packIds: string[] = [];
            
            const amount = session.amount_total || 0;
            if (amount <= 100) { // R$ 1.00 ou menos = combo
              paymentType = 'combo';
              packIds = ['pack-01', 'pack-04', 'pack-05', 'pack-06', 'pack-07'];
            } else if (amount >= 7400) { // R$ 74.00 = complete
              paymentType = 'complete';
              const { data: allPacks } = await supabase
                .from('packs')
                .select('id')
                .neq('id', 'pack-03');
              packIds = allPacks?.map(p => p.id) || [];
            } else {
              paymentType = 'individual';
              packIds = ['pack-01']; // Default para pack individual
            }
            
            // Criar sessão de pagamento retroativa
            const { data: newSession, error: createError } = await supabase
              .from('payment_sessions')
              .insert({
                user_id: profile.id,
                stripe_session_id: session.id,
                payment_type: paymentType,
                selected_pack_ids: paymentType === 'combo' ? packIds : null,
                pack_id: paymentType === 'individual' ? packIds[0] : null,
                status: 'approved',
                mercadopago_preference_id: `stripe_${session.id}`,
                created_at: new Date().toISOString()
              })
              .select()
              .single();
              
            if (createError) {
              logStep('Error creating retroactive payment session', { error: createError });
            } else {
              logStep('Created retroactive payment session', { newSession });
              // Continuar o processamento com a nova sessão
              paymentSession = newSession;
            }
          }
        }
        
        if (!paymentSession) {
          return new Response('Session not found and could not be created', { status: 404 })
        }
      }

      logStep('Found payment session', { 
        paymentSessionId: paymentSession.id,
        currentStatus: paymentSession.status,
        paymentType: paymentSession.payment_type,
        userId: paymentSession.user_id
      });

      // Verificar se já foi processado (idempotência)
      if (paymentSession.status === 'approved') {
        logStep('Session already processed - but verifying pack access', { sessionId: session.id });
        
        // Verificar se o usuário já tem acesso aos packs
        const { data: existingAccess } = await supabase
          .from('user_pack_access')
          .select('pack_id')
          .eq('user_id', paymentSession.user_id)
          .eq('is_active', true);
          
        const hasAccess = existingAccess && existingAccess.length > 0;
        logStep('Existing pack access check', { 
          hasAccess, 
          accessCount: existingAccess?.length || 0,
          packIds: existingAccess?.map(a => a.pack_id) || []
        });
        
        if (!hasAccess) {
          logStep('No pack access found, reprocessing grants');
          // Continuar para reprocessar os grants
        } else {
          return new Response('Already processed with pack access verified', { status: 200 })
        }
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

      // Determinar quais packs liberar baseado no tipo de pagamento
      let packIds = []
      if (paymentSession.payment_type === 'individual') {
        packIds = [paymentSession.pack_id]
        logStep('Individual purchase - releasing single pack', { packId: paymentSession.pack_id });
      } else if (paymentSession.payment_type === 'combo') {
        // Para combo, sempre liberar os 5 packs específicos
        packIds = ['pack-01', 'pack-04', 'pack-05', 'pack-06', 'pack-07']
        logStep('Combo purchase - releasing 5 specific packs', { packIds });
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
        packsGranted: packIds.length,
        finalPackIds: packIds
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
