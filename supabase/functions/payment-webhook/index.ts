
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json()
    console.log('Webhook received:', body)

    if (body.type === 'payment') {
      const paymentId = body.data.id
      console.log('Processing payment:', paymentId)

      const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')
      if (!accessToken) {
        throw new Error('Mercado Pago access token not configured')
      }

      // Get payment details from Mercado Pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!paymentResponse.ok) {
        throw new Error(`Failed to get payment details: ${paymentResponse.status}`)
      }

      const payment = await paymentResponse.json()
      console.log('Payment details:', payment)

      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Find payment session by preference ID
      const { data: session } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('mercadopago_preference_id', payment.metadata?.preference_id)
        .single()

      if (!session) {
        console.error('Payment session not found for preference:', payment.metadata?.preference_id)
        return new Response('Session not found', { status: 404 })
      }

      // Update payment session status
      const newStatus = payment.status === 'approved' ? 'approved' : 
                       payment.status === 'rejected' ? 'rejected' : 'pending'

      await supabase
        .from('payment_sessions')
        .update({ status: newStatus })
        .eq('id', session.id)

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

        // Grant access to packs
        for (const packId of packIds) {
          await supabase
            .from('user_pack_access')
            .upsert({
              user_id: session.user_id,
              pack_id: packId,
              is_active: true
            })
        }

        console.log('Access granted to packs:', packIds)
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
