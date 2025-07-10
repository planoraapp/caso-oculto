
import { Case, Pack } from './types';

const casesPack1: Case[] = [
  {
    id: '1',
    order: 1,
    mystery: 'O Enigma do Quarto Trancado',
    solution: 'O mordomo usou uma passagem secreta.',
    difficulty: 'medium',
    theme: 'mystery',
    name: 'Quarto Trancado',
    icon: 'door-closed',
    title: 'O Mordomo Culpado',
    description: 'Um assassinato em um quarto trancado intriga a polícia.',
    image: '/lovable-uploads/pack1/case1.png'
  },
  {
    id: '2',
    order: 2,
    mystery: 'O Mistério do Diamante Desaparecido',
    solution: 'A joalheira trocou o diamante por uma réplica.',
    difficulty: 'easy',
    theme: 'theft',
    name: 'Diamante',
    icon: 'gem',
    title: 'A Troca na Joalheria',
    description: 'Um valioso diamante desaparece de uma joalheria.',
    image: '/lovable-uploads/pack1/case2.png'
  },
  {
    id: '3',
    order: 3,
    mystery: 'O Segredo da Mansão Assombrada',
    solution: 'O fantasma era uma projeção holográfica.',
    difficulty: 'hard',
    theme: 'mystery',
    name: 'Mansão',
    icon: 'home',
    title: 'A Projeção Fantasmagórica',
    description: 'Uma mansão assombrada guarda um segredo tecnológico.',
    image: '/lovable-uploads/pack1/case3.png'
  },
  {
    id: '4',
    order: 4,
    mystery: 'O Caso do Colecionador de Arte',
    solution: 'O colecionador falsificou a própria morte para vender os quadros.',
    difficulty: 'medium',
    theme: 'murder',
    name: 'Arte',
    icon: 'paint-brush',
    title: 'A Farsa do Colecionador',
    description: 'Um colecionador de arte é encontrado morto em sua galeria.',
    image: '/lovable-uploads/pack1/case4.png'
  },
  {
    id: '5',
    order: 5,
    mystery: 'O Enigma da Biblioteca Perdida',
    solution: 'O bibliotecário escondeu o livro para protegê-lo de ladrões.',
    difficulty: 'easy',
    theme: 'mystery',
    name: 'Biblioteca',
    icon: 'book',
    title: 'O Segredo do Bibliotecário',
    description: 'Um livro raro desaparece da biblioteca da cidade.',
    image: '/lovable-uploads/pack1/case5.png'
  },
  {
    id: '6',
    order: 6,
    mystery: 'O Mistério do Circo Abandonado',
    solution: 'O palhaço era um ex-detetive disfarçado.',
    difficulty: 'hard',
    theme: 'mystery',
    name: 'Circo',
    icon: 'tent',
    title: 'O Palhaço Detetive',
    description: 'Um circo abandonado esconde um segredo sombrio.',
    image: '/lovable-uploads/pack1/case6.png'
  },
  {
    id: '7',
    order: 7,
    mystery: 'O Caso do Chef Desaparecido',
    solution: 'O chef fugiu com o dinheiro do restaurante.',
    difficulty: 'medium',
    theme: 'mystery',
    name: 'Chef',
    icon: 'utensils',
    title: 'A Fuga do Chef',
    description: 'Um chef famoso desaparece sem deixar rastros.',
    image: '/lovable-uploads/pack1/case7.png'
  },
  {
    id: '8',
    order: 8,
    mystery: 'O Enigma do Jardim Secreto',
    solution: 'A jardineira enterrou um tesouro no jardim.',
    difficulty: 'easy',
    theme: 'mystery',
    name: 'Jardim',
    icon: 'tree',
    title: 'O Tesouro da Jardineira',
    description: 'Um jardim secreto guarda um tesouro escondido.',
    image: '/lovable-uploads/pack1/case8.png'
  },
  {
    id: '9',
    order: 9,
    mystery: 'O Mistério do Trem Fantasma',
    solution: 'O trem era usado para contrabandear mercadorias ilegais.',
    difficulty: 'hard',
    theme: 'mystery',
    name: 'Trem',
    icon: 'train',
    title: 'O Contrabando no Trem',
    description: 'Um trem fantasma assombra os trilhos da cidade.',
    image: '/lovable-uploads/pack1/case9.png'
  },
  {
    id: '10',
    order: 10,
    mystery: 'O Caso da Ilha Misteriosa',
    solution: 'A ilha era um laboratório secreto de experimentos genéticos.',
    difficulty: 'medium',
    theme: 'mystery',
    name: 'Ilha',
    icon: 'island',
    title: 'O Laboratório Genético',
    description: 'Uma ilha misteriosa esconde segredos perigosos.',
    image: '/lovable-uploads/pack1/case10.png'
  }
];

