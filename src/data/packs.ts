export interface Card {
  id: string;
  mystery: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  coverUrl: string;
  isFree: boolean;
  category: string;
  cards: Card[];
  mercadoPagoId: string;
}

export interface Purchase {
  id: string;
  userId: string;
  packId: string;
  purchased_at: string;
  price_paid: number;
  packName?: string;
  mercadoPagoTransactionId?: string;
}

// Links de checkout do Mercado Pago
export const MERCADOPAGO_LINKS = {
  individual: "184163814-ebfc1885-acbb-4a9f-89d9-481e569b15b6",
  combo: "184163814-186d6326-c239-4676-b240-fac644c29f0e",
  complete: "184163814-b6e81aba-f60e-4256-8a73-2658243e4259"
};

export const packs: Pack[] = [
  {
    id: 'sombras-da-noite-002',
    name: 'Sombras da Noite',
    description: 'A escuridão esconde mais do que apenas o medo. Desvende 20 mistérios que só poderiam acontecer sob o manto da noite.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1531656230934-6041139385a3?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'horror',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'sn_1',
        mystery: 'Um homem foi encontrado morto em sua casa às 3h da manhã. Todas as luzes estavam apagadas, mas havia velas acesas por toda a sala. A porta estava trancada por dentro e não havia sinais de arrombamento.',
        solution: 'O homem morreu durante um apagão. Ele acendeu as velas para se locomover, mas sofreu um ataque cardíaco. As luzes voltaram depois que ele morreu.',
        difficulty: 'medium',
        order: 1
      },
      {
        id: 'sn_2',
        mystery: 'Uma mulher acordou no meio da noite com um barulho estranho. Desceu as escadas e encontrou a porta da frente aberta e suas pegadas na lama, mas ela não se lembrava de ter saído.',
        solution: 'Ela tinha sonambulismo. Durante a noite, saiu de casa caminhando enquanto dormia e voltou sem acordar.',
        difficulty: 'easy',
        order: 2
      },
      {
        id: 'sn_3',
        mystery: 'Um vigilante noturno encontrou um carro abandonado com o motor ligado e faróis acesos. Dentro havia uma xícara de café ainda quente, mas nenhum sinal do motorista.',
        solution: 'O motorista teve uma emergência médica (derrame) e saiu confuso do carro. Foi encontrado horas depois andando desorientado nas proximidades.',
        difficulty: 'medium',
        order: 3
      },
      {
        id: 'sn_4',
        mystery: 'Moradores de um bairro relataram ver a mesma mulher de branco caminhando pela rua todas as noites às 2h. Quando se aproximavam, ela desaparecia.',
        solution: 'Era uma vizinha com Alzheimer que saía de casa todas as noites procurando por seu marido falecido. Ela usava uma camisola branca e se escondia quando via pessoas.',
        difficulty: 'hard',
        order: 4
      },
      {
        id: 'sn_5',
        mystery: 'Um homem chegou em casa e encontrou todas as janelas abertas, apesar de ter certeza de que as havia fechado. Não havia sinais de arrombamento.',
        solution: 'Sua esposa, que sofria de demência, havia aberto todas as janelas porque "sentia cheiro de gás", mas era uma alucinação causada pela doença.',
        difficulty: 'medium',
        order: 5
      }
    ]
  },
  {
    id: 'crimes-imperfeitos-003',
    name: 'Crimes Imperfeitos',
    description: 'Todo plano genial tem uma falha. Encontre o detalhe que desmascarou o culpado em 20 casos de crimes que quase deram certo.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1568219659398-01a45afe453a?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'ci_1',
        mystery: 'Um homem planejou o assassinato perfeito de sua esposa. Criou um álibi sólido, eliminou evidências e até contratou um detetive particular para "ajudar" a encontrar o assassino. Qual foi seu erro?',
        solution: 'Ele sabia detalhes da cena do crime que só o assassino poderia saber, revelando-os inadvertidamente ao detetive durante as investigações.',
        difficulty: 'hard',
        order: 1
      },
      {
        id: 'ci_2',
        mystery: 'Uma mulher fingiu seu próprio sequestro para extorquir dinheiro do marido rico. Ela se escondeu na casa de uma amiga e enviou mensagens ameaçadoras. O que a entregou?',
        solution: 'Ela esqueceu de desligar a localização no celular e as mensagens mostravam que ela estava sempre no mesmo local - a casa da amiga.',
        difficulty: 'medium',
        order: 2
      },
      {
        id: 'ci_3',
        mystery: 'Um funcionário do banco planejou um roubo interno perfeito, alterando registros e criando contas fantasmas. Trabalhou no plano por meses. Qual detalhe o traiu?',
        solution: 'Ele sempre trabalhava até tarde nos dias que fazia as transferências ilegais. Os logs de acesso ao sistema mostraram um padrão claro.',
        difficulty: 'medium',
        order: 3
      },
      {
        id: 'ci_4',
        mystery: 'Um homem matou seu sócio e encenou um acidente de carro. Destruiu o carro, alterou a cena e tinha testemunhas do seu álibi. Mas um detalhe o condenou.',
        solution: 'Ele disse à polícia que seu sócio estava dirigindo, mas as impressões digitais dele estavam no volante na posição de quem dirige, não de passageiro.',
        difficulty: 'hard',
        order: 4
      },
      {
        id: 'ci_5',
        mystery: 'Uma enfermeira matou pacientes usando insulina, fazendo parecer morte natural. Foi cuidadosa por anos. O que finalmente a expôs?',
        solution: 'Ela sempre estava de plantão quando as mortes "súbitas" aconteciam. A análise estatística revelou que as mortes só ocorriam nos seus turnos.',
        difficulty: 'hard',
        order: 5
      }
    ]
  },
  {
    id: 'lendas-urbanas-004',
    name: 'Lendas Urbanas',
    description: 'Aquelas histórias que todos juram que aconteceram com um "amigo de um amigo". 20 enigmas baseados nos contos mais famosos do folclore moderno.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1597432128929-2ef2a3d01b1b?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'urban',
    mercadoPagoId: 'lendas-urbanas-004',
    cards: []
  },
  {
    id: 'paradoxos-mortais-005',
    name: 'Paradoxos Mortais',
    description: 'Mortes que desafiam a lógica e a física. Prepare-se para 20 quebra-cabeças que vão torcer sua percepção da realidade.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1557989313-06b573584323?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'complex',
    mercadoPagoId: 'paradoxos-mortais-005',
    cards: []
  },
  {
    id: 'absurdamente-real-006',
    name: 'Absurdamente Real',
    description: 'A vida real é mais estranha que a ficção. Investigue 20 casos baseados em acidentes e mortes tão bizarras que foram parar nas notícias.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'humor',
    mercadoPagoId: 'absurdamente-real-006',
    cards: []
  },
  {
    id: 'beco-sem-saida-007',
    name: 'Beco Sem Saída',
    description: 'Vítimas encontradas em situações impossíveis, sem escapatória aparente. A solução está onde você menos espera.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    mercadoPagoId: 'beco-sem-saida-007',
    cards: []
  },
  {
    id: 'sussurros-do-alem-008',
    name: 'Sussurros do Além',
    description: 'Eventos que arrepiam a espinha e sugerem o sobrenatural. Foram fantasmas ou há uma explicação lógica para estes 20 contos de terror?',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1598335682342-72126a153303?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'supernatural',
    mercadoPagoId: 'sussurros-do-alem-008',
    cards: []
  },
  {
    id: 'combo-5-packs-009',
    name: 'Combo 5 Packs',
    description: 'Combo especial com 5 packs de mistérios selecionados',
    price: 61.40,
    coverUrl: 'https://images.unsplash.com/photo-1518365642431-a2d5fb38af6c?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'combo',
    mercadoPagoId: 'combo-5-packs-009',
    cards: []
  },
  {
    id: 'pack-completo-010',
    name: 'Pack Completo',
    description: 'Coleção completa com todos os casos e mistérios exclusivos',
    price: 110.90,
    coverUrl: 'https://images.unsplash.com/photo-1565008576475-23f9a8c0c6f0?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'complete',
    mercadoPagoId: 'pack-completo-010',
    cards: []
  }
];

