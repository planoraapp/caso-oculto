// Define the Pack interface
export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree: boolean;
  coverUrl: string;
  category: 'individual' | 'combo' | 'complete';
  cards: Card[];
}

// Define the Card interface
export interface Card {
  id: string;
  order: number;
  mystery: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFree: boolean;
  packId: string;
}

export const MERCADOPAGO_LINKS = {
  individual: "184163814-ebfc1885-acbb-4a9f-89d9-481e569b15b6",
  combo: "184163814-186d6326-c239-4676-b240-fac644c29f0e",
  complete: "184163814-b6e81aba-f60e-4256-8a73-2658243e4259"
};

// Mock data for packs
export const packs: Pack[] = [
  {
    id: 'pack1',
    name: 'Sombras da Noite',
    description: 'Mergulhe nos mistérios que se escondem nas sombras da escuridão. Crimes que acontecem quando a cidade dorme.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack1_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card1',
        order: 1,
        mystery: 'Um assassinato acontece durante um apagão na cidade. Como descobrir o culpado sem evidências visuais?',
        solution: 'O assassino foi descoberto pelos sons únicos de sua bengala no chão de madeira.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack1',
      },
      {
        id: 'card2',
        order: 2,
        mystery: 'Uma vítima é encontrada em um beco escuro, mas não há sinais de luta. O que realmente aconteceu?',
        solution: 'A vítima foi envenenada em casa e caminhou até o beco antes de desmaiar.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card3',
        order: 3,
        mystery: 'Um vigilante noturno desaparece durante sua ronda. Onde ele pode estar?',
        solution: 'Ele descobriu um esquema de contrabando e foi sequestrado pelos criminosos.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card4',
        order: 4,
        mystery: 'Pegadas misteriosas levam a um local abandonado. Quem as deixou e por quê?',
        solution: 'Um detetive aposentado estava investigando um caso antigo por conta própria.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack1',
      },
      {
        id: 'card5',
        order: 5,
        mystery: 'Uma luz estranha é vista todas as noites na janela de uma casa vazia. Qual o mistério?',
        solution: 'Um criminoso fugitivo estava se escondendo lá, usando uma lanterna para se comunicar com cúmplices.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack1',
      },
    ],
  },
  {
    id: 'pack2',
    name: 'Crimes Imperfeitos',
    description: 'Nem todo crime é perfeito. Descubra as falhas que levaram os criminosos à captura.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack2_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card6',
        order: 1,
        mystery: 'Um ladrão de banco esquece um item crucial na cena do crime. O que foi?',
        solution: 'Ele esqueceu sua carteira de motorista que caiu do bolso durante a fuga.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack2',
      },
      {
        id: 'card7',
        order: 2,
        mystery: 'Um assassino tenta forjar um álibi perfeito, mas comete um erro fatal. Qual foi?',
        solution: 'Ele postou uma foto nas redes sociais com timestamp que contradiz seu álibi.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card8',
        order: 3,
        mystery: 'Um sequestrador exige resgate, mas sua ligação é rastreada. Como?',
        solution: 'Ele usou seu próprio celular pensando que números bloqueados não podiam ser rastreados.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card9',
        order: 4,
        mystery: 'Um falsificador é pego por um detalhe mínimo em sua obra. Qual detalhe?',
        solution: 'Ele usou uma caneta moderna para assinar um documento supostamente antigo.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack2',
      },
      {
        id: 'card10',
        order: 5,
        mystery: 'Um criminoso deixa DNA na cena, mas de forma inesperada. Como?',
        solution: 'Ele cortou o dedo ao quebrar uma janela e sangrou sobre documentos importantes.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack2',
      },
    ],
  },
  {
    id: 'pack3',
    name: 'Paradoxos Mortais',
    description: 'Casos que desafiam a lógica e a razão. Onde a morte e o absurdo se encontram.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack3_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card11',
        order: 1,
        mystery: 'Um homem morre afogado em um quarto sem água. Como isso é possível?',
        solution: 'Ele morreu engasgado com cubos de gelo que derreteram antes da descoberta do corpo.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack3',
      },
      {
        id: 'card12',
        order: 2,
        mystery: 'Uma pessoa é encontrada morta em uma sala trancada por dentro, sem janelas. Como o assassino saiu?',
        solution: 'O assassino se escondeu no armário e saiu quando a porta foi aberta pela polícia.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card13',
        order: 3,
        mystery: 'Um cadáver é encontrado em um local onde esteve vivo minutos antes. Explique o paradoxo.',
        solution: 'Ele foi morto em outro local e o corpo foi rapidamente transportado de volta.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card14',
        order: 4,
        mystery: 'Uma vítima parece ter se matado, mas as evidências sugerem assassinato. Qual a verdade?',
        solution: 'O assassino forçou a vítima a escrever uma carta de suicídio antes de matá-la.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack3',
      },
      {
        id: 'card15',
        order: 5,
        mystery: 'Um homem morre duas vezes no mesmo dia. Como isso pode acontecer?',
        solution: 'Ele foi declarado morto erroneamente, reviveu, e depois foi realmente assassinado.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack3',
      },
    ],
  },
  {
    id: 'pack4',
    name: 'Lendas Urbanas',
    description: 'Mistérios baseados em lendas urbanas que se tornaram realidade. Folclore encontra crime.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack4_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card16',
        order: 1,
        mystery: 'Pessoas desaparecem perto de um túnel "assombrado". Qual a explicação real?',
        solution: 'Um serial killer usa a lenda local para desencorajar testemunhas.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack4',
      },
      {
        id: 'card17',
        order: 2,
        mystery: 'A lenda do "homem do saco" se torna real em uma cidade. Quem está por trás?',
        solution: 'Um traficante de órgãos usa a lenda para sequestrar vítimas sem suspeitas.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card18',
        order: 3,
        mystery: 'Avistamentos de um "fantasma" coincide com roubos na área. Conexão?',
        solution: 'Um ladrão se disfarça de fantasma para assombrar e afastar moradores.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card19',
        order: 4,
        mystery: 'Uma "casa mal-assombrada" esconde um segredo mortal. Qual?',
        solution: 'A casa é usada para cultivo de drogas, e os "fantasmas" são vigilantes armados.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack4',
      },
      {
        id: 'card20',
        order: 5,
        mystery: 'A lenda da "dama de branco" na estrada mata pessoas realmente. Como?',
        solution: 'Um assassino em série se disfarça e usa a lenda para atrair vítimas.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack4',
      },
    ],
  },
  {
    id: 'pack5',
    name: 'Absurdamente Real',
    description: 'Casos tão bizarros que parecem ficção, mas são baseados em eventos reais.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack5_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card21',
        order: 1,
        mystery: 'Um homem é morto por um objeto que caiu do céu. O que era?',
        solution: 'Um bloco de gelo de um avião que se soltou durante o voo.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack5',
      },
      {
        id: 'card22',
        order: 2,
        mystery: 'Uma mulher morre rindo incontrolavelmente. Qual a causa?',
        solution: 'Ela foi envenenada com uma toxina que causa riso histérico antes da morte.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card23',
        order: 3,
        mystery: 'Um criminoso é pego porque seu papagaio o entregou. Como?',
        solution: 'O papagaio repetia confissões que o criminoso fazia em casa.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card24',
        order: 4,
        mystery: 'Um ladrão fica preso em uma casa por três dias sem ninguém notar. Como?',
        solution: 'A família estava viajando e ele ficou preso no cofre que tentou roubar.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack5',
      },
      {
        id: 'card25',
        order: 5,
        mystery: 'Um assassino é identificado por seu vício em um doce específico. Qual a conexão?',
        solution: 'Ele sempre deixava embalagens do mesmo doce raro nas cenas dos crimes.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack5',
      },
    ],
  },
  {
    id: 'pack6',
    name: 'Beco Sem Saída',
    description: 'Investigações que parecem não ter solução, mas um detalhe muda tudo.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack6_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card26',
        order: 1,
        mystery: 'Um caso frio de 20 anos é resolvido por uma foto antiga. O que ela revelou?',
        solution: 'A foto mostrava o assassino no fundo, que todos pensavam estar morto.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack6',
      },
      {
        id: 'card27',
        order: 2,
        mystery: 'DNA em uma cena de crime não bate com nenhum suspeito. Por quê?',
        solution: 'O DNA era de gêmeos idênticos, e apenas um deles era culpado.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack6',
      },
      {
        id: 'card28',
        order: 3,
        mystery: 'Todas as evidências apontam para um suspeito que tem álibi perfeito. Solução?',
        solution: 'O suspeito tem um irmão gêmeo que forneceu o álibi enquanto ele cometia o crime.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack6',
      },
      {
        id: 'card29',
        order: 4,
        mystery: 'Um assassino confessa, mas a polícia não acredita. Por quê?',
        solution: 'Ele estava cobrindo para o filho menor de idade que realmente cometeu o crime.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack6',
      },
      {
        id: 'card30',
        order: 5,
        mystery: 'Um crime impossível de ser cometido por humanos. Qual a explicação?',
        solution: 'O criminoso treinou um animal para cometer o assassinato por ele.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack6',
      },
    ],
  },
  {
    id: 'pack7',
    name: 'Dossiê Confidencial',
    description: 'Segredos de estado e conspirações que resultaram em morte. Casos classificados.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack7_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card31',
        order: 1,
        mystery: 'Um agente secreto é encontrado morto com documentos desaparecidos. Quem o traiu?',
        solution: 'Seu próprio parceiro, que estava vendendo informações para inimigos.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack7',
      },
      {
        id: 'card32',
        order: 2,
        mystery: 'Uma testemunha importante morre antes de depor. Coincidência?',
        solution: 'Ela foi silenciada por um esquema de corrupção que envolvia altos funcionários.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack7',
      },
      {
        id: 'card33',
        order: 3,
        mystery: 'Documentos secretos desaparecem de um cofre supostamente inviolável. Como?',
        solution: 'O próprio fabricante do cofre foi subornado para fornecer a combinação.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack7',
      },
      {
        id: 'card34',
        order: 4,
        mystery: 'Um diplomata morre em circunstâncias suspeitas. Qual a verdade?',
        solution: 'Ele descobriu um esquema de tráfico de armas e foi eliminado.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack7',
      },
      {
        id: 'card35',
        order: 5,
        mystery: 'Uma operação encoberta resulta na morte de civis inocentes. Quem é responsável?',
        solution: 'Um agente duplo sabotou a operação para beneficiar uma facção rival.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack7',
      },
    ],
  },
  {
    id: 'pack8',
    name: 'Labirintos da Mente',
    description: 'Crimes cometidos por mentes perturbadas. Psicologia criminal em foco.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack8_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card36',
        order: 1,
        mystery: 'Um serial killer segue um padrão psicológico complexo. Qual?',
        solution: 'Ele recria traumas de infância, matando pessoas que lembram seus abusadores.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack8',
      },
      {
        id: 'card37',
        order: 2,
        mystery: 'Uma pessoa com múltiplas personalidades comete crimes. Qual personalidade é culpada?',
        solution: 'Uma personalidade criada especificamente para cometer os crimes e proteger as outras.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack8',
      },
      {
        id: 'card38',
        order: 3,
        mystery: 'Um psicólogo mata seus próprios pacientes. Qual sua motivação?',
        solution: 'Ele acreditava estar "curando" a sociedade eliminando pessoas que considerava incuráveis.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack8',
      },
      {
        id: 'card39',
        order: 4,
        mystery: 'Crimes são cometidos seguindo teorias psicológicas famosas. Por quê?',
        solution: 'Um estudante de psicologia queria provar suas teorias através de experimentos mortais.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack8',
      },
      {
        id: 'card40',
        order: 5,
        mystery: 'Um assassino escolhe vítimas baseado em seus medos. Como ele os descobre?',
        solution: 'Ele era terapeuta e usava informações das sessões para selecionar e aterrorizar vítimas.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack8',
      },
    ],
  },
  {
    id: 'pack9',
    name: 'Ironias do Destino',
    description: 'Quando o destino prega peças mortais. Coincidências que custaram vidas.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack9_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card41',
        order: 1,
        mystery: 'Um detetive é morto da mesma forma que investigava. Coincidência?',
        solution: 'O assassino que ele caçava descobriu seu padrão e usou contra ele.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack9',
      },
      {
        id: 'card42',
        order: 2,
        mystery: 'Uma pessoa morre no local onde salvou uma vida anos antes. Por quê?',
        solution: 'A pessoa que salvou voltou para se vingar, culpando-a por sua vida arruinada.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack9',
      },
      {
        id: 'card43',
        order: 3,
        mystery: 'Um homem morre exatamente como predisse um vidente. Como isso aconteceu?',
        solution: 'O próprio vidente orquestrou o assassinato para validar suas "previsões".',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack9',
      },
      {
        id: 'card44',
        order: 4,
        mystery: 'Uma vítima de acidente automobilístico recebe uma ligação misteriosa antes de morrer. Conexão?',
        solution: 'A ligação era de alguém que causou o acidente propositalmente.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack9',
      },
      {
        id: 'card45',
        order: 5,
        mystery: 'Um assassino morre da mesma forma que suas vítimas. Justiça ou coincidência?',
        solution: 'Um parente das vítimas estudou seus métodos e aplicou a mesma técnica nele.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack9',
      },
    ],
  },
  {
    id: 'pack10',
    name: 'Crimes de Época',
    description: 'Assassinatos que marcaram diferentes períodos históricos. Crimes através dos tempos.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack10_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card46',
        order: 1,
        mystery: 'Um nobre é envenenado durante um banquete medieval. Quem e como?',
        solution: 'Seu copeiro, que adicionou veneno ao vinho usando um anel especial.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack10',
      },
      {
        id: 'card47',
        order: 2,
        mystery: 'Durante a Era Vitoriana, prostituta é morta de forma ritual. Quem?',
        solution: 'Um médico que acreditava estar "purificando" a sociedade de pecadores.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack10',
      },
      {
        id: 'card48',
        order: 3,
        mystery: 'Nos anos 20, um contrabandista é executado em plena Lei Seca. Por quê?',
        solution: 'Ele estava traindo sua própria quadrilha vendendo informações para rivais.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack10',
      },
      {
        id: 'card49',
        order: 4,
        mystery: 'Durante a Segunda Guerra, um espia é morto em território neutro. Como descobriram?',
        solution: 'Ele foi traído por outro espião que trabalhava como agente duplo.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack10',
      },
      {
        id: 'card50',
        order: 5,
        mystery: 'Nos anos 60, um ativista morre em protesto pacífico. Qual a verdade?',
        solution: 'Ele foi assassinado por radicais do próprio movimento que o consideravam moderado demais.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack10',
      },
    ],
  },
  {
    id: 'pack11',
    name: 'Dose Letal',
    description: 'Envenenamentos e mortes por substâncias letais. A química do crime.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack11_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card51',
        order: 1,
        mystery: 'Uma pessoa morre envenenada, mas não há traços do veneno. Como?',
        solution: 'Foi usado gelo seco, que sublimou deixando apenas dióxido de carbono.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack11',
      },
      {
        id: 'card52',
        order: 2,
        mystery: 'Um químico morre por sua própria criação. Acidente ou sabotagem?',
        solution: 'Um rival alterou sua fórmula para torná-la letal quando ele a testasse.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack11',
      },
      {
        id: 'card53',
        order: 3,
        mystery: 'Medicamento comum se torna letal para uma vítima específica. Por quê?',
        solution: 'O assassino conhecia a alergia rara da vítima e contaminou seus remédios.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack11',
      },
      {
        id: 'card54',
        order: 4,
        mystery: 'Uma planta ornamental causa a morte de uma família inteira. Como?',
        solution: 'Alguém substituiu plantas seguras por espécies venenosas em sua casa.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack11',
      },
      {
        id: 'card55',
        order: 5,
        mystery: 'Um perfume mata instantaneamente quem o usa. Qual o segredo?',
        solution: 'Foi adicionado cianeto de hidrogênio que é absorvido pela pele.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack11',
      },
    ],
  },
  {
    id: 'pack12',
    name: 'Fim de Jogo',
    description: 'Crimes planejados como jogos mortais. Onde diversão encontra morte.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack12_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card56',
        order: 1,
        mystery: 'Participantes de um jogo online começam a morrer na vida real. Conexão?',
        solution: 'O criador do jogo usava informações pessoais para localizar e matar jogadores.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack12',
      },
      {
        id: 'card57',
        order: 2,
        mystery: 'Um torneio de xadrez termina com morte do campeão. Acidente?',
        solution: 'O adversário envenenou as peças do tabuleiro que o campeão tocava.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack12',
      },
      {
        id: 'card58',
        order: 3,
        mystery: 'Jogadores de pôquer morrem um por um durante a partida. Qual o padrão?',
        solution: 'O dealer estava matando quem tinha as melhores mãos para roubar o prêmio.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack12',
      },
      {
        id: 'card59',
        order: 4,
        mystery: 'Um escape room se torna uma armadilha mortal real. Por quê?',
        solution: 'O proprietário descobriu que um dos jogadores era quem matou sua família.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack12',
      },
      {
        id: 'card60',
        order: 5,
        mystery: 'Uma caça ao tesouro resulta em morte. Qual era o verdadeiro prêmio?',
        solution: 'O tesouro era evidência de um crime, e o organizador matou quem o encontrou.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack12',
      },
    ],
  },
  {
    id: 'pack13',
    name: 'Viagem Sem Volta',
    description: 'Crimes que acontecem durante viagens. Quando a jornada se torna fatal.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack13_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card61',
        order: 1,
        mystery: 'Passageiro de avião morre durante voo, mas não foi acidente. Como?',
        solution: 'Ele foi envenenado por injeção disfarçada como medicamento para enjoo.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack13',
      },
      {
        id: 'card62',
        order: 2,
        mystery: 'Turista desaparece em país estrangeiro sem deixar rastros. O que aconteceu?',
        solution: 'Ele foi sequestrado por uma rede de tráfico de órgãos que visava turistas.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack13',
      },
      {
        id: 'card63',
        order: 3,
        mystery: 'Navio de cruzeiro tem uma morte misteriosa em alto mar. Quem é culpado?',
        solution: 'Um funcionário do navio que descobriu estar sendo traído pela esposa.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack13',
      },
      {
        id: 'card64',
        order: 4,
        mystery: 'Motorista de carona compartilhada nunca chega ao destino. Por quê?',
        solution: 'O passageiro era um assassino que usava o app para encontrar vítimas isoladas.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack13',
      },
      {
        id: 'card65',
        order: 5,
        mystery: 'Grupo de escaladores perde um membro na montanha. Acidente ou crime?',
        solution: 'Um dos membros cortou a corda para herdar o seguro de vida da vítima.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack13',
      },
    ],
  },
  {
    id: 'pack14',
    name: 'Jogos Corporativos',
    description: 'Assassinatos no mundo dos negócios. Quando lucro vale mais que vida.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack14_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card66',
        order: 1,
        mystery: 'CEO morre antes de anunciar fusão empresarial. Coincidência?',
        solution: 'Ele foi morto por sócio que perderia poder com a fusão.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack14',
      },
      {
        id: 'card67',
        order: 2,
        mystery: 'Insider trading resulta em assassinato. Quem queria silenciar quem?',
        solution: 'Um corretor matou o informante para não ser exposto às autoridades.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack14',
      },
      {
        id: 'card68',
        order: 3,
        mystery: 'Funcionário morre após descobrir fraude na empresa. Suicídio ou assassinato?',
        solution: 'Foi assassinado pelo contador que descobriu o esquema de lavagem de dinheiro.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack14',
      },
      {
        id: 'card69',
        order: 4,
        mystery: 'Competição por promoção termina em morte. Até onde alguém pode ir?',
        solution: 'O concorrente sabotou equipamentos de segurança causando acidente "fatal".',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack14',
      },
      {
        id: 'card70',
        order: 5,
        mystery: 'Lançamento de produto é cancelado após morte do inventor. Por quê?',
        solution: 'A empresa rival roubou a patente e eliminou o inventor para esconder o crime.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack14',
      },
    ],
  },
  {
    id: 'pack15',
    name: 'Sussurros do Além',
    description: 'Crimes que envolvem o sobrenatural. Quando morte encontra mistério paranormal.',
    price: 14.80,
    isFree: false,
    coverUrl: '/lovable-uploads/pack15_cover.png',
    category: 'individual',
    cards: [
      {
        id: 'card71',
        order: 1,
        mystery: 'Médium famosa morre durante sessão espírita. O que realmente aconteceu?',
        solution: 'Ela foi envenenada por cliente que descobriu ser fraude suas previsões.',
        difficulty: 'medium',
        isFree: true,
        packId: 'pack15',
      },
      {
        id: 'card72',
        order: 2,
        mystery: 'Investigador paranormal morre em casa "assombrada". Fantasma ou assassino?',
        solution: 'O proprietário da casa o matou para esconder evidências de assassinatos anteriores.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack15',
      },
      {
        id: 'card73',
        order: 3,
        mystery: 'Padre exorcista é encontrado morto após ritual. Demônio ou humano?',
        solution: 'Ele foi morto pelo pai da "possuída" que descobriu o abuso que ela sofria.',
        difficulty: 'easy',
        isFree: false,
        packId: 'pack15',
      },
      {
        id: 'card74',
        order: 4,
        mystery: 'Collector de objetos amaldiçoados morre misteriosamente. Qual objeto o matou?',
        solution: 'Nenhum era amaldiçoado; ele foi envenenado por rival que queria sua coleção.',
        difficulty: 'medium',
        isFree: false,
        packId: 'pack15',
      },
      {
        id: 'card75',
        order: 5,
        mystery: 'Cemitério tem mortes estranhas durante noites de lua cheia. Explicação?',
        solution: 'Coveiro serial killer usava a superstição para desencorajar testemunhas.',
        difficulty: 'hard',
        isFree: false,
        packId: 'pack15',
      },
    ],
  },
  {
    id: 'combo5packs',
    name: 'Combo 5 Packs',
    description: 'Escolha 5 packs e economize 20%',
    price: 61.40,
    isFree: false,
    coverUrl: '/lovable-uploads/combo_cover.png',
    category: 'combo',
    cards: [],
  },
  {
    id: 'completeaccess',
    name: 'Acesso Total',
    description: 'Desbloqueie todos os packs e tenha acesso a conteúdo exclusivo!',
    price: 110.90,
    isFree: false,
    coverUrl: '/lovable-uploads/complete_cover.png',
    category: 'complete',
    cards: [],
  },
];

