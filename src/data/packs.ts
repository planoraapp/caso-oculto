import { Pack } from "../types";

export const packs: Pack[] = [
  {
    id: "lendas-urbanas",
    name: "Lendas Urbanas",
    description: "Mitos modernos que ganharam vida real. Investigue se há verdade por trás das lendas mais assombradas da cidade.",
    price: 12.99,
    difficulty: "medium",
    category: "mystery",
    image: "/lovable-uploads/7ba0dfbf-4fdb-4ba4-a328-c56e1e43338a.png",
    cases: [
      {
        id: 1,
        title: "A Mulher de Branco da Ponte",
        description: "Uma figura feminina vestida de branco aparece sempre à meia-noite na ponte velha, sinalizando para os carros pararem. Motoristas relatam experiências sobrenaturais, mas será que existe uma explicação racional?",
        difficulty: "easy",
        category: "mystery",
        isFree: true
      },
      {
        id: 2,
        title: "O Elevador do 13º Andar",
        description: "Um prédio de 12 andares onde o elevador às vezes para em um misterioso 13º andar que não deveria existir. Quem entra nesse andar nunca mais é visto.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 3,
        title: "A Criança do Parque Abandonado",
        description: "Risadas infantis ecoam no parque abandonado após o pôr do sol. Vizinhos juram ver uma criança brincando sozinha nos balanços enferrujados.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 4,
        title: "O Cachorro Fantasma da Rodovia",
        description: "Um cão preto gigantesco persegue carros em uma rodovia específica. Acidentes inexplicáveis acontecem sempre que alguém tenta fugir da criatura.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 5,
        title: "A Casa que Constrói Sozinha",
        description: "Uma construção abandonada que ganha novos cômodos durante a noite. Pela manhã, sempre há algo novo construído com materiais que ninguém trouxe.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 6,
        title: "O Mendigo Imortal",
        description: "Um mendigo que pede esmolas na mesma esquina há 50 anos e não envelhece. Fotografias antigas confirmam sua presença décadas atrás.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 7,
        title: "A Loja que Só Aparece à Noite",
        description: "Uma loja antiga que só pode ser vista e acessada após as 22h. Durante o dia, no mesmo local há apenas um terreno vazio.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 8,
        title: "O Ônibus da Linha Fantasma",
        description: "Um ônibus que circula em horários não oficiais, levando passageiros para destinos que não existem nos mapas. Quem embarca demora dias para retornar.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 9,
        title: "A Estatua que Chora Sangue",
        description: "Uma estátua no centro da cidade que chora lágrimas vermelhas em datas específicas. Análises químicas são inconclusivas sobre a origem do líquido.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 10,
        title: "O Túnel do Tempo Perdido",
        description: "Um túnel onde as pessoas entram e saem horas depois, mas para elas passaram-se apenas minutos. Relógios param de funcionar no local.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 11,
        title: "A Cabine Telefônica Assombrada",
        description: "Uma antiga cabine telefônica que ainda recebe ligações, mesmo desconectada há décadas. As conversas são sempre com pessoas que morreram anos atrás.",
        difficulty: "medium",
        category: "thriller",
        isFree: false
      },
      {
        id: 12,
        title: "O Espelho do Banheiro Público",
        description: "Um espelho em um banheiro público que mostra reflexos de pessoas diferentes. Visitantes veem rostos desconhecidos olhando de volta.",
        difficulty: "easy",
        category: "mystery",
        isFree: false
      },
      {
        id: 13,
        title: "A Música que Toca Sozinha",
        description: "Uma melodia melancólica que toca em rádios desligados em uma área específica da cidade. A música não existe em nenhum arquivo conhecido.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 14,
        title: "O Gato de Nove Vidas Infinitas",
        description: "Um gato que foi visto morrer em acidentes múltiplas vezes, mas sempre reaparece vivo no dia seguinte, exatamente igual.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 15,
        title: "A Escada que Não Termina",
        description: "Uma escadaria em um prédio antigo onde algumas pessoas sobem infinitamente sem nunca chegar ao topo, enquanto outras chegam normalmente.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 16,
        title: "O Vendedor de Sonhos",
        description: "Um homem misterioso que vende sonhos em frascos de vidro. Quem compra tem sonhos lúcidos específicos, mas alguns nunca mais acordam.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 17,
        title: "A Árvore dos Desejos Sombrios",
        description: "Uma árvore antiga onde desejos escritos em papel se realizam, mas sempre com consequências terríveis e inesperadas.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 18,
        title: "O Fotógrafo Invisível",
        description: "Fotografias aparecem misteriosamente nas casas das pessoas, mostrando momentos íntimos que ninguém registrou. O fotógrafo nunca é visto.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 19,
        title: "A Biblioteca dos Livros Proibidos",
        description: "Uma biblioteca secreta onde livros escrevem suas próprias histórias. Leitores descobrem suas vidas futuras descritas em detalhes assustadores.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 20,
        title: "O Último Habitante da Cidade",
        description: "Um homem que afirma ser o único sobrevivente de uma cidade que foi completamente evacuada há décadas, mas que ele ainda vê cheia de pessoas.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      }
    ]
  },
  {
    id: "viagem-sem-volta",
    name: "Viagem sem Volta",
    description: "Destinos que mudaram vidas para sempre. Investigue mistérios de viagens que se transformaram em pesadelos sem retorno.",
    price: 13.99,
    difficulty: "hard",
    category: "thriller",
    image: "/lovable-uploads/af996bb5-0bb4-4d14-9a21-4c7a1cc9bcf7.png",
    cases: [
      {
        id: 1,
        title: "O Voo 447 que Nunca Pousou",
        description: "Um voo comercial que partiu normalmente, mas nunca chegou ao destino. Passageiros, tripulação e aeronave simplesmente desapareceram sem deixar rastros no radar ou destroços.",
        difficulty: "easy",
        category: "mystery",
        isFree: true
      },
      {
        id: 2,
        title: "A Excursão do Vale Perdido",
        description: "Um grupo de turistas se aventurou em uma trilha famosa, mas apenas um retornou - sem memória dos outros e falando sobre um vale que não existe nos mapas.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 3,
        title: "O Cruzeiro Fantasma",
        description: "Um navio de cruzeiro foi encontrado à deriva com todos os sistemas funcionando, mas completamente vazio. As câmeras de segurança mostram os passageiros simplesmente desaparecendo.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 4,
        title: "A Estrada Que Não Existe",
        description: "Uma família seguiu as instruções do GPS e entrou em uma estrada que os levou a uma cidade abandonada. Quando tentaram voltar, a estrada havia desaparecido.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 5,
        title: "O Trem da Meia-Noite",
        description: "Passageiros embarcaram em um trem noturno para uma viagem de 6 horas. Quando acordaram, estavam no mesmo lugar, mas 30 anos no futuro.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 6,
        title: "A Expedição Ártica Perdida",
        description: "Uma equipe de pesquisadores partiu para o Ártico e enviou suas últimas comunicações normalmente. A equipe de resgate encontrou apenas suas pegadas levando ao nada.",
        difficulty: "hard",
        category: "investigation",
        isFree: false
      },
      {
        id: 7,
        title: "O Hotel que Nunca Existiu",
        description: "Turistas fizeram reservas online para um resort luxuoso. Chegaram ao local e encontraram apenas ruínas antigas, mas suas reservas eram reais e foram cobradas.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 8,
        title: "A Caravana do Deserto",
        description: "Um grupo de aventureiros entrou no deserto em uma excursão organizada. Satélites registraram sua entrada, mas nunca sua saída. O deserto não tem outras rotas de fuga.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 9,
        title: "O Mergulho no Abismo",
        description: "Mergulhadores experientes desceram em uma fossa oceânica e perderam contato. Seus equipamentos foram encontrados na superfície, mas eles nunca emergiram.",
        difficulty: "medium",
        category: "investigation",
        isFree: false
      },
      {
        id: 10,
        title: "A Trilha do Tempo Perdido",
        description: "Caminhantes entraram em uma trilha de montanha pela manhã. Quando a equipe de resgate os encontrou, eles insistiam que haviam caminhado por apenas uma hora, mas já era uma semana depois.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 11,
        title: "O Ônibus Escolar Fantasma",
        description: "Um ônibus escolar foi visto pegando crianças em paradas normais, mas não chegou à escola. As crianças não voltaram para casa, e o ônibus não existe nos registros.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 12,
        title: "A Viagem de Lua de Mel",
        description: "Um casal partiu para lua de mel em um resort tropical. Suas malas chegaram ao destino, mas eles nunca fizeram check-in. O voo confirmou que embarcaram.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 13,
        title: "A Expedição Subterrânea",
        description: "Espeleólogos exploraram uma caverna recém-descoberta. Suas cordas foram encontradas cortadas, mas não há sinais de luta ou de como saíram da caverna.",
        difficulty: "hard",
        category: "investigation",
        isFree: false
      },
      {
        id: 14,
        title: "O Safari Perdido",
        description: "Turistas em um safari africano saíram para um passeio matinal e nunca retornaram ao acampamento. Seus veículos foram encontrados intactos, mas vazios.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 15,
        title: "A Balsa do Rio Maldito",
        description: "Uma balsa fluvial transportava passageiros regularmente até desaparecer em uma curva do rio. Mergulhadores não encontraram destroços no fundo do rio.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 16,
        title: "O Grupo de Motociclistas",
        description: "Motociclistas experientes partiram para uma viagem em grupo. Câmeras de trânsito mostram todos passando por um posto, mas apenas as motocicletas chegaram ao destino final.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 17,
        title: "A Expedição Polar",
        description: "Exploradores partiram para o Polo Sul com equipamentos de última geração. Seus GPS pararam de transmitir simultaneamente, como se tivessem saído do planeta.",
        difficulty: "hard",
        category: "investigation",
        isFree: false
      },
      {
        id: 18,
        title: "O Acampamento de Verão",
        description: "Crianças partiram para um acampamento de verão tradicional. Os pais receberam cartas e fotos durante duas semanas, mas o acampamento havia sido fechado há cinco anos.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 19,
        title: "A Jornada de Bicicleta",
        description: "Ciclistas atravessavam o país em uma jornada beneficente. Passaram por várias cidades confirmando presença, até que em uma pequena cidade, simplesmente desapareceram.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 20,
        title: "O Último Voo Charter",
        description: "Um avião charter particular decolou com destino conhecido, mas pousou em um aeroporto que havia sido demolido décadas atrás. O piloto insiste que acabou de pousar.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      }
    ]
  },
  {
    id: "sombras-da-noite",
    name: "Sombras da Noite",
    description: "Quando o sol se põe, os mistérios emergem. Crimes e enigmas que só acontecem na escuridão da noite urbana.",
    price: 11.99,
    difficulty: "medium",
    category: "crime",
    image: "/lovable-uploads/c6a6bf1f-4108-4b06-80c7-3e109ecb7f5f.png",
    cases: [
      {
        id: 1,
        title: "O Ladrão de Sombras",
        description: "Um criminoso que rouba apenas durante eclipses lunares, deixando as vítimas temporariamente sem suas próprias sombras. Um fenômeno impossível que desafia a lógica.",
        difficulty: "easy",
        category: "crime",
        isFree: true
      },
      {
        id: 2,
        title: "Assassinatos à Luz de Velas",
        description: "Vítimas são encontradas mortas em quartos iluminados apenas por velas, sempre às 3h33 da madrugada. Não há sinais de invasão ou luta.",
        difficulty: "medium",
        category: "murder",
        isFree: false
      },
      {
        id: 3,
        title: "O Vigilante das Madrugadas",
        description: "Um vigilante misterioso protege as ruas durante a madrugada, mas deixa criminosos em estado catatônico, murmurando sobre 'a escuridão que vê tudo'.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 4,
        title: "A Dança dos Mortos",
        description: "Corpos em necrotérios são encontrados em posições diferentes pela manhã, como se tivessem dançado durante a noite. Câmeras de segurança mostram apenas escuridão.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 5,
        title: "O Sequestrador de Sonhos",
        description: "Pessoas dormem normalmente, mas acordam exaustas, com memórias de terem sido forçadas a viver pesadelos de outras pessoas durante toda a noite.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 6,
        title: "Mortes por Insônia Terminal",
        description: "Vítimas morrem após semanas sem conseguir dormir, mas todas relatam ver a mesma figura sombria que as impede de adormecer.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 7,
        title: "O Colecionador de Medos",
        description: "Um criminoso que de alguma forma descobre os medos mais profundos das pessoas e os transforma em realidade durante a noite.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      },
      {
        id: 8,
        title: "A Enfermeira da Madrugada",
        description: "Uma enfermeira fantasma visita pacientes terminais durante a madrugada. Alguns se recuperam milagrosamente, outros desaparecem sem deixar rastros.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 9,
        title: "O Pintor de Crimes Futuros",
        description: "Um artista pinta crimes que ainda não aconteceram. Suas obras sempre se tornam realidade na noite seguinte, mas ele jura não ter controle sobre isso.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 10,
        title: "As Confissões da Meia-Noite",
        description: "Pessoas ligam para uma linha telefônica inexistente e confessam crimes que não se lembram de ter cometido. Os crimes são descobertos no dia seguinte.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 11,
        title: "O Caçador de Almas Perdidas",
        description: "Moradores de rua desaparecem durante a noite, deixando apenas suas roupas. Testemunhas falam de uma figura que 'coleta almas perdidas'.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 12,
        title: "A Loja de Antiguidades Noturna",
        description: "Uma loja que só abre à noite vende objetos pessoais de pessoas vivas. Os proprietários originais não se lembram de ter vendido nada.",
        difficulty: "medium",
        category: "theft",
        isFree: false
      },
      {
        id: 13,
        title: "O Julgamento das Sombras",
        description: "Criminosos são encontrados mortos com sentenças escritas em suas próprias mãos, como se tivessem sido julgados por um tribunal invisível.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 14,
        title: "A Cirurgiã da Escuridão",
        description: "Pessoas acordam com cirurgias perfeitas que salvam suas vidas, mas não se lembram de ter ido ao hospital. Não há registros médicos das operações.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 15,
        title: "O Mercado Negro de Memórias",
        description: "Um mercado clandestino onde memórias são compradas e vendidas. Vítimas acordam sem lembrar de partes importantes de suas vidas.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 16,
        title: "A Escola Noturna dos Perdidos",
        description: "Crianças desaparecidas são vistas frequentando uma escola que só existe durante a noite. De dia, o prédio está abandonado há décadas.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 17,
        title: "O Banco de Favores Sombrios",
        description: "Uma organização que executa favores impossíveis durante a noite, mas sempre cobra um preço terrível que só é revelado depois.",
        difficulty: "hard",
        category: "conspiracy",
        isFree: false
      },
      {
        id: 18,
        title: "A Confeitaria dos Desejos Proibidos",
        description: "Uma confeitaria noturna onde doces concedem desejos, mas cada mordida custa anos de vida. Clientes não percebem o preço até ser tarde demais.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 19,
        title: "O Teatro dos Crimes Perfeitos",
        description: "Um teatro abandonado onde crimes reais são encenados como peças. A plateia não sabe que está assistindo assassinatos verdadeiros.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 20,
        title: "A Última Chamada da Noite",
        description: "Pessoas recebem ligações de entes queridos mortos, pedindo para encontrá-los em locais específicos. Quem vai ao encontro nunca mais retorna.",
        difficulty: "hard",
        category: "thriller",
        isFree: false
      }
    ]
  },
  {
    id: "sussurros-do-alem",
    name: "Sussurros do Além",
    description: "Comunicações do mundo dos mortos que revelam segredos enterrados. Investigue mensagens que chegam de onde não deveriam vir.",
    price: 14.99,
    difficulty: "hard",
    category: "mystery",
    image: "/lovable-uploads/d8636981-dee1-40ad-91bd-0ab35d871077.png",
    cases: [
      {
        id: 1,
        title: "A Carta do Além",
        description: "Uma mulher recebe cartas manuscritas de seu marido morto, revelando detalhes sobre seu assassinato que apenas o assassino poderia saber. A caligrafia é idêntica.",
        difficulty: "easy",
        category: "murder",
        isFree: true
      },
      {
        id: 2,
        title: "O Telefone dos Mortos",
        description: "Um antigo telefone de linha fixa recebe ligações de pessoas falecidas, sempre com informações sobre crimes não resolvidos. As vozes são reconhecidas por familiares.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 3,
        title: "Mensagens no Espelho",
        description: "Mensagens aparecem escritas no vapor de espelhos de banheiro, sempre após banhos quentes. As mensagens revelam localizações de corpos desaparecidos.",
        difficulty: "medium",
        category: "investigation",
        isFree: false
      },
      {
        id: 4,
        title: "A Ouija Que Acusa",
        description: "Um tabuleiro Ouija usado em uma festa começa a acusar pessoas presentes de crimes específicos. Investigações posteriores confirmam as acusações.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 5,
        title: "O Gravador de Vozes Fantasmas",
        description: "Um investigador paranormal encontra gravações de EVPs (Eletronic Voice Phenomena) que descrevem crimes em andamento em tempo real.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 6,
        title: "Sonhos Compartilhados com Mortos",
        description: "Múltiplas pessoas têm o mesmo sonho com uma vítima de assassinato, que revela detalhes sobre sua morte e pede justiça.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 7,
        title: "A Médium Relutante",
        description: "Uma cética em fenômenos paranormais começa a receber visões de mortos que a guiam para resolver casos arquivados pela polícia.",
        difficulty: "medium",
        category: "investigation",
        isFree: false
      },
      {
        id: 8,
        title: "O Diário Que Escreve Sozinho",
        description: "Um diário antigo continua sendo escrito por mãos invisíveis, documentando crimes que aconteceram décadas atrás com detalhes precisos.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 9,
        title: "Fotografias do Além",
        description: "Câmeras digitais capturam imagens de pessoas mortas apontando para evidências de crimes que a polícia não conseguiu encontrar.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 10,
        title: "A Sessão Espírita Criminal",
        description: "Durante sessões espíritas, os mortos revelam não apenas como morreram, mas também segredos sobre outros crimes relacionados.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 11,
        title: "O Computador Assombrado",
        description: "Um computador antigo liga sozinho durante a madrugada e digita mensagens de pessoas mortas, revelando localização de tesouros roubados.",
        difficulty: "medium",
        category: "theft",
        isFree: false
      },
      {
        id: 12,
        title: "Avisos do Futuro Mortal",
        description: "Espíritos de pessoas que ainda estão vivas aparecem avisando sobre suas próprias mortes futuras, criando paradoxos temporais.",
        difficulty: "hard",
        category: "mystery",
        isFree: false
      },
      {
        id: 13,
        title: "A Radio Frequency dos Mortos",
        description: "Uma frequência de rádio específica transmite vozes de soldados mortos em guerra, revelando crimes de guerra que foram encobertos.",
        difficulty: "hard",
        category: "conspiracy",
        isFree: false
      },
      {
        id: 14,
        title: "O Chat Room do Além",
        description: "Um antigo chat online é invadido por usuários que morreram anos atrás, mas continuam conversando e revelando segredos sobre suas mortes.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 15,
        title: "A TV que Mostra o Passado",
        description: "Uma televisão antiga sintoniza programas que mostram crimes reais acontecendo no passado, como se fossem gravações ao vivo.",
        difficulty: "hard",
        category: "investigation",
        isFree: false
      },
      {
        id: 16,
        title: "O Email dos Arrependidos",
        description: "Pessoas recebem emails de criminosos mortos pedindo perdão e revelando onde esconderam evidências de seus crimes.",
        difficulty: "medium",
        category: "crime",
        isFree: false
      },
      {
        id: 17,
        title: "A Plancheta Acusatória",
        description: "Uma plancheta de Ouija começa a se mover sozinha, escrevendo nomes de assassinos ainda vivos e descrevendo seus métodos em detalhes.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      },
      {
        id: 18,
        title: "O Aplicativo dos Mortos",
        description: "Um aplicativo de mensagens recebe mensagens de perfis de pessoas mortas, sempre com informações sobre crimes relacionados às suas mortes.",
        difficulty: "medium",
        category: "mystery",
        isFree: false
      },
      {
        id: 19,
        title: "A Máquina de Escrever Fantasma",
        description: "Uma máquina de escrever vintage digita sozinha durante as madrugadas, produzindo confissões detalhadas de crimes nunca solucionados.",
        difficulty: "hard",
        category: "crime",
        isFree: false
      },
      {
        id: 20,
        title: "O Último Testemunho",
        description: "Vítimas de assassinato aparecem em sonhos de investigadores, fornecendo testemunhos completos sobre seus últimos momentos e identificando seus assassinos.",
        difficulty: "hard",
        category: "murder",
        isFree: false
      }
    ]
  }
];
