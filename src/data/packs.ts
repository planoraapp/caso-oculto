import { StaticImageData } from 'next/image';

// Define the Pack interface
export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree: boolean;
  coverUrl: string;
  category: 'individual' | 'combo' | 'complete';
  cards: Card[];
}

// Define the Card interface
export interface Card {
  id: string;
  order: number;
  mystery: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFree: boolean;
  packId: string;
}

export const MERCADOPAGO_LINKS = {
  individual: "184163814-ebfc1885-acbb-4a9f-89d9-481e569b15b6",
  combo: "184163814-186d6326-c239-4676-b240-fac644c29f0e",
  complete: "184163814-b6e81aba-f60e-4256-8a73-2658243e4259"
};

// Mock data for packs
export const packs: Pack[] = [
  {
    id: 'pack1',
    name: 'Mistério na Mansão Tudor',
    description: 'Um assassinato chocante abala a família Tudor. Descubra o culpado antes que ele escape!',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack1_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card1',
        order: 1,
        mystery: 'O corpo de Lorde Tudor é encontrado em seu escritório. Quem teria motivos para matá-lo?',
        solution: 'A governanta, enciumada por ter sido dispensada por Lorde Tudor.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack1',
      },
      {
        id: 'card2',
        order: 2,
        mystery: 'A arma do crime desapareceu. Onde ela está escondida?',
        solution: 'Escondida no jardim, enterrada sob a roseira favorita de Lady Tudor.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card3',
        order: 3,
        mystery: 'Uma carta de amor comprometedora é encontrada. Quem a escreveu e para quem?',
        solution: 'A carta foi escrita pela filha de Lorde Tudor para um artista local.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card4',
        order: 4,
        mystery: 'Testemunhas afirmam ter visto um vulto na noite do crime. Quem era?',
        solution: 'Era o jardineiro, que estava tendo um caso secreto com a cozinheira.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card5',
        order: 5,
        mystery: 'Um testamento recém-descoberto revela segredos obscuros. O que ele diz?',
        solution: 'O testamento deserdava Lady Tudor, deixando toda a fortuna para uma amante desconhecida.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack1',
      },
    ],
  },
  {
    id: 'pack2',
    name: 'O Enigma do Expresso Oriente',
    description: 'Uma viagem luxuosa se transforma em pesadelo quando um passageiro é encontrado morto em sua cabine.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack2_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card6',
        order: 1,
        mystery: 'A vítima era um famoso detetive. Quem o queria morto?',
        solution: 'Um criminoso que ele havia prendido anos atrás e que buscava vingança.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack2',
      },
      {
        id: 'card7',
        order: 2,
        mystery: 'A cabine estava trancada por dentro. Como o assassino conseguiu entrar?',
        solution: 'Ele se escondeu no compartimento de bagagem acima da cabine.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card8',
        order: 3,
        mystery: 'Um bilhete misterioso é encontrado no bolso da vítima. O que ele diz?',
        solution: 'O bilhete continha um aviso sobre uma conspiração a bordo do trem.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card9',
        order: 4,
        mystery: 'Testemunhas relatam ter visto um passageiro suspeito rondando a cabine. Quem era?',
        solution: 'Era um espião estrangeiro disfarçado de diplomata.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card10',
        order: 5,
        mystery: 'Um objeto valioso desapareceu da cabine. O que era e quem o roubou?',
        solution: 'Um colar de diamantes roubado por uma ladra profissional que viajava disfarçada.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack2',
      },
    ],
  },
  {
    id: 'pack3',
    name: 'O Segredo da Ilha Deserta',
    description: 'Um grupo de amigos em férias se vê preso em uma ilha com um passado sombrio e um assassino à solta.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack3_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card11',
        order: 1,
        mystery: 'O primeiro corpo é encontrado na praia. Quem era a vítima?',
        solution: 'Era o guia local, que conhecia os segredos da ilha.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack3',
      },
      {
        id: 'card12',
        order: 2,
        mystery: 'Um mapa antigo revela a localização de um tesouro escondido. O que ele guarda?',
        solution: 'O tesouro era amaldiçoado e atraía a ganância e a morte.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card13',
        order: 3,
        mystery: 'Um diário perdido conta a história de um naufrágio. O que aconteceu com os sobreviventes?',
        solution: 'Os sobreviventes se mataram por causa de disputas pelo tesouro.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card14',
        order: 4,
        mystery: 'Testemunhas afirmam ter visto um fantasma vagando pela ilha. Quem é?',
        solution: 'Era o espírito de um pirata que protegia o tesouro.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card15',
        order: 5,
        mystery: 'Um ritual macabro é realizado na noite do crime. Qual o seu propósito?',
        solution: 'O ritual visava invocar o espírito do pirata para proteger o tesouro.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack3',
      },
    ],
  },
  {
    id: 'pack4',
    name: 'O Caso da Herança Roubada',
    description: 'Uma família rica se envolve em uma disputa acirrada por uma herança valiosa, e um crime é cometido.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack4_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card16',
        order: 1,
        mystery: 'O patriarca da família é encontrado morto em sua mansão. Quem o matou?',
        solution: 'O filho mais velho, endividado e desesperado por dinheiro.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack4',
      },
      {
        id: 'card17',
        order: 2,
        mystery: 'Um cofre secreto é descoberto com documentos comprometedores. O que eles revelam?',
        solution: 'Os documentos provavam que o patriarca havia desviado dinheiro da empresa da família.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card18',
        order: 3,
        mystery: 'Um álibi falso é apresentado por um dos suspeitos. Quem está mentindo?',
        solution: 'A esposa do patriarca, que estava tendo um caso com o advogado da família.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card19',
        order: 4,
        mystery: 'Testemunhas afirmam ter visto um estranho rondando a propriedade. Quem era?',
        solution: 'Era um investigador particular contratado para descobrir os segredos da família.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card20',
        order: 5,
        mystery: 'Uma joia valiosa desapareceu da cena do crime. O que era e quem a roubou?',
        solution: 'Um colar de diamantes roubado pela filha mais nova, que planejava fugir com o namorado.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack4',
      },
    ],
  },
  {
    id: 'pack5',
    name: 'O Mistério do Circo Abandonado',
    description: 'Um grupo de jovens aventureiros explora um circo abandonado e se depara com um crime inexplicável.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack5_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card21',
        order: 1,
        mystery: 'O corpo de um palhaço é encontrado na tenda principal. Quem o matou?',
        solution: 'O domador de leões, que era obcecado pela trapezista e culpava o palhaço por seu fracasso.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack5',
      },
      {
        id: 'card22',
        order: 2,
        mystery: 'Um espelho mágico revela mensagens sinistras. O que elas dizem?',
        solution: 'As mensagens eram ameaças de vingança escritas pelo fantasma de um antigo artista.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card23',
        order: 3,
        mystery: 'Um truque de mágica dá errado e um dos jovens desaparece. Onde ele está?',
        solution: 'Ele foi sequestrado pelo dono do circo, que o usaria em um novo show macabro.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card24',
        order: 4,
        mystery: 'Testemunhas afirmam ter visto animais selvagens soltos no circo. O que aconteceu?',
        solution: 'Os animais foram libertados por um grupo de ativistas que protestavam contra o circo.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card25',
        order: 5,
        mystery: 'Um bilhete premiado da loteria é encontrado no camarim do palhaço. Quem o comprou?',
        solution: 'O bilhete foi comprado pela trapezista, que planejava fugir com o palhaço e o dinheiro.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack5',
      },
    ],
  },
  {
    id: 'combo5packs',
    name: 'Combo 5 Packs',
    description: 'Escolha 5 packs e economize 20%',
    price: 61.40,
    isFree: false,
    coverUrl: '/lovable-uploads/combo_cover.png',
    category: 'combo',
    cards: [],
  },
  {
    id: 'completeaccess',
    name: 'Acesso Total',
    description: 'Desbloqueie todos os packs e tenha acesso a conteúdo exclusivo!',
    price: 110.90,
    isFree: false,
    coverUrl: '/lovable-uploads/complete_cover.png',
    category: 'complete',
    cards: [],
  },
];

