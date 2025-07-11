
import { Case, Pack } from '../data/types';
import { supabase } from '../integrations/supabase/client';

// Helper function to get difficulty from emoji
const getDifficultyFromEmoji = (emoji: string): 'easy' | 'medium' | 'hard' => {
  switch (emoji) {
    case '🟢': return 'easy';
    case '🟡': return 'medium';
    case '🔴': return 'hard';
    default: return 'medium';
  }
};

// Missing case arrays - these need to be defined but since they're not in the current spec, 
// I'll create empty arrays as placeholders
const sussurrosDoAlemCases: Case[] = [];
const sombrasNoiteCases: Case[] = [];
const crimesImperfeitosCases: Case[] = [];
const lendasUrbanasCases: Case[] = [];
const paradoxosMortaisCases: Case[] = [];
const absurdamenteRealCases: Case[] = [];
const dossieConfidencialCases: Case[] = [];
const doseLetal: Case[] = [];
const fimDeJogoCases: Case[] = [];

// Ironias do Destino - Mortes e acidentes causados por coincidências trágicas e reviravoltas irônicas
export const ironiasDosDestinoCases: Case[] = [
  {
    id: 'ironias-1',
    order: 1,
    mystery: 'Um filatelista compra um selo extremamente raro por uma fortuna. No dia seguinte, o selo não vale nada.',
    solution: 'No mesmo dia da compra, arqueólogos descobriram uma arca cheia de milhares de exemplares do mesmo selo "raro", tornando-o comum e sem valor.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Selo Sem Valor',
    icon: 'mail',
    title: 'O Tesouro Encontrado',
    description: 'Um selo raro perde todo seu valor overnight.',
    image: '/lovable-uploads/ironias/case1.png',
    isFree: true
  },
  {
    id: 'ironias-2',
    order: 2,
    mystery: 'Um prisioneiro passa 8 anos cavando um túnel para a liberdade. Ele emerge e se encontra no pátio de uma nova prisão.',
    solution: 'Durante os anos em que ele cavava, uma nova prisão de segurança máxima foi construída ao lado da antiga atrás de uma floresta.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'A Fuga da Prisão',
    icon: 'lock',
    title: 'A Liberdade Ilusória',
    description: 'Oito anos de escavação para lugar nenhum.',
    image: '/lovable-uploads/ironias/case2.png'
  },
  {
    id: 'ironias-3',
    order: 3,
    mystery: 'Um homem ganha na loteria e morre no mesmo dia.',
    solution: 'Ele era alérgico a amendoins. Para celebrar, comprou um bolo caro que, sem ele saber, continha traços de amendoim.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'O Vencedor da Loteria',
    icon: 'star',
    title: 'A Celebração Fatal',
    description: 'A maior sorte da vida se torna a maior tragédia.',
    image: '/lovable-uploads/ironias/case3.png'
  },
  {
    id: 'ironias-4',
    order: 4,
    mystery: 'Um caçador é encontrado morto, baleado pela sua própria espingarda, na floresta.',
    solution: 'O seu cão de caça saltou para cima da espingarda no chão, acionando o gatilho acidentalmente.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Caçador Caçado',
    icon: 'target',
    title: 'O Melhor Amigo',
    description: 'O caçador vira caça do próprio companheiro.',
    image: '/lovable-uploads/ironias/case4.png'
  },
  {
    id: 'ironias-5',
    order: 5,
    mystery: 'Um ativista contra o uso obrigatório de cinto de segurança morre num acidente de carro.',
    solution: 'Ele teria sobrevivido se estivesse usando o cinto. Foi ejetado do veículo num acidente leve.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Protesto do Cinto',
    icon: 'shield',
    title: 'A Ironia da Segurança',
    description: 'Lutou contra aquilo que poderia salvá-lo.',
    image: '/lovable-uploads/ironias/case5.png'
  },
  {
    id: 'ironias-6',
    order: 6,
    mystery: 'Um homem morre eletrocutado ao tentar roubar fios de um poste.',
    solution: 'Ele era um eletricista despedido da companhia elétrica. Morreu ao tentar roubar os mesmos fios que ele próprio tinha instalado.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'crime',
    name: 'O Ladrão de Cobre',
    icon: 'zap',
    title: 'O Próprio Trabalho',
    description: 'Morreu pela própria obra.',
    image: '/lovable-uploads/ironias/case6.png'
  },
  {
    id: 'ironias-7',
    order: 7,
    mystery: 'O autor de um famoso livro sobre uma dieta à base de líquidos morre de desnutrição.',
    solution: 'Ele seguia sua própria dieta de forma tão extrema que seu corpo entrou em colapso.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'A Dieta Fatal',
    icon: 'book',
    title: 'O Próprio Veneno',
    description: 'Vítima da própria criação.',
    image: '/lovable-uploads/ironias/case7.png'
  },
  {
    id: 'ironias-8',
    order: 8,
    mystery: 'Um homem que se gabava de ser imune a veneno de cobra morre picado pela sua cobra de estimação.',
    solution: 'A cobra tinha acabado de comer um rato envenenado, e o veneno do rato na boca da cobra o matou.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'danger',
    name: 'O Colecionador de Répteis',
    icon: 'snake',
    title: 'O Veneno Duplo',
    description: 'Imune ao veneno da cobra, mas não ao do rato.',
    image: '/lovable-uploads/ironias/case8.png'
  },
  {
    id: 'ironias-9',
    order: 9,
    mystery: 'Um homem morre afogado na sua festa de aposentadoria.',
    solution: 'Ele era um salva-vidas que trabalhou 40 anos sem nunca perder uma vida. Na festa, engasgou-se com comida e caiu na piscina.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Mergulho Final',
    icon: 'waves',
    title: 'O Último Salvamento',
    description: 'Quarenta anos salvando vidas, mas não a própria.',
    image: '/lovable-uploads/ironias/case9.png'
  },
  {
    id: 'ironias-10',
    order: 10,
    mystery: 'Uma testemunha sob proteção policial morre num local seguro.',
    solution: 'A testemunha foi escondida em um casebre rural. Para seu azar, havia uma aranha em seu quarto, e ela foi picada.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'danger',
    name: 'A Testemunha Protegida',
    icon: 'eye',
    title: 'O Perigo Oculto',
    description: 'Protegida de assassinos, mas não da natureza.',
    image: '/lovable-uploads/ironias/case10.png'
  },
  {
    id: 'ironias-11',
    order: 11,
    mystery: 'Um especialista em segurança de cofres morre trancado dentro de um cofre.',
    solution: 'Durante uma demonstração, ele fechou a porta, esquecendo que o mecanismo de abertura por tempo só funcionava do lado de fora.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Especialista em Segurança',
    icon: 'lock',
    title: 'A Própria Armadilha',
    description: 'Especialista em abrir cofres, mas não em sair deles.',
    image: '/lovable-uploads/ironias/case11.png'
  },
  {
    id: 'ironias-12',
    order: 12,
    mystery: 'Um homem pesquisando sua árvore genealógica descobre que é o último de sua linhagem e morre de choque.',
    solution: 'Ele descobriu que todos os homens da sua família morriam de uma rara condição cardíaca aos 40 anos. Ele estava celebrando seu 40º aniversário.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'mystery',
    name: 'A Árvore Genealógica',
    icon: 'tree',
    title: 'A Herança Fatal',
    description: 'Descobriu o passado e o próprio destino.',
    image: '/lovable-uploads/ironias/case12.png'
  },
  {
    id: 'ironias-13',
    order: 13,
    mystery: 'Um crítico de cinema que odiava filmes de terror morre de susto vendo um.',
    solution: 'Seu filho se escondeu atrás do sofá para assustá-lo no clímax do filme.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Crítico de Cinema',
    icon: 'film',
    title: 'O Susto Real',
    description: 'O terror saiu da tela.',
    image: '/lovable-uploads/ironias/case13.png'
  },
  {
    id: 'ironias-14',
    order: 14,
    mystery: 'Um bombeiro morre combatendo um incêndio.',
    solution: 'Ele era um piromaníaco que gostava da emoção de apagar os fogos. Desta vez, calculou mal o vento e ficou encurralado.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'danger',
    name: 'O Revés do Bombeiro',
    icon: 'flame',
    title: 'O Fogo Secreto',
    description: 'Quem apaga também pode acender.',
    image: '/lovable-uploads/ironias/case14.png'
  },
  {
    id: 'ironias-15',
    order: 15,
    mystery: 'Um tradutor da ONU morre após beber um copo de água durante uma reunião.',
    solution: 'Um presidente pediu "veneno" em russo. O tradutor, pensando ser um teste, pediu "veneno" em inglês. O garçom, um espião, pensou que foi descoberto e envenenou o tradutor.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'O Tradutor Traído',
    icon: 'globe',
    title: 'A Tradução Fatal',
    description: 'As palavras podem matar.',
    image: '/lovable-uploads/ironias/case15.png'
  },
  {
    id: 'ironias-16',
    order: 16,
    mystery: 'Um casal morre na sua noite de núpcias.',
    solution: 'Um dos presentes de casamento era um aquecedor a gás antigo e defeituoso.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Presente de Casamento',
    icon: 'heart',
    title: 'O Presente Fatal',
    description: 'O presente que ninguém deveria dar.',
    image: '/lovable-uploads/ironias/case16.png'
  },
  {
    id: 'ironias-17',
    order: 17,
    mystery: 'O inventor do para-raios morre atingido por um raio.',
    solution: 'Ele estava tirando uma soneca debaixo de uma árvore, pensando que o para-raios da sua casa o protegeria.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Para-raios',
    icon: 'zap',
    title: 'A Proteção Distante',
    description: 'Inventou a proteção, mas não a usou.',
    image: '/lovable-uploads/ironias/case17.png'
  },
  {
    id: 'ironias-18',
    order: 18,
    mystery: 'Um advogado defende com sucesso um cliente acusado de homicídio. No dia seguinte, o advogado é encontrado morto da mesma forma.',
    solution: 'O cliente, agora livre, matou o advogado para garantir seu silêncio.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'O Advogado de Defesa',
    icon: 'scale',
    title: 'A Defesa Fatal',
    description: 'Defendeu um assassino que não hesitou em matar novamente.',
    image: '/lovable-uploads/ironias/case18.png'
  },
  {
    id: 'ironias-19',
    order: 19,
    mystery: 'Um homem com fobia de palhaços morre de ataque cardíaco.',
    solution: 'Ele estava fugindo de um assalto e se escondeu na van de uma companhia de circo.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'A Fobia de Palhaços',
    icon: 'mask',
    title: 'O Refúgio Terrível',
    description: 'Fugiu do perigo para o próprio medo.',
    image: '/lovable-uploads/ironias/case19.png'
  },
  {
    id: 'ironias-20',
    order: 20,
    mystery: 'Um prisioneiro no corredor da morte morre antes da sua execução por eletrocussão.',
    solution: 'Ele pediu um prato de marisco como última refeição, sabendo que tinha uma alergia mortal.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'crime',
    name: 'A Última Refeição',
    icon: 'utensils',
    title: 'A Escolha Final',
    description: 'Escolheu sua própria forma de morrer.',
    image: '/lovable-uploads/ironias/case20.png'
  }
];

