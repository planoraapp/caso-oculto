
-- Corrigir relacionamento dos afiliados com profiles
ALTER TABLE public.afiliados DROP CONSTRAINT IF EXISTS afiliados_user_id_fkey;
ALTER TABLE public.afiliados ADD CONSTRAINT afiliados_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Inserir roquematheus@live.com como afiliado
INSERT INTO public.afiliados (user_id, codigo_cupom, comissao_percentual)
SELECT p.id, 'ROQUE10', 15.00
FROM public.profiles p 
WHERE p.email = 'roquematheus@live.com'
ON CONFLICT (codigo_cupom) DO NOTHING;

-- Corrigir trigger para decrementar uso de cupons
CREATE OR REPLACE FUNCTION public.decrement_coupon_usage()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Incrementar current_uses do cupom quando uma compra é aprovada
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    IF NEW.cupom_codigo IS NOT NULL THEN
      UPDATE public.discount_coupons 
      SET current_uses = current_uses + 1, updated_at = now()
      WHERE UPPER(code) = UPPER(NEW.cupom_codigo);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Criar trigger para decrementar uso de cupons na tabela compras
DROP TRIGGER IF EXISTS trigger_decrement_coupon_usage ON public.compras;
CREATE TRIGGER trigger_decrement_coupon_usage
  AFTER INSERT OR UPDATE ON public.compras
  FOR EACH ROW EXECUTE FUNCTION public.decrement_coupon_usage();

-- Atualizar uso do cupom VALEU baseado em compras já aprovadas
UPDATE public.discount_coupons 
SET current_uses = (
  SELECT COUNT(*) 
  FROM public.compras 
  WHERE UPPER(cupom_codigo) = UPPER(code) 
  AND status = 'approved'
)
WHERE UPPER(code) = 'VALEU';
