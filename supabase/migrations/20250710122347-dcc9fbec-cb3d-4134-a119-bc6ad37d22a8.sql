
-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Criar tabela de roles de usuário
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função security definer para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Função para obter role do usuário atual
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  
  -- Criar role padrão de usuário
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Se for o email admin, adicionar role de admin
  IF NEW.email = 'conectawebapps@outlook.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger que executa após inserção de usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Atualizar políticas existentes para usar o sistema de roles
DROP POLICY IF EXISTS "Admin can manage coupons" ON public.discount_coupons;
CREATE POLICY "Admin can manage coupons" ON public.discount_coupons
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin can manage affiliate codes" ON public.affiliate_codes;
CREATE POLICY "Admin can manage affiliate codes" ON public.affiliate_codes
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin can insert packs" ON public.packs;
DROP POLICY IF EXISTS "Admin can update packs" ON public.packs;
DROP POLICY IF EXISTS "Admin can delete packs" ON public.packs;

CREATE POLICY "Admin can insert packs" ON public.packs
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update packs" ON public.packs
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete packs" ON public.packs
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Atualizar políticas de administração que usavam email hardcoded
DROP POLICY IF EXISTS "Admins can update refund requests" ON public.refund_requests;
DROP POLICY IF EXISTS "Admins can view all refund requests" ON public.refund_requests;
DROP POLICY IF EXISTS "Admins can manage all pack access" ON public.user_pack_access;
DROP POLICY IF EXISTS "Admin can view all coupon usage" ON public.coupon_usage;

CREATE POLICY "Admins can update refund requests" ON public.refund_requests
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all refund requests" ON public.refund_requests
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all pack access" ON public.user_pack_access
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can view all coupon usage" ON public.coupon_usage
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
