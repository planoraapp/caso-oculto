
-- Remove packs that don't have 20 specific cases implemented
DELETE FROM public.packs WHERE id NOT IN (
  'labirintos-mentais',
  'beco-sem-saida', 
  'jogos-corporativos',
  'crimes-de-epoca',
  'crimes-imperfeitos',
  'dose-letal',
  'dossie-confidencial',
  'fim-de-jogo',
  'lendas-urbanas',
  'sombras-da-noite',
  'sussurros-do-alem',
  'absurdamente-real',
  'paxarodos-mortais',
  'viagem-sem-volta',
  'ironias-do-destino'
);

-- Fix the ID inconsistency for Paradoxos Mortais
UPDATE public.packs 
SET id = 'paradoxos-mortais' 
WHERE id = 'paxarodos-mortais';

-- Update the pack information for the ones we're completing
UPDATE public.packs 
SET name = 'Ironias do Destino',
    description = 'Mortes e acidentes causados por coincidências trágicas e reviravoltas irônicas.'
WHERE id = 'ironias-do-destino';

UPDATE public.packs 
SET name = 'Beco sem Saída',
    description = 'Explore os cantos mais escuros da cidade onde os crimes mais terríveis acontecem.'
WHERE id = 'beco-sem-saida';

UPDATE public.packs 
SET name = 'Crimes de Época',
    description = 'Mistérios ambientados em períodos históricos, onde a tecnologia era limitada e a astúcia era tudo.'
WHERE id = 'crimes-de-epoca';

UPDATE public.packs 
SET name = 'Viagem Sem Volta',
    description = 'Crimes que ocorrem em locais isolados e em trânsito.'
WHERE id = 'viagem-sem-volta';