// Beco sem Saída - Explore os cantos mais escuros da cidade onde os crimes mais terríveis acontecem
export const becoSemSaidaCases: Case[] = [
  {
    id: 'beco-1',
    order: 1,
    mystery: 'Ela correu até o fim da rua... e desapareceu.',
    solution: 'A jovem fugia de dois perseguidores e entrou em um beco sem saída. Quando a polícia chegou, nada foi encontrado. Mais tarde, descobriu-se uma escotilha escondida sob caixas de madeira, usada por moradores de rua como abrigo subterrâneo.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'Última Saída',
    icon: 'corner-down-right',
    title: 'O Desaparecimento',
    description: 'Correu para o fim da rua e sumiu no ar.',
    image: '/lovable-uploads/beco/case1.png',
    isFree: true
  },
  {
    id: 'beco-2',
    order: 2,
    mystery: 'O corpo estava lá. Mas ninguém entrou nem saiu.',
    solution: 'A cena do crime mostrava um beco coberto de barro, mas só havia pegadas da vítima. O assassino havia escalado os prédios pelas laterais, matado com uma injeção letal e saído pelo telhado.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'Sem Pegadas',
    icon: 'footprints',
    title: 'O Assassino Voador',
    description: 'Um crime sem rastros no chão.',
    image: '/lovable-uploads/beco/case2.png'
  },
  {
    id: 'beco-3',
    order: 3,
    mystery: 'Um grito. Um carro parado. Ninguém dentro.',
    solution: 'Testemunhas ouviram um grito vindo de um carro parado no cruzamento. A polícia encontrou sangue no banco do passageiro. O motorista havia sido sequestrado segundos antes e levado pelo esgoto que passava sob a rua.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'O Grito da Sinaleira',
    icon: 'car',
    title: 'O Sequestro Subterrâneo',
    description: 'Desapareceu através do subsolo da cidade.',
    image: '/lovable-uploads/beco/case3.png'
  },
  {
    id: 'beco-4',
    order: 4,
    mystery: 'Ele pediu socorro... de dentro das paredes.',
    solution: 'Durante uma reforma, trabalhadores ouviram batidas vindas de uma parede. Dentro, encontraram um homem desacordado. Um criminoso o havia sedado e o emparedado vivo, usando cimento fresco para ocultar o crime.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'thriller',
    name: 'Gaiola de Concreto',
    icon: 'brick-wall',
    title: 'O Emparedamento',
    description: 'Preso dentro das próprias paredes da cidade.',
    image: '/lovable-uploads/beco/case4.png'
  },
  {
    id: 'beco-5',
    order: 5,
    mystery: 'Ela sumiu sob a câmera que filmava 24h por dia.',
    solution: 'As câmeras da rua mostravam a mulher andando normalmente, até desaparecer atrás de uma caçamba de lixo. Investigadores descobriram um alçapão disfarçado na calçada, que levava a um esconderijo abandonado.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'Sob os Olhos da Cidade',
    icon: 'eye',
    title: 'O Alçapão Secreto',
    description: 'Desapareceu mesmo sendo vigiada.',
    image: '/lovable-uploads/beco/case5.png'
  },
  {
    id: 'beco-6',
    order: 6,
    mystery: 'Estilhaços na calçada, mas nenhuma janela quebrada.',
    solution: 'Vidros foram encontrados espalhados na rua após um barulho de explosão. Um homem havia arremessado um corpo de dentro de um apartamento, dentro de um aquário gigante — que se rompeu no impacto.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'Som de Vidro',
    icon: 'glass',
    title: 'O Aquário Fatal',
    description: 'Vidro quebrado sem janelas quebradas.',
    image: '/lovable-uploads/beco/case6.png'
  },
  {
    id: 'beco-7',
    order: 7,
    mystery: 'O carro estava em chamas, mas ninguém dentro.',
    solution: 'Criminosos queimaram o carro de propósito para encobrir rastros de DNA após um sequestro. A vítima havia sido levada minutos antes para um galpão ao lado, onde foi mantida refém.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'crime',
    name: 'Fumaça no Parabrisa',
    icon: 'flame',
    title: 'A Distração Ardente',
    description: 'O fogo que escondia outro crime.',
    image: '/lovable-uploads/beco/case7.png'
  },
  {
    id: 'beco-8',
    order: 8,
    mystery: 'A nova arte de rua cobria um crime antigo.',
    solution: 'Grafiteiros pintaram um mural sobre uma parede já marcada por uma silhueta de sangue. Sem saber, estavam cobrindo evidências de um homicídio arquivado. A tinta selou uma mensagem que só seria revelada com reagente químico.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'investigation',
    name: 'O Muro Pintado',
    icon: 'paint-brush',
    title: 'A Arte Sobre o Crime',
    description: 'Grafite que escondia evidências antigas.',
    image: '/lovable-uploads/beco/case8.png'
  },
  {
    id: 'beco-9',
    order: 9,
    mystery: 'O endereço não existia no mapa da cidade.',
    solution: 'Um criminoso atraía vítimas para um beco "sem nome" onde todos os registros urbanos haviam sido apagados. Era uma viela esquecida após reformas viárias, usada como rota de fuga perfeita por anos.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'Rua Sem Nomes',
    icon: 'map',
    title: 'O Lugar Inexistente',
    description: 'Um endereço que não existe oficialmente.',
    image: '/lovable-uploads/beco/case9.png'
  },
  {
    id: 'beco-10',
    order: 10,
    mystery: 'A estrutura caiu cinco minutos após ele sair.',
    solution: 'Um homem saiu correndo de um beco e minutos depois, uma viga de aço despencou. Ele havia sabotado a base com um maçarico portátil. A demolição foi disfarçada como acidente estrutural.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'O Som da Viga',
    icon: 'building',
    title: 'A Sabotagem Calculada',
    description: 'Destruição planejada como acidente.',
    image: '/lovable-uploads/beco/case10.png'
  },
  {
    id: 'beco-11',
    order: 11,
    mystery: 'Ninguém viu ele subir, mas estava no telhado.',
    solution: 'Um antigo beco possuía uma escada escondida atrás de uma fachada falsa. O criminoso a utilizava para acesso a telhados, de onde espionava e fotografava suas vítimas.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'Degraus Ocultos',
    icon: 'stairs',
    title: 'A Escada Secreta',
    description: 'Acesso aos telhados sem ser visto.',
    image: '/lovable-uploads/beco/case11.png'
  },
  {
    id: 'beco-12',
    order: 12,
    mystery: 'Cada corpo vinha com um número diferente.',
    solution: 'Os assassinatos em becos escuros tinham algo em comum: cartões com um número manuscrito. Descobriu-se que eram coordenadas de outros becos da cidade, onde havia indícios de crimes antigos interligados.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'Cartão de Visita',
    icon: 'credit-card',
    title: 'As Coordenadas do Crime',
    description: 'Números que revelam uma rede criminosa.',
    image: '/lovable-uploads/beco/case12.png'
  },
  {
    id: 'beco-13',
    order: 13,
    mystery: 'Ele fugia da polícia... mas não era criminoso.',
    solution: 'Um entregador foi confundido com um suspeito e correu por instinto. Ao entrar em um beco, caiu em um fosso aberto. Morreu na queda. A confusão levou a uma investigação de falhas sistêmicas.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'investigation',
    name: 'Noite da Perseguição',
    icon: 'user-x',
    title: 'A Confusão Fatal',
    description: 'Morreu fugindo de um crime que não cometeu.',
    image: '/lovable-uploads/beco/case13.png'
  },
  {
    id: 'beco-14',
    order: 14,
    mystery: 'Alguém caía, mas ninguém subia.',
    solution: 'Testemunhas viram um corpo cair do alto de um prédio ao lado de um beco, mas nenhuma entrada ao telhado havia sido violada. A vítima havia sido içada durante a noite por cordas no fosso do elevador.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'Sombra no Telhado',
    icon: 'arrow-down',
    title: 'A Queda Impossível',
    description: 'Caiu de onde ninguém conseguia subir.',
    image: '/lovable-uploads/beco/case14.png'
  },
  {
    id: 'beco-15',
    order: 15,
    mystery: 'A casa desabou. Mas o beco atrás dela ficou intacto.',
    solution: 'Criminosos usaram explosivos colocados sob a casa para soterrar provas escondidas no porão. O beco estreito serviu como zona de fuga e distração, com caixas de som simulando passos e sirenes.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'O Teto Que Afundou',
    icon: 'home',
    title: 'A Demolição Seletiva',
    description: 'Destruição cirúrgica para esconder evidências.',
    image: '/lovable-uploads/beco/case15.png'
  },
  {
    id: 'beco-16',
    order: 16,
    mystery: 'Ninguém viu o que aconteceu — e todos estavam lá.',
    solution: 'Durante um apagão, um assalto ocorreu num beco onde três casais estavam conversando. O criminoso usava óculos de visão noturna e uma rota de fuga escondida sob tábuas de madeira.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'theft',
    name: 'Escuridão Perfeita',
    icon: 'moon',
    title: 'O Crime às Cegas',
    description: 'Todos viram, mas ninguém viu nada.',
    image: '/lovable-uploads/beco/case16.png'
  },
  {
    id: 'beco-17',
    order: 17,
    mystery: 'Uma confissão foi gravada sem microfones por perto.',
    solution: 'A parede do beco havia sido usada em testes acústicos de uma antiga rádio da cidade. Os tijolos com microfones embutidos ainda funcionavam e gravaram acidentalmente uma conversa entre dois criminosos.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'investigation',
    name: 'Paredes que Ouvem',
    icon: 'mic',
    title: 'Os Microfones Esquecidos',
    description: 'As paredes tinham ouvidos literais.',
    image: '/lovable-uploads/beco/case17.png'
  },
  {
    id: 'beco-18',
    order: 18,
    mystery: 'O áudio mostrava um grito... mas ninguém gritava.',
    solution: 'Durante uma perseguição, a polícia analisou um áudio que indicava um grito humano vindo de um beco. Era, na verdade, uma gravação deixada como distração para despistar os agentes.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'investigation',
    name: 'Grito Gravado',
    icon: 'volume-2',
    title: 'A Distração Sonora',
    description: 'Um grito que ninguém deu.',
    image: '/lovable-uploads/beco/case18.png'
  },
  {
    id: 'beco-19',
    order: 19,
    mystery: 'A polícia identificou a vítima... mas ela apareceu viva.',
    solution: 'Um homem foi encontrado morto com documentos de outro. O verdadeiro dono havia perdido sua carteira e um criminoso a usou para enganar as autoridades. O verdadeiro culpado era o suposto morto.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'investigation',
    name: 'Cadáver Errado',
    icon: 'user-check',
    title: 'A Identidade Trocada',
    description: 'O morto estava vivo e o vivo estava morto.',
    image: '/lovable-uploads/beco/case19.png'
  },
  {
    id: 'beco-20',
    order: 20,
    mystery: 'O beco pegou fogo... em plena chuva.',
    solution: 'Os bombeiros se surpreenderam ao ver um incêndio se espalhar mesmo com a chuva intensa. O fogo vinha de uma substância altamente inflamável despejada no local, vinda de um laboratório clandestino no porão de um prédio.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'danger',
    name: 'Chuva e Cinzas',
    icon: 'cloud-rain',
    title: 'O Fogo na Chuva',
    description: 'Nem a chuva conseguiu apagar esse incêndio.',
    image: '/lovable-uploads/beco/case20.png'
  }
];

