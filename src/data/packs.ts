// Imports and interfaces
export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  theme: string;
  solution: string;
  isFree: boolean;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  image: string;
  category: string;
  cases: Case[];
}

export const packs: Pack[] = [
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam nas horas mais sombrias, onde segredos são revelados sob o manto da escuridão.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/lovable-uploads/2e7dff68-1480-4f1e-9fff-bb3eacae2f7b.png',
    category: 'mystery',
    cases: [
      {
        id: 'sombras-1',
        title: 'O Vigilante Solitário',
        description: 'Um segurança noturno desaparece misteriosamente durante sua ronda.',
        difficulty: 'Fácil',
        theme: 'urban',
        solution: 'O vigilante descobriu um esquema de roubo interno e foi silenciado pelos próprios colegas.',
        isFree: true
      },
      {
        id: 'sombras-2',
        title: 'Luzes na Janela',
        description: 'Moradores relatam luzes estranhas em uma casa abandonada.',
        difficulty: 'Fácil',
        theme: 'supernatural',
        solution: 'Contrabandistas usavam a casa como esconderijo, usando lanternas para comunicação.',
        isFree: true
      },
      {
        id: 'sombras-3',
        title: 'O Último Turno',
        description: 'Uma enfermeira do turno da noite encontra pacientes em estado catatônico.',
        difficulty: 'Intermediário',
        theme: 'medical',
        solution: 'Medicamentos vencidos causavam reações adversas, administrados por negligência.',
        isFree: false
      },
      {
        id: 'sombras-4',
        title: 'Sombras no Espelho',
        description: 'Um fotógrafo noturno captura imagens perturbadoras.',
        difficulty: 'Difícil',
        theme: 'psychological',
        solution: 'Dupla exposição acidental revelou atividades criminosas no local.',
        isFree: false
      }
    ]
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Casos onde os criminosos cometeram erros fatais que levaram à sua captura.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/lovable-uploads/854e76ba-1423-4b2a-bf59-2f1394558793.png',
    category: 'crime',
    cases: [
      {
        id: 'crimes-1',
        title: 'A Alibi Imperfeita',
        description: 'Um suspeito apresenta uma alibi que parece sólida demais.',
        difficulty: 'Fácil',
        theme: 'legal',
        solution: 'O suspeito memorizou horários falsos mas esqueceu de verificar fuso horário.',
        isFree: true
      },
      {
        id: 'crimes-2',
        title: 'Pegadas na Neve',
        description: 'Rastros na neve levam a conclusões inesperadas.',
        difficulty: 'Fácil',
        theme: 'forensic',
        solution: 'O criminoso usou sapatos de número diferente para despistar, mas esqueceu da marca única.',
        isFree: true
      },
      {
        id: 'crimes-3',
        title: 'O Celular Delator',
        description: 'Dados de um smartphone revelam mais do que o esperado.',
        difficulty: 'Intermediário',
        theme: 'technology',
        solution: 'GPS do aparelho registrou localização exata no momento do crime.',
        isFree: false
      },
      {
        id: 'crimes-4',
        title: 'Dinheiro Marcado',
        description: 'Notas de dinheiro carregam pistas importantes.',
        difficulty: 'Difícil',
        theme: 'financial',
        solution: 'Numeração sequencial das notas rastreou o banco de origem do roubo.',
        isFree: false
      }
    ]
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco Sem Saída',
    description: 'Investigações que parecem não ter solução, mas sempre há uma saída.',
    price: 14.80,
    difficulty: 'Difícil',
    image: '/public/images/covers/amostra.jpg',
    category: 'investigation',
    cases: [
      {
        id: 'beco-1',
        title: 'O Quarto Trancado',
        description: 'Um homem é encontrado morto em um quarto trancado por dentro.',
        difficulty: 'Fácil',
        theme: 'classic',
        solution: 'Gelo derretido permitiu que a chave caísse do lado interno da porta.',
        isFree: true
      },
      {
        id: 'beco-2',
        title: 'Testemunha Invisível',
        description: 'Ninguém viu o crime, mas há evidências de uma testemunha.',
        difficulty: 'Fácil',
        theme: 'witness',
        solution: 'Câmera de segurança pet registrou tudo através dos olhos de um papagaio.',
        isFree: true
      },
      {
        id: 'beco-3',
        title: 'O Eco do Passado',
        description: 'Crimes antigos voltam para assombrar o presente.',
        difficulty: 'Intermediário',
        theme: 'historical',
        solution: 'Padrão de crimes idêntico revelou copycat usando arquivos policiais antigos.',
        isFree: false
      },
      {
        id: 'beco-4',
        title: 'Labirinto Urbano',
        description: 'Perseguição pelas ruas termina em desaparecimento.',
        difficulty: 'Difícil',
        theme: 'urban',
        solution: 'Sistema de túneis abandonados conectava edifícios da região.',
        isFree: false
      }
    ]
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Mitos e lendas que escondem verdades perturbadoras.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/public/images/covers/amostra.jpg',
    category: 'supernatural',
    cases: [
      {
        id: 'lendas-1',
        title: 'A Dama de Branco',
        description: 'Aparições de uma mulher vestida de branco aterrorizam motoristas.',
        difficulty: 'Fácil',
        theme: 'ghost',
        solution: 'Paciente fugitiva do hospital psiquiátrico caminhava pela estrada.',
        isFree: true
      },
      {
        id: 'lendas-2',
        title: 'O Cachorro Fantasma',
        description: 'Um cão gigantesco assombra o cemitério local.',
        difficulty: 'Fácil',
        theme: 'animal',
        solution: 'Cão pastor alemão perdido protegia túmulo do antigo dono.',
        isFree: true
      },
      {
        id: 'lendas-3',
        title: 'Casa das Vozes',
        description: 'Residência abandonada onde se ouvem sussurros.',
        difficulty: 'Intermediário',
        theme: 'haunted',
        solution: 'Sistema de ventilação defeituoso amplificava sons da rua.',
        isFree: false
      },
      {
        id: 'lendas-4',
        title: 'O Homem do Saco',
        description: 'Figura misteriosa sequestra crianças na calada da noite.',
        difficulty: 'Difícil',
        theme: 'kidnapping',
        solution: 'Trabalhador de limpeza urbana trabalhava de madrugada, mal interpretado.',
        isFree: false
      }
    ]
  },
  {
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Casos onde a lógica tradicional não se aplica e paradoxos revelam a verdade.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    category: 'psychological',
    cases: [
      {
        id: 'paradoxos-1',
        title: 'O Suicídio Impossível',
        description: 'Homem comete suicídio de forma fisicamente impossível.',
        difficulty: 'Fácil',
        theme: 'suicide',
        solution: 'Acidente durante tentativa de encenar suicídio para seguro.',
        isFree: true
      },
      {
        id: 'paradoxos-2',
        title: 'A Vítima Culpada',
        description: 'Investigação revela que a vítima é o verdadeiro criminoso.',
        difficulty: 'Fácil',
        theme: 'twist',
        solution: 'Vítima forjou própria morte para escapar de crimes passados.',
        isFree: true
      },
      {
        id: 'paradoxos-3',
        title: 'Tempo Perdido',
        description: 'Suspeito não consegue explicar paradoxo temporal em sua alibi.',
        difficulty: 'Intermediário',
        theme: 'time',
        solution: 'Mudança de horário de verão confundiu linha temporal dos eventos.',
        isFree: false
      },
      {
        id: 'paradoxos-4',
        title: 'O Detetive Culpado',
        description: 'Evidências apontam o próprio investigador como culpado.',
        difficulty: 'Difícil',
        theme: 'meta',
        solution: 'Criminoso plantou evidências usando conhecimento interno da investigação.',
        isFree: false
      }
    ]
  }
];

// Função para adicionar todos os packs para admin
export const purchasePack = (userId: string, packId: string, pricePaid: number, transactionId: string) => {
  // Implementação fictícia para registrar compra
  // Em produção, isso deve gravar no banco de dados
  console.log(`Usuário ${userId} comprou pack ${packId} por R$${pricePaid} (transação: ${transactionId})`);
};

export const getUserPacks = (userId: string): string[] => {
  // Retorna lista de packIds adquiridos pelo usuário
  // Implementação fictícia para demonstração
  return [];
};

export const getUserPurchases = (userId: string): any[] => {
  // Retorna histórico de compras do usuário
  // Implementação fictícia para demonstração
  return [];
};

// Função para adicionar todos os packs para admin
export const grantAllPacksToAdmin = (adminEmail: string = 'conectawebapps@outlook.com') => {
  if (adminEmail === 'conectawebapps@outlook.com') {
    packs.forEach(pack => {
      purchasePack('admin-user', pack.id, 0, 'admin-access');
    });
  }
};

// Auto-conceder packs para admin na inicialização
grantAllPacksToAdmin();
