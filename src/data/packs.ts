import { Pack } from './types';
import case01Image from '@/public/packs/case-01.webp';
import case02Image from '@/public/packs/case-02.webp';
import case03Image from '@/public/packs/case-03.webp';
import case04Image from '@/public/packs/case-04.webp';
import case05Image from '@/public/packs/case-05.webp';
import case06Image from '@/public/packs/case-06.webp';
import case07Image from '@/public/packs/case-07.webp';
import labirintosMentaisImage from '@/public/packs/labirintos-mentais.webp';
import jogosCorporativosImage from '@/public/packs/jogos-corporativos.webp';
import dossieConfidencialImage from '@/public/packs/dossie-confidencial.webp';
import doseLetalImage from '@/public/packs/dose-letal.webp';
import fimDeJogoImage from '@/public/packs/fim-de-jogo.webp';
import absurdamenteRealImage from '@/public/packs/absurdamente-real.webp';

export const packs: Pack[] = [
  {
    id: 'pack-01',
    name: 'Mistérios Clássicos',
    description: 'Casos clássicos de detetive com reviravoltas inesperadas',
    price: 14.80,
    difficulty: 'medium',
    image: case01Image,
    category: 'mystery'
  },
  {
    id: 'pack-02',
    name: 'Enigmas Modernos',
    description: 'Mistérios contemporâneos que desafiam a lógica',
    price: 14.80,
    difficulty: 'medium',
    image: case02Image,
    category: 'mystery'
  },
  {
    id: 'pack-03',
    name: 'Sussurros do Além',
    description: 'Mistérios com um toque sobrenatural, onde a solução pode ser um fenómeno paranormal ou uma explicação racional que imita o inexplicável.',
    price: 14.80,
    difficulty: 'hard',
    image: case03Image,
    category: 'thriller'
  },
  {
    id: 'pack-04',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam sob o manto da escuridão, onde cada sombra esconde um segredo.',
    price: 14.80,
    difficulty: 'medium',
    image: case04Image,
    category: 'thriller'
  },
  {
    id: 'pack-05',
    name: 'Crimes Imperfeitos',
    description: 'Planos que deram terrivelmente errado. Encontre o detalhe que desmascarou o culpado.',
    price: 14.80,
    difficulty: 'medium',
    image: case05Image,
    category: 'crime'
  },
  {
    id: 'pack-06',
    name: 'Lendas Urbanas',
    description: 'Mistérios baseados em mitos e histórias urbanas famosas.',
    price: 14.80,
    difficulty: 'hard',
    image: case06Image,
    category: 'thriller'
  },
  {
    id: 'pack-07',
    name: 'Paradoxos Mortais',
    description: 'Mistérios que desafiam a lógica e parecem impossíveis.',
    price: 14.80,
    difficulty: 'hard',
    image: case07Image,
    category: 'mystery'
  },
  {
    id: 'labirintos-mentais',
    name: 'Labirintos Mentais',
    description: 'Enigmas psicológicos complexos que testam sua capacidade de raciocínio',
    price: 14.80,
    difficulty: 'hard',
    image: labirintosMentaisImage,
    category: 'mystery'
  },
  {
    id: 'jogos-corporativos',
    name: 'Jogos Corporativos',
    description: 'Mistérios e conspirações no mundo dos negócios',
    price: 14.80,
    difficulty: 'medium',
    image: jogosCorporativosImage,
    category: 'conspiracy'
  },
  {
    id: 'dossie-confidencial',
    name: 'Dossiê Confidencial',
    description: 'Segredos de estado e espionagem internacional',
    price: 14.80,
    difficulty: 'hard',
    image: dossieConfidencialImage,
    category: 'conspiracy'
  },
  {
    id: 'dose-letal',
    name: 'Dose Letal',
    description: 'Envenenamentos e substâncias mortais',
    price: 14.80,
    difficulty: 'medium',
    image: doseLetalImage,
    category: 'danger'
  },
  {
    id: 'fim-de-jogo',
    name: 'Fim de Jogo',
    description: 'Partidas fatais e jogos mortais',
    price: 14.80,
    difficulty: 'hard',
    image: fimDeJogoImage,
    category: 'murder'
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'Situações bizarras que realmente aconteceram',
    price: 14.80,
    difficulty: 'medium',
    image: absurdamenteRealImage,
    category: 'danger'
  }
];