const casesPack2: Case[] = [
  {
    id: '11',
    order: 1,
    mystery: 'O Enigma do Museu Abandonado',
    solution: 'O curador falsificou o roubo para vender as obras no mercado negro.',
    difficulty: 'medium',
    theme: 'theft',
    name: 'Museu',
    icon: 'building',
    title: 'A Farsa do Curador',
    description: 'Um museu abandonado é palco de um roubo misterioso.',
    image: '/lovable-uploads/pack2/case1.png'
  },
  {
    id: '12',
    order: 2,
    mystery: 'O Mistério do Farol Solitário',
    solution: 'O faroleiro estava escondendo um tesouro de piratas.',
    difficulty: 'easy',
    theme: 'mystery',
    name: 'Farol',
    icon: 'lighthouse',
    title: 'O Segredo do Faroleiro',
    description: 'Um farol solitário guarda um segredo obscuro.',
    image: '/lovable-uploads/pack2/case2.png'
  },
  {
    id: '13',
    order: 3,
    mystery: 'O Caso do Hotel Mal-Assombrado',
    solution: 'O gerente usava o hotel para atividades ilegais.',
    difficulty: 'hard',
    theme: 'crime',
    name: 'Hotel',
    icon: 'hotel',
    title: 'O Gerente Criminoloso',
    description: 'Um hotel mal-assombrado esconde segredos sombrios.',
    image: '/lovable-uploads/pack2/case3.png'
  },
  {
    id: '14',
    order: 4,
    mystery: 'O Enigma da Galeria de Arte',
    solution: 'O artista planejou o roubo para aumentar o valor de suas obras.',
    difficulty: 'medium',
    theme: 'theft',
    name: 'Galeria',
    icon: 'image',
    title: 'O Plano do Artista',
    description: 'Uma galeria de arte é palco de um roubo audacioso.',
    image: '/lovable-uploads/pack2/case4.png'
  },
  {
    id: '15',
    order: 5,
    mystery: 'O Mistério da Loja de Antiguidades',
    solution: 'O dono da loja vendia itens roubados.',
    difficulty: 'easy',
    theme: 'crime',
    name: 'Antiguidades',
    icon: 'store',
    title: 'O Segredo do Antigário',
    description: 'Uma loja de antiguidades esconde um segredo obscuro.',
    image: '/lovable-uploads/pack2/case5.png'
  },
  {
    id: '16',
    order: 6,
    mystery: 'O Caso do Teatro Fantasma',
    solution: 'O diretor usava o teatro para lavar dinheiro.',
    difficulty: 'hard',
    theme: 'crime',
    name: 'Teatro',
    icon: 'theater',
    title: 'A Lavagem do Diretor',
    description: 'Um teatro fantasma esconde segredos sombrios.',
    image: '/lovable-uploads/pack2/case6.png'
  },
  {
    id: '17',
    order: 7,
    mystery: 'O Enigma do Cassino Abandonado',
    solution: 'O dono do cassino falsificou a própria morte para fugir com o dinheiro.',
    difficulty: 'medium',
    theme: 'crime',
    name: 'Cassino',
    icon: 'casino',
    title: 'A Fuga do Dono',
    description: 'Um cassino abandonado esconde segredos sombrios.',
    image: '/lovable-uploads/pack2/case7.png'
  },
  {
    id: '18',
    order: 8,
    mystery: 'O Mistério da Escola Assombrada',
    solution: 'O zelador estava escondendo um segredo obscuro.',
    difficulty: 'easy',
    theme: 'mystery',
    name: 'Escola',
    icon: 'school',
    title: 'O Segredo do Zelador',
    description: 'Uma escola assombrada esconde segredos sombrios.',
    image: '/lovable-uploads/pack2/case8.png'
  },
  {
    id: '19',
    order: 9,
    mystery: 'O Caso do Banco Abandonado',
    solution: 'O gerente planejou o roubo para incriminar outro funcionário.',
    difficulty: 'hard',
    theme: 'crime',
    name: 'Banco',
    icon: 'bank',
    title: 'O Plano do Gerente',
    description: 'Um banco abandonado é palco de um roubo audacioso.',
    image: '/lovable-uploads/pack2/case9.png'
  },
  {
    id: '20',
    order: 10,
    mystery: 'O Enigma da Fábrica Desativada',
    solution: 'O dono da fábrica usava-a para produzir drogas.',
    difficulty: 'medium',
    theme: 'crime',
    name: 'Fábrica',
    icon: 'factory',
    title: 'A Produção Clandestina',
    description: 'Uma fábrica desativada esconde segredos sombrios.',
    image: '/lovable-uploads/pack2/case10.png'
  }
];