// Crimes de Época - Mistérios ambientados em períodos históricos
export const crimesDeEpocaCases: Case[] = [
  {
    id: 'epoca-1',
    order: 1,
    mystery: 'Uma dama da sociedade vitoriana é encontrada morta no seu quarto, aparentemente por sufocamento, sem sinais de violência.',
    solution: 'A sua rival, enquanto a "ajudava" a vestir-se para um baile, apertou o seu espartilho a um nível extremo, restringindo a sua respiração até ser fatal.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'O Ajudante',
    icon: 'corset',
    title: 'A Morte Elegante',
    description: 'Morreu de moda na era vitoriana.',
    image: '/lovable-uploads/epoca/case1.png',
    isFree: true
  },
  {
    id: 'epoca-2',
    order: 2,
    mystery: 'Numa festa da nobreza, uma condessa deixa cair o seu leque. Um barão do outro lado do salão sai imediatamente e é encontrado morto mais tarde.',
    solution: 'A forma como o leque foi deixado cair era um sinal codificado para um assassino contratado, indicando que o alvo estava desprotegido.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'A Mensagem no Leque',
    icon: 'fan',
    title: 'O Código Aristocrático',
    description: 'Uma linguagem mortal dos salões nobres.',
    image: '/lovable-uploads/epoca/case2.png'
  },
  {
    id: 'epoca-3',
    order: 3,
    mystery: 'Nos anos 20, um gangster morre após beber whisky num bar clandestino. Os seus rivais beberam da mesma garrafa e estão bem.',
    solution: 'O gelo usado na bebida foi cortado de um rio local poluído. Os locais tinham imunidade à bactéria, mas o gangster, recém-chegado, não.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'O Último Whisky',
    icon: 'glass',
    title: 'O Gelo Contaminado',
    description: 'A Lei Seca matou de forma inesperada.',
    image: '/lovable-uploads/epoca/case3.png'
  },
  {
    id: 'epoca-4',
    order: 4,
    mystery: 'Num mosteiro medieval, um monge responsável por copiar manuscritos é encontrado morto em seus aposentos.',
    solution: 'Ele tinha o hábito de lamber a ponta da sua pena. Um rival misturou veneno no seu tinteiro.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'murder',
    name: 'A Morte do Escriba',
    icon: 'feather',
    title: 'A Tinta Venenosa',
    description: 'A palavra escrita se tornou mortal.',
    image: '/lovable-uploads/epoca/case4.png'
  },
  {
    id: 'epoca-5',
    order: 5,
    mystery: 'Um fotógrafo pioneiro do século XIX é encontrado morto no seu estúdio, com uma expressão de horror.',
    solution: 'O processo fotográfico de daguerreotipia usava vapor de mercúrio quente. Ele inalou acidentalmente uma grande quantidade de vapor tóxico.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Estúdio',
    icon: 'camera',
    title: 'O Vapor Mortal',
    description: 'A arte da fotografia cobrou seu preço.',
    image: '/lovable-uploads/epoca/case5.png'
  },
  {
    id: 'epoca-6',
    order: 6,
    mystery: 'Dois cavalheiros concordam com um duelo ao amanhecer. Um deles morre antes mesmo do primeiro embate.',
    solution: 'O médico que examinaria os corpos, foi subornado. Ele aplicou um veneno de ação rápida na luva de um dos duelistas, que ele colocou antes do duelo.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'O Duelo Silencioso',
    icon: 'crossed-swords',
    title: 'A Honra Envenenada',
    description: 'Morreu antes da luta começar.',
    image: '/lovable-uploads/epoca/case6.png'
  },
  {
    id: 'epoca-7',
    order: 7,
    mystery: 'Um nobre na corte francesa do século XVIII morre de uma doença de pele misteriosa e rápida.',
    solution: 'O seu rival político polvilhou a sua peruca com um pó tóxico derivado de arsênico. O pó foi absorvido pelo couro cabeludo.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'A Nobreza Doente',
    icon: 'crown',
    title: 'A Peruca Envenenada',
    description: 'A moda cortesã escondeu o veneno.',
    image: '/lovable-uploads/epoca/case7.png'
  },
  {
    id: 'epoca-8',
    order: 8,
    mystery: 'Um operador de telégrafo morre enquanto recebe uma mensagem. A mensagem para no meio e ele morre.',
    solution: 'A mensagem continha um aviso sobre um assalto a um trem. Os ladrões sabotaram a linha telegráfica, causando uma sobrecarga elétrica que eletrocutou o operador.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'O Telégrafo Interrompido',
    icon: 'zap',
    title: 'A Mensagem Fatal',
    description: 'A comunicação se tornou arma.',
    image: '/lovable-uploads/epoca/case8.png'
  },
  {
    id: 'epoca-9',
    order: 9,
    mystery: 'Uma cantora de ópera atinge uma nota altíssima e cai morta no palco.',
    solution: 'Um rival, sabendo que ela forçaria a voz naquela nota, trocou a água no seu camarim por uma que continha um veneno que contraía as cordas vocais, causando asfixia.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'A Ópera Final',
    icon: 'music',
    title: 'A Nota Mortal',
    description: 'A última apresentação da diva.',
    image: '/lovable-uploads/epoca/case9.png'
  },
  {
    id: 'epoca-10',
    order: 10,
    mystery: 'Um arqueólogo que descobriu o túmulo de um faraó morre. O seu relógio de bolso parou exatamente na hora da morte.',
    solution: 'O túmulo continha esporos de um fungo tóxico. O relógio, no entanto, foi parado pelo assistente do arqueólogo, que queria roubar os artefatos e criou a história da "maldição" para afastar os outros.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'O Relógio do Faraó',
    icon: 'pyramid',
    title: 'A Maldição Fabricada',
    description: 'A ganância disfarçada de maldição.',
    image: '/lovable-uploads/epoca/case10.png'
  },
  {
    id: 'epoca-11',
    order: 11,
    mystery: 'Uma carruagem vazia e em alta velocidade causa um acidente fatal no centro de Londres.',
    solution: 'Ladrões usaram a carruagem como distração. Eles assustaram os cavalos para criar o caos, enquanto assaltavam uma loja do outro lado da rua.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'theft',
    name: 'A Carruagem Fantasma',
    icon: 'horse',
    title: 'A Distração Mortal',
    description: 'Caos para encobrir o crime.',
    image: '/lovable-uploads/epoca/case11.png'
  },
  {
    id: 'epoca-12',
    order: 12,
    mystery: 'Na Roma antiga, um senador morre após beber vinho num banquete oferecido pelo imperador.',
    solution: 'O imperador suspeitava de uma conspiração. Ele serviu o mesmo vinho a todos, mas a taça do senador era feita de um metal que reagia com o vinho, tornando-o venenoso.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'conspiracy',
    name: 'O Vinho do Imperador',
    icon: 'wine',
    title: 'A Taça Reativa',
    description: 'O metal que transformou vinho em veneno.',
    image: '/lovable-uploads/epoca/case12.png'
  },
  {
    id: 'epoca-13',
    order: 13,
    mystery: 'Uma mulher morre atingida por um raio, mas ela estava dentro de casa.',
    solution: 'Ela estava perto de uma janela aberta durante a tempestade. O seu espartilho, que tinha hastes de aço, atuou como um para-raios, atraindo a descarga elétrica.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Choque Fatal',
    icon: 'zap',
    title: 'O Espartilho Condutor',
    description: 'A moda que atraiu a morte do céu.',
    image: '/lovable-uploads/epoca/case13.png'
  },
  {
    id: 'epoca-14',
    order: 14,
    mystery: 'Durante a Peste Negra, um médico que nunca teve a doença é encontrado morto no seu quarto.',
    solution: 'Um paciente, delirante de febre, acreditava que o médico era a causa da doença e estrangulou-o durante a noite.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'A Máscara da Peste',
    icon: 'skull',
    title: 'O Médico Culpado',
    description: 'Morreu tentando curar a peste.',
    image: '/lovable-uploads/epoca/case14.png'
  },
  {
    id: 'epoca-15',
    order: 15,
    mystery: 'Um homem morre após tomar um remédio para a tosse comprado num boticário.',
    solution: 'O aprendiz do boticário, analfabeto, trocou os rótulos dos frascos, e vendeu-lhe veneno por engano.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Segredo do Boticário',
    icon: 'bottle',
    title: 'O Erro Analfabeto',
    description: 'A cura se tornou veneno por engano.',
    image: '/lovable-uploads/epoca/case15.png'
  },
  {
    id: 'epoca-16',
    order: 16,
    mystery: 'Um caçador de tesouros morre após encontrar um mapa de piratas.',
    solution: 'O mapa era novo e falso, uma réplica feita da pele humana de uma vítima de uma doença contagiosa. O caçador, ao manusear o mapa, foi infectado.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'danger',
    name: 'O Mapa do Pirata',
    icon: 'map',
    title: 'O Pergaminho Contagioso',
    description: 'O tesouro que matou quem o procurava.',
    image: '/lovable-uploads/epoca/case16.png'
  },
  {
    id: 'epoca-17',
    order: 17,
    mystery: 'Uma mulher acusada de bruxaria é queimada na fogueira. O seu acusador morre no dia seguinte.',
    solution: 'Antes de ser capturada, a "bruxa" (que era uma herbalista) deu ao seu acusador um "presente" de pão. O pão estava contaminado com cravagem, um fungo que causa alucinações e morte.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'mystery',
    name: 'A Fogueira da Bruxa',
    icon: 'flame',
    title: 'A Vingança Póstuma',
    description: 'A última maldição da herbalista.',
    image: '/lovable-uploads/epoca/case17.png'
  },
  {
    id: 'epoca-18',
    order: 18,
    mystery: 'Um prisioneiro é encontrado morto dentro de uma câmara de tortura medieval conhecida como "Dama de Ferro", mas não há marcas de perfuração no seu corpo.',
    solution: 'Ele morreu de claustrofobia. O guarda trancou-o lá dentro como uma brincadeira, mas esqueceu-se dele.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'A Dama de Ferro',
    icon: 'shield',
    title: 'A Brincadeira Fatal',
    description: 'Morreu de medo, não de ferro.',
    image: '/lovable-uploads/epoca/case18.png'
  },
  {
    id: 'epoca-19',
    order: 19,
    mystery: 'Um inventor pioneiro da aviação morre no voo inaugural da sua máquina.',
    solution: 'Um rival sabotou a estrutura de madeira e lona do avião, que se desintegrou em pleno ar.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'murder',
    name: 'O Primeiro Voo',
    icon: 'plane',
    title: 'A Sabotagem Aérea',
    description: 'O sonho de voar se tornou pesadelo.',
    image: '/lovable-uploads/epoca/case19.png'
  },
  {
    id: 'epoca-20',
    order: 20,
    mystery: 'Um homem lê o jornal matinal e morre de choque.',
    solution: 'O jornal publicou o seu obituário por engano. Sendo extremamente supersticioso, ele acreditou que era um presságio e teve um ataque cardíaco.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'A Gazeta da Manhã',
    icon: 'newspaper',
    title: 'O Obituário Prematuro',
    description: 'Morreu ao ler sobre a própria morte.',
    image: '/lovable-uploads/epoca/case20.png'
  }
];

