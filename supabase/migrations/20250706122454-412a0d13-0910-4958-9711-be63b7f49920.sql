
-- Criar tabela para cupons de desconto
CREATE TABLE public.discount_coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_purchase_amount DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela para códigos de afiliado
CREATE TABLE public.affiliate_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  affiliate_name TEXT NOT NULL,
  affiliate_email TEXT NOT NULL,
  commission_percentage DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  total_sales INTEGER DEFAULT 0,
  total_commission DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela para uso de cupons
CREATE TABLE public.coupon_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES public.discount_coupons(id),
  user_id UUID REFERENCES auth.users(id),
  purchase_id TEXT,
  discount_applied DECIMAL(10,2),
  used_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.discount_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- Políticas para cupons (apenas admins podem gerenciar)
CREATE POLICY "Admin can manage coupons" ON public.discount_coupons
  FOR ALL
  USING (auth.email() = 'conectawebapps@outlook.com');

-- Políticas para códigos de afiliado (apenas admins podem gerenciar)
CREATE POLICY "Admin can manage affiliate codes" ON public.affiliate_codes
  FOR ALL
  USING (auth.email() = 'conectawebapps@outlook.com');

-- Políticas para uso de cupons
CREATE POLICY "Users can view their coupon usage" ON public.coupon_usage
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Insert coupon usage" ON public.coupon_usage
  FOR INSERT
  WITH CHECK (true);
