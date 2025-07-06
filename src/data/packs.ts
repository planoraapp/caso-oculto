// Pack covers URLs
export const PACK_COVERS = {
  'amostra': '/images/covers/amostra.jpg',
  'sombras-da-noite': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=700&fit=crop',
  'crimes-imperfeitos': 'https://images.unsplash.com/photo-1507690779323-e3476775ee3d?w=500&h=700&fit=crop',
  'paradoxos-mortais': 'https://images.unsplash.com/photo-1551075665-879c94ca0951?w=500&h=700&fit=crop',
  'lendas-urbanas': 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?w=500&h=700&fit=crop',
  'absurdamente-real': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=700&fit=crop',
  'beco-sem-saida': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=700&fit=crop'
};

import { t } from './translations';

export interface Card {
  id: string;
  order: number;
  mystery: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFree?: boolean;
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

// Pack data with complete cases
export const packs: Pack[] = [
  {
    id: 'amostra',
    name: 'Pack de Amostra',
    description: 'Uma seleção de casos introdutórios para conhecer o jogo',
    price: 0,
    coverUrl: PACK_COVERS['amostra'],
    isFree: true,
    category: 'Iniciante',
    cards: [
      {
        id: 'amostra-1',
        order: 1,
        mystery: 'Um homem entra num bar e pede um copo d\'água. O garçom aponta-lhe uma arma. O homem agradece e sai. Porquê?',
        solution: 'O homem tinha soluços. O susto curou-o.',
        difficulty: 'easy',
        isFree: true
      },
      {
        id: 'amostra-2',
        order: 2,
        mystery: 'Uma mulher é encontrada morta num campo com um palito de fósforo partido na mão. O que aconteceu?',
        solution: 'Ela estava num balão de ar quente que perdia altitude. Sortearam no palito mais curto quem saltaria para salvar os outros.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'amostra-3',
        order: 3,
        mystery: 'Um homem morre envenenado num jantar, mas todos comeram o mesmo. Como?',
        solution: 'O veneno estava no gelo da sua bebida. Ele bebeu devagar, dando tempo para o gelo derreter.',
        difficulty: 'medium'
      },
      {
        id: 'amostra-4',
        order: 4,
        mystery: 'Um homem jaz morto no deserto com uma mochila fechada. Se a tivesse aberto, estaria vivo.',
        solution: 'A mochila continha um paraquedas que não abriu.',
        difficulty: 'hard'
      },
      {
        id: 'amostra-5',
        order: 5,
        mystery: 'Dois homens estão mortos numa cabana nos Alpes.',
        solution: 'A "cabana" era a cabine de um avião que se despenhou.',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam na escuridão da noite',
    price: 14.80,
    coverUrl: PACK_COVERS['sombras-da-noite'],
    isFree: false,
    category: 'Mistério',
    cards: [
      {
        id: 'sombras-1',
        order: 1,
        mystery: 'Um vigia noturno ouve um grito, corre para a origem do som e encontra um homem morto. A polícia conclui que foi suicídio, apesar de não haver arma. Porquê?',
        solution: 'O homem era um limpador de janelas de arranha-céus que trabalhava à noite. Ele escorregou, gritou e caiu. A \'arma\' foi a altura.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'sombras-2',
        order: 2,
        mystery: 'Uma mulher apaga a luz do seu quarto para dormir. Na manhã seguinte, várias pessoas morrem por causa disso. O que aconteceu?',
        solution: 'Ela era a faroleira de um farol. Ao apagar a luz, um navio colidiu com as rochas.',
        difficulty: 'hard',
        isFree: true
      },
      // Add remaining 18 cases here with isFree: false for paid content
      {
        id: 'sombras-3',
        order: 3,
        mystery: 'Um homem é encontrado morto no seu carro à meia-noite. O carro está intacto, mas o chão à volta está cheio de pequenas esferas de metal.',
        solution: 'Ele era o \'Homem-Bala\' de um circo. O canhão foi mal calculado e ele aterrou no parque de estacionamento, morrendo com o impacto. As esferas eram dos seus adereços.',
        difficulty: 'hard'
      }
      // ... more cases would be added here
    ]
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Quando o crime perfeito encontra falhas inesperadas',
    price: 14.80,
    coverUrl: PACK_COVERS['crimes-imperfeitos'],
    isFree: false,
    category: 'Crime',
    cards: [
      {
        id: 'crimes-1',
        order: 1,
        mystery: 'Um ladrão rouba uma joalharia, mas é apanhado porque deixou para trás uma única luva.',
        solution: 'Ele era maneta e usava um gancho. A polícia encontrou a luva da mão direita no balcão e percebeu que o ladrão só tinha a mão esquerda, uma característica muito específica.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'crimes-2',
        order: 2,
        mystery: 'Um assassino mata a sua vítima com um tiro e limpa todas as suas impressões digitais. Mesmo assim, a polícia sabe quem ele é por causa do que ele não tocou.',
        solution: 'A vítima era cega. O assassino desligou a luz para não ser visto, mas uma pessoa cega não se importaria com a luz. A polícia procurou por alguém que conhecia a vítima e sabia da sua cegueira.',
        difficulty: 'hard',
        isFree: true
      }
      // Add remaining cases
    ]
  },
  {
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Situações impossíveis com soluções surpreendentes',
    price: 14.80,
    coverUrl: PACK_COVERS['paradoxos-mortais'],
    isFree: false,
    category: 'Paradoxo',
    cards: [
      {
        id: 'paradoxos-1',
        order: 1,
        mystery: 'Um homem está morto numa sala completamente vazia e trancada por dentro. Não há marcas no corpo e a causa da morte é asfixia.',
        solution: 'A sala era uma câmara de vácuo usada para testes industriais. Alguém a ativou remotamente, removendo todo o ar.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'paradoxos-2',
        order: 2,
        mystery: 'Um homem morre de sede na sua própria casa, que tem água corrente em todas as torneiras.',
        solution: 'Ele era um halterofilista extremamente forte. Ficou preso debaixo de um peso que não conseguia levantar, longe de qualquer fonte de água, e morreu de desidratação.',
        difficulty: 'medium',
        isFree: true
      }
      // Add remaining cases
    ]
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Mitos modernos com explicações chocantes',
    price: 14.80,
    coverUrl: PACK_COVERS['lendas-urbanas'],
    isFree: false,
    category: 'Urbano',
    cards: [
      {
        id: 'urbanas-1',
        order: 1,
        mystery: 'Um homem dá boleia a uma jovem numa estrada deserta. Ela pede para ficar em frente a um cemitério. No dia seguinte, ele volta e descobre que ela morreu há 20 anos. Como deixou o seu casaco no carro dela?',
        solution: 'A "jovem" era a neta da falecida, que se vestiu como a avó para pregar uma partida, usando uma história famosa para assustar o motorista. Ela deixou o casaco de propósito.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'urbanas-2',
        order: 2,
        mystery: 'Uma mulher a conduzir sozinha à noite é seguida de perto por um camião que não para de piscar os faróis. O que o camionista queria?',
        solution: 'O camionista não a estava a perseguir. Ele via um homem com uma faca escondido no banco de trás do carro dela. Cada vez que o homem se levantava para a atacar, o camionista piscava os faróis para o assustar e fazê-lo baixar-se.',
        difficulty: 'hard',
        isFree: true
      }
      // Add remaining cases
    ]
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'Casos baseados em eventos reais inacreditáveis',
    price: 14.80,
    coverUrl: PACK_COVERS['absurdamente-real'],
    isFree: false,
    category: 'Real',
    cards: [
      {
        id: 'real-1',
        order: 1,
        mystery: 'Um homem é encontrado morto, esmagado por uma máquina de vendas.',
        solution: 'Ele estava a abanar a máquina para tentar tirar um refrigerante de graça. A máquina, pesando 400kg, tombou sobre ele. (Baseado em casos reais).',
        difficulty: 'easy',
        isFree: true
      },
      {
        id: 'real-2',
        order: 2,
        mystery: 'Um advogado morre ao cair do 24º andar do seu escritório. Ele não era suicida.',
        solution: 'Para provar a um grupo de estudantes que o vidro da janela do seu escritório era inquebrável, ele atirou-se contra ele. O vidro não partiu, mas saiu da moldura, e ele caiu. (Caso real de Garry Hoy em Toronto).',
        difficulty: 'medium',
        isFree: true
      }
      // Add remaining cases
    ]
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco Sem Saída',
    description: 'Situações aparentemente impossíveis de resolver',
    price: 14.80,
    coverUrl: PACK_COVERS['beco-sem-saida'],
    isFree: false,
    category: 'Impossível',
    cards: [
      {
        id: 'beco-1',
        order: 1,
        mystery: 'Um homem com equipamento de mergulho completo é encontrado morto no meio de uma floresta queimada.',
        solution: 'Ele estava a mergulhar num lago próximo quando um avião de combate a incêndios o "pescou" juntamente com a água e o largou sobre o fogo.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'beco-2',
        order: 2,
        mystery: 'Um homem é encontrado enforcado no teto de um celeiro, a 3 metros do chão. Não há nada por baixo dele, exceto uma poça de água.',
        solution: 'Ele subiu para um grande bloco de gelo, que entretanto derreteu.',
        difficulty: 'medium',
        isFree: true
      }
      // Add remaining cases
    ]
  }
];

export const getUserPacks = (userId: string): string[] => {
  const purchases = JSON.parse(localStorage.getItem(`purchases_${userId}`) || '[]');
  
  // Grant admin full access to all packs
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (user.email === 'conectawebapps@outlook.com') {
    return packs.map(pack => pack.id);
  }
  
  return purchases;
};

export const getPackById = (packId: string): Pack | undefined => {
  return packs.find(pack => pack.id === packId);
};

export const getUserProgress = (userId: string, cardId: string): boolean => {
  const progress = JSON.parse(localStorage.getItem(`progress_${userId}`) || '{}');
  return progress[cardId] || false;
};

export const getUserPurchases = (userId: string): Array<{
  id: string;
  packName: string;
  purchased_at: string;
  price_paid: number;
}> => {
  const purchases = getUserPacks(userId);
  
  return purchases.map(packId => {
    const pack = getPackById(packId);
    return {
      id: packId,
      packName: pack?.name || 'Pack Desconhecido',
      purchased_at: new Date().toISOString(),
      price_paid: pack?.price || 0
    };
  });
};

export const purchasePack = (userId: string, packId: string, price: number, transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem(`purchases_${userId}`) || '[]');
  if (!purchases.includes(packId)) {
    purchases.push(packId);
    localStorage.setItem(`purchases_${userId}`, JSON.stringify(purchases));
    console.log(`Pack ${packId} purchased by user ${userId} for $${price} (Transaction ID: ${transactionId})`);
  } else {
    console.log(`User ${userId} already owns pack ${packId}`);
  }
};

// Function to simulate refund request
export const requestRefund = async (userId: string, packId: string, reason?: string) => {
  console.log(`Refund requested for pack ${packId} by user ${userId} with reason: ${reason}`);
  
  // Store the refund request in localStorage (for simulation purposes)
  localStorage.setItem(`refundRequest_${userId}_${packId}`, JSON.stringify({
    userId,
    packId,
    reason,
    requestDate: new Date().toISOString()
  }));

  // Simulate sending a refund notification (replace with actual notification logic)
  alert(t('packs.refundRequested'));
};

// Function to check if refund can be requested (within 7 days of purchase)
export const canRequestRefund = (userId: string, packId: string): boolean => {
  const purchaseDate = localStorage.getItem(`purchaseDate_${userId}_${packId}`);
  if (!purchaseDate) return false;

  const purchaseTimestamp = new Date(purchaseDate).getTime();
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  return (now - purchaseTimestamp) <= sevenDays;
};

export const MERCADOPAGO_LINKS = {
    individual: 'https://www.mercadopago.com.br/home',
    combo: 'https://www.mercadopago.com.br/home',
    complete: 'https://www.mercadopago.com.br/home'
};
