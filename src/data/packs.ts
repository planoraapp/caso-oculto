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
        mystery: 'Um vigia noturno ouve um grito, corre para a origem do som e encontra um homem morto. A polícia conclui que foi suicídio, apesar de não haver arma. Porquê?',
        solution: 'O homem era um limpador de janelas de arranha-céus que trabalhava à noite. Ele escorregou, gritou e caiu. A \'arma\' foi a altura.',
        difficulty: 'medium',
        order: 1
      },
      {
        id: 'sn_2',
        mystery: 'Uma mulher apaga a luz do seu quarto para dormir. Na manhã seguinte, várias pessoas morrem por causa disso. O que aconteceu?',
        solution: 'Ela era a faroleira de um farol. Ao apagar a luz, um navio colidiu com as rochas.',
        difficulty: 'hard',
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
        mystery: 'Um ladrão rouba uma joalharia, mas é apanhado porque deixou para trás uma única luva.',
        solution: 'Ele era maneta e usava um gancho. A polícia encontrou a luva da mão direita no balcão e percebeu que o ladrão só tinha a mão esquerda, uma característica muito específica.',
        difficulty: 'medium',
        order: 1
      },
      {
        id: 'ci_2',
        mystery: 'Um assassino mata a sua vítima com um tiro e limpa todas as suas impressões digitais. Mesmo assim, a polícia sabe quem ele é por causa do que ele não tocou.',
        solution: 'A vítima era cega. O assassino desligou a luz para não ser visto, mas uma pessoa cega não se importaria com a luz. A polícia procurou por alguém que conhecia a vítima e sabia da sua cegueira.',
        difficulty: 'hard',
        order: 2
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
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'lu_1',
        mystery: 'Um homem dá boleia a uma jovem numa estrada deserta. Ela pede para ficar em frente a um cemitério. No dia seguinte, ele volta e descobre que ela morreu há 20 anos. Como deixou o seu casaco no carro dela?',
        solution: 'A "jovem" era a neta da falecida, que se vestiu como a avó para pregar uma partida, usando uma história famosa para assustar o motorista. Ela deixou o casaco de propósito.',
        difficulty: 'hard',
        order: 1
      },
      {
        id: 'lu_2',
        mystery: 'Uma mulher a conduzir sozinha à noite é seguida de perto por um camião que não para de piscar os faróis. Assustada, ela acelera. O camião persegue-a até casa. O que o camionista queria?',
        solution: 'O camionista não a estava a perseguir. Ele via um homem com uma faca escondido no banco de trás do carro dela. Cada vez que o homem se levantava para a atacar, o camionista piscava os faróis para o assustar e fazê-lo baixar-se.',
        difficulty: 'hard',
        order: 2
      }
    ]
  },
  {
    id: 'paradoxos-mortais-005',
    name: 'Paradoxos Mortais',
    description: 'Mortes que desafiam a lógica e a física. Prepare-se para 20 quebra-cabeças que vão torcer sua percepção da realidade.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1557989313-06b573584323?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'complex',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'pm_1',
        mystery: 'Um homem está morto numa sala completamente vazia e trancada por dentro. Não há marcas no corpo e a causa da morte é asfixia.',
        solution: 'A sala era uma câmara de vácuo usada para testes industriais. Alguém a ativou remotamente, removendo todo o ar.',
        difficulty: 'hard',
        order: 1
      },
      {
        id: 'pm_2',
        mystery: 'Um homem morre de sede na sua própria casa, que tem água corrente em todas as torneiras.',
        solution: 'Ele era um halterofilista extremamente forte. Ficou preso debaixo de um peso que não conseguia levantar, longe de qualquer fonte de água, e morreu de desidratação.',
        difficulty: 'medium',
        order: 2
      }
    ]
  },
  {
    id: 'absurdamente-real-006',
    name: 'Absurdamente Real',
    description: 'A vida real é mais estranha que a ficção. Investigue 20 casos baseados em acidentes e mortes tão bizarras que foram parar nas notícias.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'humor',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'ar_1',
        mystery: 'Um homem é encontrado morto, esmagado por uma máquina de vendas.',
        solution: 'Ele estava a abanar a máquina para tentar tirar um refrigerante de graça. A máquina, pesando 400kg, tombou sobre ele. (Baseado em casos reais).',
        difficulty: 'easy',
        order: 1
      },
      {
        id: 'ar_2',
        mystery: 'Um advogado morre ao cair do 24º andar do seu escritório. Ele não era suicida.',
        solution: 'Para provar a um grupo de estudantes que o vidro da janela do seu escritório era inquebrável, ele atirou-se contra ele. O vidro não partiu, mas saiu da moldura, e ele caiu. (Caso real de Garry Hoy em Toronto).',
        difficulty: 'medium',
        order: 2
      }
    ]
  },
  {
    id: 'beco-sem-saida-007',
    name: 'Beco Sem Saída',
    description: 'Vítimas encontradas em situações impossíveis, sem escapatória aparente. A solução está onde você menos espera.',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'crime',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'bs_1',
        mystery: 'Um homem com equipamento de mergulho completo é encontrado morto no meio de uma floresta queimada.',
        solution: 'Ele estava a mergulhar num lago próximo quando um avião de combate a incêndios o "pescou" juntamente com a água e o largou sobre o fogo.',
        difficulty: 'hard',
        order: 1
      },
      {
        id: 'bs_2',
        mystery: 'Um homem é encontrado enforcado no teto de um celeiro, a 3 metros do chão. Não há nada por baixo dele, exceto uma poça de água.',
        solution: 'Ele subiu para um grande bloco de gelo, que entretanto derreteu.',
        difficulty: 'medium',
        order: 2
      }
    ]
  },
  {
    id: 'sussurros-do-alem-008',
    name: 'Sussurros do Além',
    description: 'Eventos que arrepiam a espinha e sugerem o sobrenatural. Foram fantasmas ou há uma explicação lógica para estes 20 contos de terror?',
    price: 14.80,
    coverUrl: 'https://images.unsplash.com/photo-1598335682342-72126a153303?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'supernatural',
    mercadoPagoId: MERCADOPAGO_LINKS.individual,
    cards: [
      {
        id: 'sa_1',
        mystery: 'Um homem entra num bar e pede um copo d\'água. O garçom aponta-lhe uma arma. O homem agradece e sai. Porquê?',
        solution: 'O homem tinha soluços. O susto curou-o.',
        difficulty: 'easy',
        order: 1
      },
      {
        id: 'sa_2',
        mystery: 'Uma mulher é encontrada morta num campo com um palito de fósforo partido na mão. O que aconteceu?',
        solution: 'Ela estava num balão de ar quente que perdia altitude. Sortearam no palito mais curto quem saltaria para salvar os outros.',
        difficulty: 'medium',
        order: 2
      }
    ]
  },
  {
    id: 'combo-5-packs-009',
    name: 'Combo 5 Packs',
    description: 'Combo especial com 5 packs de mistérios selecionados',
    price: 61.40,
    coverUrl: 'https://images.unsplash.com/photo-1518365642431-a2d5fb38af6c?w=400&h=500&fit=crop&crop=center',
    isFree: false,
    category: 'combo',
    mercadoPagoId: MERCADOPAGO_LINKS.combo,
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
    mercadoPagoId: MERCADOPAGO_LINKS.complete,
    cards: []
  }
];

// Auto-assign all packs to these accounts
const AUTO_ASSIGN_EMAILS = ['appplanora@gmail.com', 'conectawebapps@outlook.com'];

export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

// Function to get user's purchased packs
export const getUserPacks = (userId: string): string[] => {
  const userEmail = getCurrentUserEmail(userId);
  
  // Auto-assign all packs to specified accounts
  if (AUTO_ASSIGN_EMAILS.includes(userEmail)) {
    return packs.map(pack => pack.id);
  }
  
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  return purchases[userId] || [];
};

// Helper function to get current user email
const getCurrentUserEmail = (userId: string): string => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return currentUser.email || '';
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