// Viagem Sem Volta - Crimes que ocorrem em locais isolados e em trânsito
export const viagemSemVoltaCases: Case[] = [
  {
    id: 'viagem-1',
    order: 1,
    mystery: 'Um homem é encontrado morto na sua cabine num comboio de luxo. A porta está trancada por dentro e a neve bloqueou os trilhos.',
    solution: 'Todos os passageiros na sua carruagem eram cúmplices. Cada um esfaqueou-o uma vez, e depois trancaram a porta.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'O Crime no Expresso do Oriente',
    icon: 'train',
    title: 'A Conspiração nos Trilhos',
    description: 'Todos eram culpados no trem da morte.',
    image: '/lovable-uploads/viagem/case1.png',
    isFree: true
  },
  {
    id: 'viagem-2',
    order: 2,
    mystery: 'Num cruzeiro, um homem cai ao mar e desaparece. As câmaras mostram que ele estava sozinho no convés.',
    solution: 'A sua esposa, na cabine abaixo, usou uma pistola de arpão modificada para o puxar para o mar através da varanda.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'O Homem ao Mar',
    icon: 'anchor',
    title: 'O Arpão Secreto',
    description: 'Puxado para o mar de baixo.',
    image: '/lovable-uploads/viagem/case2.png'
  },
  {
    id: 'viagem-3',
    order: 3,
    mystery: 'Um corpo é encontrado dentro de uma mala na seção de bagagens de um aeroporto. A mala não passou por nenhum controle de segurança.',
    solution: 'O assassino era um funcionário do aeroporto. Ele despachou a mala como "bagagem perdida" diretamente para o porão.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'A Bagagem Extra',
    icon: 'luggage',
    title: 'O Funcionário Assassino',
    description: 'Transportou a vítima como bagagem.',
    image: '/lovable-uploads/viagem/case3.png'
  },
  {
    id: 'viagem-4',
    order: 4,
    mystery: 'Um avião privado aterra perfeitamente, mas o piloto está morto na cabine com um tiro na cabeça. A porta da cabine está trancada por dentro.',
    solution: 'O avião estava em piloto automático. O co-piloto matou o piloto, trancou a porta, e depois saltou de paraquedas a meio do voo.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'O Voo Fantasma',
    icon: 'plane',
    title: 'O Salto Mortal',
    description: 'Matou e saltou em pleno voo.',
    image: '/lovable-uploads/viagem/case4.png'
  },
  {
    id: 'viagem-5',
    order: 5,
    mystery: 'Um grupo de turistas num passeio de barco desaparece. O barco é encontrado vazio perto de uma ilha deserta.',
    solution: 'O capitão do barco abandonou-os na ilha de propósito para roubar os seus pertences, sabendo que a ilha não constava nos mapas.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'A Ilha Deserta',
    icon: 'island',
    title: 'O Capitão Ladrão',
    description: 'Abandonados numa ilha inexistente.',
    image: '/lovable-uploads/viagem/case5.png'
  },
  {
    id: 'viagem-6',
    order: 6,
    mystery: 'Um homem é encontrado morto num comboio. Ele só tinha um bilhete de ida, mas a sua bagagem continha roupas para uma semana.',
    solution: 'Ele não pretendia voltar. Estava fugindo com uma nova identidade. Foi morto por alguém do seu passado que o encontrou.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'murder',
    name: 'O Bilhete de Ida',
    icon: 'ticket',
    title: 'A Fuga Interrompida',
    description: 'O passado o alcançou nos trilhos.',
    image: '/lovable-uploads/viagem/case6.png'
  },
  {
    id: 'viagem-7',
    order: 7,
    mystery: 'A tripulação de um navio cargueiro desaparece no meio do oceano. O navio está intacto, mas a carga sumiu.',
    solution: 'A carga era um gás neurotóxico experimental. Um dos contentores teve um escape de gás, matando toda a tripulação instantaneamente.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'danger',
    name: 'A Carga Preciosa',
    icon: 'ship',
    title: 'O Gás Mortal',
    description: 'A carga secreta matou seus transportadores.',
    image: '/lovable-uploads/viagem/case7.png'
  },
  {
    id: 'viagem-8',
    order: 8,
    mystery: 'O último ônibus da noite chega ao terminal sem passageiros e com o motorista morto.',
    solution: 'O último passageiro a embarcar matou o motorista e assumiu o volante, abandonando o ônibus no terminal.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'O Último Ponto',
    icon: 'bus',
    title: 'O Passageiro Assassino',
    description: 'O último passageiro era o primeiro suspeito.',
    image: '/lovable-uploads/viagem/case8.png'
  },
  {
    id: 'viagem-9',
    order: 9,
    mystery: 'Um astronauta morre na Estação Espacial Internacional. O seu colega é o único suspeito.',
    solution: 'Ele morreu devido a uma falha no seu traje espacial durante uma caminhada espacial. Não foi um crime.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'mystery',
    name: 'A Estação Espacial',
    icon: 'rocket',
    title: 'A Falha Espacial',
    description: 'O espaço cobrou seu preço.',
    image: '/lovable-uploads/viagem/case9.png'
  },
  {
    id: 'viagem-10',
    order: 10,
    mystery: 'Uma caravana de arqueólogos é encontrada morta no deserto. Todos morreram de sede, mas os seus cantis estavam cheios.',
    solution: 'Um guia local encheu os cantis com água contendo um químico que induzia uma sede insaciável.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'A Caravana no Deserto',
    icon: 'tent',
    title: 'A Sede Infinita',
    description: 'Água que aumentava a sede.',
    image: '/lovable-uploads/viagem/case10.png'
  },
  {
    id: 'viagem-11',
    order: 11,
    mystery: 'Um iate de luxo é encontrado à deriva com um único ocupante morto por um tiro. A arma está na sua mão.',
    solution: 'Foi um acidente. Ele estava a limpar a sua pistola de sinalização, que disparou acidentalmente quando o iate foi atingido por uma onda forte.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Iate à Deriva',
    icon: 'anchor',
    title: 'O Acidente nas Ondas',
    description: 'A onda que causou o disparo.',
    image: '/lovable-uploads/viagem/case11.png'
  },
  {
    id: 'viagem-12',
    order: 12,
    mystery: 'Um homem morre de frio num teleférico parado a meio da montanha.',
    solution: 'Ele tentou saltar para uma árvore abaixo, mas calculou mal a distância e caiu na neve profunda.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Teleférico Parado',
    icon: 'mountain',
    title: 'O Salto Calculado',
    description: 'Tentou fugir e encontrou a morte.',
    image: '/lovable-uploads/viagem/case12.png'
  },
  {
    id: 'viagem-13',
    order: 13,
    mystery: 'Numa base de pesquisa isolada na Antártida, um cientista é encontrado morto do lado de fora.',
    solution: 'Durante uma tempestade, ele saiu para verificar o equipamento. O vento fechou a porta, que tinha uma fechadura automática.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'mystery',
    name: 'A Expedição Antártica',
    icon: 'snowflake',
    title: 'A Porta Automática',
    description: 'Trancado do lado de fora no gelo.',
    image: '/lovable-uploads/viagem/case13.png'
  },
  {
    id: 'viagem-14',
    order: 14,
    mystery: 'Um grupo de alpinistas é encontrado morto num refúgio de montanha. A comida e o aquecimento estavam intactos.',
    solution: 'O refúgio estava numa área com alta concentração de gás natural. Sem ventilação, o gás acumulou-se e asfixiou-os.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'O Refúgio na Montanha',
    icon: 'home',
    title: 'O Gás Invisível',
    description: 'O refúgio se tornou armadilha.',
    image: '/lovable-uploads/viagem/case14.png'
  },
  {
    id: 'viagem-15',
    order: 15,
    mystery: 'Um nadador a tentar atravessar o Canal da Mancha desaparece. O seu barco de apoio estava ao seu lado.',
    solution: 'Ele foi atacado por um tubarão, um evento extremamente raro naquela zona.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'A Travessia do Canal',
    icon: 'waves',
    title: 'O Predador Raro',
    description: 'O tubarão onde não deveria estar.',
    image: '/lovable-uploads/viagem/case15.png'
  },
  {
    id: 'viagem-16',
    order: 16,
    mystery: 'Um milionário morre no seu jato particular. A causa da morte foi descompressão explosiva, mas o avião está intacto.',
    solution: 'O seu rival deu-lhe uma garrafa de champanhe que era, na verdade, um dispositivo explosivo disfarçado.',
    difficulty: getDifficultyFromEmoji('🔴'),
    theme: 'murder',
    name: 'O Jato Particular',
    icon: 'plane',
    title: 'O Champanhe Explosivo',
    description: 'Brindou com a própria morte.',
    image: '/lovable-uploads/viagem/case16.png'
  },
  {
    id: 'viagem-17',
    order: 17,
    mystery: 'Os três guardas de um farol numa ilha remota desaparecem sem deixar rasto.',
    solution: 'Uma onda gigante e inesperada varreu a base do farol, arrastando os três homens que estavam do lado de fora.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'mystery',
    name: 'A Ilha do Farol',
    icon: 'lighthouse',
    title: 'A Onda Gigante',
    description: 'O mar reclamou seus guardiões.',
    image: '/lovable-uploads/viagem/case17.png'
  },
  {
    id: 'viagem-18',
    order: 18,
    mystery: 'Durante uma viagem num dirigível de luxo, um passageiro é encontrado morto, esfaqueado, na sua cabine.',
    solution: 'O assassino usou uma faca de gelo. Após o crime, a "arma" derreteu.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'murder',
    name: 'A Morte no Zeppelin',
    icon: 'plane',
    title: 'A Faca que Derreteu',
    description: 'A arma do crime desapareceu.',
    image: '/lovable-uploads/viagem/case18.png'
  },
  {
    id: 'viagem-19',
    order: 19,
    mystery: 'Um turista num safari noturno é encontrado morto na sua tenda. Um leão é visto a rondar o acampamento.',
    solution: 'Ele não foi morto pelo leão. Morreu de uma picada de uma das cobras mais venenosas de África.',
    difficulty: getDifficultyFromEmoji('🟢'),
    theme: 'mystery',
    name: 'O Safari Noturno',
    icon: 'tent',
    title: 'O Verdadeiro Predador',
    description: 'O leão não foi o assassino.',
    image: '/lovable-uploads/viagem/case19.png'
  },
  {
    id: 'viagem-20',
    order: 20,
    mystery: 'Um homem a tentar atravessar uma fronteira ilegalmente é encontrado morto no meio do nada.',
    solution: 'O "coiote" que ele pagou roubou-lhe tudo e abandonou-o no deserto com uma garrafa de água envenenada.',
    difficulty: getDifficultyFromEmoji('🟡'),
    theme: 'crime',
    name: 'A Fuga pela Fronteira',
    icon: 'map',
    title: 'O Coiote Traidor',
    description: 'Traído por quem deveria ajudar.',
    image: '/lovable-uploads/viagem/case20.png'
  }
];

