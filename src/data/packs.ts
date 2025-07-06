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
}

export interface Purchase {
  id: string;
  userId: string;
  packId: string;
  purchased_at: string;
  price_paid: number;
  packName?: string;
}

// Links de checkout da InfinitePay
export const INFINITEPAY_LINKS = {
  individual: "https://checkout.infinitepay.io/conectawebapps?items=[{\"name\":\"Pack+individual+-+Caso+Oculto\",\"price\":1480,\"quantity\":1}]&redirect_url=https://caso-oculto-mist.lovable.app/",
  combo: "https://checkout.infinitepay.io/conectawebapps?items=[{\"name\":\"Combo+5+Packs+-+Caso+Oculto\",\"price\":6140,\"quantity\":1}]&redirect_url=https://caso-oculto-mist.lovable.app/",
  complete: "https://checkout.infinitepay.io/conectawebapps?items=[{\"name\":\"Pack+completo+-+Caso+Oculto\",\"price\":11090,\"quantity\":1}]&redirect_url=https://caso-oculto-mist.lovable.app/"
};

export const packs: Pack[] = [
  {
    id: 'amostra',
    name: 'Amostra Gratuita',
    description: 'Cinco mistérios para você experimentar o jogo',
    price: 0,
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center',
    isFree: true,
    category: 'starter',
    cards: [
      {
        id: '1',
        mystery: 'Um homem entra num elevador no seu andar (20º). Aperta o botão do rés-do-chão e sai. No dia seguinte, faz a mesma coisa, mas desta vez sai no 10º andar e sobe as escadas até ao 20º. Porquê?',
        solution: 'O homem é muito baixo e não consegue alcançar o botão do 20º andar. Consegue apenas alcançar o botão do 10º andar.',
        difficulty: 'easy',
        order: 1
      },
      {
        id: '2',
        mystery: 'Uma mulher vive sozinha num apartamento no 25º andar. Todos os dias toma o elevador até ao rés-do-chão para ir trabalhar. Quando regressa, toma o elevador até ao 15º andar e sobe as escadas, exceto em dias de chuva.',
        solution: 'A mulher é muito baixa e precisa de um guarda-chuva para alcançar o botão do 25º andar.',
        difficulty: 'medium',
        order: 2
      },
      {
        id: '3',
        mystery: 'Um homem empurra o seu carro e para em frente a um hotel. Imediatamente percebe que faliu. Porquê?',
        solution: 'Ele estava a jogar Monopoly. Parou na propriedade de outro jogador com um hotel e não tinha dinheiro para pagar.',
        difficulty: 'hard',
        order: 3
      },
      {
        id: '4',
        mystery: 'Dois pais e dois filhos foram pescar. Pescaram três peixes, mas cada um levou um peixe para casa. Como é possível?',
        solution: 'Eram três pessoas: avô, pai e filho. O pai é filho do avô e pai do rapaz.',
        difficulty: 'easy',
        order: 4
      },
      {
        id: '5',
        mystery: 'Uma mulher atira algo pela janela e morre. O que aconteceu?',
        solution: 'Ela atirou um bumerangue há três anos e esqueceu-se. O bumerangue voltou e atingiu-a.',
        difficulty: 'medium',
        order: 5
      }
    ]
  },
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'A escuridão esconde mais do que apenas o medo. Desvende 20 mistérios que só poderiam acontecer sob o manto da noite.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1531656230934-6041139385a3?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'horror',
    cards: []
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Todo plano genial tem uma falha. Encontre o detalhe que desmascarou o culpado em 20 casos de crimes que quase deram certo.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1568219659398-01a45afe453a?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    cards: []
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Aquelas histórias que todos juram que aconteceram com um "amigo de um amigo". 20 enigmas baseados nos contos mais famosos do folclore moderno.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1597432128929-2ef2a3d01b1b?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'urban',
    cards: []
  },
  {
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Mortes que desafiam a lógica e a física. Prepare-se para 20 quebra-cabeças que vão torcer sua percepção da realidade.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1557989313-06b573584323?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'complex',
    cards: []
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'A vida real é mais estranha que a ficção. Investigue 20 casos baseados em acidentes e mortes tão bizarras que foram parar nas notícias.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'humor',
    cards: []
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco Sem Saída',
    description: 'Vítimas encontradas em situações impossíveis, sem escapatória aparente. A solução está onde você menos espera.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    cards: []
  },
  {
    id: 'sussurros-do-alem',
    name: 'Sussurros do Além',
    description: 'Eventos que arrepiam a espinha e sugerem o sobrenatural. Foram fantasmas ou há uma explicação lógica para estes 20 contos de terror?',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1598335682342-72126a153303?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'supernatural',
    cards: []
  },
  {
    id: 'combo-5-packs',
    name: 'Combo 5 Packs',
    description: 'Combo especial com 5 packs de mistérios selecionados',
    price: 61.40,
    coverUrl: 'https://images.unsplash.com/photo-1518365642431-a2d5fb38af6c?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'combo',
    cards: []
  },
  {
    id: 'pack-completo',
    name: 'Pack Completo',
    description: 'Coleção completa com todos os casos e mistérios exclusivos',
    price: 110.90,
    coverUrl: 'https://images.unsplash.com/photo-1565008576475-23f9a8c0c6f0?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'complete',
    cards: []
  }
];

export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

export const getUserPacks = (userId: string): string[] => {
  const purchases = localStorage.getItem(`user_${userId}_packs`);
  return purchases ? JSON.parse(purchases) : ['amostra'];
};

export const purchasePack = (userId: string, packId: string, pricePaid: number): boolean => {
  try {
    const currentPacks = getUserPacks(userId);
    if (!currentPacks.includes(packId)) {
      currentPacks.push(packId);
      localStorage.setItem(`user_${userId}_packs`, JSON.stringify(currentPacks));
    }
    
    // Store purchase history
    const purchases = getUserPurchases(userId);
    const newPurchase: Purchase = {
      id: `purchase_${Date.now()}`,
      userId,
      packId,
      purchased_at: new Date().toISOString(),
      price_paid: pricePaid
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
