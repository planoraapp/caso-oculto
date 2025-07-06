import { Pack } from './types';

export const packs: Pack[] = [
  {
    id: 'cerebro-misterioso',
    name: 'Cérebro Misterioso',
    description: 'Mergulhe nos enigmas da mente humana e desvende mistérios psicológicos complexos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/2a63015d-4155-45f1-aa6c-a1a78f91a7d2.png',
    category: 'psychological',
    cases: [
      {
        id: 'cm1',
        order: 1,
        mystery: 'Um paciente acorda sem memória e com um comportamento estranho. Qual é a causa?',
        solution: 'Amnésia dissociativa causada por trauma psicológico.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery'
      },
      {
        id: 'cm2',
        order: 2,
        mystery: 'Uma série de sonhos recorrentes revelam pistas sobre um crime não resolvido.',
        solution: 'O sonhador é testemunha subconsciente do crime.',
        difficulty: 'medium',
        theme: 'mystery'
      },
      {
        id: 'cm3',
        order: 3,
        mystery: 'Um psicólogo desaparece após descobrir segredos obscuros de seus pacientes.',
        solution: 'Foi sequestrado por um paciente instável.',
        difficulty: 'hard',
        theme: 'thriller'
      }
    ]
  },
  {
    id: 'caso-oculto',
    name: 'Caso Oculto',
    description: 'Investigue crimes sombrios em cenários urbanos cheios de segredos.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/7ba0dfbf-4fdb-4ba4-a328-c56e1e43338a.png',
    category: 'noir',
    cases: [
      {
        id: 'co1',
        order: 1,
        mystery: 'Um corpo é encontrado em um beco com uma mensagem enigmática.',
        solution: 'A mensagem é um código que revela o assassino.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder'
      },
      {
        id: 'co2',
        order: 2,
        mystery: 'Um detetive particular é contratado para desvendar um desaparecimento misterioso.',
        solution: 'O desaparecido forjou seu próprio sumiço.',
        difficulty: 'hard',
        theme: 'investigation'
      },
      {
        id: 'co3',
        order: 3,
        mystery: 'Uma série de roubos em uma cidade pequena parecem estar conectados a um segredo antigo.',
        solution: 'Os roubos são distrações para um crime maior.',
        difficulty: 'hard',
        theme: 'theft'
      }
    ]
  },
  {
    id: 'beco-sombrio',
    name: 'Beco Sombrio',
    description: 'Explore os cantos mais escuros da cidade onde os crimes mais terríveis acontecem.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/d8636981-dee1-40ad-91bd-0ab35d871077.png',
    category: 'thriller',
    cases: [
      {
        id: 'bs1',
        order: 1,
        mystery: 'Um informante desaparece após revelar informações sobre uma gangue local.',
        solution: 'Foi capturado para impedir que falasse.',
        difficulty: 'hard',
        isFree: true,
        theme: 'crime'
      },
      {
        id: 'bs2',
        order: 2,
        mystery: 'Uma testemunha chave é assassinada antes do julgamento.',
        solution: 'O assassino queria garantir a impunidade.',
        difficulty: 'hard',
        theme: 'murder'
      },
      {
        id: 'bs3',
        order: 3,
        mystery: 'Um pacote misterioso é deixado em um beco, contendo pistas para um grande roubo.',
        solution: 'O pacote é uma armadilha para a polícia.',
        difficulty: 'hard',
        theme: 'theft'
      }
    ]
  },
  {
    id: 'duelo-corporativo',
    name: 'Duelo Corporativo',
    description: 'Desvende os mistérios por trás de crimes empresariais e conflitos corporativos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/494fd0cb-99c2-48cb-bd87-1b63007c684a.png',
    category: 'corporate',
    cases: [
      {
        id: 'dc1',
        order: 1,
        mystery: 'Um executivo é encontrado morto em seu escritório com documentos desaparecidos.',
        solution: 'Foi assassinado para esconder informações confidenciais.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder'
      },
      {
        id: 'dc2',
        order: 2,
        mystery: 'Uma sabotagem ameaça a reputação de uma grande empresa.',
        solution: 'Um funcionário descontente é o responsável.',
        difficulty: 'medium',
        theme: 'crime'
      },
      {
        id: 'dc3',
        order: 3,
        mystery: 'Um acordo secreto entre empresas é descoberto, causando um escândalo.',
        solution: 'O acordo envolvia práticas ilegais de concorrência.',
        difficulty: 'medium',
        theme: 'conspiracy'
      }
    ]
  },
  {
    id: 'detetives-vintage',
    name: 'Detetives Vintage',
    description: 'Volte ao passado e resolva crimes clássicos no estilo dos grandes detetives.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/d14ed06b-6677-4ee7-8d46-c259bf049d54.png',
    category: 'classic',
    cases: [
      {
        id: 'dv1',
        order: 1,
        mystery: 'Um assassinato em uma mansão antiga durante uma tempestade.',
        solution: 'O mordomo foi o culpado, motivado por herança.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder'
      },
      {
        id: 'dv2',
        order: 2,
        mystery: 'Um roubo de joias em um baile de máscaras.',
        solution: 'O ladrão estava entre os convidados, disfarçado.',
        difficulty: 'medium',
        theme: 'theft'
      },
      {
        id: 'dv3',
        order: 3,
        mystery: 'Um desaparecimento misterioso em uma pequena vila.',
        solution: 'A vítima fugiu para escapar de dívidas.',
        difficulty: 'medium',
        theme: 'investigation'
      }
    ]
  },
  {
    id: 'chuva-noturna',
    name: 'Chuva Noturna',
    description: 'Investigue crimes que acontecem nas noites chuvosas da cidade.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/2a601ddc-13da-4a0a-8dce-983968670ebc.png',
    category: 'atmospheric',
    cases: [
      {
        id: 'cn1',
        order: 1,
        mystery: 'Um assassinato ocorre durante uma tempestade, sem testemunhas.',
        solution: 'O assassino usou a chuva para escapar sem ser visto.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder'
      },
      {
        id: 'cn2',
        order: 2,
        mystery: 'Um carro desaparece na neblina da noite chuvosa.',
        solution: 'Foi roubado para encobrir outro crime.',
        difficulty: 'hard',
        theme: 'theft'
      },
      {
        id: 'cn3',
        order: 3,
        mystery: 'Uma mensagem codificada é encontrada em uma garrafa na chuva.',
        solution: 'A mensagem revela a localização de um esconderijo.',
        difficulty: 'hard',
        theme: 'mystery'
      }
    ]
  },
  {
    id: 'veneno-verde',
    name: 'Veneno Verde',
    description: 'Desvende casos envolvendo substâncias tóxicas e crimes químicos.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/9f3c7c39-613b-46d9-a2bc-e7b1091d0a41.png',
    category: 'forensic',
    cases: [
      {
        id: 'vv1',
        order: 1,
        mystery: 'Uma série de envenenamentos misteriosos em uma pequena cidade.',
        solution: 'O culpado usava um veneno raro extraído de plantas.',
        difficulty: 'hard',
        isFree: true,
        theme: 'danger'
      },
      {
        id: 'vv2',
        order: 2,
        mystery: 'Um cientista desaparece após descobrir uma nova toxina.',
        solution: 'Foi sequestrado para impedir a divulgação da descoberta.',
        difficulty: 'hard',
        theme: 'conspiracy'
      },
      {
        id: 'vv3',
        order: 3,
        mystery: 'Um laboratório clandestino é descoberto com substâncias perigosas.',
        solution: 'O laboratório produzia drogas ilegais.',
        difficulty: 'hard',
        theme: 'crime'
      }
    ]
  },
  {
    id: 'dossie-secreto',
    name: 'Dossiê Secreto',
    description: 'Acesse arquivos confidenciais e desvende conspirações governamentais.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/94e47921-ddae-490b-9625-a18c64c3e4c7.png',
    category: 'conspiracy',
    cases: [
      {
        id: 'ds1',
        order: 1,
        mystery: 'Documentos secretos desaparecem de um arquivo governamental.',
        solution: 'Um agente duplo roubou os documentos.',
        difficulty: 'hard',
        isFree: true,
        theme: 'conspiracy'
      },
      {
        id: 'ds2',
        order: 2,
        mystery: 'Uma investigação revela corrupção em altos cargos públicos.',
        solution: 'Os envolvidos tentam encobrir as evidências.',
        difficulty: 'hard',
        theme: 'crime'
      },
      {
        id: 'ds3',
        order: 3,
        mystery: 'Um whistleblower desaparece após denunciar irregularidades.',
        solution: 'Foi silenciado por uma organização secreta.',
        difficulty: 'hard',
        theme: 'danger'
      }
    ]
  },
  {
    id: 'xeque-mate',
    name: 'Xeque-Mate',
    description: 'Crimes estratégicos que exigem raciocínio lógico como uma partida de xadrez.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/04b458ab-f733-4133-8907-18c2d01f7f71.png',
    category: 'strategic',
    cases: [
      {
        id: 'xm1',
        order: 1,
        mystery: 'Um assassinato planejado como um jogo de xadrez, com pistas em cada movimento.',
        solution: 'O assassino é um mestre em estratégia que deixou um padrão.',
        difficulty: 'hard',
        isFree: true,
        theme: 'power'
      },
      {
        id: 'xm2',
        order: 2,
        mystery: 'Um roubo complexo que envolve múltiplos cúmplices e distrações.',
        solution: 'Cada cúmplice tinha um papel específico para o sucesso do plano.',
        difficulty: 'hard',
        theme: 'theft'
      },
      {
        id: 'xm3',
        order: 3,
        mystery: 'Um enigma que desafia a lógica para encontrar o culpado.',
        solution: 'A solução está em decifrar o padrão dos eventos.',
        difficulty: 'hard',
        theme: 'mystery'
      }
    ]
  },
  {
    id: 'vidro-partido',
    name: 'Vidro Partido',
    description: 'Fragmente os mistérios e reconstrua a verdade através dos cacos da evidência.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/f3128054-35d3-474f-be84-575857ba985a.png',
    category: 'evidence',
    cases: [
      {
        id: 'vp1',
        order: 1,
        mystery: 'Uma janela quebrada é a única pista em um crime aparentemente perfeito.',
        solution: 'Os cacos indicam a direção do agressor.',
        difficulty: 'medium',
        isFree: true,
        theme: 'investigation'
      },
      {
        id: 'vp2',
        order: 2,
        mystery: 'Fragmentos de vidro encontrados na cena do crime revelam um segredo.',
        solution: 'O vidro pertence a um objeto valioso roubado.',
        difficulty: 'medium',
        theme: 'theft'
      },
      {
        id: 'vp3',
        order: 3,
        mystery: 'Uma testemunha relata sons de vidro quebrando na noite do crime.',
        solution: 'O som foi usado para distrair a vítima.',
        difficulty: 'medium',
        theme: 'mystery'
      }
    ]
  },
  // Additional packs can be added here if needed
];

// Additional utility functions and constants related to packs can be defined below if needed.
