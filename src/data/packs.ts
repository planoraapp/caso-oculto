
// Imports and interfaces
export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  theme: string;
  solution: string;
  isFree: boolean;
  order: number;
  mystery: string;
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
  cards: Case[]; // Alias for backward compatibility
  isFree: boolean;
  coverUrl: string;
}

// Add Card export for backward compatibility
export type Card = Case;

// Mercado Pago links
export const MERCADOPAGO_LINKS = {
  individual: 'TEST-individual-pack-preference',
  combo: 'TEST-combo-pack-preference',
  complete: 'TEST-complete-access-preference'
};

export const packs: Pack[] = [
  {
    id: 'sombras-da-noite',
    name: 'Sombras da Noite',
    description: 'Mistérios que se desenrolam nas horas mais sombrias, onde segredos são revelados sob o manto da escuridão.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/lovable-uploads/2e7dff68-1480-4f1e-9fff-bb3eacae2f7b.png',
    coverUrl: '/lovable-uploads/2e7dff68-1480-4f1e-9fff-bb3eacae2f7b.png',
    category: 'mystery',
    isFree: false,
    cases: [
      {
        id: 'sombras-1',
        order: 1,
        title: 'O Vigilante Solitário',
        description: 'Um segurança noturno desaparece misteriosamente durante sua ronda.',
        mystery: 'Durante uma noite fria de inverno, João, segurança do complexo empresarial Torres Gêmeas, desaparece sem deixar rastros. Suas chaves foram encontradas no chão do estacionamento, mas as câmeras de segurança mostram apenas sombras confusas.',
        difficulty: 'easy',
        theme: 'urban',
        solution: 'O vigilante descobriu um esquema de roubo interno e foi silenciado pelos próprios colegas.',
        isFree: true
      },
      {
        id: 'sombras-2',
        order: 2,
        title: 'Luzes na Janela',
        description: 'Moradores relatam luzes estranhas em uma casa abandonada.',
        mystery: 'A casa da Rua das Flores está vazia há 3 anos, mas vizinhos juram ver luzes se movendo pelas janelas todas as noites às 3h da manhã. A polícia não encontrou sinais de invasão.',
        difficulty: 'easy',
        theme: 'supernatural',
        solution: 'Contrabandistas usavam a casa como esconderijo, usando lanternas para comunicação.',
        isFree: true
      },
      {
        id: 'sombras-3',
        order: 3,
        title: 'O Último Turno',
        description: 'Uma enfermeira do turno da noite encontra pacientes em estado catatônico.',
        mystery: 'No Hospital São Vicente, a enfermeira Marina encontra cinco pacientes diferentes em estado catatônico após sua ronda noturna. Todos estavam conscientes uma hora antes.',
        difficulty: 'medium',
        theme: 'medical',
        solution: 'Medicamentos vencidos causavam reações adversas, administrados por negligência.',
        isFree: false
      },
      {
        id: 'sombras-4',
        order: 4,
        title: 'Sombras no Espelho',
        description: 'Um fotógrafo noturno captura imagens perturbadoras.',
        mystery: 'Pedro, fotógrafo urbano, desenvolve suas fotos noturnas e descobre figuras sombrias que não viu no momento do clique. As imagens revelam atividades suspeitas.',
        difficulty: 'hard',
        theme: 'psychological',
        solution: 'Dupla exposição acidental revelou atividades criminosas no local.',
        isFree: false
      }
    ],
    cards: [] // Will be set below
  },
  {
    id: 'crimes-imperfeitos',
    name: 'Crimes Imperfeitos',
    description: 'Casos onde os criminosos cometeram erros fatais que levaram à sua captura.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/lovable-uploads/854e76ba-1423-4b2a-bf59-2f1394558793.png',
    coverUrl: '/lovable-uploads/854e76ba-1423-4b2a-bf59-2f1394558793.png',
    category: 'crime',
    isFree: false,
    cases: [
      {
        id: 'crimes-1',
        order: 1,
        title: 'A Álibi Imperfeita',
        description: 'Um suspeito apresenta uma álibi que parece sólida demais.',
        mystery: 'Roberto afirma estar no cinema durante o assalto ao banco. Tem ingresso, testemunhas e até selfie com horário. Mas algo não bate na história perfeita demais.',
        difficulty: 'easy',
        theme: 'legal',
        solution: 'O suspeito memorizou horários falsos mas esqueceu de verificar fuso horário.',
        isFree: true
      },
      {
        id: 'crimes-2',
        order: 2,
        title: 'Pegadas na Neve',
        description: 'Rastros na neve levam a conclusões inesperadas.',
        mystery: 'Após um roubo na cabana da montanha, a polícia segue pegadas na neve fresca. Os rastros levam a uma direção, mas o criminoso foi encontrado na direção oposta.',
        difficulty: 'easy',
        theme: 'forensic',
        solution: 'O criminoso usou sapatos de número diferente para despistar, mas esqueceu da marca única.',
        isFree: true
      },
      {
        id: 'crimes-3',
        order: 3,
        title: 'O Celular Delator',
        description: 'Dados de um smartphone revelam mais do que o esperado.',
        mystery: 'Após um sequestro, o criminoso é preso mas nega qualquer envolvimento. Seu smartphone estava desligado durante o crime, criando uma álibi digital.',
        difficulty: 'medium',
        theme: 'technology',
        solution: 'GPS do aparelho registrou localização exata no momento do crime.',
        isFree: false
      },
      {
        id: 'crimes-4',
        order: 4,
        title: 'Dinheiro Marcado',
        description: 'Notas de dinheiro carregam pistas importantes.',
        mystery: 'Um assaltante é preso com dinheiro "limpo" dias após o roubo ao banco. As notas não têm marcas visíveis de identificação, mas escondem um segredo.',
        difficulty: 'hard',
        theme: 'financial',
        solution: 'Numeração sequencial das notas rastreou o banco de origem do roubo.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'beco-sem-saida',
    name: 'Beco Sem Saída',
    description: 'Investigações que parecem não ter solução, mas sempre há uma saída.',
    price: 14.80,
    difficulty: 'Difícil',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'investigation',
    isFree: false,
    cases: [
      {
        id: 'beco-1',
        order: 1,
        title: 'O Quarto Trancado',
        description: 'Um homem é encontrado morto em um quarto trancado por dentro.',
        mystery: 'Eduardo foi encontrado morto em seu escritório. A porta estava trancada por dentro, janelas fechadas, nenhum sinal de luta. Como o assassino saiu?',
        difficulty: 'easy',
        theme: 'classic',
        solution: 'Gelo derretido permitiu que a chave caísse do lado interno da porta.',
        isFree: true
      },
      {
        id: 'beco-2',
        order: 2,
        title: 'Testemunha Invisível',
        description: 'Ninguém viu o crime, mas há evidências de uma testemunha.',
        mystery: 'Um homicídio acontece em plena luz do dia numa praça movimentada. Ninguém viu nada, mas há sinais claros de que alguém presenciou tudo.',
        difficulty: 'easy',
        theme: 'witness',
        solution: 'Câmera de segurança pet registrou tudo através dos olhos de um papagaio.',
        isFree: true
      },
      {
        id: 'beco-3',
        order: 3,
        title: 'O Eco do Passado',
        description: 'Crimes antigos voltam para assombrar o presente.',
        mystery: 'Uma série de crimes idênticos aos ocorridos há 20 anos ressurge na cidade. O criminoso original está morto há 10 anos. Quem está copiando seus métodos?',
        difficulty: 'medium',
        theme: 'historical',
        solution: 'Padrão de crimes idêntico revelou copycat usando arquivos policiais antigos.',
        isFree: false
      },
      {
        id: 'beco-4',
        order: 4,
        title: 'Labirinto Urbano',
        description: 'Perseguição pelas ruas termina em desaparecimento.',
        mystery: 'Durante uma perseguição policial, o suspeito entra em um beco sem saída. Quando a polícia chega, ele desapareceu. Não há escadas de incêndio ou saídas.',
        difficulty: 'hard',
        theme: 'urban',
        solution: 'Sistema de túneis abandonados conectava edifícios da região.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'lendas-urbanas',
    name: 'Lendas Urbanas',
    description: 'Mitos e lendas que escondem verdades perturbadoras.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'supernatural',
    isFree: false,
    cases: [
      {
        id: 'lendas-1',
        order: 1,
        title: 'A Dama de Branco',
        description: 'Aparições de uma mulher vestida de branco aterrorizam motoristas.',
        mystery: 'Na estrada da Serra, motoristas relatam uma mulher de branco que aparece no meio da pista. Vários acidentes foram causados por tentativas de desvio.',
        difficulty: 'easy',
        theme: 'ghost',
        solution: 'Paciente fugitiva do hospital psiquiátrico caminhava pela estrada.',
        isFree: true
      },
      {
        id: 'lendas-2',
        order: 2,
        title: 'O Cachorro Fantasma',
        description: 'Um cão gigantesco assombra o cemitério local.',
        mystery: 'Visitantes do Cemitério da Paz relatam um cachorro preto gigante que aparece durante a noite, uivando próximo aos túmulos mais antigos.',
        difficulty: 'easy',
        theme: 'animal',
        solution: 'Cão pastor alemão perdido protegia túmulo do antigo dono.',
        isFree: true
      },
      {
        id: 'lendas-3',
        order: 3,
        title: 'Casa das Vozes',
        description: 'Residência abandonada onde se ouvem sussurros.',
        mystery: 'A casa da Rua do Ouvidor está vazia há anos, mas vizinhos escutam conversas e sussurros vindos do interior durante a madrugada.',
        difficulty: 'medium',
        theme: 'haunted',
        solution: 'Sistema de ventilação defeituoso amplificava sons da rua.',
        isFree: false
      },
      {
        id: 'lendas-4',
        order: 4,
        title: 'O Homem do Saco',
        description: 'Figura misteriosa sequestra crianças na calada da noite.',
        mystery: 'Crianças da Vila Esperança relatam um homem encapuzado carregando um saco grande, que persegue quem anda sozinho após o anoitecer.',
        difficulty: 'hard',
        theme: 'kidnapping',
        solution: 'Trabalhador de limpeza urbana trabalhava de madrugada, mal interpretado.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'absurdamente-real',
    name: 'Absurdamente Real',
    description: 'Casos tão bizarros que parecem ficção, mas aconteceram de verdade.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'bizarre',
    isFree: false,
    cases: [
      {
        id: 'real-1',
        order: 1,
        title: 'O Ladrão Educado',
        description: 'Assaltante deixa bilhete de desculpas para as vítimas.',
        mystery: 'Uma série de assaltos intriga a polícia: o ladrão sempre deixa bilhetes pedindo desculpas e explicando suas motivações pessoais.',
        difficulty: 'easy',
        theme: 'unusual',
        solution: 'Ex-professor desempregado roubava para pagar tratamento da filha.',
        isFree: true
      },
      {
        id: 'real-2',
        order: 2,
        title: 'Chuva de Peixes',
        description: 'Peixes caem do céu em dia ensolarado.',
        mystery: 'Em pleno centro da cidade, centenas de peixes caem do céu durante um dia claro. Não há corpos d água próximos.',
        difficulty: 'easy',
        theme: 'natural',
        solution: 'Tornado aquático transportou peixes de lago distante.',
        isFree: true
      },
      {
        id: 'real-3',
        order: 3,
        title: 'O Morto que Votou',
        description: 'Homem falecido aparece votando nas eleições.',
        mystery: 'Joaquim Silva, morto há 6 meses, aparece como votante nas últimas eleições municipais. Seu voto foi registrado normalmente.',
        difficulty: 'medium',
        theme: 'bureaucratic',
        solution: 'Erro no sistema permitiu uso de título eleitoral por homônimo.',
        isFree: false
      },
      {
        id: 'real-4',
        order: 4,
        title: 'A Árvore Sangrenta',
        description: 'Árvore centenária "sangra" todos os dias às 18h.',
        mystery: 'Uma árvore no parque municipal "sangra" líquido vermelho todos os dias no mesmo horário, assustando os moradores locais.',
        difficulty: 'hard',
        theme: 'natural',
        solution: 'Seiva vermelha combinada com pressão atmosférica criava o fenômeno.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'dossie-confidencial',
    name: 'Dossiê Confidencial',
    description: 'Arquivos secretos e casos que o governo não quer que você saiba.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'conspiracy',
    isFree: false,
    cases: [
      {
        id: 'dossie-1',
        order: 1,
        title: 'Operação Fantasma',
        description: 'Soldados desaparecem durante missão oficial.',
        mystery: 'Cinco soldados desaparecem durante uma operação de rotina. Oficialmente, nunca existiram. Não há registros da missão.',
        difficulty: 'easy',
        theme: 'military',
        solution: 'Missão secreta foi encoberta após falha de segurança.',
        isFree: true
      },
      {
        id: 'dossie-2',
        order: 2,
        title: 'O Arquivo Perdido',
        description: 'Documento confidencial some de cofre ultra-seguro.',
        mystery: 'Um arquivo top-secret desaparece de um cofre com 5 sistemas de segurança diferentes. Não há sinais de arrombamento.',
        difficulty: 'easy',
        theme: 'espionage',
        solution: 'Funcionário com acesso autorizado era espião duplo.',
        isFree: true
      },
      {
        id: 'dossie-3',
        order: 3,
        title: 'Projeto Silêncio',
        description: 'Experimento governamental com efeitos colaterais.',
        mystery: 'Moradores de uma cidade pequena desenvolvem sintomas idênticos sem causa aparente. O governo nega qualquer experimento.',
        difficulty: 'medium',
        theme: 'experiment',
        solution: 'Teste de arma química vazou acidentalmente.',
        isFree: false
      },
      {
        id: 'dossie-4',
        order: 4,
        title: 'O Homem que Não Existia',
        description: 'Pessoa vive 30 anos sem documentos oficiais.',
        mystery: 'João Santos vive, trabalha e paga impostos há 30 anos, mas oficialmente não existe. Não há registro de nascimento ou documentos.',
        difficulty: 'hard',
        theme: 'identity',
        solution: 'Identidade foi apagada após participar de programa de proteção.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'labirintos-da-mente',
    name: 'Labirintos da Mente',
    description: 'Casos psicológicos complexos que desafiam a compreensão humana.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'psychological',
    isFree: false,
    cases: [
      {
        id: 'mente-1',
        order: 1,
        title: 'Dupla Personalidade',
        description: 'Homem acusa sua outra personalidade de crime.',
        mystery: 'Carlos confessa um crime mas alega que foi sua outra personalidade, Miguel, quem o cometeu. Há evidências de ambas as identidades.',
        difficulty: 'easy',
        theme: 'personality',
        solution: 'Transtorno dissociativo genuíno comprovado por anos de tratamento.',
        isFree: true
      },
      {
        id: 'mente-2',
        order: 2,
        title: 'Memórias Falsas',
        description: 'Testemunha tem certeza de fatos que não aconteceram.',
        mystery: 'Maria jura ter visto o assassinato, descrevendo detalhes precisos. Porém, estava comprovadamente em outro local no momento do crime.',
        difficulty: 'easy',
        theme: 'memory',
        solution: 'Implantação de memórias através de hipnose maliciosa.',
        isFree: true
      },
      {
        id: 'mente-3',
        order: 3,
        title: 'O Paciente Zero',
        description: 'Surto psicótico coletivo em hospital psiquiátrico.',
        mystery: 'Todos os pacientes de uma ala psiquiátrica desenvolvem o mesmo delírio simultaneamente, alegando estar sendo observados por câmeras invisíveis.',
        difficulty: 'medium',
        theme: 'collective',
        solution: 'Medicação contaminada causou reação adversa coletiva.',
        isFree: false
      },
      {
        id: 'mente-4',
        order: 4,
        title: 'Síndrome do Impostor',
        description: 'Pessoa acredita que familiares foram substituídos.',
        mystery: 'Ana está convencida de que sua família foi substituída por impostores idênticos. Reconhece rostos mas não sente conexão emocional.',
        difficulty: 'hard',
        theme: 'syndrome',
        solution: 'Síndrome de Capgras causada por lesão cerebral específica.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'ironias-do-destino',
    name: 'Ironias do Destino',
    description: 'Casos onde o destino prega peças cruéis nos envolvidos.',
    price: 14.80,
    difficulty: 'Intermediário',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'ironic',
    isFree: false,
    cases: [
      {
        id: 'ironia-1',
        order: 1,
        title: 'O Bombeiro Incendiário',
        description: 'Bombeiro é preso por causar incêndios que apagava.',
        mystery: 'José, bombeiro exemplar há 15 anos, é suspeito de causar os incêndios que heroicamente combatia. As evidências são perturbadoras.',
        difficulty: 'easy',
        theme: 'irony',
        solution: 'Vício em adrenalina levou bombeiro a criar emergências.',
        isFree: true
      },
      {
        id: 'ironia-2',
        order: 2,
        title: 'Morte por Precaução',
        description: 'Homem morre tentando evitar acidente previsto.',
        mystery: 'Roberto, após sonhar com acidente de carro, muda toda sua rotina para evitá-lo. Ironicamente, as precauções causam o acidente fatal.',
        difficulty: 'easy',
        theme: 'fate',
        solution: 'Mudança de rota levou a acidente que tentava evitar.',
        isFree: true
      },
      {
        id: 'ironia-3',
        order: 3,
        title: 'O Ladrão Roubado',
        description: 'Assaltante profissional torna-se vítima de roubo.',
        mystery: 'Fernando, ladrão experiente, é assaltado por amadores. O irônico é que ele os ensinou as técnicas que usaram contra ele.',
        difficulty: 'medium',
        theme: 'karma',
        solution: 'Ex-aprendizes aplicaram lições contra o mestre.',
        isFree: false
      },
      {
        id: 'ironia-4',
        order: 4,
        title: 'Herança Maldita',
        description: 'Herança milionária traz mais problemas que soluções.',
        mystery: 'Família pobre herda fortuna, mas cada membro sofre acidentes estranhos após tocarem no dinheiro. Coincidência ou maldição?',
        difficulty: 'hard',
        theme: 'curse',
        solution: 'Dinheiro estava contaminado com substância tóxica.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'crimes-de-epoca',
    name: 'Crimes de Época',
    description: 'Mistérios históricos que marcaram diferentes épocas.',
    price: 14.80,
    difficulty: 'Difícil',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'historical',
    isFree: false,
    cases: [
      {
        id: 'epoca-1',
        order: 1,
        title: 'O Duelo Impossível',
        description: 'Duelo termina com ambos duelistas mortos simultaneamente.',
        mystery: 'Em 1887, dois cavalheiros duelam ao amanhecer. Ambos caem mortos ao mesmo tempo, mas apenas um tiro foi ouvido pelas testemunhas.',
        difficulty: 'easy',
        theme: 'duel',
        solution: 'Bala atravessou primeiro duelista e atingiu o segundo.',
        isFree: true
      },
      {
        id: 'epoca-2',
        order: 2,
        title: 'A Dama Desaparecida',
        description: 'Aristocrata some de trem em movimento.',
        mystery: 'Lady Margaret embarca no Orient Express em Paris, mas desaparece antes de chegar a Constantinopla. Seu compartimento estava trancado por dentro.',
        difficulty: 'easy',
        theme: 'train',
        solution: 'Saiu pela janela para encontro amoroso em estação intermediária.',
        isFree: true
      },
      {
        id: 'epoca-3',
        order: 3,
        title: 'O Fantasma da Ópera Real',
        description: 'Cantora morre misteriosamente durante apresentação.',
        mystery: 'Durante uma apresentação da ópera Carmen em 1903, a soprano principal colapsa no palco e morre. Não há ferimentos visíveis.',
        difficulty: 'medium',
        theme: 'opera',
        solution: 'Veneno aplicado no microfone oculto no figurino.',
        isFree: false
      },
      {
        id: 'epoca-4',
        order: 4,
        title: 'Tesouro dos Templários',
        description: 'Mapa leva a tesouro, mas esconde armadilha mortal.',
        mystery: 'Mapa medieval dos Templários é descoberto. Quem o segue encontra tesouros, mas também uma morte misteriosa e súbita.',
        difficulty: 'hard',
        theme: 'treasure',
        solution: 'Pergaminho estava impregnado com veneno absorvido pela pele.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'dose-letal',
    name: 'Dose Letal',
    description: 'Casos envolvendo venenos e substâncias letais não detectadas.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'poison',
    isFree: false,
    cases: [
      {
        id: 'dose-1',
        order: 1,
        title: 'Café da Manhã Fatal',
        description: 'Família inteira morre após café da manhã.',
        mystery: 'A família Santos é encontrada morta na mesa do café da manhã. Não há sinais de violência, mas todos têm expressão de terror.',
        difficulty: 'easy',
        theme: 'family',
        solution: 'Pesticida contaminado foi usado no preparo dos alimentos.',
        isFree: true
      },
      {
        id: 'dose-2',
        order: 2,
        title: 'O Perfume Mortal',
        description: 'Mulheres morrem após usar mesmo perfume.',
        mystery: 'Três mulheres morrem em cidades diferentes após usar o mesmo perfume importado. A causa da morte é insuficiência respiratória.',
        difficulty: 'easy',
        theme: 'cosmetic',
        solution: 'Perfume falsificado continha componente tóxico industrial.',
        isFree: true
      },
      {
        id: 'dose-3',
        order: 3,
        title: 'Jardim Venenoso',
        description: 'Jardineiro morre cuidando de plantas ornamentais.',
        mystery: 'Experiente jardineiro morre após trabalhar em jardim que cuidava há anos. Não houve acidentes ou ferimentos aparentes.',
        difficulty: 'medium',
        theme: 'botanical',
        solution: 'Nova planta ornamental liberava toxinas pelo ar.',
        isFree: false
      },
      {
        id: 'dose-4',
        order: 4,
        title: 'Remédio que Mata',
        description: 'Medicamento salva-vidas torna-se letal.',
        mystery: 'Pacientes cardíacos morrem após tomar medicamento que os mantinha vivos. O remédio não foi alterado quimicamente.',
        difficulty: 'hard',
        theme: 'medical',
        solution: 'Interação com novo excipiente criou composto letal.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'fim-de-jogo',
    name: 'Fim de Jogo',
    description: 'Casos onde criminosos elaboram planos perfeitos, mas algo sempre falha.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'perfect-crime',
    isFree: false,
    cases: [
      {
        id: 'fim-1',
        order: 1,
        title: 'Assalto Cronometrado',
        description: 'Roubo a banco planejado ao segundo falha por detalhe.',
        mystery: 'Gang planeja assalto perfeito a banco, cronometrando cada segundo. Tudo corre conforme planejado, mas são capturados na saída.',
        difficulty: 'easy',
        theme: 'heist',
        solution: 'Esqueceram do horário de verão, chegando uma hora atrasados.',
        isFree: true
      },
      {
        id: 'fim-2',
        order: 2,
        title: 'Assassinato Digital',
        description: 'Crime cometido através de dispositivos eletrônicos.',
        mystery: 'Vítima morre eletrocutada por seu próprio computador. Investigação revela que foi assassinato, mas o criminoso está em outro país.',
        difficulty: 'easy',
        theme: 'technology',
        solution: 'Hacker controlou remotamente fonte de alimentação defeituosa.',
        isFree: true
      },
      {
        id: 'fim-3',
        order: 3,
        title: 'O Sósia Perfeito',
        description: 'Criminoso usa sósia para álibi, mas é descoberto.',
        mystery: 'Suspeito tem álibi perfeito: foi visto em evento público enquanto crime acontecia. Mas algo na sua aparência não confere.',
        difficulty: 'medium',
        theme: 'disguise',
        solution: 'Sósia tinha cicatriz que criminoso esqueceu de reproduzir.',
        isFree: false
      },
      {
        id: 'fim-4',
        order: 4,
        title: 'Crime Impossível',
        description: 'Assassinato ocorre em local vigiado 24 horas.',
        mystery: 'Vítima é morta em sala sem janelas, com apenas uma porta vigiada constantemente. Ninguém entrou ou saiu durante o crime.',
        difficulty: 'hard',
        theme: 'impossible',
        solution: 'Assassino estava escondido na sala há 3 dias, esperando oportunidade.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'viagem-sem-volta',
    name: 'Viagem Sem Volta',
    description: 'Mistérios que acontecem durante viagens e nunca são totalmente explicados.',
    price: 14.80,
    difficulty: 'Difícil',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'travel',
    isFree: false,
    cases: [
      {
        id: 'viagem-1',
        order: 1,
        title: 'Voo 447',
        description: 'Passageiro desaparece de avião em pleno voo.',
        mystery: 'Durante voo internacional, passageiro do assento 12A simplesmente desaparece. Portas e janelas permaneceram fechadas o tempo todo.',
        difficulty: 'easy',
        theme: 'airplane',
        solution: 'Escondeu-se no compartimento de carga através de painel solto.',
        isFree: true
      },
      {
        id: 'viagem-2',
        order: 2,
        title: 'Cruzeiro Fantasma',
        description: 'Navio de cruzeiro é encontrado vazio em alto mar.',
        mystery: 'Navio de cruzeiro com 200 passageiros é encontrado à deriva. Não há sinais de luta, mas todas as pessoas desapareceram.',
        difficulty: 'easy',
        theme: 'ship',
        solution: 'Vazamento de gás causou evacuação para botes salva-vidas.',
        isFree: true
      },
      {
        id: 'viagem-3',
        order: 3,
        title: 'Estrada Sem Fim',
        description: 'Família some ao viajar por estrada conhecida.',
        mystery: 'Família viaja por estrada que conhece há anos, mas nunca chega ao destino. Carro é encontrado em local impossível de alcançar.',
        difficulty: 'medium',
        theme: 'road',
        solution: 'Seguiram GPS desatualizado para área de obras perigosa.',
        isFree: false
      },
      {
        id: 'viagem-4',
        order: 4,
        title: 'Hotel do Tempo Perdido',
        description: 'Hóspedes envelhecem anos em uma única noite.',
        mystery: 'Turistas fazem check-in jovens em hotel remoto. Na manhã seguinte, aparecem visivelmente envelhecidos, sem memória do ocorrido.',
        difficulty: 'hard',
        theme: 'hotel',
        solution: 'Exposição a radiação de equipamento médico antigo no subsolo.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'jogos-corporativos',
    name: 'Jogos Corporativos',
    description: 'Crimes e mistérios no mundo dos negócios e grandes corporações.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'corporate',
    isFree: false,
    cases: [
      {
        id: 'corporativo-1',
        order: 1,
        title: 'O CEO Desaparecido',
        description: 'Presidente de multinacional some antes de reunião crucial.',
        mystery: 'Ricardo Sampaio, CEO da TechCorp, desaparece na véspera de reunião que decidiria o futuro da empresa. Seu carro é encontrado no aeroporto.',
        difficulty: 'easy',
        theme: 'executive',
        solution: 'Fugiu para evitar prisão por fraude descoberta pela auditoria.',
        isFree: true
      },
      {
        id: 'corporativo-2',
        order: 2,
        title: 'Sabotagem Digital',
        description: 'Sistema de empresa é sabotado por funcionário interno.',
        mystery: 'Mega Corporation perde bilhões após falha no sistema. Investigação aponta sabotagem interna, mas todos os funcionários passaram por detector de mentiras.',
        difficulty: 'easy',
        theme: 'sabotage',
        solution: 'Terceirizado tinha acesso ao sistema mas não foi investigado.',
        isFree: true
      },
      {
        id: 'corporativo-3',
        order: 3,
        title: 'Insider Trading',
        description: 'Alguém lucra milhões com informação privilegiada.',
        mystery: 'Ações da PharmaCorp disparam após anúncio de nova droga. Investigação revela que alguém comprou milhões em ações dias antes.',
        difficulty: 'medium',
        theme: 'stocks',
        solution: 'Faxineiro ouviu conversa confidencial e passou informação.',
        isFree: false
      },
      {
        id: 'corporativo-4',
        order: 4,
        title: 'A Reunião Final',
        description: 'Diretores morrem durante reunião de emergência.',
        mystery: 'Cinco diretores da GloboCorp morrem simultaneamente durante reunião virtual. Cada um estava em local diferente do mundo.',
        difficulty: 'hard',
        theme: 'boardroom',
        solution: 'Software de videoconferência foi hackeado para liberar gás tóxico.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'sussurros-do-alem',
    name: 'Sussurros do Além',
    description: 'Fenômenos inexplicáveis que desafiam a lógica e a ciência.',
    price: 14.80,
    difficulty: 'Difícil',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'paranormal',
    isFree: false,
    cases: [
      {
        id: 'alem-1',
        order: 1,
        title: 'Mensagens do Além',
        description: 'Viúva recebe mensagens do marido morto.',
        mystery: 'Dona Helena recebe cartas com a caligrafia de seu marido falecido há 2 anos. As mensagens contêm informações que só ele sabia.',
        difficulty: 'easy',
        theme: 'communication',
        solution: 'Filho imitava caligrafia para consolar a mãe deprimida.',
        isFree: true
      },
      {
        id: 'alem-2',
        order: 2,
        title: 'A Casa que Chora',
        description: 'Residência "chora" lágrimas de sangue pelas paredes.',
        mystery: 'Casa na Rua das Acácias apresenta manchas vermelhas que escorrem pelas paredes como lágrimas. Análises confirmam ser sangue humano.',
        difficulty: 'easy',
        theme: 'haunted',
        solution: 'Vazamento de tubulação atingiu antigo cemitério no terreno.',
        isFree: true
      },
      {
        id: 'alem-3',
        order: 3,
        title: 'Premonições Fatais',
        description: 'Mulher sonha com mortes que depois acontecem.',
        mystery: 'Clarissa sonha com acidentes fatais que se concretizam exatamente como previsto. Polícia suspeita de envolvimento nos crimes.',
        difficulty: 'medium',
        theme: 'precognition',
        solution: 'Psicóloga hipnotizava vítimas e induzia comportamentos suicidas.',
        isFree: false
      },
      {
        id: 'alem-4',
        order: 4,
        title: 'Portal Dimensional',
        description: 'Pessoas desaparecem em ponto específico da cidade.',
        mystery: 'No cruzamento das ruas Aurora e Esperança, pessoas simplesmente desaparecem. Câmeras mostram que elas somem no ar.',
        difficulty: 'hard',
        theme: 'dimensional',
        solution: 'Buraco encoberto por ilusão ótica levava ao sistema de esgotos.',
        isFree: false
      }
    ],
    cards: []
  },
  {
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Casos onde a lógica tradicional não se aplica e paradoxos revelam a verdade.',
    price: 14.80,
    difficulty: 'Avançado',
    image: '/public/images/covers/amostra.jpg',
    coverUrl: '/public/images/covers/amostra.jpg',
    category: 'psychological',
    isFree: false,
    cases: [
      {
        id: 'paradoxos-1',
        order: 1,
        title: 'O Suicídio Impossível',
        description: 'Homem comete suicídio de forma fisicamente impossível.',
        mystery: 'Antônio é encontrado enforcado em viga alta demais para alcançar. Não há escada, cadeira ou qualquer objeto para subir.',
        difficulty: 'easy',
        theme: 'suicide',
        solution: 'Acidente durante tentativa de encenar suicídio para seguro.',
        isFree: true
      },
      {
        id: 'paradoxos-2',
        order: 2,
        title: 'A Vítima Culpada',
        description: 'Investigação revela que a vítima é o verdadeiro criminoso.',
        mystery: 'Empresário é encontrado morto em seu escritório. Investigação revela que ele era o mandante dos crimes que estava denunciando.',
        difficulty: 'easy',
        theme: 'twist',
        solution: 'Vítima forjou própria morte para escapar de crimes passados.',
        isFree: true
      },
      {
        id: 'paradoxos-3',
        order: 3,
        title: 'Tempo Perdido',
        description: 'Suspeito não consegue explicar paradoxo temporal em sua álibi.',
        mystery: 'Marcelo alega estar em reunião durante crime, mas vídeo mostra ele saindo do prédio antes da reunião começar e chegando depois.',
        difficulty: 'medium',
        theme: 'time',
        solution: 'Mudança de horário de verão confundiu linha temporal dos eventos.',
        isFree: false
      },
      {
        id: 'paradoxos-4',
        order: 4,
        title: 'O Detetive Culpado',
        description: 'Evidências apontam o próprio investigador como culpado.',
        mystery: 'Detective Santos investiga série de crimes, mas todas as evidências começam a apontar para ele como autor dos crimes.',
        difficulty: 'hard',
        theme: 'meta',
        solution: 'Criminoso plantou evidências usando conhecimento interno da investigação.',
        isFree: false
      }
    ],
    cards: []
  }
];

// Set cards as alias for cases for backward compatibility
packs.forEach(pack => {
  pack.cards = pack.cases;
});

// Função para adicionar todos os packs para admin
export const purchasePack = (userId: string, packId: string, pricePaid: number, transactionId: string) => {
  // Implementação fictícia para registrar compra
  // Em produção, isso deve gravar no banco de dados
  console.log(`Usuário ${userId} comprou pack ${packId} por R$${pricePaid} (transação: ${transactionId})`);
};

export const purchaseCombo = (userId: string, selectedPackIds: string[], transactionId: string) => {
  // Implementação fictícia para registrar compra de combo
  console.log(`Usuário ${userId} comprou combo com packs ${selectedPackIds.join(', ')} (transação: ${transactionId})`);
};

export const getUserPacks = (userId: string): string[] => {
  // Retorna lista de packIds adquiridos pelo usuário
  // Implementação fictícia para demonstração
  const isAdmin = userId === 'admin-user' || userId === 'conectawebapps@outlook.com';
  if (isAdmin) {
    return packs.map(pack => pack.id);
  }
  return [];
};

export const getPackById = (packId: string): Pack | undefined => {
  return packs.find(pack => pack.id === packId);
};

export const getUserProgress = (userId: string, cardId: string): boolean => {
  // Implementação fictícia para demonstração
  const solved = JSON.parse(localStorage.getItem(`solved_${userId}`) || '[]');
  return solved.includes(cardId);
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