const casesPack3: Case[] = [
  {
    id: '21',
    order: 1,
    mystery: 'O Enigma do Laboratório Secreto',
    solution: 'O cientista estava conduzindo experimentos ilegais.',
    difficulty: 'medium',
    theme: 'investigation',
    name: 'Laboratório',
    icon: 'lab',
    title: 'Os Experimentos Proibidos',
    description: 'Um laboratório secreto esconde segredos perigosos.',
    image: '/lovable-uploads/pack3/case1.png'
  },
  {
    id: '22',
    order: 2,
    mystery: 'O Mistério da Base Militar Abandonada',
    solution: 'A base era usada para testes de armas biológicas.',
    difficulty: 'easy',
    theme: 'investigation',
    name: 'Base Militar',
    icon: 'military',
    title: 'Os Testes Biológicos',
    description: 'Uma base militar abandonada esconde segredos obscuros.',
    image: '/lovable-uploads/pack3/case2.png'
  },
  {
    id: '23',
    order: 3,
    mystery: 'O Caso do Bunker Subterrâneo',
    solution: 'O bunker era usado para esconder um político corrupto.',
    difficulty: 'hard',
    theme: 'conspiracy',
    name: 'Bunker',
    icon: 'bunker',
    title: 'O Político Corrupto',
    description: 'Um bunker subterrâneo esconde segredos sombrios.',
    image: '/lovable-uploads/pack3/case3.png'
  },
  {
    id: '24',
    order: 4,
    mystery: 'O Enigma da Nave Espacial Caída',
    solution: 'A nave caiu devido a uma sabotagem.',
    difficulty: 'medium',
    theme: 'investigation',
    name: 'Nave Espacial',
    icon: 'rocket',
    title: 'A Sabotagem Espacial',
    description: 'Uma nave espacial caída esconde segredos perigosos.',
    image: '/lovable-uploads/pack3/case4.png'
  },
  {
    id: '25',
    order: 5,
    mystery: 'O Mistério da Cidade Submersa',
    solution: 'A cidade foi afundada por um terremoto.',
    difficulty: 'easy',
    theme: 'mystery',
    name: 'Cidade Submersa',
    icon: 'city',
    title: 'O Terremoto Fatal',
    description: 'Uma cidade submersa esconde segredos obscuros.',
    image: '/lovable-uploads/pack3/case5.png'
  },
  {
    id: '26',
    order: 6,
    mystery: 'O Caso da Pirâmide Esquecida',
    solution: 'A pirâmide era usada para rituais secretos.',
    difficulty: 'hard',
    theme: 'conspiracy',
    name: 'Pirâmide',
    icon: 'pyramid',
    title: 'Os Rituais Proibidos',
    description: 'Uma pirâmide esquecida esconde segredos sombrios.',
    image: '/lovable-uploads/pack3/case6.png'
  },
  {
    id: '27',
    order: 7,
    mystery: 'O Enigma da Mina Abandonada',
    solution: 'A mina era usada para extrair um mineral raro.',
    difficulty: 'medium',
    theme: 'investigation',
    name: 'Mina',
    icon: 'mine',
    title: 'A Extração Secreta',
    description: 'Uma mina abandonada esconde segredos perigosos.',
    image: '/lovable-uploads/pack3/case7.png'
  },
  {
    id: '28',
    order: 8,
    mystery: 'O Mistério da Estação Espacial Derelita',
    solution: 'A estação foi abandonada devido a um motim.',
    difficulty: 'easy',
    theme: 'investigation',
    name: 'Estação Espacial',
    icon: 'satellite',
    title: 'O Motim Espacial',
    description: 'Uma estação espacial derelita esconde segredos obscuros.',
    image: '/lovable-uploads/pack3/case8.png'
  },
  {
    id: '29',
    order: 9,
    mystery: 'O Caso do Templo Perdido',
    solution: 'O templo era usado para sacrifícios humanos.',
    difficulty: 'hard',
    theme: 'conspiracy',
    name: 'Templo',
    icon: 'temple',
    title: 'Os Sacrifícios Humanos',
    description: 'Um templo perdido esconde segredos sombrios.',
    image: '/lovable-uploads/pack3/case9.png'
  },
  {
    id: '30',
    order: 10,
    mystery: 'O Enigma da Cratera Misteriosa',
    solution: 'A cratera foi causada por um experimento secreto.',
    difficulty: 'medium',
    theme: 'investigation',
    name: 'Cratera',
    icon: 'circle',
    title: 'O Experimento Secreto',
    description: 'Uma cratera misteriosa esconde segredos perigosos.',
    image: '/lovable-uploads/pack3/case10.png'
  }
];

