
-- Criar tabela de afiliados
CREATE TABLE public.afiliados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  codigo_cupom text UNIQUE NOT NULL,
  comissao_percentual numeric DEFAULT 10.00,
  visitas integer DEFAULT 0,
  compras_confirmadas integer DEFAULT 0,
  valor_total_gerado numeric DEFAULT 0,
  criado_em timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Criar tabela de compras
CREATE TABLE public.compras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  stripe_session_id text UNIQUE NOT NULL,
  pack_id text,
  selected_pack_ids text[],
  payment_type text NOT NULL,
  valor_original numeric NOT NULL,
  valor_pago numeric NOT NULL,
  cupom_codigo text,
  afiliado_id uuid REFERENCES public.afiliados(id),
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Adicionar campo para packs liberados no perfil
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS packs_liberados text[];

-- Atualizar tabela de cupons para incluir afiliado
ALTER TABLE public.discount_coupons ADD COLUMN IF NOT EXISTS criado_por uuid REFERENCES public.afiliados(id);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.afiliados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compras ENABLE ROW LEVEL SECURITY;

-- Políticas para afiliados
CREATE POLICY "Users can view their own affiliate data" ON public.afiliados
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own affiliate data" ON public.afiliados
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate data" ON public.afiliados
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all affiliates" ON public.afiliados
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas para compras
CREATE POLICY "Users can view their own purchases" ON public.compras
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all purchases" ON public.compras
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert purchases" ON public.compras
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update purchases" ON public.compras
  FOR UPDATE USING (true);

-- Função para rastrear visitas de afiliados
CREATE OR REPLACE FUNCTION public.track_affiliate_visit(affiliate_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.afiliados 
  SET visitas = visitas + 1 
  WHERE codigo_cupom = affiliate_code AND is_active = true;
  
  RETURN FOUND;
END;
$$;

-- Função para processar compra de afiliado
CREATE OR REPLACE FUNCTION public.process_affiliate_purchase(
  affiliate_code text,
  purchase_amount numeric
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  affiliate_id uuid;
BEGIN
  SELECT id INTO affiliate_id 
  FROM public.afiliados 
  WHERE codigo_cupom = affiliate_code AND is_active = true;
  
  IF affiliate_id IS NOT NULL THEN
    UPDATE public.afiliados 
    SET 
      compras_confirmadas = compras_confirmadas + 1,
      valor_total_gerado = valor_total_gerado + purchase_amount
    WHERE id = affiliate_id;
  END IF;
  
  RETURN affiliate_id;
END;
$$;
