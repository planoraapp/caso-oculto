
-- Primeiro, vamos garantir que a conta conectawebapps@outlook.com seja admin
-- Atualizar a função handle_new_user para incluir ambos os emails admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
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
  
  -- Se for email admin, adicionar role de admin
  IF NEW.email IN ('conectawebapps@outlook.com', 'applanonora@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Caso a conta conectawebapps@outlook.com já exista, garantir que tenha role admin
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Buscar o user_id da conta conectawebapps@outlook.com
    SELECT au.id INTO admin_user_id 
    FROM auth.users au 
    WHERE au.email = 'conectawebapps@outlook.com';
    
    -- Se encontrou o usuário, garantir que tenha role admin
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        
        -- Garantir que também existe no profiles
        INSERT INTO public.profiles (id, email, name)
        VALUES (admin_user_id, 'conectawebapps@outlook.com', 'Admin')
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- Adicionar campo external_reference na tabela payment_sessions se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payment_sessions' 
        AND column_name = 'external_reference'
    ) THEN
        ALTER TABLE public.payment_sessions 
        ADD COLUMN external_reference TEXT;
    END IF;
END $$;
