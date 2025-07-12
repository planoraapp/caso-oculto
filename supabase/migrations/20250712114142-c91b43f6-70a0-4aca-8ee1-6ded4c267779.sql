-- Corrigir dados da conta appplanora@gmail.com para Acesso Total
-- 1. Atualizar perfil para acesso total
UPDATE public.profiles 
SET acesso_total = true, 
    updated_at = now()
WHERE email = 'appplanora@gmail.com';

-- 2. Marcar uma das sessões de pagamento como aprovada
UPDATE public.payment_sessions 
SET status = 'approved', 
    updated_at = now()
WHERE user_id = (SELECT id FROM public.profiles WHERE email = 'appplanora@gmail.com')
AND payment_type = 'complete'
AND status = 'pending'
ORDER BY created_at DESC 
LIMIT 1;

-- 3. Criar registro na tabela compras para o acesso total
INSERT INTO public.compras (
    user_id, 
    stripe_session_id, 
    payment_type, 
    valor_original, 
    valor_pago, 
    status, 
    cupom_codigo,
    created_at,
    updated_at
)
SELECT 
    p.id,
    ps.stripe_session_id,
    'complete',
    110.90,
    1.11, -- Valor pago com cupom VALEU
    'approved',
    'VALEU',
    now(),
    now()
FROM public.profiles p
LEFT JOIN public.payment_sessions ps ON ps.user_id = p.id 
WHERE p.email = 'appplanora@gmail.com'
AND ps.payment_type = 'complete'
AND ps.status = 'approved'
LIMIT 1;

-- 4. Adicionar acesso a todos os 15 packs disponíveis
INSERT INTO public.user_pack_access (user_id, pack_id, is_active, granted_at, granted_by)
SELECT 
    p.id,
    pack_ids.pack_id,
    true,
    now(),
    p.id
FROM public.profiles p
CROSS JOIN (
    VALUES 
    ('labirintos-mentais'),
    ('crimes-imperfeitos'),
    ('lendas-urbanas'),
    ('paradoxos-mortais'),
    ('sombras-da-noite'),
    ('sussurros-alem'),
    ('viagem-sem-volta'),
    ('ironias-destino'),
    ('jogos-corporativos'),
    ('beco-sem-saida'),
    ('crimes-epoca'),
    ('fim-de-jogo'),
    ('dossie-confidencial'),
    ('dose-letal'),
    ('absurdamente-real')
) AS pack_ids(pack_id)
WHERE p.email = 'appplanora@gmail.com'
ON CONFLICT (user_id, pack_id) DO UPDATE SET
    is_active = true,
    granted_at = now();