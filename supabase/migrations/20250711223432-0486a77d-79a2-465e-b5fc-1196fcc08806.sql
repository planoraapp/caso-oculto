
-- Limpar cupons existentes e inserir apenas os especificados
DELETE FROM public.discount_coupons;

-- Inserir os cupons permitidos
INSERT INTO public.discount_coupons (code, description, discount_type, discount_value, max_uses, current_uses, is_active, valid_from, valid_until) VALUES
('CASO10', 'Desconto de 10% para novos clientes', 'percentage', 10.00, 1, 0, true, now(), now() + interval '1 year'),
('VALEU', 'Desconto de 99% para teste interno', 'percentage', 99.00, 100, 0, true, now(), now() + interval '1 year'),
('LOVABLE', 'Desconto de 100% para testadores e afiliados', 'percentage', 100.00, 50, 0, true, now(), now() + interval '1 year');

-- Adicionar campo para controle de acesso total
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS acesso_total boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tag text;

-- Criar função para validar cupom
CREATE OR REPLACE FUNCTION public.validate_coupon(coupon_code text)
RETURNS TABLE (
  id uuid,
  code text,
  discount_value numeric,
  discount_type text,
  is_valid boolean,
  message text
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  coupon_record RECORD;
BEGIN
  -- Buscar cupom
  SELECT * INTO coupon_record 
  FROM public.discount_coupons 
  WHERE UPPER(public.discount_coupons.code) = UPPER(coupon_code)
  AND is_active = true;
  
  -- Verificar se existe
  IF coupon_record IS NULL THEN
    RETURN QUERY SELECT 
      NULL::uuid, 
      coupon_code, 
      0::numeric, 
      ''::text, 
      false, 
      'Cupom inválido ou expirado. Tente outro.'::text;
    RETURN;
  END IF;
  
  -- Verificar se não expirou
  IF coupon_record.valid_until IS NOT NULL AND coupon_record.valid_until < now() THEN
    RETURN QUERY SELECT 
      coupon_record.id, 
      coupon_record.code, 
      coupon_record.discount_value, 
      coupon_record.discount_type, 
      false, 
      'Cupom expirado.'::text;
    RETURN;
  END IF;
  
  -- Verificar limite de uso
  IF coupon_record.max_uses IS NOT NULL AND coupon_record.current_uses >= coupon_record.max_uses THEN
    RETURN QUERY SELECT 
      coupon_record.id, 
      coupon_record.code, 
      coupon_record.discount_value, 
      coupon_record.discount_type, 
      false, 
      'Cupom esgotado.'::text;
    RETURN;
  END IF;
  
  -- Cupom válido
  RETURN QUERY SELECT 
    coupon_record.id, 
    coupon_record.code, 
    coupon_record.discount_value, 
    coupon_record.discount_type, 
    true, 
    'Cupom válido!'::text;
END;
$$;
