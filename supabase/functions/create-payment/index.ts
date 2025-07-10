
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Create payment function called:', req.method)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, packId, selectedPackIds, userId, couponCode } = await req.json()
    console.log('Payment request data:', { type, packId, selectedPackIds, userId, couponCode })

    if (!userId) {
      console.error('User ID is required')
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const mercadoPagoToken = Deno.env.get('MERCADO_PAGO_ACCESS_TOKEN')

    if (!supabaseUrl || !supabaseKey || !mercadoPagoToken) {
      console.error('Missing environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    let items = []
    let totalAmount = 0
    let discountAmount = 0
    let couponId = null

    // Validate and apply coupon if provided
    if (couponCode) {
      console.log('Processing coupon:', couponCode)
      const { data: coupon, error: couponError } = await supabase
        .from('discount_coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('is_active', true)
        .single()

      if (couponError || !coupon) {
        console.error('Invalid coupon:', couponError)
        return new Response(
          JSON.stringify({ error: 'Cupom inválido ou expirado' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Check if coupon is still valid
      const now = new Date()
      const validFrom = new Date(coupon.valid_from)
      const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null

      if (now < validFrom || (validUntil && now > validUntil)) {
        console.error('Coupon expired')
        return new Response(
          JSON.stringify({ error: 'Cupom expirado' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Check usage limits
      if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
        console.error('Coupon usage limit reached')
        return new Response(
          JSON.stringify({ error: 'Cupom esgotado' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      couponId = coupon.id
    }

    // Build items based on type
    switch (type) {
      case 'individual':
        items = [{
          id: packId,
          title: `Pack Individual - ${packId}`,
          description: 'Pack de mistérios individual',
          quantity: 1,
          unit_price: 14.80,
          currency_id: 'BRL'
        }]
        totalAmount = 14.80
        break

      case 'combo':
        if (!selectedPackIds || selectedPackIds.length !== 5) {
          console.error('Combo must have exactly 5 packs')
          return new Response(
            JSON.stringify({ error: 'Combo deve ter exatamente 5 packs' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }
        items = [{
          id: 'combo-5-packs',
          title: 'Combo 5 Packs',
          description: `Combo com 5 packs selecionados: ${selectedPackIds.join(', ')}`,
          quantity: 1,
          unit_price: 61.40,
          currency_id: 'BRL'
        }]
        totalAmount = 61.40
        break

      case 'complete':
        items = [{
          id: 'complete-access',
          title: 'Acesso Completo',
          description: 'Acesso a todos os packs disponíveis',
          quantity: 1,
          unit_price: 110.90,
          currency_id: 'BRL'
        }]
        totalAmount = 110.90
        break

      default:
        console.error('Invalid payment type:', type)
        return new Response(
          JSON.stringify({ error: 'Tipo de pagamento inválido' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }

    // Apply coupon discount if valid
    if (couponId) {
      const { data: coupon } = await supabase
        .from('discount_coupons')
        .select('*')
        .eq('id', couponId)
        .single()

      if (coupon && totalAmount >= (coupon.min_purchase_amount || 0)) {
        if (coupon.discount_type === 'percentage') {
          discountAmount = (totalAmount * coupon.discount_value) / 100
        } else {
          discountAmount = coupon.discount_value
        }
        
        // Ensure discount doesn't exceed total amount
        discountAmount = Math.min(discountAmount, totalAmount)
        totalAmount = totalAmount - discountAmount
      }
    }

    // Get current domain for URLs
    const origin = req.headers.get('origin') || 'https://fad68a7a-e342-48e7-8997-93ab1e2fd98a.lovableproject.com'

    // Create MercadoPago preference
    const preferenceData = {
      items: items.map(item => ({
        ...item,
        unit_price: totalAmount // Apply discount to unit price
      })),
      payer: {
        email: userId + '@blackstories.com' // Placeholder email
      },
      back_urls: {
        success: `${origin}/packs`,
        failure: `${origin}/packs`,
        pending: `${origin}/packs`
      },
      auto_return: 'approved',
      notification_url: `https://oxeccsmxqymvxycnaszo.supabase.co/functions/v1/payment-webhook`,
      external_reference: `${userId}_${type}_${Date.now()}` // Unique reference
    }

    console.log('Creating MercadoPago preference with data:', JSON.stringify(preferenceData, null, 2))

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mercadoPagoToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceData)
    })

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text()
      console.error('MercadoPago error response:', errorText)
      console.error('MercadoPago status:', mpResponse.status)
      throw new Error('Erro ao criar preferência no MercadoPago')
    }

    const preference = await mpResponse.json()
    console.log('MercadoPago preference created successfully:', preference.id)

    // Save payment session
    const { error: sessionError } = await supabase
      .from('payment_sessions')
      .insert([{
        user_id: userId,
        pack_id: packId,
        selected_pack_ids: selectedPackIds,
        payment_type: type,
        mercadopago_preference_id: preference.id,
        status: 'pending'
      }])

    if (sessionError) {
      console.error('Error saving payment session:', sessionError)
      throw new Error('Erro ao salvar sessão de pagamento')
    }

    // Update coupon usage if applied
    if (couponId) {
      const { error: couponUpdateError } = await supabase
        .from('discount_coupons')
        .update({ 
          current_uses: (coupon?.current_uses || 0) + 1 
        })
        .eq('id', couponId)

      if (couponUpdateError) {
        console.error('Error updating coupon usage:', couponUpdateError)
      }
    }

    console.log('Payment session created successfully')

    return new Response(
      JSON.stringify({ 
        preference_id: preference.id,
        init_point: preference.init_point,
        total_amount: totalAmount,
        discount_applied: discountAmount
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno do servidor' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