const casesPack4: Case[] = [
  {
    id: '31',
    order: 1,
    mystery: 'O Enigma do Asilo Abandonado',
    solution: 'Um médico realizava experimentos ilegais nos pacientes.',
    difficulty: 'medium',
    theme: 'thriller',
    name: 'Asilo',
    icon: 'hospital',
    title: 'Os Horrores do Asilo',
    description: 'Um asilo abandonado esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case1.png'
  },
  {
    id: '32',
    order: 2,
    mystery: 'O Mistério da Floresta Proibida',
    solution: 'A floresta era usada para rituais de magia negra.',
    difficulty: 'easy',
    theme: 'danger',
    name: 'Floresta',
    icon: 'tree',
    title: 'Os Rituais Proibidos',
    description: 'Uma floresta proibida esconde segredos obscuros.',
    image: '/lovable-uploads/pack4/case2.png'
  },
  {
    id: '33',
    order: 3,
    mystery: 'O Caso da Cabana Isolada',
    solution: 'Um serial killer usava a cabana como esconderijo.',
    difficulty: 'hard',
    theme: 'thriller',
    name: 'Cabana',
    icon: 'home',
    title: 'O Esconderijo do Serial Killer',
    description: 'Uma cabana isolada esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case3.png'
  },
  {
    id: '34',
    order: 4,
    mystery: 'O Enigma do Cemitério Maldito',
    solution: 'Um coveiro desenterrava corpos para vendê-los.',
    difficulty: 'medium',
    theme: 'danger',
    name: 'Cemitério',
    icon: 'cross',
    title: 'Os Crimes do Coveiro',
    description: 'Um cemitério maldito esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case4.png'
  },
  {
    id: '35',
    order: 5,
    mystery: 'O Mistério da Prisão de Segurança Máxima',
    solution: 'Um guarda ajudou um prisioneiro a escapar.',
    difficulty: 'easy',
    theme: 'crime',
    name: 'Prisão',
    icon: 'prison',
    title: 'A Fuga Impossível',
    description: 'Uma prisão de segurança máxima esconde segredos obscuros.',
    image: '/lovable-uploads/pack4/case5.png'
  },
  {
    id: '36',
    order: 6,
    mystery: 'O Caso do Orfanato Sombrio',
    solution: 'Uma freira maltratava as crianças.',
    difficulty: 'hard',
    theme: 'thriller',
    name: 'Orfanato',
    icon: 'child',
    title: 'Os Maltratos da Freira',
    description: 'Um orfanato sombrio esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case6.png'
  },
  {
    id: '37',
    order: 7,
    mystery: 'O Enigma do Navio Fantasma',
    solution: 'Um capitão enlouqueceu e matou toda a tripulação.',
    difficulty: 'medium',
    theme: 'danger',
    name: 'Navio',
    icon: 'ship',
    title: 'A Loucura do Capitão',
    description: 'Um navio fantasma esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case7.png'
  },
  {
    id: '38',
    order: 8,
    mystery: 'O Mistério da Casa na Colina',
    solution: 'Uma família rica escondia um segredo obscuro.',
    difficulty: 'easy',
    theme: 'thriller',
    name: 'Casa na Colina',
    icon: 'home',
    title: 'O Segredo da Família',
    description: 'Uma casa na colina esconde segredos obscuros.',
    image: '/lovable-uploads/pack4/case8.png'
  },
  {
    id: '39',
    order: 9,
    mystery: 'O Caso do Manicômio Abandonado',
    solution: 'Um médico fazia experimentos com os pacientes.',
    difficulty: 'hard',
    theme: 'thriller',
    name: 'Manicômio',
    icon: 'hospital',
    title: 'Os Experimentos Proibidos',
    description: 'Um manicômio abandonado esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case9.png'
  },
  {
    id: '40',
    order: 10,
    mystery: 'O Enigma da Mina Assombrada',
    solution: 'Um mineiro morreu preso na mina e assombra o local.',
    difficulty: 'medium',
    theme: 'danger',
    name: 'Mina',
    icon: 'mine',
    title: 'O Fantasma do Mineiro',
    description: 'Uma mina assombrada esconde segredos sombrios.',
    image: '/lovable-uploads/pack4/case10.png'
  }
];