export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

export const getUserPacks = (userId: string): string[] => {
  const purchases = localStorage.getItem(`user_${userId}_packs`);
  return purchases ? JSON.parse(purchases) : [];
};

export const purchasePack = (userId: string, packId: string, pricePaid: number, transactionId?: string): boolean => {
  try {
    const currentPacks = getUserPacks(userId);
    if (!currentPacks.includes(packId)) {
      currentPacks.push(packId);
      localStorage.setItem(`user_${userId}_packs`, JSON.stringify(currentPacks));
    }
    
    // Store purchase history with transaction ID
    const purchases = getUserPurchases(userId);
    const newPurchase: Purchase = {
      id: `purchase_${Date.now()}`,
      userId,
      packId,
      purchased_at: new Date().toISOString(),
      price_paid: pricePaid,
      mercadoPagoTransactionId: transactionId
    };
    purchases.push(newPurchase);
    localStorage.setItem(`user_${userId}_purchases`, JSON.stringify(purchases));
    
    return true;
  } catch {
    return false;
  }
};

export const getUserPurchases = (userId: string): Purchase[] => {
  const purchases = localStorage.getItem(`user_${userId}_purchases`);
  const purchaseList = purchases ? JSON.parse(purchases) : [];
  
  return purchaseList.map((purchase: Purchase) => {
    const pack = getPackById(purchase.packId);
    return {
      ...purchase,
      packName: pack?.name || 'Pack Desconhecido'
    };
  });
};

export const getUserProgress = (userId: string, cardId: string): boolean => {
  const progress = localStorage.getItem(`user_${userId}_progress`);
  const userProgress = progress ? JSON.parse(progress) : {};
  return userProgress[cardId] || false;
};

export const setCardSolved = (userId: string, cardId: string, solved: boolean): void => {
  const progress = localStorage.getItem(`user_${userId}_progress`);
  const userProgress = progress ? JSON.parse(progress) : {};
  userProgress[cardId] = solved;
  localStorage.setItem(`user_${userId}_progress`, JSON.stringify(userProgress));
};
