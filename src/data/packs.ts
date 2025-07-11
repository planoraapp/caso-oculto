import { Pack } from './types';

// Using placeholder images from Unsplash for pack covers
const case01Image = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop';
const case02Image = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop';
const case03Image = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop';
const case04Image = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop';

// Using placeholder images for individual case cards
const generateCaseImage = (index: number) => {
  const imageIds = [
    'photo-1526374965328-7f61d4dc18c5', // Matrix
    'photo-1485827404703-89b55fcc595e', // Robot
    'photo-1488590528505-98d2b5aba04b', // Circuit board
    'photo-1461749280684-dccba630e2f6', // Java code
    'photo-1486312338219-ce68d2c6f44d', // MacBook
    'photo-1581091226825-a6a2a5aee158', // Laptop
    'photo-1531297484001-80022131f5a1', // Laptop surface
    'photo-1487058792275-0ad4aaf24ca7', // Colorful code
    'photo-1518770660439-4636190af475', // Circuit macro
    'photo-1649972904349-6e44c42644a7'  // Woman laptop
  ];
  
  const imageId = imageIds[index % imageIds.length];
  return `https://images.unsplash.com/${imageId}?w=300&h=200&fit=crop`;
};

export const packs: Pack[] = [
  {
    id: 'pack-01',
    name: 'Cold Case #01',
    description: 'Um crime esquecido, uma cidade silenciosa e segredos que nunca foram revelados. Desvende a verdade por trás do caso.',
    image: case01Image,
    price: 19.9,
    difficulty: 'medium',
    category: 'mystery',
    cases: [
      {
        id: 'case-001',
        order: 1,
        mystery: 'A Herança Envenenada',
        solution: 'O mordomo adicionou veneno ao chá da tarde usando uma seringa escondida no açucareiro. A motivação foi a descoberta de que seria demitido após 30 anos de serviço.',
        difficulty: 'easy',
        isFree: true,
        theme: 'murder',
        name: 'A Herança Envenenada',
        title: '🏰 A Herança Envenenada',
        description: 'Uma mansão vitoriana, um testamento polêmico e uma morte suspeita durante o chá da tarde.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-002',
        order: 2,
        mystery: 'O Mistério do Quadro Roubado',
        solution: 'O ladrão era o próprio curador do museu, que planejou o roubo para cobrar o seguro e pagar dívidas de jogo.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'O Mistério do Quadro Roubado',
        title: '🖼️ O Mistério do Quadro Roubado',
        description: 'Um quadro valioso desaparece durante uma exposição. Quem está por trás do roubo?',
        image: generateCaseImage(1)
      },
      {
        id: 'case-003',
        order: 3,
        mystery: 'O Segredo do Cofre',
        solution: 'A senha do cofre estava escondida em um poema antigo encontrado na biblioteca da família.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Cofre',
        title: '🔐 O Segredo do Cofre',
        description: 'Um cofre misterioso guarda segredos que podem mudar o destino da cidade.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-004',
        order: 4,
        mystery: 'A Noite do Incêndio',
        solution: 'O incêndio foi provocado pelo sócio traidor que queria assumir o controle da empresa.',
        difficulty: 'medium',
        theme: 'danger',
        name: 'A Noite do Incêndio',
        title: '🔥 A Noite do Incêndio',
        description: 'Um incêndio destrói uma fábrica. Foi acidente ou sabotagem?',
        image: generateCaseImage(3)
      },
      {
        id: 'case-005',
        order: 5,
        mystery: 'O Desaparecimento na Floresta',
        solution: 'A vítima fugiu para começar uma nova vida, deixando pistas falsas para despistar os perseguidores.',
        difficulty: 'easy',
        theme: 'investigation',
        name: 'O Desaparecimento na Floresta',
        title: '🌲 O Desaparecimento na Floresta',
        description: 'Uma pessoa desaparece misteriosamente em uma floresta densa.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-006',
        order: 6,
        mystery: 'O Enigma do Relógio',
        solution: 'O relógio escondia um compartimento secreto com documentos importantes.',
        difficulty: 'hard',
        theme: 'mystery',
        name: 'O Enigma do Relógio',
        title: '⏰ O Enigma do Relógio',
        description: 'Um relógio antigo guarda um segredo que pode resolver um crime antigo.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-007',
        order: 7,
        mystery: 'A Carta Anônima',
        solution: 'A carta foi escrita pelo irmão da vítima, tentando proteger a família.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'A Carta Anônima',
        title: '✉️ A Carta Anônima',
        description: 'Uma carta anônima revela pistas sobre um crime não resolvido.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-008',
        order: 8,
        mystery: 'O Mistério do Farol',
        solution: 'O farol era usado para sinalizar contrabandistas durante a noite.',
        difficulty: 'medium',
        theme: 'thriller',
        name: 'O Mistério do Farol',
        title: '🚨 O Mistério do Farol',
        description: 'Luzes estranhas no farol assustam os moradores da costa.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-009',
        order: 9,
        mystery: 'O Segredo do Jardim',
        solution: 'O jardim escondia uma passagem secreta para um túnel antigo.',
        difficulty: 'easy',
        theme: 'conspiracy',
        name: 'O Segredo do Jardim',
        title: '🌿 O Segredo do Jardim',
        description: 'Um jardim aparentemente comum guarda um segredo sombrio.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-010',
        order: 10,
        mystery: 'A Vingança do Fantasma',
        solution: 'O "fantasma" era um cúmplice disfarçado tentando assustar os suspeitos.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'A Vingança do Fantasma',
        title: '👻 A Vingança do Fantasma',
        description: 'Lendas de um fantasma assombram uma antiga mansão.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-011',
        order: 11,
        mystery: 'O Caso do Diamante Roubado',
        solution: 'O roubo foi planejado por um joalheiro que queria vender a pedra no mercado negro.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'O Caso do Diamante Roubado',
        title: '💎 O Caso do Diamante Roubado',
        description: 'Um diamante valioso desaparece durante uma exposição.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-012',
        order: 12,
        mystery: 'O Mistério da Biblioteca',
        solution: 'Os livros foram rearranjados para formar uma mensagem codificada.',
        difficulty: 'medium',
        theme: 'mystery',
        name: 'O Mistério da Biblioteca',
        title: '📚 O Mistério da Biblioteca',
        description: 'Eventos estranhos acontecem em uma biblioteca antiga.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-013',
        order: 13,
        mystery: 'O Segredo do Navio Fantasma',
        solution: 'O navio foi usado para contrabando e desapareceu após uma tempestade.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Segredo do Navio Fantasma',
        title: '🚢 O Segredo do Navio Fantasma',
        description: 'Histórias de um navio fantasma circulam entre os pescadores.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-014',
        order: 14,
        mystery: 'A Conspiração do Conselho',
        solution: 'Membros do conselho estavam envolvidos em corrupção e fraude.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'A Conspiração do Conselho',
        title: '🏛️ A Conspiração do Conselho',
        description: 'Um conselho municipal esconde segredos obscuros.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-015',
        order: 15,
        mystery: 'O Mistério do Relógio de Ouro',
        solution: 'O relógio foi roubado para pagar uma dívida de jogo.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Mistério do Relógio de Ouro',
        title: '⏳ O Mistério do Relógio de Ouro',
        description: 'Um relógio de ouro desaparece durante um baile de gala.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-016',
        order: 16,
        mystery: 'O Caso da Estátua Desaparecida',
        solution: 'A estátua foi vendida ilegalmente por um funcionário do museu.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'O Caso da Estátua Desaparecida',
        title: '🗿 O Caso da Estátua Desaparecida',
        description: 'Uma estátua valiosa desaparece misteriosamente.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-017',
        order: 17,
        mystery: 'O Enigma da Sala Trancada',
        solution: 'A vítima foi assassinada antes de trancar a sala por dentro.',
        difficulty: 'hard',
        theme: 'murder',
        name: 'O Enigma da Sala Trancada',
        title: '🔒 O Enigma da Sala Trancada',
        description: 'Um assassinato em uma sala trancada intriga os detetives.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-018',
        order: 18,
        mystery: 'O Mistério do Cemitério',
        solution: 'O cemitério escondia túmulos falsos usados para esconder contrabando.',
        difficulty: 'medium',
        theme: 'thriller',
        name: 'O Mistério do Cemitério',
        title: '⚰️ O Mistério do Cemitério',
        description: 'Eventos estranhos acontecem em um cemitério antigo.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-019',
        order: 19,
        mystery: 'A Noite do Roubo na Joalheria',
        solution: 'O roubo foi facilitado por um funcionário que desativou o alarme.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'A Noite do Roubo na Joalheria',
        title: '💍 A Noite do Roubo na Joalheria',
        description: 'Uma joalheria é roubada durante a noite.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-020',
        order: 20,
        mystery: 'O Segredo do Manuscrito',
        solution: 'O manuscrito continha informações que poderiam derrubar uma poderosa família.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito',
        title: '📜 O Segredo do Manuscrito',
        description: 'Um manuscrito antigo é a chave para um grande segredo.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-021',
        order: 21,
        mystery: 'O Mistério do Teatro',
        solution: 'O ator principal estava envolvido em um esquema de chantagem.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Mistério do Teatro',
        title: '🎭 O Mistério do Teatro',
        description: 'Um crime acontece nos bastidores de um teatro.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-022',
        order: 22,
        mystery: 'O Caso do Médico Desaparecido',
        solution: 'O médico fugiu após descobrir uma conspiração na clínica.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Caso do Médico Desaparecido',
        title: '🩺 O Caso do Médico Desaparecido',
        description: 'Um médico desaparece misteriosamente.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-023',
        order: 23,
        mystery: 'O Enigma do Cofre Antigo',
        solution: 'O cofre continha documentos que poderiam mudar o curso da história.',
        difficulty: 'hard',
        theme: 'mystery',
        name: 'O Enigma do Cofre Antigo',
        title: '🗝️ O Enigma do Cofre Antigo',
        description: 'Um cofre antigo guarda segredos valiosos.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-024',
        order: 24,
        mystery: 'A Vingança do Ex-Detetive',
        solution: 'O ex-detetive armou um plano para se vingar dos que o traíram.',
        difficulty: 'medium',
        theme: 'thriller',
        name: 'A Vingança do Ex-Detetive',
        title: '🕵️‍♂️ A Vingança do Ex-Detetive',
        description: 'Um ex-detetive busca justiça com métodos próprios.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-025',
        order: 25,
        mystery: 'O Mistério do Lago Congelado',
        solution: 'O corpo foi escondido sob o gelo para despistar a polícia.',
        difficulty: 'medium',
        theme: 'murder',
        name: 'O Mistério do Lago Congelado',
        title: '❄️ O Mistério do Lago Congelado',
        description: 'Um corpo é encontrado em um lago congelado.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-026',
        order: 26,
        mystery: 'O Caso da Joia Desaparecida',
        solution: 'A joia foi escondida dentro de um livro raro.',
        difficulty: 'easy',
        theme: 'theft',
        name: 'O Caso da Joia Desaparecida',
        title: '💎 O Caso da Joia Desaparecida',
        description: 'Uma joia valiosa desaparece sem deixar pistas.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-027',
        order: 27,
        mystery: 'O Segredo do Antigo Diário',
        solution: 'O diário revelava a verdadeira identidade do assassino.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'O Segredo do Antigo Diário',
        title: '📖 O Segredo do Antigo Diário',
        description: 'Um diário antigo contém segredos perigosos.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-028',
        order: 28,
        mystery: 'O Mistério da Casa Abandonada',
        solution: 'A casa era usada para encontros secretos de uma sociedade clandestina.',
        difficulty: 'medium',
        theme: 'conspiracy',
        name: 'O Mistério da Casa Abandonada',
        title: '🏚️ O Mistério da Casa Abandonada',
        description: 'Uma casa abandonada esconde segredos obscuros.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-029',
        order: 29,
        mystery: 'A Noite do Sequestro',
        solution: 'O sequestro foi uma farsa para encobrir um roubo maior.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'A Noite do Sequestro',
        title: '🚨 A Noite do Sequestro',
        description: 'Um sequestro misterioso abala a cidade.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-030',
        order: 30,
        mystery: 'O Enigma do Código Secreto',
        solution: 'O código era uma mensagem cifrada que levava a um tesouro escondido.',
        difficulty: 'hard',
        theme: 'mystery',
        name: 'O Enigma do Código Secreto',
        title: '🔍 O Enigma do Código Secreto',
        description: 'Um código secreto intriga investigadores.',
        image: generateCaseImage(9)
      }
    ]
  },
  {
    id: 'pack-02',
    name: 'Cold Case #02',
    description: 'Em uma noite escura, um desaparecimento misterioso abala a cidade. Siga as pistas e revele o que aconteceu naquela noite fatídica.',
    image: case02Image,
    price: 19.9,
    difficulty: 'medium',
    category: 'mystery',
    cases: [
      {
        id: 'case-031',
        order: 31,
        mystery: 'O Desaparecimento do Professor',
        solution: 'O professor fugiu para proteger uma descoberta científica revolucionária.',
        difficulty: 'medium',
        theme: 'investigation',
        name: 'O Desaparecimento do Professor',
        title: '🎓 O Desaparecimento do Professor',
        description: 'Um professor desaparece misteriosamente da universidade.',
        image: generateCaseImage(0),
        isFree: true
      },
      {
        id: 'case-032',
        order: 32,
        mystery: 'O Mistério do Trem Fantasma',
        solution: 'O trem era usado para transportar mercadorias ilegais durante a noite.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Mistério do Trem Fantasma',
        title: '🚂 O Mistério do Trem Fantasma',
        description: 'Um trem fantasma aparece em trilhos abandonados.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-033',
        order: 33,
        mystery: 'A Conspiração na Prefeitura',
        solution: 'Funcionários corruptos desviavam verbas públicas há anos.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'A Conspiração na Prefeitura',
        title: '🏢 A Conspiração na Prefeitura',
        description: 'Corrupção e segredos na prefeitura da cidade.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-034',
        order: 34,
        mystery: 'O Caso do Pintor Desaparecido',
        solution: 'O pintor foi sequestrado por um colecionador obcecado por suas obras.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Caso do Pintor Desaparecido',
        title: '🎨 O Caso do Pintor Desaparecido',
        description: 'Um pintor desaparece sem deixar rastros.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-035',
        order: 35,
        mystery: 'O Enigma da Chave Perdida',
        solution: 'A chave abria um cofre com documentos secretos.',
        difficulty: 'medium',
        theme: 'mystery',
        name: 'O Enigma da Chave Perdida',
        title: '🗝️ O Enigma da Chave Perdida',
        description: 'Uma chave perdida leva a um segredo antigo.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-036',
        order: 36,
        mystery: 'O Mistério do Farol Apagado',
        solution: 'O farol foi sabotado para causar um acidente marítimo.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Apagado',
        title: '🚨 O Mistério do Farol Apagado',
        description: 'Um farol apaga misteriosamente durante uma tempestade.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-037',
        order: 37,
        mystery: 'A Noite do Roubo na Mansão',
        solution: 'O roubo foi planejado por um dos convidados da festa.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'A Noite do Roubo na Mansão',
        title: '🏰 A Noite do Roubo na Mansão',
        description: 'Uma mansão é roubada durante uma festa luxuosa.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-038',
        order: 38,
        mystery: 'O Segredo do Cofre Escondido',
        solution: 'O cofre escondia provas que incriminavam um político influente.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Cofre Escondido',
        title: '🔐 O Segredo do Cofre Escondido',
        description: 'Um cofre escondido guarda segredos perigosos.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-039',
        order: 39,
        mystery: 'O Caso do Assassino Invisível',
        solution: 'O assassino usava disfarces para não ser reconhecido.',
        difficulty: 'hard',
        theme: 'murder',
        name: 'O Caso do Assassino Invisível',
        title: '🕵️‍♂️ O Caso do Assassino Invisível',
        description: 'Um assassino deixa poucas pistas para trás.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-040',
        order: 40,
        mystery: 'O Mistério da Carta Queimada',
        solution: 'A carta continha uma confissão que foi parcialmente queimada.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Mistério da Carta Queimada',
        title: '✉️ O Mistério da Carta Queimada',
        description: 'Uma carta queimada pode ser a chave para um crime.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-041',
        order: 41,
        mystery: 'O Enigma do Relógio Parado',
        solution: 'O relógio parou no momento exato do crime.',
        difficulty: 'medium',
        theme: 'mystery',
        name: 'O Enigma do Relógio Parado',
        title: '⏰ O Enigma do Relógio Parado',
        description: 'Um relógio parado intriga os investigadores.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-042',
        order: 42,
        mystery: 'O Caso do Tesouro Escondido',
        solution: 'O tesouro estava escondido em um túnel secreto sob a cidade.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Caso do Tesouro Escondido',
        title: '💰 O Caso do Tesouro Escondido',
        description: 'Um tesouro perdido intriga caçadores de aventuras.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-043',
        order: 43,
        mystery: 'A Noite do Incêndio Misterioso',
        solution: 'O incêndio foi provocado para destruir provas de um crime.',
        difficulty: 'medium',
        theme: 'danger',
        name: 'A Noite do Incêndio Misterioso',
        title: '🔥 A Noite do Incêndio Misterioso',
        description: 'Um incêndio destrói evidências importantes.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-044',
        order: 44,
        mystery: 'O Mistério do Quadro Escondido',
        solution: 'O quadro escondia um mapa para um local secreto.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Mistério do Quadro Escondido',
        title: '🖼️ O Mistério do Quadro Escondido',
        description: 'Um quadro antigo guarda um segredo valioso.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-045',
        order: 45,
        mystery: 'O Caso do Médico Corrupto',
        solution: 'O médico usava sua posição para cometer fraudes.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Caso do Médico Corrupto',
        title: '🩺 O Caso do Médico Corrupto',
        description: 'Um médico é suspeito de corrupção e fraude.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-046',
        order: 46,
        mystery: 'O Enigma da Sala Secreta',
        solution: 'A sala secreta era usada para reuniões clandestinas.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Enigma da Sala Secreta',
        title: '🔒 O Enigma da Sala Secreta',
        description: 'Uma sala secreta intriga os investigadores.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-047',
        order: 47,
        mystery: 'O Mistério do Farol Abandonado',
        solution: 'O farol era usado para sinalizar navios contrabandistas.',
        difficulty: 'medium',
        theme: 'danger',
        name: 'O Mistério do Farol Abandonado',
        title: '🚨 O Mistério do Farol Abandonado',
        description: 'Um farol abandonado guarda segredos obscuros.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-048',
        order: 48,
        mystery: 'A Noite do Sequestro Misterioso',
        solution: 'O sequestro foi encenado para encobrir um roubo.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'A Noite do Sequestro Misterioso',
        title: '🚨 A Noite do Sequestro Misterioso',
        description: 'Um sequestro misterioso intriga a polícia.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-049',
        order: 49,
        mystery: 'O Segredo do Manuscrito Antigo',
        solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito Antigo',
        title: '📜 O Segredo do Manuscrito Antigo',
        description: 'Um manuscrito antigo guarda segredos perigosos.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-050',
        order: 50,
        mystery: 'O Mistério do Teatro Assombrado',
        solution: 'O teatro era palco de um esquema de chantagem.',
        difficulty: 'medium',
        theme: 'thriller',
        name: 'O Mistério do Teatro Assombrado',
        title: '🎭 O Mistério do Teatro Assombrado',
        description: 'Um teatro antigo é palco de eventos estranhos.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-051',
        order: 51,
        mystery: 'O Caso do Pintor Desaparecido',
        solution: 'O pintor foi sequestrado por um colecionador obcecado por suas obras.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Caso do Pintor Desaparecido',
        title: '🎨 O Caso do Pintor Desaparecido',
        description: 'Um pintor desaparece sem deixar rastros.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-052',
        order: 52,
        mystery: 'O Enigma da Chave Perdida',
        solution: 'A chave abria um cofre com documentos secretos.',
        difficulty: 'medium',
        theme: 'mystery',
        name: 'O Enigma da Chave Perdida',
        title: '🗝️ O Enigma da Chave Perdida',
        description: 'Uma chave perdida leva a um segredo antigo.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-053',
        order: 53,
        mystery: 'O Mistério do Farol Apagado',
        solution: 'O farol foi sabotado para causar um acidente marítimo.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Apagado',
        title: '🚨 O Mistério do Farol Apagado',
        description: 'Um farol apaga misteriosamente durante uma tempestade.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-054',
        order: 54,
        mystery: 'A Noite do Roubo na Mansão',
        solution: 'O roubo foi planejado por um dos convidados da festa.',
        difficulty: 'medium',
        theme: 'theft',
        name: 'A Noite do Roubo na Mansão',
        title: '🏰 A Noite do Roubo na Mansão',
        description: 'Uma mansão é roubada durante uma festa luxuosa.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-055',
        order: 55,
        mystery: 'O Segredo do Cofre Escondido',
        solution: 'O cofre escondia provas que incriminavam um político influente.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Cofre Escondido',
        title: '🔐 O Segredo do Cofre Escondido',
        description: 'Um cofre escondido guarda segredos perigosos.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-056',
        order: 56,
        mystery: 'O Caso do Assassino Invisível',
        solution: 'O assassino usava disfarces para não ser reconhecido.',
        difficulty: 'hard',
        theme: 'murder',
        name: 'O Caso do Assassino Invisível',
        title: '🕵️‍♂️ O Caso do Assassino Invisível',
        description: 'Um assassino deixa poucas pistas para trás.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-057',
        order: 57,
        mystery: 'O Mistério da Carta Queimada',
        solution: 'A carta continha uma confissão que foi parcialmente queimada.',
        difficulty: 'medium',
        theme: 'crime',
        name: 'O Mistério da Carta Queimada',
        title: '✉️ O Mistério da Carta Queimada',
        description: 'Uma carta queimada pode ser a chave para um crime.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-058',
        order: 58,
        mystery: 'O Enigma do Relógio Parado',
        solution: 'O relógio parou no momento exato do crime.',
        difficulty: 'medium',
        theme: 'mystery',
        name: 'O Enigma do Relógio Parado',
        title: '⏰ O Enigma do Relógio Parado',
        description: 'Um relógio parado intriga os investigadores.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-059',
        order: 59,
        mystery: 'O Caso do Tesouro Escondido',
        solution: 'O tesouro estava escondido em um túnel secreto sob a cidade.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Caso do Tesouro Escondido',
        title: '💰 O Caso do Tesouro Escondido',
        description: 'Um tesouro perdido intriga caçadores de aventuras.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-060',
        order: 60,
        mystery: 'A Noite do Incêndio Misterioso',
        solution: 'O incêndio foi provocado para destruir provas de um crime.',
        difficulty: 'medium',
        theme: 'danger',
        name: 'A Noite do Incêndio Misterioso',
        title: '🔥 A Noite do Incêndio Misterioso',
        description: 'Um incêndio destrói evidências importantes.',
        image: generateCaseImage(9)
      }
    ]
  },
  {
    id: 'pack-03',
    name: 'Cold Case #03',
    description: 'Um segredo sombrio enterrado sob a cidade está prestes a ser desenterrado. Você será capaz de juntar as peças antes que seja tarde demais?',
    image: case03Image,
    price: 19.9,
    difficulty: 'hard',
    category: 'thriller',
    cases: [
      {
        id: 'case-061',
        order: 61,
        mystery: 'O Segredo do Subterrâneo',
        solution: 'O subterrâneo escondia um laboratório secreto.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Subterrâneo',
        title: '🏚️ O Segredo do Subterrâneo',
        description: 'Um subterrâneo misterioso intriga os investigadores.',
        image: generateCaseImage(0),
        isFree: true
      },
      {
        id: 'case-062',
        order: 62,
        mystery: 'A Vingança do Ex-Policial',
        solution: 'O ex-policial armou um plano para se vingar dos que o traíram.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'A Vingança do Ex-Policial',
        title: '👮‍♂️ A Vingança do Ex-Policial',
        description: 'Um ex-policial busca justiça com métodos próprios.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-063',
        order: 63,
        mystery: 'O Mistério do Navio Afundado',
        solution: 'O navio afundado escondia uma carga ilegal.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Navio Afundado',
        title: '🚢 O Mistério do Navio Afundado',
        description: 'Um navio afundado guarda segredos perigosos.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-064',
        order: 64,
        mystery: 'O Caso do Cientista Desaparecido',
        solution: 'O cientista fugiu após descobrir uma conspiração governamental.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Caso do Cientista Desaparecido',
        title: '🔬 O Caso do Cientista Desaparecido',
        description: 'Um cientista desaparece misteriosamente.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-065',
        order: 65,
        mystery: 'O Enigma da Sala Trancada',
        solution: 'A vítima foi assassinada antes de trancar a sala por dentro.',
        difficulty: 'hard',
        theme: 'murder',
        name: 'O Enigma da Sala Trancada',
        title: '🔒 O Enigma da Sala Trancada',
        description: 'Um assassinato em uma sala trancada intriga os detetives.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-066',
        order: 66,
        mystery: 'O Mistério do Código Secreto',
        solution: 'O código era uma mensagem cifrada que levava a um tesouro escondido.',
        difficulty: 'hard',
        theme: 'mystery',
        name: 'O Mistério do Código Secreto',
        title: '🔍 O Mistério do Código Secreto',
        description: 'Um código secreto intriga investigadores.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-067',
        order: 67,
        mystery: 'O Caso do Assassino Invisível',
        solution: 'O assassino usava disfarces para não ser reconhecido.',
        difficulty: 'hard',
        theme: 'murder',
        name: 'O Caso do Assassino Invisível',
        title: '🕵️‍♂️ O Caso do Assassino Invisível',
        description: 'Um assassino deixa poucas pistas para trás.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-068',
        order: 68,
        mystery: 'O Segredo do Manuscrito Antigo',
        solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito Antigo',
        title: '📜 O Segredo do Manuscrito Antigo',
        description: 'Um manuscrito antigo guarda segredos perigosos.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-069',
        order: 69,
        mystery: 'O Mistério do Teatro Assombrado',
        solution: 'O teatro era palco de um esquema de chantagem.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Mistério do Teatro Assombrado',
        title: '🎭 O Mistério do Teatro Assombrado',
        description: 'Um teatro antigo é palco de eventos estranhos.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-070',
        order: 70,
        mystery: 'O Caso do Médico Corrupto',
        solution: 'O médico usava sua posição para cometer fraudes.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'O Caso do Médico Corrupto',
        title: '🩺 O Caso do Médico Corrupto',
        description: 'Um médico é suspeito de corrupção e fraude.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-071',
        order: 71,
        mystery: 'O Enigma da Sala Secreta',
        solution: 'A sala secreta era usada para reuniões clandestinas.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Enigma da Sala Secreta',
        title: '🔒 O Enigma da Sala Secreta',
        description: 'Uma sala secreta intriga os investigadores.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-072',
        order: 72,
        mystery: 'O Mistério do Farol Abandonado',
        solution: 'O farol era usado para sinalizar navios contrabandistas.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Abandonado',
        title: '🚨 O Mistério do Farol Abandonado',
        description: 'Um farol abandonado guarda segredos obscuros.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-073',
        order: 73,
        mystery: 'A Noite do Sequestro Misterioso',
        solution: 'O sequestro foi encenado para encobrir um roubo.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'A Noite do Sequestro Misterioso',
        title: '🚨 A Noite do Sequestro Misterioso',
        description: 'Um sequestro misterioso intriga a polícia.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-074',
        order: 74,
        mystery: 'O Segredo do Manuscrito Antigo',
        solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito Antigo',
        title: '📜 O Segredo do Manuscrito Antigo',
        description: 'Um manuscrito antigo guarda segredos perigosos.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-075',
        order: 75,
        mystery: 'O Mistério do Teatro Assombrado',
        solution: 'O teatro era palco de um esquema de chantagem.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Mistério do Teatro Assombrado',
        title: '🎭 O Mistério do Teatro Assombrado',
        description: 'Um teatro antigo é palco de eventos estranhos.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-076',
        order: 76,
        mystery: 'O Caso do Médico Corrupto',
        solution: 'O médico usava sua posição para cometer fraudes.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'O Caso do Médico Corrupto',
        title: '🩺 O Caso do Médico Corrupto',
        description: 'Um médico é suspeito de corrupção e fraude.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-077',
        order: 77,
        mystery: 'O Enigma da Sala Secreta',
        solution: 'A sala secreta era usada para reuniões clandestinas.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Enigma da Sala Secreta',
        title: '🔒 O Enigma da Sala Secreta',
        description: 'Uma sala secreta intriga os investigadores.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-078',
        order: 78,
        mystery: 'O Mistério do Farol Abandonado',
        solution: 'O farol era usado para sinalizar navios contrabandistas.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Abandonado',
        title: '🚨 O Mistério do Farol Abandonado',
        description: 'Um farol abandonado guarda segredos obscuros.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-079',
        order: 79,
        mystery: 'A Noite do Sequestro Misterioso',
        solution: 'O sequestro foi encenado para encobrir um roubo.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'A Noite do Sequestro Misterioso',
        title: '🚨 A Noite do Sequestro Misterioso',
        description: 'Um sequestro misterioso intriga a polícia.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-080',
        order: 80,
        mystery: 'O Segredo do Manuscrito Antigo',
        solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito Antigo',
        title: '📜 O Segredo do Manuscrito Antigo',
        description: 'Um manuscrito antigo guarda segredos perigosos.',
        image: generateCaseImage(9)
      },
      {
        id: 'case-081',
        order: 81,
        mystery: 'O Mistério do Teatro Assombrado',
        solution: 'O teatro era palco de um esquema de chantagem.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Mistério do Teatro Assombrado',
        title: '🎭 O Mistério do Teatro Assombrado',
        description: 'Um teatro antigo é palco de eventos estranhos.',
        image: generateCaseImage(0)
      },
      {
        id: 'case-082',
        order: 82,
        mystery: 'O Caso do Médico Corrupto',
        solution: 'O médico usava sua posição para cometer fraudes.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'O Caso do Médico Corrupto',
        title: '🩺 O Caso do Médico Corrupto',
        description: 'Um médico é suspeito de corrupção e fraude.',
        image: generateCaseImage(1)
      },
      {
        id: 'case-083',
        order: 83,
        mystery: 'O Enigma da Sala Secreta',
        solution: 'A sala secreta era usada para reuniões clandestinas.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Enigma da Sala Secreta',
        title: '🔒 O Enigma da Sala Secreta',
        description: 'Uma sala secreta intriga os investigadores.',
        image: generateCaseImage(2)
      },
      {
        id: 'case-084',
        order: 84,
        mystery: 'O Mistério do Farol Abandonado',
        solution: 'O farol era usado para sinalizar navios contrabandistas.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Abandonado',
        title: '🚨 O Mistério do Farol Abandonado',
        description: 'Um farol abandonado guarda segredos obscuros.',
        image: generateCaseImage(3)
      },
      {
        id: 'case-085',
        order: 85,
        mystery: 'A Noite do Sequestro Misterioso',
        solution: 'O sequestro foi encenado para encobrir um roubo.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'A Noite do Sequestro Misterioso',
        title: '🚨 A Noite do Sequestro Misterioso',
        description: 'Um sequestro misterioso intriga a polícia.',
        image: generateCaseImage(4)
      },
      {
        id: 'case-086',
        order: 86,
        mystery: 'O Segredo do Manuscrito Antigo',
        solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        name: 'O Segredo do Manuscrito Antigo',
        title: '📜 O Segredo do Manuscrito Antigo',
        description: 'Um manuscrito antigo guarda segredos perigosos.',
        image: generateCaseImage(5)
      },
      {
        id: 'case-087',
        order: 87,
        mystery: 'O Mistério do Teatro Assombrado',
        solution: 'O teatro era palco de um esquema de chantagem.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Mistério do Teatro Assombrado',
        title: '🎭 O Mistério do Teatro Assombrado',
        description: 'Um teatro antigo é palco de eventos estranhos.',
        image: generateCaseImage(6)
      },
      {
        id: 'case-088',
        order: 88,
        mystery: 'O Caso do Médico Corrupto',
        solution: 'O médico usava sua posição para cometer fraudes.',
        difficulty: 'hard',
        theme: 'crime',
        name: 'O Caso do Médico Corrupto',
        title: '🩺 O Caso do Médico Corrupto',
        description: 'Um médico é suspeito de corrupção e fraude.',
        image: generateCaseImage(7)
      },
      {
        id: 'case-089',
        order: 89,
        mystery: 'O Enigma da Sala Secreta',
        solution: 'A sala secreta era usada para reuniões clandestinas.',
        difficulty: 'hard',
        theme: 'thriller',
        name: 'O Enigma da Sala Secreta',
        title: '🔒 O Enigma da Sala Secreta',
        description: 'Uma sala secreta intriga os investigadores.',
        image: generateCaseImage(8)
      },
      {
        id: 'case-090',
        order: 90,
        mystery: 'O Mistério do Farol Abandonado',
        solution: 'O farol era usado para sinalizar navios contrabandistas.',
        difficulty: 'hard',
        theme: 'danger',
        name: 'O Mistério do Farol Abandonado',
        title: '🚨 O Mistério do Farol Abandonado',
        description: 'Um farol abandonado guarda segredos obscuros.',
        image: generateCaseImage(9)
      }
    ]
  },
  {
    id: 'pack-04',
    name: 'Cold Case #04',
    description: 'O passado retorna para assombrar o presente em uma teia de mistérios e enganos. Descubra a verdade antes que ela o consuma.',
    image: case04Image,
    price: 19.9,
    difficulty: 'hard',
    category: 'thriller',
    cases: []
  }
];

// Helper function to get user packs from Supabase
export const getUserPacks = (userId: string): string[] => {
  // This will be replaced with actual Supabase query in the Library component
  // For now, return empty array as this will be handled by the component
  return [];
};

// Helper function to get pack by ID
export const getPackById = (packId: string) => {
  return packs.find(pack => pack.id === packId);
};
