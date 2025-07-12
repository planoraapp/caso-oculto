-- Primeiro, limpar registros antigos de user_pack_access com IDs de packs descontinuados
DELETE FROM public.user_pack_access 
WHERE pack_id IN ('pack-01', 'pack-02', 'pack-03', 'pack-04', 'pack-05', 'pack-06', 'pack-07');

-- Remover packs descontinuados da tabela packs se existirem
DELETE FROM public.packs 
WHERE id IN ('pack-01', 'pack-02', 'pack-03', 'pack-04', 'pack-05', 'pack-06', 'pack-07');

-- Buscar o user_id do usuário roquematheus@live.com
-- Primeiro vamos adicionar um registro de compra para roquematheus@live.com
-- Assumindo que ele comprou um combo de 5 packs por R$ 0,61

-- Criar sessão de pagamento para roquematheus@live.com
INSERT INTO public.payment_sessions (
  id,
  user_id,
  payment_type,
  status,
  mercadopago_preference_id,
  stripe_session_id,
  selected_pack_ids,
  created_at,
  updated_at
) 
SELECT 
  gen_random_uuid(),
  id,
  'combo',
  'approved',
  'fake_preference_' || id,
  'fake_stripe_session_' || id,
  ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-noite'],
  '2024-01-15 10:00:00'::timestamptz,
  '2024-01-15 10:00:00'::timestamptz
FROM auth.users 
WHERE email = 'roquematheus@live.com'
AND NOT EXISTS (
  SELECT 1 FROM public.payment_sessions ps 
  WHERE ps.user_id = auth.users.id
);

-- Criar registro na tabela compras para roquematheus@live.com
INSERT INTO public.compras (
  id,
  user_id,
  valor_original,
  valor_pago,
  payment_type,
  selected_pack_ids,
  status,
  stripe_session_id,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  id,
  74.00, -- valor original
  0.61,  -- valor pago com desconto
  'combo',
  ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-noite'],
  'approved',
  'fake_stripe_session_' || id,
  '2024-01-15 10:00:00'::timestamptz,
  '2024-01-15 10:00:00'::timestamptz
FROM auth.users 
WHERE email = 'roquematheus@live.com'
AND NOT EXISTS (
  SELECT 1 FROM public.compras c 
  WHERE c.user_id = auth.users.id
);

-- Liberar acesso aos 5 packs para roquematheus@live.com
INSERT INTO public.user_pack_access (
  id,
  user_id,
  pack_id,
  is_active,
  granted_at,
  granted_by
)
SELECT 
  gen_random_uuid(),
  u.id,
  pack_id,
  true,
  '2024-01-15 10:00:00'::timestamptz,
  u.id
FROM auth.users u,
UNNEST(ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-noite']) AS pack_id
WHERE u.email = 'roquematheus@live.com'
AND NOT EXISTS (
  SELECT 1 FROM public.user_pack_access upa 
  WHERE upa.user_id = u.id AND upa.pack_id = pack_id
);