// Function to get pack by ID
export const getPackById = (packId: string): Pack | undefined => {
  return packs.find(pack => pack.id === packId);
};

// Function to get user progress for a card
export const getUserProgress = (userId: string, cardId: string): boolean => {
  const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
  return progress[userId]?.[cardId] || false;
};

// Function to purchase a pack
export const purchasePack = (userId: string, packId: string, price: number, transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  if (!purchases[userId]) {
    purchases[userId] = [];
  }
  
  const purchase = {
    id: Date.now().toString(),
    packId,
    packName: getPackById(packId)?.name || 'Pack desconhecido',
    price_paid: price,
    purchased_at: new Date().toISOString(),
    transactionId,
    type: 'individual'
  };
  
  purchases[userId].push(purchase);
  localStorage.setItem('userPurchases', JSON.stringify(purchases));
};

// Function to get user purchases
export const getUserPurchases = (userId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  return purchases[userId] || [];
};

// Function to purchase combo packs
export const purchaseCombo = (userId: string, selectedPackIds: string[], transactionId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  if (!purchases[userId]) {
    purchases[userId] = [];
  }
  
  const comboPurchase = {
    id: Date.now().toString(),
    packIds: selectedPackIds,
    packName: 'Combo 5 Packs',
    price_paid: 61.40,
    purchased_at: new Date().toISOString(),
    transactionId,
    type: 'combo'
  };
  
  purchases[userId].push(comboPurchase);
  localStorage.setItem('userPurchases', JSON.stringify(purchases));
};

// Function to get user's combo purchases
export const getUserComboPurchases = (userId: string) => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  return purchases[userId]?.filter(p => p.type === 'combo') || [];
};

// Updated getUserPacks function to include combo purchases
export const getUserPacks = (userId: string): string[] => {
  const purchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
  const userPurchases = purchases[userId] || [];
  
  let ownedPacks: string[] = [];
  
  userPurchases.forEach(purchase => {
    if (purchase.type === 'individual' && purchase.packId) {
      ownedPacks.push(purchase.packId);
    } else if (purchase.type === 'combo' && purchase.packIds) {
      ownedPacks = [...ownedPacks, ...purchase.packIds];
    } else if (purchase.type === 'complete') {
      // If user has complete access, return all pack IDs
      ownedPacks = packs.filter(p => !['combo', 'complete'].includes(p.category)).map(p => p.id);
    }
  });
  
  return [...new Set(ownedPacks)]; // Remove duplicates
};
