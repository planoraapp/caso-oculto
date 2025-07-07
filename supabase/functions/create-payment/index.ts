
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
    const { type, packId, selectedPackIds, userId } = await req.json()
    console.log('Creating payment preference:', { type, packId, selectedPackIds, userId })

    const accessToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')
    if (!accessToken) {
      throw new Error('Mercado Pago access token not configured')
    }

    // Calculate price and title based on payment type
    let title = "Pack Individual - Caso Oculto"
    let unit_price = 14.80
    let description = "Acesso a 1 pack de mistérios"

    if (type === 'combo') {
      title = "Combo 5 Packs - Caso Oculto"
      unit_price = 61.40 // 20% discount
      description = "Acesso a 5 packs de sua escolha"
    } else if (type === 'complete') {
      title = "Acesso Total - Caso Oculto"
      unit_price = 110.90
      description = "Acesso a todos os packs disponíveis"
    }

    // Create payment preference
    const preferenceData = {
      items: [{
        title,
        description,
        quantity: 1,
        unit_price,
        currency_id: "BRL"
      }],
      back_urls: {
        success: `${req.headers.get('origin')}/packs?payment=success`,
        failure: `${req.headers.get('origin')}/packs?payment=failure`,
        pending: `${req.headers.get('origin')}/packs?payment=pending`
      },
      auto_return: "approved",
      notification_url: `${req.headers.get('origin')}/supabase/functions/v1/payment-webhook`,
      metadata: {
        type,
        pack_id: packId,
        selected_pack_ids: selectedPackIds ? JSON.stringify(selectedPackIds) : null,
        user_id: userId
      }
    }

    console.log('Creating preference with data:', preferenceData)

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Mercado Pago API error:', errorData)
      throw new Error(`Mercado Pago API error: ${response.status}`)
    }

    const preference = await response.json()
    console.log('Preference created:', preference.id)

    // Store payment session in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: sessionError } = await supabase
      .from('payment_sessions')
      .insert({
        user_id: userId,
        pack_id: packId,
        payment_type: type,
        selected_pack_ids: selectedPackIds,
        mercadopago_preference_id: preference.id,
        status: 'pending'
      })

    if (sessionError) {
      console.error('Error storing payment session:', sessionError)
    }

    return new Response(
      JSON.stringify({ 
        preference_id: preference.id,
        init_point: preference.init_point 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error creating payment preference:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