// Function to purchase a pack
export const purchasePack = (userId: string, packId: string, price: number, transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  if (!purchases[userId]) {
    purchases[userId] = [];
  }
  
  const purchase = {
    packId,
    price,
    transactionId,
    date: new Date().toISOString(),
    type: 'individual'
  };
  
  purchases[userId].push(purchase);
  localStorage.setItem('userPurchases', JSON.stringify(purchases));
};

// Function to purchase combo packs
export const purchaseCombo = (userId: string, selectedPackIds: string[], transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  if (!purchases[userId]) {
    purchases[userId] = [];
  }
  
  const comboPurchase = {
    packIds: selectedPackIds,
    price: 61.40,
    transactionId,
    date: new Date().toISOString(),
    type: 'combo'
  };
  
  purchases[userId].push(comboPurchase);
  localStorage.setItem('userPurchases', JSON.stringify(purchases));
};

// Function to get user's combo purchases
export const getUserComboPurchases = (userId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  return purchases[userId]?.filter(p => p.type === 'combo') || [];
};

// Updated getUserPacks function to include combo purchases
export const getUserPacks = (userId: string): string[] => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  const userPurchases = purchases[userId] || [];
  
  let ownedPacks: string[] = [];
  
  userPurchases.forEach(purchase => {
    if (purchase.type === 'individual' && purchase.packId) {
      ownedPacks.push(purchase.packId);
    } else if (purchase.type === 'combo' && purchase.packIds) {
      ownedPacks = [...ownedPacks, ...purchase.packIds];
    } else if (purchase.type === 'complete') {
      // If user has complete access, return all pack IDs
      ownedPacks = packs.filter(p => !['combo', 'complete'].includes(p.category)).map(p => p.id);
    }
  });
  
  return [...new Set(ownedPacks)]; // Remove duplicates
};
