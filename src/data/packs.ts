

import { Pack } from './types';
import { getPackCases } from './cases';

export const packs: Pack[] = [
  {
    id: 'pack-01',
    name: 'Mistérios Clássicos',
    description: 'Casos clássicos de detetive com reviravoltas inesperadas',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/case-01.webp',
    category: 'mystery'
  },
  {
    id: 'pack-02',
    name: 'Enigmas Modernos',
    description: 'Mistérios contemporâneos que desafiam a lógica',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/case-02.webp',
    category: 'mystery'
  },
  {
    id: 'pack-03',
    name: 'Sussurros do Além',
    description: 'Mistérios com um toque sobrenatural, onde a solução pode ser um fenómeno paranormal ou uma explicação racional que imita o inexplicável.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/case-03.webp',
    category: 'thriller'
  },
  {
    id: 'pack-04',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam sob o manto da escuridão, onde cada sombra esconde um segredo.',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/case-04.webp',
    category: 'thriller'
  },
  {
    id: 'pack-05',
    name: 'Crimes Imperfeitos',
    description: 'Planos que deram terrivelmente errado. Encontre o detalhe que desmascarou o culpado.',
    price: 14.80,
    difficulty: 'medium',
    image: '/packs/case-05.webp',
    category: 'crime'
  },
  {
    id: 'pack-06',
    name: 'Lendas Urbanas',
    description: 'Mistérios baseados em mitos e histórias urbanas famosas.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/case-06.webp',
    category: 'thriller'
  },
  {
    id: 'pack-07',
    name: 'Paradoxos Mortais',
    description: 'Mistérios que desafiam a lógica e parecem impossíveis.',
    price: 14.80,
    difficulty: 'hard',
    image: '/packs/case-07.webp',
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

