
// Pack covers URLs
export const PACK_COVERS = {
  'sombras-da-noite': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=700&fit=crop',
  'crimes-imperfeitos': 'https://images.unsplash.com/photo-1507690779323-e3476775ee3d?w=500&h=700&fit=crop',
  'paradoxos-mortais': 'https://images.unsplash.com/photo-1551075665-879c94ca0951?w=500&h=700&fit=crop',
  'lendas-urbanas': 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?w=500&h=700&fit=crop',
  'absurdamente-real': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=700&fit=crop',
  'beco-sem-saida': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=700&fit=crop',
  'dossie-confidencial': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=700&fit=crop',
  'labirintos-da-mente': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=700&fit=crop',
  'ironias-do-destino': 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&h=700&fit=crop',
  'crimes-de-epoca': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&h=700&fit=crop',
  'dose-letal': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=700&fit=crop',
  'fim-de-jogo': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=700&fit=crop',
  'viagem-sem-volta': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=700&fit=crop',
  'jogos-corporativos': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=700&fit=crop',
  'sussurros-do-alem': 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?w=500&h=700&fit=crop'
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

// Pack data with complete cases - Updated with 15 packs
export const packs: Pack[] = [
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
  },
  {
    id: 'dossie-confidencial',
    name: 'Dossiê Confidencial',
    description: 'Segredos governamentais e conspirações reveladas',
    price: 14.80,
    coverUrl: PACK_COVERS['dossie-confidencial'],
    isFree: false,
    category: 'Conspiração',
    cards: [
      {
        id: 'dossie-1',
        order: 1,
        mystery: 'Um agente secreto é encontrado morto no seu escritório. Todas as gavetas estão abertas, mas nada foi roubado.',
        solution: 'O agente estava a ser chantageeado. Abriu todas as gavetas para mostrar ao chantagista que não tinha os documentos que ele procurava, mas o chantagista matou-o mesmo assim.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'dossie-2',
        order: 2,
        mystery: 'Uma cientista desaparece do laboratório ultra-seguro onde trabalhava. As câmaras não mostram ninguém a entrar ou sair.',
        solution: 'Ela foi morta e o seu corpo foi dissolvido em ácido. O "desaparecimento" foi encenado pelos seus próprios colegas que descobriram que ela era uma espia.',
        difficulty: 'hard',
        isFree: true
      }
    ]
  },
  {
    id: 'labirintos-da-mente',
    name: 'Labirintos da Mente',
    description: 'Casos que desafiam a lógica e a perceção',
    price: 14.80,
    coverUrl: PACK_COVERS['labirintos-da-mente'],
    isFree: false,
    category: 'Psicológico',
    cards: [
      {
        id: 'labirintos-1',
        order: 1,
        mystery: 'Um psiquiatra é encontrado morto no seu consultório. O último paciente do dia era conhecido pela sua violência, mas tem um álibi perfeito.',
        solution: 'O psiquiatra suicidou-se, mas programou um sistema para apagar as gravações das sessões e fazer parecer um homicídio, para que a sua família recebesse o seguro de vida.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'labirintos-2',
        order: 2,
        mystery: 'Uma mulher acorda num quarto que não reconhece, sem memórias dos últimos três dias. Há sinais de luta, mas ela não tem ferimentos.',
        solution: 'Ela é uma atriz que participou num reality show experimental sobre perda de memória. Os "sinais de luta" eram parte do cenário.',
        difficulty: 'medium',
        isFree: true
      }
    ]
  },
  {
    id: 'ironias-do-destino',
    name: 'Ironias do Destino',
    description: 'Quando o destino prega as suas piores partidas',
    price: 14.80,
    coverUrl: PACK_COVERS['ironias-do-destino'],
    isFree: false,
    category: 'Ironia',
    cards: [
      {
        id: 'ironias-1',
        order: 1,
        mystery: 'Um homem sobrevive a um acidente de avião, mas morre no hospital poucas horas depois, sem ferimentos graves.',
        solution: 'Ele morreu de choque anafilático devido a uma alergia ao látex das luvas médicas. Ironicamente, sobreviveu ao acidente mas morreu devido aos cuidados médicos.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'ironias-2',
        order: 2,
        mystery: 'Uma mulher ganha no Euromilhões, mas morre no mesmo dia antes de reclamar o prémio.',
        solution: 'Ela teve um ataque cardíaco de excitação quando viu os números. O bilhete premiado foi encontrado na sua mão.',
        difficulty: 'easy',
        isFree: true
      }
    ]
  },
  {
    id: 'crimes-de-epoca',
    name: 'Crimes de Época',
    description: 'Mistérios ambientados em períodos históricos fascinantes',
    price: 14.80,
    coverUrl: PACK_COVERS['crimes-de-epoca'],
    isFree: false,
    category: 'Histórico',
    cards: [
      {
        id: 'epoca-1',
        order: 1,
        mystery: 'Durante a Era Vitoriana, um nobre é encontrado morto na sua biblioteca. A única pista é um livro aberto numa página específica.',
        solution: 'O livro estava aberto numa página sobre venenos. O mordomo, que sabia ler (raro na época), envenenou o patrão e deixou o livro como confissão silenciosa.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'epoca-2',
        order: 2,
        mystery: 'Nos anos 20, um contrabandista é encontrado morto no seu armazém. Todas as garrafas de whiskey estão intactas.',
        solution: 'Ele foi morto pelo próprio produto que vendia - álcool metílico disfarçado de whiskey. Bebeu do próprio stock por engano.',
        difficulty: 'medium',
        isFree: true
      }
    ]
  },
  {
    id: 'dose-letal',
    name: 'Dose Letal',
    description: 'Casos envolvendo venenos, medicina e ciência forense',
    price: 14.80,
    coverUrl: PACK_COVERS['dose-letal'],
    isFree: false,
    category: 'Forense',
    cards: [
      {
        id: 'dose-1',
        order: 1,
        mystery: 'Um farmacêutico morre envenenado na sua própria farmácia. Todas as substâncias tóxicas estão devidamente guardadas.',
        solution: 'Ele misturou dois medicamentos comuns que, juntos, criaram uma reação letal. Foi um acidente causado pela sua própria negligência.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'dose-2',
        order: 2,
        mystery: 'Uma enfermeira é suspeita de envenenar pacientes, mas todos os exames toxicológicos dão negativos.',
        solution: 'Ela usava insulina, que é natural no corpo e se decompõe rapidamente, sendo quase impossível de detetar post-mortem em pessoas diabéticas.',
        difficulty: 'hard',
        isFree: true
      }
    ]
  },
  {
    id: 'fim-de-jogo',
    name: 'Fim de Jogo',
    description: 'Enigmas no mundo dos desportos: sabotagem, doping e mistérios',
    price: 14.80,
    coverUrl: PACK_COVERS['fim-de-jogo'],
    isFree: false,
    category: 'Desporto',
    cards: [
      {
        id: 'jogo-1',
        order: 1,
        mystery: 'Um ciclista morre durante uma corrida. A autópsia não encontra drogas, mas ele tinha sinais de doping.',
        solution: 'Ele usou "doping sanguíneo" - retirou o seu próprio sangue semanas antes para reintroduzir antes da corrida, mas o sangue estava contaminado.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'jogo-2',
        order: 2,
        mystery: 'Um jogador de futebol morre no balneário após um jogo. Não havia sinais de violência.',
        solution: 'Ele teve uma paragem cardíaca causada por uma condição não diagnosticada, agravada pelo esforço extremo e desidratação.',
        difficulty: 'medium',
        isFree: true
      }
    ]
  },
  {
    id: 'viagem-sem-volta',
    name: 'Viagem Sem Volta',
    description: 'Crimes em locais isolados: comboios, navios e ilhas remotas',
    price: 14.80,
    coverUrl: PACK_COVERS['viagem-sem-volta'],
    isFree: false,
    category: 'Isolado',
    cards: [
      {
        id: 'viagem-1',
        order: 1,
        mystery: 'Num cruzeiro, um passageiro desaparece do seu camarote durante a noite. A porta estava trancada por dentro.',
        solution: 'Ele saiu pela janela do camarote (que dava para o convés) para fumar, escorregou e caiu ao mar. A janela fechou-se sozinha com o vento.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'viagem-2',
        order: 2,
        mystery: 'Num comboio noturno, um passageiro é encontrado morto no seu compartimento. O comboio não parou durante a viagem.',
        solution: 'Ele foi morto por alguém que embarcou clandestinamente no teto do comboio e desceu pelo compartimento através de uma escotilha de manutenção.',
        difficulty: 'hard',
        isFree: true
      }
    ]
  },
  {
    id: 'jogos-corporativos',
    name: 'Jogos Corporativos',
    description: 'Mistérios no mundo empresarial: espionagem, fraudes e traições',
    price: 14.80,
    coverUrl: PACK_COVERS['jogos-corporativos'],
    isFree: false,
    category: 'Empresarial',
    cards: [
      {
        id: 'corporativo-1',
        order: 1,
        mystery: 'Um CEO morre no seu escritório no último andar. O elevador estava avariado e as escadas trancadas.',
        solution: 'Ele foi morto pelo próprio sistema de ar condicionado, que foi sabotado para libertar monóxido de carbono apenas no seu escritório.',
        difficulty: 'hard',
        isFree: true
      },
      {
        id: 'corporativo-2',
        order: 2,
        mystery: 'Uma executiva desaparece durante uma reunião importante. As câmaras mostram-na a entrar na sala, mas nunca a sair.',
        solution: 'Ela fugiu através de um túnel secreto construído durante a guerra, que ligava o edifício ao metro. Estava a fugir com segredos da empresa.',
        difficulty: 'hard',
        isFree: true
      }
    ]
  },
  {
    id: 'sussurros-do-alem',
    name: 'Sussurros do Além',
    description: 'Histórias com um toque sobrenatural que desafiam a realidade',
    price: 14.80,
    coverUrl: PACK_COVERS['sussurros-do-alem'],
    isFree: false,
    category: 'Sobrenatural',
    cards: [
      {
        id: 'alem-1',
        order: 1,
        mystery: 'Uma médium morre durante uma sessão espírita. As outras pessoas presentes juram que ela foi "possuída".',
        solution: 'Ela teve uma reação alérgica severa ao incenso usado na sessão. Os "sintomas de possessão" eram na verdade convulsões alérgicas.',
        difficulty: 'medium',
        isFree: true
      },
      {
        id: 'alem-2',
        order: 2,
        mystery: 'Numa casa assombrada, o novo proprietário é encontrado morto. Vizinhos relatam atividade paranormal.',
        solution: 'A casa tinha um vazamento de gás que causava alucinações e, eventualmente, asfixia. As "atividades paranormais" eram alucinações causadas pelo gás.',
        difficulty: 'hard',
        isFree: true
      }
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
