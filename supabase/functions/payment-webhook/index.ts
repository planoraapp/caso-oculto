
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Payment webhook called:', req.method)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json()
    console.log('Webhook received:', JSON.stringify(body, null, 2))

    if (body.type === 'payment') {
      const paymentId = body.data.id
      console.log('Processing payment:', paymentId)

      const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')
      if (!accessToken) {
        console.error('Mercado Pago access token not configured')
        throw new Error('Mercado Pago access token not configured')
      }

      // Get payment details from Mercado Pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!paymentResponse.ok) {
        console.error('Failed to get payment details:', paymentResponse.status, await paymentResponse.text())
        throw new Error(`Failed to get payment details: ${paymentResponse.status}`)
      }

      const payment = await paymentResponse.json()
      console.log('Payment details received:', JSON.stringify({
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
        external_reference: payment.external_reference
      }, null, 2))

      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase configuration missing')
        throw new Error('Supabase configuration missing')
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      // Find payment session by external reference
      let session = null
      if (payment.external_reference) {
        const { data: sessionData, error: sessionError } = await supabase
          .from('payment_sessions')
          .select('*')
          .like('external_reference', `%${payment.external_reference}%`)
          .single()

        if (!sessionError && sessionData) {
          session = sessionData
        }
      }

      // If not found by external reference, try by preference ID
      if (!session) {
        // Get preference details to find our session
        const preferenceResponse = await fetch(`https://api.mercadopago.com/checkout/preferences/${payment.preference_id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        if (preferenceResponse.ok) {
          const preference = await preferenceResponse.json()
          
          const { data: sessionData, error: sessionError } = await supabase
            .from('payment_sessions')
            .select('*')
            .eq('mercadopago_preference_id', payment.preference_id)
            .single()

          if (!sessionError && sessionData) {
            session = sessionData
          }
        }
      }

      if (!session) {
        console.error('Payment session not found for payment:', paymentId)
        return new Response('Session not found', { 
          status: 404,
          headers: corsHeaders 
        })
      }

      console.log('Found payment session:', session.id)

      // Update payment session status
      const newStatus = payment.status === 'approved' ? 'approved' : 
                       payment.status === 'rejected' ? 'rejected' : 'pending'

      const { error: updateError } = await supabase
        .from('payment_sessions')
        .update({ status: newStatus })
        .eq('id', session.id)

      if (updateError) {
        console.error('Error updating payment session:', updateError)
      } else {
        console.log('Payment session updated to status:', newStatus)
      }

      // If payment approved, grant access to packs
      if (payment.status === 'approved') {
        console.log('Payment approved, granting access')
        
        let packIds = []
        if (session.payment_type === 'individual') {
          packIds = [session.pack_id]
        } else if (session.payment_type === 'combo') {
          packIds = session.selected_pack_ids || []
        } else if (session.payment_type === 'complete') {
          // Get all pack IDs
          const { data: allPacks } = await supabase
            .from('packs')
            .select('id')
          packIds = allPacks?.map(p => p.id) || []
        }

        console.log('Granting access to packs:', packIds)

        // Grant access to packs
        for (const packId of packIds) {
          if (packId) {  // Ensure packId is not null/undefined
            const { error: accessError } = await supabase
              .from('user_pack_access')
              .upsert({
                user_id: session.user_id,
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

        console.log('Access granted to all packs for user:', session.user_id)
      }
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