// Pack case mappings
export const getPackCases = (packId: string): Case[] => {
  const packCasesMap: Record<string, Case[]> = {
    'sussurros-do-alem': sussurrosDoAlemCases,
    'sombras-da-noite': sombrasNoiteCases,
    'crimes-imperfeitos': crimesImperfeitosCases,
    'lendas-urbanas': lendasUrbanasCases,
    'paradoxos-mortais': paradoxosMortaisCases,
    'absurdamente-real': absurdamenteRealCases,
    'dossie-confidencial': dossieConfidencialCases,
    'dose-letal': doseLetal,
    'fim-de-jogo': fimDeJogoCases,
    'ironias-do-destino': ironiasDosDestinoCases,
    'beco-sem-saida': becoSemSaidaCases,
    'crimes-de-epoca': crimesDeEpocaCases,
    'viagem-sem-volta': viagemSemVoltaCases
  };

  return packCasesMap[packId] || [];
};

// Function to get a specific case
export const getCaseById = (packId: string, caseId: string): Case | undefined => {
  const cases = getPackCases(packId);
  return cases.find(case_ => case_.id === caseId);
};

// Function to get cases by pack ID
export const getCasesByPackId = (packId: string): Case[] => {
  return getPackCases(packId);
};

// Function to get a case by its order in a pack
export const getCaseByOrder = (packId: string, order: number): Case | undefined => {
  const cases = getPackCases(packId);
  return cases.find(case_ => case_.order === order);
};

