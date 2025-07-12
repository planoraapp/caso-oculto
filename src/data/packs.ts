

import { Pack } from './types';
import { getPackCases } from './cases';

export const packs: Pack[] = [
  {
    id: 'sussurros-do-alem',
    name: 'Sussurros do Além',
    description: 'Mistérios com um toque sobrenatural, onde a solução pode ser um fenómeno paranormal ou uma explicação racional que imita o inexplicável.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/sussurros-do-alem.webp',
    category: 'thriller'
  },
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam sob o manto da escuridão, onde cada sombra esconde um segredo.',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/sombras-da-noite.webp',
    category: 'thriller'
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Planos que deram terrivelmente errado. Encontre o detalhe que desmascarou o culpado.',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/crimes-imperfeitos.webp',
    category: 'crime'
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Mistérios baseados em mitos e histórias urbanas famosas.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/lendas-urbanas.webp',
    category: 'thriller'
  },
  {
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Mistérios que desafiam a lógica e parecem impossíveis.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/paradoxos-mortais.webp',
    category: 'mystery'
  },
  {
    id: 'labirintos-mentais',
    name: 'Labirintos Mentais',
    description: 'Enigmas psicológicos complexos que testam sua capacidade de raciocínio',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/labirintos-mentais.webp',
    category: 'mystery'
  },
  {
    id: 'jogos-corporativos',
    name: 'Jogos Corporativos',
    description: 'Mistérios e conspirações no mundo dos negócios',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/jogos-corporativos.webp',
    category: 'conspiracy'
  },
  {
    id: 'ironias-do-destino',
    name: 'Ironias do Destino',
    description: 'Reviravoltas irônicas que mudam completamente o rumo dos casos',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/ironias-do-destino.webp',
    category: 'mystery'
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco sem Saída',
    description: 'Casos aparentemente impossíveis de resolver, mas sempre há uma saída',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/beco-sem-saida.webp',
    category: 'mystery'
  },
  {
    id: 'crimes-de-epoca',
    name: 'Crimes de Época',
    description: 'Mistérios ambientados em diferentes períodos históricos',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/crimes-de-epoca.webp',
    category: 'historical'
  },
  {
    id: 'viagem-sem-volta',
    name: 'Viagem sem Volta',
    description: 'Mistérios que envolvem desaparecimentos e jornadas fatais',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/viagem-sem-volta.webp',
    category: 'mystery'
  },
  {
    id: 'dossie-confidencial',
    name: 'Dossiê Confidencial',
    description: 'Segredos de estado e espionagem internacional',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/dossie-confidencial.webp',
    category: 'conspiracy'
  },
  {
    id: 'dose-letal',
    name: 'Dose Letal',
    description: 'Envenenamentos e substâncias mortais',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/dose-letal.webp',
    category: 'danger'
  },
  {
    id: 'fim-de-jogo',
    name: 'Fim de Jogo',
    description: 'Partidas fatais e jogos mortais',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/fim-de-jogo.webp',
    category: 'murder'
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'Situações bizarras que realmente aconteceram',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/absurdamente-real.webp',
    category: 'danger'
  }
];

// Function to get a pack by ID with cases included
export const getPackById = (packId: string): Pack | null => {
  const pack = packs.find(p => p.id === packId);
  if (!pack) return null;
  
  return {
    ...pack,
    cases: getPackCases(packId) || []
  };
};