const casesPack5: Case[] = [
  {
    id: '41',
    order: 1,
    mystery: 'O Enigma do Escritório de Advocacia',
    solution: 'Um advogado estava desviando dinheiro dos clientes.',
    difficulty: 'medium',
    theme: 'power',
    name: 'Escritório',
    icon: 'briefcase',
    title: 'A Corrupção do Advogado',
    description: 'Um escritório de advocacia esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case1.png'
  },
  {
    id: '42',
    order: 2,
    mystery: 'O Mistério da Câmara Municipal',
    solution: 'Um vereador recebia propina para aprovar projetos.',
    difficulty: 'easy',
    theme: 'power',
    name: 'Câmara',
    icon: 'town-hall',
    title: 'A Propina do Vereador',
    description: 'Uma câmara municipal esconde segredos obscuros.',
    image: '/lovable-uploads/pack5/case2.png'
  },
  {
    id: '43',
    order: 3,
    mystery: 'O Caso da Empresa de Tecnologia',
    solution: 'Um CEO espionava os funcionários.',
    difficulty: 'hard',
    theme: 'power',
    name: 'Empresa',
    icon: 'computer',
    title: 'A Espionagem do CEO',
    description: 'Uma empresa de tecnologia esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case3.png'
  },
  {
    id: '44',
    order: 4,
    mystery: 'O Enigma do Sindicato dos Trabalhadores',
    solution: 'Um líder sindical desviava dinheiro dos membros.',
    difficulty: 'medium',
    theme: 'power',
    name: 'Sindicato',
    icon: 'users',
    title: 'O Desvio do Líder',
    description: 'Um sindicato dos trabalhadores esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case4.png'
  },
  {
    id: '45',
    order: 5,
    mystery: 'O Mistério da Organização Não Governamental',
    solution: 'Um diretor usava a ONG para lavar dinheiro.',
    difficulty: 'easy',
    theme: 'power',
    name: 'ONG',
    icon: 'hand',
    title: 'A Lavagem do Diretor',
    description: 'Uma organização não governamental esconde segredos obscuros.',
    image: '/lovable-uploads/pack5/case5.png'
  },
  {
    id: '46',
    order: 6,
    mystery: 'O Caso da Agência de Publicidade',
    solution: 'Um publicitário chantageava os clientes.',
    difficulty: 'hard',
    theme: 'power',
    name: 'Agência',
    icon: 'megaphone',
    title: 'A Chantagem do Publicitário',
    description: 'Uma agência de publicidade esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case6.png'
  },
  {
    id: '47',
    order: 7,
    mystery: 'O Enigma do Hospital Público',
    solution: 'Um médico vendia órgãos no mercado negro.',
    difficulty: 'medium',
    theme: 'power',
    name: 'Hospital',
    icon: 'hospital',
    title: 'O Tráfico de Órgãos',
    description: 'Um hospital público esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case7.png'
  },
  {
    id: '48',
    order: 8,
    mystery: 'O Mistério da Escola Particular',
    solution: 'Um professor vendia notas para os alunos.',
    difficulty: 'easy',
    theme: 'power',
    name: 'Escola',
    icon: 'school',
    title: 'A Venda de Notas',
    description: 'Uma escola particular esconde segredos obscuros.',
    image: '/lovable-uploads/pack5/case8.png'
  },
  {
    id: '49',
    order: 9,
    mystery: 'O Caso da Igreja Local',
    solution: 'Um padre desviava dinheiro das doações.',
    difficulty: 'hard',
    theme: 'power',
    name: 'Igreja',
    icon: 'church',
    title: 'O Desvio do Padre',
    description: 'Uma igreja local esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case9.png'
  },
  {
    id: '50',
    order: 10,
    mystery: 'O Enigma da Estação de Televisão',
    solution: 'Um jornalista manipulava as notícias.',
    difficulty: 'medium',
    theme: 'power',
    name: 'Televisão',
    icon: 'tv',
    title: 'A Manipulação do Jornalista',
    description: 'Uma estação de televisão esconde segredos sombrios.',
    image: '/lovable-uploads/pack5/case10.png'
  }
];

