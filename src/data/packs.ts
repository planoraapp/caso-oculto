
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
    description: 'Mistérios sombrios que acontecem na escuridão',
    price: 4.99,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'horror',
    cards: []
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Casos criminais com reviravoltas inesperadas',
    price: 5.99,
    coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    cards: []
  },
  {
    id: 'segredos-urbanos',
    name: 'Segredos Urbanos',
    description: 'Mistérios ocultos nas grandes cidades',
    price: 4.99,
    coverUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'urban',
    cards: []
  },
  {
    id: 'historias-macabras',
    name: 'Histórias Macabras',
    description: 'Os casos mais perturbadores já registrados',
    price: 6.99,
    coverUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'horror',
    cards: []
  },
  {
    id: 'enigmas-antigos',
    name: 'Enigmas Antigos',
    description: 'Mistérios perdidos no tempo',
    price: 5.49,
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'historical',
    cards: []
  },
  {
    id: 'casos-sem-explicacao',
    name: 'Casos sem Explicação',
    description: 'Fenômenos que desafiam a lógica',
    price: 7.99,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'supernatural',
    cards: []
  },
  {
    id: 'morte-suspeitosa',
    name: 'Morte Suspeitosa',
    description: 'Investigações de homicídios complexos',
    price: 6.49,
    coverUrl: 'https://images.unsplash.com/photo-1565008576475-23f9a8c0c6f0?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    cards: []
  },
  {
    id: 'psicopatas',
    name: 'Psicopatas',
    description: 'A mente perturbada dos criminosos mais perigosos',
    price: 8.99,
    coverUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'psychological',
    cards: []
  },
  {
    id: 'desaparecimentos',
    name: 'Desaparecimentos',
    description: 'Pessoas que simplesmente se desvaneceram',
    price: 5.99,
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'mystery',
    cards: []
  },
  {
    id: 'conspiracao-global',
    name: 'Conspiração Global',
    description: 'Segredos que movem o mundo nas sombras',
    price: 7.49,
    coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'conspiracy',
    cards: []
  }
];

export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

export const getUserPacks = (userId: string): string[] => {
  // Simulate user purchases - in real app this would come from database
  const purchases = localStorage.getItem(`user_${userId}_packs`);
  return purchases ? JSON.parse(purchases) : ['amostra'];
};

export const purchasePack = (userId: string, packId: string): boolean => {
  try {
    const currentPacks = getUserPacks(userId);
    if (!currentPacks.includes(packId)) {
      currentPacks.push(packId);
      localStorage.setItem(`user_${userId}_packs`, JSON.stringify(currentPacks));
    }
    return true;
  } catch {
    return false;
  }
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
