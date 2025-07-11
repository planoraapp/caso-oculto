import { StaticImageData } from 'next/image';

import case01Image from '../assets/cases/case-01.png';
import case02Image from '../assets/cases/case-02.png';
import case03Image from '../assets/cases/case-03.png';
import case04Image from '../assets/cases/case-04.png';

// Case Images
import case1 from '../assets/cases/cards/case-1.png';
import case2 from '../assets/cases/cards/case-2.png';
import case3 from '../assets/cases/cards/case-3.png';
import case4 from '../assets/cases/cards/case-4.png';
import case5 from '../assets/cases/cards/case-5.png';
import case6 from '../assets/cases/cards/case-6.png';
import case7 from '../assets/cases/cards/case-7.png';
import case8 from '../assets/cases/cards/case-8.png';
import case9 from '../assets/cases/cards/case-9.png';
import case10 from '../assets/cases/cards/case-10.png';
import case11 from '../assets/cases/cards/case-11.png';
import case12 from '../assets/cases/cards/case-12.png';
import case13 from '../assets/cases/cards/case-13.png';
import case14 from '../assets/cases/cards/case-14.png';
import case15 from '../assets/cases/cards/case-15.png';
import case16 from '../assets/cases/cards/case-16.png';
import case17 from '../assets/cases/cards/case-17.png';
import case18 from '../assets/cases/cards/case-18.png';
import case19 from '../assets/cases/cards/case-19.png';
import case20 from '../assets/cases/cards/case-20.png';
import case21 from '../assets/cases/cards/case-21.png';
import case22 from '../assets/cases/cards/case-22.png';
import case23 from '../assets/cases/cards/case-23.png';
import case24 from '../assets/cases/cards/case-24.png';
import case25 from '../assets/cases/cards/case-25.png';
import case26 from '../assets/cases/cards/case-26.png';
import case27 from '../assets/cases/cards/case-27.png';
import case28 from '../assets/cases/cards/case-28.png';
import case29 from '../assets/cases/cards/case-29.png';
import case30 from '../assets/cases/cards/case-30.png';
import case31 from '../assets/cases/cards/case-31.png';
import case32 from '../assets/cases/cards/case-32.png';
import case33 from '../assets/cases/cards/case-33.png';
import case34 from '../assets/cases/cards/case-34.png';
import case35 from '../assets/cases/cards/case-35.png';
import case36 from '../assets/cases/cards/case-36.png';
import case37 from '../assets/cases/cards/case-37.png';
import case38 from '../assets/cases/cards/case-38.png';
import case39 from '../assets/cases/cards/case-39.png';
import case40 from '../assets/cases/cards/case-40.png';
import case41 from '../assets/cases/cards/case-41.png';
import case42 from '../assets/cases/cards/case-42.png';
import case43 from '../assets/cases/cards/case-43.png';
import case44 from '../assets/cases/cards/case-44.png';
import case45 from '../assets/cases/cards/case-45.png';
import case46 from '../assets/cases/cards/case-46.png';
import case47 from '../assets/cases/cards/case-47.png';
import case48 from '../assets/cases/cards/case-48.png';
import case49 from '../assets/cases/cards/case-49.png';
import case50 from '../assets/cases/cards/case-50.png';
import case51 from '../assets/cases/cards/case-51.png';
import case52 from '../assets/cases/cards/case-52.png';
import case53 from '../assets/cases/cards/case-53.png';
import case54 from '../assets/cases/cards/case-54.png';
import case55 from '../assets/cases/cards/case-55.png';
import case56 from '../assets/cases/cards/case-56.png';
import case57 from '../assets/cases/cards/case-57.png';
import case58 from '../assets/cases/cards/case-58.png';
import case59 from '../assets/cases/cards/case-59.png';
import case60 from '../assets/cases/cards/case-60.png';
import case61 from '../assets/cases/cards/case-61.png';
import case62 from '../assets/cases/cards/case-62.png';
import case63 from '../assets/cases/cards/case-63.png';
import case64 from '../assets/cases/cards/case-64.png';
import case65 from '../assets/cases/cards/case-65.png';
import case66 from '../assets/cases/cards/case-66.png';
import case67 from '../assets/cases/cards/case-67.png';
import case68 from '../assets/cases/cards/case-68.png';
import case69 from '../assets/cases/cards/case-69.png';
import case70 from '../assets/cases/cards/case-70.png';
import case71 from '../assets/cases/cards/case-71.png';
import case72 from '../assets/cases/cards/case-72.png';
import case73 from '../assets/cases/cards/case-73.png';
import case74 from '../assets/cases/cards/case-74.png';
import case75 from '../assets/cases/cards/case-75.png';
import case76 from '../assets/cases/cards/case-76.png';
import case77 from '../assets/cases/cards/case-77.png';
import case78 from '../assets/cases/cards/case-78.png';
import case79 from '../assets/cases/cards/case-79.png';
import case80 from '../assets/cases/cards/case-80.png';
import case81 from '../assets/cases/cards/case-81.png';
import case82 from '../assets/cases/cards/case-82.png';
import case83 from '../assets/cases/cards/case-83.png';
import case84 from '../assets/cases/cards/case-84.png';
import case85 from '../assets/cases/cards/case-85.png';
import case86 from '../assets/cases/cards/case-86.png';
import case87 from '../assets/cases/cards/case-87.png';
import case88 from '../assets/cases/cards/case-88.png';
import case89 from '../assets/cases/cards/case-89.png';
import case90 from '../assets/cases/cards/case-90.png';