export const packs: Pack[] = [
  {
    id: 'pack1',
    name: 'Mistérios Clássicos',
    description: 'Desvende os mistérios mais clássicos e desafiadores.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/pack1.png',
    category: 'regular',
    cases: casesPack1
  },
  {
    id: 'pack2',
    name: 'Crimes Ocultos',
    description: 'Explore os crimes mais obscuros e intrigantes.',
    price: 14.80,
    difficulty: 'easy',
    image: '/lovable-uploads/pack2.png',
    category: 'regular',
    cases: casesPack2
  },
  {
    id: 'pack3',
    name: 'Conspirações Secretas',
    description: 'Investigue as conspirações mais secretas e perigosas.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/pack3.png',
    category: 'regular',
    cases: casesPack3
  },
  {
    id: 'pack4',
    name: 'Thrillers Psicológicos',
    description: 'Adentre os thrillers mais psicológicos e perturbadores.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/pack4.png',
    category: 'regular',
    cases: casesPack4
  },
  {
    id: 'pack5',
    name: 'Jogos de Poder',
    description: 'Descubra os jogos de poder mais corruptos e ambiciosos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/pack5.png',
    category: 'regular',
    cases: casesPack5
  },
  {
    id: 'combo',
    name: 'Combo 5 Packs',
    description: 'Escolha 5 packs e economize 20%.',
    price: 59.20,
    difficulty: 'medium',
    image: '/lovable-uploads/combo.png',
    category: 'combo',
    cases: []
  },
  {
    id: 'complete',
    name: 'Acesso Total',
    description: 'Tenha acesso a todos os packs e conteúdos exclusivos.',
    price: 99.90,
    difficulty: 'medium',
    image: '/lovable-uploads/complete.png',
    category: 'complete',
    cases: []
  }
];

// Export helper functions that other components need
export const getPackById = (id: string): Pack | undefined => {
  return packs.find(pack => pack.id === id);
};

// Updated getUserPacks function to properly query the database
export const getUserPacks = (userId: string): string[] => {
  // This function now returns an empty array by default
  // The actual pack access should be checked via Supabase queries
  // in the components that need this information
  return [];
};

// Export types for backward compatibility
export type { Case, Pack } from './types';

// MercadoPago links placeholder (if needed by PurchaseModal)
export const MERCADOPAGO_LINKS = {
  individual: '#',
  combo: '#',
  complete: '#'
};
