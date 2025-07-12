-- Atualizar os pack IDs do usuário roquematheus@live.com para usar os IDs corretos
-- Primeiro remover os registros antigos com IDs incorretos
DELETE FROM public.user_pack_access 
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'roquematheus@live.com')
AND pack_id IN ('labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-noite');

-- Agora inserir com os IDs corretos (com hífens)
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
UNNEST(ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-da-noite']) AS pack_id
WHERE u.email = 'roquematheus@live.com'
AND NOT EXISTS (
  SELECT 1 FROM public.user_pack_access upa 
  WHERE upa.user_id = u.id AND upa.pack_id = pack_id
);

-- Atualizar também as sessões de pagamento e compras com os IDs corretos
UPDATE public.payment_sessions 
SET selected_pack_ids = ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-da-noite']
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'roquematheus@live.com');

UPDATE public.compras 
SET selected_pack_ids = ARRAY['labirintos-mentais', 'crimes-imperfeitos', 'lendas-urbanas', 'paradoxos-mortais', 'sombras-da-noite']
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'roquematheus@live.com');