// Function to get total cases count for a pack
export const getPackCasesCount = (packId: string): number => {
  return getPackCases(packId).length;
};

// Function to get free cases for a pack
export const getFreeCases = (packId: string): Case[] => {
  const cases = getPackCases(packId);
  return cases.filter(case_ => case_.isFree);
};

// Function to get paid cases for a pack
export const getPaidCases = (packId: string): Case[] => {
  const cases = getPackCases(packId);
  return cases.filter(case_ => !case_.isFree);
};

// Functions to get packs and user data from Supabase
export const getAllPacks = async (): Promise<Pack[]> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching packs:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPacks:', error);
    throw error;
  }
};

export const getPackById = async (packId: string): Promise<Pack | null> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .eq('id', packId)
      .single();

    if (error) {
      console.error('Error fetching pack:', error);
      return null;
    }

    // Add cases to the pack
    const cases = getPackCases(packId);
    return { ...data, cases };
  } catch (error) {
    console.error('Error in getPackById:', error);
    return null;
  }
};

export const getUserPacks = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_pack_access')
      .select('pack_id')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching user packs:', error);
      throw error;
    }

    return data?.map(item => item.pack_id) || [];
  } catch (error) {
    console.error('Error in getUserPacks:', error);
    throw error;
  }
};
