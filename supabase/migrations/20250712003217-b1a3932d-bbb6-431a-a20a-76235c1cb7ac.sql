
-- Primeiro, vamos limpar dados inconsistentes e criar os packs que faltam
-- Verificar quais pack_ids existem em user_pack_access mas não em packs
-- Baseado na análise, vamos criar os packs faltantes com dados padrão

-- Inserir pack-03 que está sendo referenciado mas não existe
INSERT INTO public.packs (id, name, description, price, difficulty, category, image)
VALUES (
  'pack-03',
  'Pack Misterioso 03',
  'Um pack especial com casos intrigantes e desafiadores.',
  14.80,
  'medium',
  'mystery',
  '/images/covers/amostra.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Limpar registros órfãos em user_pack_access que não têm packs correspondentes
DELETE FROM public.user_pack_access 
WHERE pack_id NOT IN (SELECT id FROM public.packs);

-- Atualizar registros com IDs de packs válidos se necessário
-- Substituir referências antigas por packs reais existentes
UPDATE public.user_pack_access 
SET pack_id = 'labirintos-mentais'
WHERE pack_id = 'pack-invalid-01' AND EXISTS (SELECT 1 FROM public.packs WHERE id = 'labirintos-mentais');

UPDATE public.user_pack_access 
SET pack_id = 'sombras-da-noite' 
WHERE pack_id = 'pack-invalid-02' AND EXISTS (SELECT 1 FROM public.packs WHERE id = 'sombras-da-noite');
