-- Deletar usuários específicos
DELETE FROM public.profiles WHERE id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM public.user_roles WHERE user_id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM public.user_pack_access WHERE user_id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM public.compras WHERE user_id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM public.payment_sessions WHERE user_id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM public.refund_requests WHERE user_id IN (
    SELECT id FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br')
);

DELETE FROM auth.users WHERE email IN ('cieslakroque@gmail.com', 'contato@zurbo.com.br');