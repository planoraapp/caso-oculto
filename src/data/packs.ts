
import { Pack, Case, Purchase } from './types';

export const packs: Pack[] = [
  {
    id: 'labirintos-mentais',
    name: 'Labirintos Mentais', 
    description: 'Mergulhe nos enigmas da mente humana e desvende mistérios psicológicos complexos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/da643651-ed6c-46d4-95dd-1c06824d34d1.png',
    category: 'psychological',
    cases: [
      {
        id: 'lm1',
        order: 1,
        name: 'Mente Perdida',
        mystery: 'Um paciente acorda sem memória e com um comportamento estranho. Qual é a causa?',
        solution: 'Amnésia dissociativa causada por trauma psicológico.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery',
        icon: '🧠'
      },
      {
        id: 'lm2',
        order: 2,
        name: 'Sonhos Reveladores',
        mystery: 'Uma série de sonhos recorrentes revelam pistas sobre um crime não resolvido.',
        solution: 'O sonhador é testemunha subconsciente do crime.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '💭'
      },
      {
        id: 'lm3',
        order: 3,
        name: 'Segredos Obscuros',
        mystery: 'Um psicólogo desaparece após descobrir segredos obscuros de seus pacientes.',
        solution: 'Foi sequestrado por um paciente instável.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '🔍'
      }
    ]
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco sem Saída',
    description: 'Explore os cantos mais escuros da cidade onde os crimes mais terríveis acontecem.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/2417902f-9f5a-4a8b-955d-a89f82ac5822.png',
    category: 'thriller',
    cases: [
      {
        id: 'bs1',
        order: 1,
        name: 'Informante Perdido',
        mystery: 'Um informante desaparece após revelar informações sobre uma gangue local.',
        solution: 'Foi capturado para impedir que falasse.',
        difficulty: 'hard',
        isFree: true,
        theme: 'crime',
        icon: '🚫'
      },
      {
        id: 'bs2',
        order: 2,
        name: 'Silêncio Final',
        mystery: 'Uma testemunha chave é assassinada antes do julgamento.',
        solution: 'O assassino queria garantir a impunidade.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '⚖️'
      },
      {
        id: 'bs3',
        order: 3,
        name: 'Armadilha Oculta',
        mystery: 'Um pacote misterioso é deixado em um beco, contendo pistas para um grande roubo.',
        solution: 'O pacote é uma armadilha para a polícia.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '📦'
      }
    ]
  },
  {
    id: 'jogos-corporativos',
    name: 'Jogos Corporativos',
    description: 'Desvende os mistérios por trás de crimes empresariais e conflitos corporativos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/494fd0cb-99c2-48cb-bd87-1b63007c684a.png',
    category: 'corporate',
    cases: [
      {
        id: 'jc1',
        order: 1,
        name: 'Executivo Silenciado',
        mystery: 'Um executivo é encontrado morto em seu escritório com documentos desaparecidos.',
        solution: 'Foi assassinado para esconder informações confidenciais.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder',
        icon: '💼'
      },
      {
        id: 'jc2',
        order: 2,
        name: 'Sabotagem Interna',
        mystery: 'Uma sabotagem ameaça a reputação de uma grande empresa.',
        solution: 'Um funcionário descontente é o responsável.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '⚙️'
      },
      {
        id: 'jc3',
        order: 3,
        name: 'Acordo Secreto',
        mystery: 'Um acordo secreto entre empresas é descoberto, causando um escândalo.',
        solution: 'O acordo envolvia práticas ilegais de concorrência.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '🤝'
      }
    ]
  },
  {
    id: 'crimes-de-epoca',
    name: 'Crimes de Época',
    description: 'Volte ao passado e resolva crimes clássicos no estilo dos grandes detetives.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/8f7b75e3-ca56-481a-95af-af7f7f8b016e.png',
    category: 'classic',
    cases: [
      {
        id: 'ce1',
        order: 1,
        name: 'Mansão Sombria',
        mystery: 'Um assassinato em uma mansão antiga durante uma tempestade.',
        solution: 'O mordomo foi o culpado, motivado por herança.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder',
        icon: '🏚️'
      },
      {
        id: 'ce2',
        order: 2,
        name: 'Baile de Máscaras',
        mystery: 'Um roubo de joias em um baile de máscaras.',
        solution: 'O ladrão estava entre os convidados, disfarçado.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '🎭'
      },
      {
        id: 'ce3',
        order: 3,
        name: 'Vila Misteriosa',
        mystery: 'Um desaparecimento misterioso em uma pequena vila.',
        solution: 'A vítima fugiu para escapar de dívidas.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🏘️'
      }
    ]
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Investigue crimes que acontecem nas noites chuvosas da cidade.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/2a601ddc-13da-4a0a-8dce-983968670ebc.png',
    category: 'atmospheric',
    cases: [
      {
        id: 'ci1',
        order: 1,
        name: 'Tempestade Fatal',
        mystery: 'Um assassinato ocorre durante uma tempestade, sem testemunhas.',
        solution: 'O assassino usou a chuva para escapar sem ser visto.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder',
        icon: '🌧️'
      },
      {
        id: 'ci2',
        order: 2,
        name: 'Neblina Traíçoeira',
        mystery: 'Um carro desaparece na neblina da noite chuvosa.',
        solution: 'Foi roubado para encobrir outro crime.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🌫️'
      },
      {
        id: 'ci3',
        order: 3,
        name: 'Mensagem Molhada',
        mystery: 'Uma mensagem codificada é encontrada em uma garrafa na chuva.',
        solution: 'A mensagem revela a localização de um esconderijo.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '💌'
      }
    ]
  },
  {
    id: 'dose-letal',
    name: 'Dose Letal',
    description: 'Desvende casos envolvendo substâncias tóxicas e crimes químicos.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/9f3c7c39-613b-46d9-a2bc-e7b1091d0a41.png',
    category: 'forensic',
    cases: [
      {
        id: 'dl1',
        order: 1,
        name: 'Toxina Mortal',
        mystery: 'Uma série de envenenamentos misteriosos em uma pequena cidade.',
        solution: 'O culpado usava um veneno raro extraído de plantas.',
        difficulty: 'hard',
        isFree: true,
        theme: 'danger',
        icon: '☠️'
      },
      {
        id: 'dl2',
        order: 2,
        name: 'Cientista Desaparecido',
        mystery: 'Um cientista desaparece após descobrir uma nova toxina.',
        solution: 'Foi sequestrado para impedir a divulgação da descoberta.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🧪'
      },
      {
        id: 'dl3',
        order: 3,
        name: 'Laboratório Sombrio',
        mystery: 'Um laboratório clandestino é descoberto com substâncias perigosas.',
        solution: 'O laboratório produzia drogas ilegais.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '⚗️'
      }
    ]
  },
  {
    id: 'dossie-confidencial',
    name: 'Dossiê Confidencial',
    description: 'Acesse arquivos confidenciais e desvende conspirações governamentais.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/94e47921-ddae-490b-9625-a18c64c3e4c7.png',
    category: 'conspiracy',
    cases: [
      {
        id: 'dc1',
        order: 1,
        name: 'Arquivos Roubados',
        mystery: 'Documentos secretos desaparecem de um arquivo governamental.',
        solution: 'Um agente duplo roubou os documentos.',
        difficulty: 'hard',
        isFree: true,
        theme: 'conspiracy',
        icon: '📁'
      },
      {
        id: 'dc2',
        order: 2,
        name: 'Corrupção Exposta',
        mystery: 'Uma investigação revela corrupção em altos cargos públicos.',
        solution: 'Os envolvidos tentam encobrir as evidências.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🏛️'
      },
      {
        id: 'dc3',
        order: 3,
        name: 'Denunciante Silenciado',
        mystery: 'Um whistleblower desaparece após denunciar irregularidades.',
        solution: 'Foi silenciado por uma organização secreta.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🤐'
      }
    ]
  },
  {
    id: 'fim-de-jogo',
    name: 'Fim de Jogo',
    description: 'Crimes estratégicos que exigem raciocínio lógico como uma partida de xadrez.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/04b458ab-f733-4133-8907-18c2d01f7f71.png',
    category: 'strategic',
    cases: [
      {
        id: 'fj1',
        order: 1,
        name: 'Jogo Mortal',
        mystery: 'Um assassinato planejado como um jogo de xadrez, com pistas em cada movimento.',
        solution: 'O assassino é um mestre em estratégia que deixou um padrão.',
        difficulty: 'hard',
        isFree: true,
        theme: 'power',
        icon: '♟️'
      },
      {
        id: 'fj2',
        order: 2,
        name: 'Plano Complexo',
        mystery: 'Um roubo complexo que envolve múltiplos cúmplices e distrações.',
        solution: 'Cada cúmplice tinha um papel específico para o sucesso do plano.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🎯'
      },
      {
        id: 'fj3',
        order: 3,
        name: 'Enigma Lógico',
        mystery: 'Um enigma que desafia a lógica para encontrar o culpado.',
        solution: 'A solução está em decifrar o padrão dos eventos.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🧩'
      }
    ]
  },
  {
    id: 'ironias-do-destino',
    name: 'Ironias do Destino',
    description: 'Fragmente os mistérios e reconstrua a verdade através dos cacos da evidência.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/f3128054-35d3-474f-be84-575857ba985a.png',
    category: 'evidence',
    cases: [
      {
        id: 'id1',
        order: 1,
        name: 'Janela Quebrada',
        mystery: 'Uma janela quebrada é a única pista em um crime aparentemente perfeito.',
        solution: 'Os cacos indicam a direção do agressor.',
        difficulty: 'medium',
        isFree: true,
        theme: 'investigation',
        icon: '🔨'
      },
      {
        id: 'id2',
        order: 2,
        name: 'Fragmentos Reveladores',
        mystery: 'Fragmentos de vidro encontrados na cena do crime revelam um segredo.',
        solution: 'O vidro pertence a um objeto valioso roubado.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '💎'
      },
      {
        id: 'id3',
        order: 3,
        name: 'Sons Noturnos',
        mystery: 'Uma testemunha relata sons de vidro quebrando na noite do crime.',
        solution: 'O som foi usado para distrair a vítima.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '👂'
      }
    ]
  },
  {
    id: 'paxarodos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Mistérios sombrios em cenários urbanos cheios de perigos e segredos.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/188a8e9d-d579-487f-bf2d-6aa019d02e36.png',
    category: 'urban',
    cases: [
      {
        id: 'pm1',
        order: 1,
        name: 'Prédio Silencioso',
        mystery: 'Um prédio inteiro fica em silêncio após uma noite estranha.',
        solution: 'Todos os moradores foram sequestrados em uma operação coordenada.',
        difficulty: 'hard',
        isFree: true,
        theme: 'mystery',
        icon: '🏢'
      },
      {
        id: 'pm2',
        order: 2,
        name: 'Luzes da Cidade',
        mystery: 'Luzes piscando em um padrão estranho revelam uma mensagem codificada.',
        solution: 'É um pedido de socorro de alguém em cativeiro.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '💡'
      },
      {
        id: 'pm3',
        order: 3,
        name: 'Encontro Noturno',
        mystery: 'Um encontro secreto em um beco resulta em desaparecimento.',
        solution: 'Foi uma armadilha para silenciar uma testemunha.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🌃'
      }
    ]
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'Casos que desafiam a lógica e parecem impossíveis, mas têm explicações surpreendentes.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/daa83e7f-c9df-4b63-ac36-f4f4db10cf5d.png',
    category: 'surreal',
    cases: [
      {
        id: 'ar1',
        order: 1,
        name: 'Prisão do Tempo',
        mystery: 'Uma pessoa afirma estar presa em um loop temporal em uma prisão abandonada.',
        solution: 'É um distúrbio psicológico causado por isolamento extremo.',
        difficulty: 'hard',
        isFree: true,
        theme: 'mystery',
        icon: '⏰'
      },
      {
        id: 'ar2',
        order: 2,
        name: 'Ecos do Passado',
        mystery: 'Vozes do passado ecoam pelos corredores de uma antiga penitenciária.',
        solution: 'Gravações antigas foram plantadas para assustar invasores.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '👻'
      },
      {
        id: 'ar3',
        order: 3,
        name: 'Realidade Distorcida',
        mystery: 'A realidade parece se distorcer em um local específico da prisão.',
        solution: 'Drogas alucinógenas foram colocadas no sistema de ventilação.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🌀'
      }
    ]
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Explore mitos e lendas urbanas que se revelam mais reais do que imagina.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/bcf9d800-cc6d-48f3-8486-421eebfad7e0.png',
    category: 'folklore',
    cases: [
      {
        id: 'lu1',
        order: 1,
        name: 'Trem Fantasma',
        mystery: 'Um trem abandonado aparece misteriosamente nos trilhos à meia-noite.',
        solution: 'Contrabandistas usam um trem reformado para transporte ilegal.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery',
        icon: '🚂'
      },
      {
        id: 'lu2',
        order: 2,
        name: 'Trilhos do Destino',
        mystery: 'Pessoas desaparecem ao caminhar pelos trilhos abandonados.',
        solution: 'Uma gangue sequestra pessoas para trabalho forçado.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🛤️'
      },
      {
        id: 'lu3',
        order: 3,
        name: 'Última Estação',
        mystery: 'Uma estação fantasma aparece em mapas antigos mas não existe mais.',
        solution: 'A estação foi encoberta para esconder um crime histórico.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🚉'
      }
    ]
  },
  {
    id: 'viagem-sem-volta',
    name: 'Viagem sem Volta',
    description: 'Jornadas perigosas onde nem todos chegam ao destino final.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/42e039ab-0b70-4f72-a06e-b9c5bf02fe46.png',
    category: 'journey',
    cases: [
      {
        id: 'vsv1',
        order: 1,
        name: 'Destino Final',
        mystery: 'Passageiros de um trem desaparecem antes de chegar ao destino.',
        solution: 'O condutor estava vendendo passageiros para traficantes.',
        difficulty: 'hard',
        isFree: true,
        theme: 'danger',
        icon: '🎫'
      },
      {
        id: 'vsv2',
        order: 2,
        name: 'Trilha Perdida',
        mystery: 'Um grupo de turistas se perde em uma trilha bem marcada.',
        solution: 'Alguém alterou as placas para desviar os turistas.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🥾'
      },
      {
        id: 'vsv3',
        order: 3,
        name: 'Retorno Impossível',
        mystery: 'Pessoas que fazem uma viagem específica nunca conseguem voltar.',
        solution: 'É uma operação de sequestro disfarçada de turismo.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '↩️'
      }
    ]
  },
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'Mistérios que só se revelam quando a escuridão toma conta da cidade.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/34c251ba-c4c2-4172-bfb8-70d72411b3b0.png',
    category: 'nocturnal',
    cases: [
      {
        id: 'sn1',
        order: 1,
        name: 'Vigilante Noturno',
        mystery: 'Um vigilante misterioso aparece apenas durante a madrugada.',
        solution: 'É um policial aposentado que investiga casos arquivados.',
        difficulty: 'hard',
        isFree: true,
        theme: 'investigation',
        icon: '🌙'
      },
      {
        id: 'sn2',
        order: 2,
        name: 'Crimes Noturnos',
        mystery: 'Uma série de crimes acontece sempre no mesmo horário da madrugada.',
        solution: 'O criminoso trabalha no turno da noite e conhece as rotas de patrulha.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🕛'
      },
      {
        id: 'sn3',
        order: 3,
        name: 'Testemunha das Sombras',
        mystery: 'Uma testemunha afirma ter visto algo impossível durante a noite.',
        solution: 'Ela viu um crime sendo encenado para criar um álibi falso.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👁️'
      }
    ]
  },
  {
    id: 'sussurros-do-alem',
    name: 'Sussurros do Além',
    description: 'Vozes do passado que trazem segredos enterrados há muito tempo.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/ce660aa4-1ed1-4019-bef2-65d5dd86c0e6.png',
    category: 'supernatural',
    cases: [
      {
        id: 'sa1',
        order: 1,
        name: 'Vozes Antigas',
        mystery: 'Vozes misteriosas são ouvidas em um local histórico abandonado.',
        solution: 'Gravações foram escondidas para revelar um crime antigo.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery',
        icon: '🗣️'
      },
      {
        id: 'sa2',
        order: 2,
        name: 'Mensagens Cifradas',
        mystery: 'Mensagens aparecem escritas nas paredes de forma misteriosa.',
        solution: 'Um morador em segredo está deixando pistas sobre um crime.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '✍️'
      },
      {
        id: 'sa3',
        order: 3,
        name: 'Segredos Revelados',
        mystery: 'Segredos de família são revelados através de pistas sobrenaturais.',
        solution: 'Um parente está expondo verdades escondidas anonimamente.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '🔮'
      }
    ]
  }
];

export const MERCADOPAGO_LINKS = {
  individual: '184163814-ebfc1885-acbb-4a9f-89d9-481e569b15b6',
  combo: '184163814-186d6326-c239-4676-b240-fac644c29f0e',
  complete: '184163814-b6e81aba-f60e-4256-8a73-2658243e4259'
};

// Utility functions
export const getUserPacks = (userId: string): string[] => {
  const purchases = JSON.parse(localStorage.getItem(`purchases_${userId}`) || '[]');
  return purchases.map((p: Purchase) => p.packId);
};

export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

export const purchasePack = (userId: string, packId: string, price: number, transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem(`purchases_${userId}`) || '[]');
  const newPurchase: Purchase = {
    id: `purchase_${Date.now()}`,
    userId,
    packId,
    price,
    price_paid: price,
    purchased_at: new Date().toISOString(),
    transactionId
  };
  purchases.push(newPurchase);
  localStorage.setItem(`purchases_${userId}`, JSON.stringify(purchases));
};

export const getUserPurchases = (userId: string): Purchase[] => {
  return JSON.parse(localStorage.getItem(`purchases_${userId}`) || '[]');
};

// Export types
export type { Pack, Case, Purchase };