export interface Pack {
  id: string;
  name: string;
  description: string;
  image: StaticImageData;
  price: number;
  cases: StaticImageData[];
}

export const packs: Pack[] = [
  {
    id: 'pack-01',
    name: 'Cold Case #01',
    description:
      'Um crime esquecido, uma cidade silenciosa e segredos que nunca foram revelados. Desvende a verdade por trás do caso.',
    image: case01Image,
    price: 19.9,
    cases: [
      case1,
      case2,
      case3,
      case4,
      case5,
      case6,
      case7,
      case8,
      case9,
      case10,
      case11,
      case12,
      case13,
      case14,
      case15,
      case16,
      case17,
      case18,
      case19,
      case20,
      case21,
      case22,
      case23,
      case24,
      case25,
      case26,
      case27,
      case28,
      case29,
      case30,
    ],
  },
  {
    id: 'pack-02',
    name: 'Cold Case #02',
    description:
      'Em uma noite escura, um desaparecimento misterioso abala a cidade. Siga as pistas e revele o que aconteceu naquela noite fatídica.',
    image: case02Image,
    price: 19.9,
    cases: [
      case31,
      case32,
      case33,
      case34,
      case35,
      case36,
      case37,
      case38,
      case39,
      case40,
      case41,
      case42,
      case43,
      case44,
      case45,
      case46,
      case47,
      case48,
      case49,
      case50,
      case51,
      case52,
      case53,
      case54,
      case55,
      case56,
      case57,
      case58,
      case59,
      case60,
    ],
  },
  {
    id: 'pack-03',
    name: 'Cold Case #03',
    description:
      'Um segredo sombrio enterrado sob a cidade está prestes a ser desenterrado. Você será capaz de juntar as peças antes que seja tarde demais?',
    image: case03Image,
    price: 19.9,
    cases: [
      case61,
      case62,
      case63,
      case64,
      case65,
      case66,
      case67,
      case68,
      case69,
      case70,
      case71,
      case72,
      case73,
      case74,
      case75,
      case76,
      case77,
      case78,
      case79,
      case80,
      case81,
      case82,
      case83,
      case84,
      case85,
      case86,
      case87,
      case88,
      case89,
      case90,
    ],
  },
  {
    id: 'pack-04',
    name: 'Cold Case #04',
    description:
      'O passado retorna para assombrar o presente em uma teia de mistérios e enganos. Descubra a verdade antes que ela o consuma.',
    image: case04Image,
    price: 19.9,
    cases: [],
  },
];

// Helper function to get user packs from Supabase
export const getUserPacks = (userId: string): string[] => {
  // This will be replaced with actual Supabase query in the Library component
  // For now, return empty array as this will be handled by the component
  return [];
};

// Helper function to get pack by ID
export const getPackById = (packId: string) => {
  return packs.find(pack => pack.id === packId);
};
