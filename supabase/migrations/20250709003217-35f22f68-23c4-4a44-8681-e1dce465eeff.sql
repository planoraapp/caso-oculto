
-- 1. Corrigir políticas da tabela packs (restringir operações de escrita apenas para admins)
DROP POLICY IF EXISTS "Allow admin to insert packs" ON public.packs;
DROP POLICY IF EXISTS "Allow admin to update packs" ON public.packs;
DROP POLICY IF EXISTS "Allow admin to delete packs" ON public.packs;

CREATE POLICY "Admin can insert packs" ON public.packs
  FOR INSERT
  WITH CHECK (auth.email() = 'conectawebapps@outlook.com');

CREATE POLICY "Admin can update packs" ON public.packs
  FOR UPDATE
  USING (auth.email() = 'conectawebapps@outlook.com');

CREATE POLICY "Admin can delete packs" ON public.packs
  FOR DELETE
  USING (auth.email() = 'conectawebapps@outlook.com');

-- 2. Permitir que administradores vejam todos os usos de cupons
CREATE POLICY "Admin can view all coupon usage" ON public.coupon_usage
  FOR SELECT
  USING (auth.email() = 'conectawebapps@outlook.com');

-- 3. Adicionar validação para payment_sessions (deve ter pack_id OU selected_pack_ids)
CREATE OR REPLACE FUNCTION validate_payment_session()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.pack_id IS NULL AND (NEW.selected_pack_ids IS NULL OR array_length(NEW.selected_pack_ids, 1) = 0) THEN
    RAISE EXCEPTION 'Payment session must have either pack_id or selected_pack_ids';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_payment_session_trigger
  BEFORE INSERT OR UPDATE ON public.payment_sessions
  FOR EACH ROW EXECUTE FUNCTION validate_payment_session();

-- 4. Adicionar validação para cupons (não exceder max_uses)
CREATE OR REPLACE FUNCTION validate_coupon_usage()
RETURNS TRIGGER AS $$
DECLARE
  coupon_record RECORD;
BEGIN
  SELECT * INTO coupon_record FROM public.discount_coupons WHERE id = NEW.coupon_id;
  
  IF coupon_record.max_uses IS NOT NULL AND coupon_record.current_uses >= coupon_record.max_uses THEN
    RAISE EXCEPTION 'Coupon has reached maximum usage limit';
  END IF;
  
  -- Incrementar current_uses
  UPDATE public.discount_coupons 
  SET current_uses = current_uses + 1, updated_at = now()
  WHERE id = NEW.coupon_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_coupon_usage_trigger
  BEFORE INSERT ON public.coupon_usage
  FOR EACH ROW EXECUTE FUNCTION validate_coupon_usage();

-- 5. Adicionar índices para performance
CREATE INDEX IF NOT EXISTS idx_user_pack_access_user_pack ON public.user_pack_access(user_id, pack_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_user_status ON public.payment_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user_coupon ON public.coupon_usage(user_id, coupon_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_user_status ON public.refund_requests(user_id, status);

-- 6. Inserir dados de teste (alguns cupons e códigos de afiliado de exemplo)
INSERT INTO public.discount_coupons (code, description, discount_type, discount_value, max_uses, is_active) VALUES
('WELCOME10', 'Desconto de boas-vindas', 'percentage', 10.00, 100, true),
('COMBO5', 'Desconto para combo de 5 packs', 'fixed', 5.00, 50, true),
('PROMO2024', 'Promoção especial 2024', 'percentage', 15.00, 200, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.affiliate_codes (code, affiliate_name, affiliate_email, commission_percentage, is_active) VALUES
('PARTNER01', 'Parceiro Teste 1', 'parceiro1@teste.com', 15.00, true),
('YOUTUBER01', 'YouTuber Teste', 'youtuber@teste.com', 20.00, true)
ON CONFLICT (code) DO NOTHING;
