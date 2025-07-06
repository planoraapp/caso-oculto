
-- Create a table for pack management
CREATE TABLE public.packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 14.80,
  difficulty TEXT NOT NULL DEFAULT 'medium',
  image TEXT,
  category TEXT NOT NULL DEFAULT 'mystery',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access only
CREATE POLICY "Allow admin to select packs" ON public.packs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin to insert packs" ON public.packs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin to update packs" ON public.packs
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow admin to delete packs" ON public.packs
  FOR DELETE
  USING (true);

-- Insert existing packs data
INSERT INTO public.packs (id, name, description, price, difficulty, image, category) VALUES
('labirintos-mentais', 'Labirintos Mentais', 'Mergulhe nos enigmas da mente humana e desvende mistérios psicológicos complexos.', 14.80, 'medium', '/lovable-uploads/af996bb5-0bb4-4d14-9a21-4c7a1cc9bcf7.png', 'psychological'),
('beco-sem-saida', 'Beco sem Saída', 'Explore os cantos mais escuros da cidade onde os crimes mais terríveis acontecem.', 14.80, 'hard', '/lovable-uploads/634e666b-9558-4557-8ee2-37c18130c9c5.png', 'thriller'),
('jogos-corporativos', 'Jogos Corporativos', 'Desvende os mistérios por trás de crimes empresariais e conflitos corporativos.', 14.80, 'medium', '/lovable-uploads/494fd0cb-99c2-48cb-bd87-1b63007c684a.png', 'corporate'),
('crimes-de-epoca', 'Crimes de Época', 'Volte ao passado e resolva crimes clássicos no estilo dos grandes detetives.', 14.80, 'medium', '/lovable-uploads/4db6c6f5-3e02-4242-8bf1-74c6dbebd08c.png', 'classic'),
('crimes-imperfeitos', 'Crimes Imperfeitos', 'Investigue crimes que acontecem nas noites chuvosas da cidade.', 14.80, 'hard', '/lovable-uploads/2a601ddc-13da-4a0a-8dce-983968670ebc.png', 'atmospheric'),
('dose-letal', 'Dose Letal', 'Desvende casos envolvendo substâncias tóxicas e crimes químicos.', 14.80, 'hard', '/lovable-uploads/9f3c7c39-613b-46d9-a2bc-e7b1091d0a41.png', 'forensic'),
('dossie-confidencial', 'Dossiê Confidencial', 'Acesse arquivos confidenciais e desvende conspirações governamentais.', 14.80, 'hard', '/lovable-uploads/94e47921-ddae-490b-9625-a18c64c3e4c7.png', 'conspiracy'),
('fim-de-jogo', 'Fim de Jogo', 'Crimes estratégicos que exigem raciocínio lógico como uma partida de xadrez.', 14.80, 'hard', '/lovable-uploads/04b458ab-f733-4133-8907-18c2d01f7f71.png', 'strategic'),
('ironias-do-destino', 'Ironias do Destino', 'Fragmente os mistérios e reconstrua a verdade através dos cacos da evidência.', 14.80, 'medium', '/lovable-uploads/f3128054-35d3-474f-be84-575857ba985a.png', 'evidence'),
('paxarodos-mortais', 'Paxarodos Mortais', 'Mistérios sombrios em cenários urbanos cheios de perigos e segredos.', 14.80, 'hard', '/lovable-uploads/34c251ba-c4c2-4172-bfb8-70d72411b3b0.png', 'urban'),
('absurdamente-real', 'Absurdamente Real', 'Casos que desafiam a lógica e parecem impossíveis, mas têm explicações surpreendentes.', 14.80, 'hard', '/lovable-uploads/ce660aa4-1ed1-4019-bef2-65d5dd86c0e6.png', 'surreal'),
('lendas-urbanas', 'Lendas Urbanas', 'Explore mitos e lendas urbanas que se revelam mais reais do que imagina.', 14.80, 'medium', '/lovable-uploads/42e039ab-0b70-4f72-a06e-b9c5bf02fe46.png', 'folklore'),
('viagem-sem-volta', 'Viagem sem Volta', 'Jornadas perigosas onde nem todos chegam ao destino final.', 14.80, 'hard', '/lovable-uploads/42e039ab-0b70-4f72-a06e-b9c5bf02fe46.png', 'journey'),
('sombras-da-noite', 'Sombras da Noite', 'Mistérios que só se revelam quando a escuridão toma conta da cidade.', 14.80, 'hard', '/lovable-uploads/34c251ba-c4c2-4172-bfb8-70d72411b3b0.png', 'nocturnal'),
('sussurros-do-alem', 'Sussurros do Além', 'Vozes do passado que trazem segredos enterrados há muito tempo.', 14.80, 'medium', '/lovable-uploads/ce660aa4-1ed1-4019-bef2-65d5dd86c0e6.png', 'supernatural');
