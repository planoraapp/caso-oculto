import { Pack, Case, Purchase } from './types';

export const packs: Pack[] = [
  {
    id: 'labirintos-mentais',
    name: 'Labirintos Mentais', 
    description: 'Mergulhe nos enigmas da mente humana e desvende mistérios psicológicos complexos.',
    price: 14.80,
    difficulty: 'medium',
    image: '/lovable-uploads/0c624752-27c9-4965-949c-119f01c03679.png',
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
    image: '/lovable-uploads/f761b836-5d49-4501-8289-4e1d9800ddf8.png',
    category: 'thriller',
    cases: [
      {
        id: 'bs1',
        order: 1,
        name: 'Última Saída',
        mystery: 'Ela correu até o fim da rua... e desapareceu.',
        solution: 'A jovem fugia de dois perseguidores e entrou em um beco sem saída. Quando a polícia chegou, nada foi encontrado. Mais tarde, descobriu-se uma escotilha escondida sob caixas de madeira, usada por moradores de rua como abrigo subterrâneo.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery',
        icon: '🏃'
      },
      {
        id: 'bs2',
        order: 2,
        name: 'Sem Pegadas',
        mystery: 'O corpo estava lá. Mas ninguém entrou nem saiu.',
        solution: 'A cena do crime mostrava um beco coberto de barro, mas só havia pegadas da vítima. O assassino havia escalado os prédios pelas laterais, matado com uma injeção letal e saído pelo telhado.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '👣'
      },
      {
        id: 'bs3',
        order: 3,
        name: 'O Grito da Sinaleira',
        mystery: 'Um grito. Um carro parado. Ninguém dentro.',
        solution: 'Testemunhas ouviram um grito vindo de um carro parado no cruzamento. A polícia encontrou sangue no banco do passageiro. O motorista havia sido sequestrado segundos antes e levado pelo esgoto que passava sob a rua.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🚗'
      },
      {
        id: 'bs4',
        order: 4,
        name: 'Gaiola de Concreto',
        mystery: 'Ele pediu socorro... de dentro das paredes.',
        solution: 'Durante uma reforma, trabalhadores ouviram batidas vindas de uma parede. Dentro, encontraram um homem desacordado. Um criminoso o havia sedado e o emparedado vivo, usando cimento fresco para ocultar o crime.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🧱'
      },
      {
        id: 'bs5',
        order: 5,
        name: 'Ponto Cego',
        mystery: 'Ela passou por cinco câmeras. Mas nenhuma filmou o crime.',
        solution: 'O ataque ocorreu exatamente em um ponto cego, entre dois postes com câmeras desalinhadas. O criminoso estudou os ângulos por semanas antes de agir. A vítima só foi socorrida após um transeunte ouvir seus gritos.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📹'
      },
      {
        id: 'bs6',
        order: 6,
        name: 'O Estouro',
        mystery: 'Um barulho enorme e estilhaços no chão.',
        solution: 'Um morador, limpando o apartamento, tropeçou ao puxar o tapete e derrubou um enorme aquário do sétimo andar. O impacto espalhou água e peixes pela calçada, assustando os pedestres.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🐠'
      },
      {
        id: 'bs7',
        order: 7,
        name: 'Fumaça no Parabrisa',
        mystery: 'O carro estava em chamas, mas ninguém dentro.',
        solution: 'Criminosos queimaram o carro de propósito para encobrir rastros de DNA após um sequestro. A vítima havia sido levada minutos antes para um galpão ao lado, onde foi mantida refém.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🔥'
      },
      {
        id: 'bs8',
        order: 8,
        name: 'O Muro Pintado',
        mystery: 'A nova arte de rua cobria um crime antigo.',
        solution: 'Grafiteiros pintaram um mural sobre uma parede já marcada por uma silhueta de sangue. Sem saber, estavam cobrindo evidências de um homicídio arquivado. A tinta selou uma mensagem que só seria revelada com reagente químico.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🎨'
      },
      {
        id: 'bs9',
        order: 9,
        name: 'Entrega Misteriosa',
        mystery: 'Um pacote era deixado todo mês no mesmo beco.',
        solution: 'Durante meses, um entregador largava pacotes em um beco escuro. Desconfiado, um vizinho chamou a polícia. Era apenas um filho deixando mantimentos para o pai recluso, que vivia ilegalmente em um porão.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '📦'
      },
      {
        id: 'bs10',
        order: 10,
        name: 'O Som da Viga',
        mystery: 'A estrutura caiu cinco minutos após ele sair.',
        solution: 'Um homem saiu correndo de um beco e minutos depois, uma viga de aço despencou. Ele havia sabotado a base com um maçarico portátil. A demolição foi disfarçada como acidente estrutural.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🏗️'
      },
      {
        id: 'bs11',
        order: 11,
        name: 'Degraus Ocultos',
        mystery: 'Ninguém viu ele subir, mas estava no telhado.',
        solution: 'Um antigo beco possuía uma escada escondida atrás de uma fachada falsa. O criminoso a utilizava para acesso a telhados, de onde espionava e fotografava suas vítimas.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🪜'
      },
      {
        id: 'bs12',
        order: 12,
        name: 'Cartão de Visita',
        mystery: 'Cada corpo vinha com um número diferente.',
        solution: 'Os assassinatos em becos escuros tinham algo em comum: cartões com um número manuscrito. Descobriu-se que eram coordenadas de outros becos da cidade, onde havia indícios de crimes antigos interligados.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🃏'
      },
      {
        id: 'bs13',
        order: 13,
        name: 'Noite da Perseguição',
        mystery: 'Ele fugia da polícia... mas não era criminoso.',
        solution: 'Um entregador foi confundido com um suspeito e correu por instinto. Ao entrar em um beco, caiu em um fosso aberto. Morreu na queda. A confusão levou a uma investigação de falhas sistêmicas.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🏃'
      },
      {
        id: 'bs14',
        order: 14,
        name: 'Sombra no Telhado',
        mystery: 'Alguém caía, mas ninguém subia.',
        solution: 'Testemunhas viram um corpo cair do alto de um prédio ao lado de um beco, mas nenhuma entrada ao telhado havia sido violada. A vítima havia sido içada durante a noite por cordas no fosso do elevador.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🏢'
      },
      {
        id: 'bs15',
        order: 15,
        name: 'O Teto Que Afundou',
        mystery: 'A casa desabou. Mas o beco atrás dela ficou intacto.',
        solution: 'Criminosos usaram explosivos colocados sob a casa para soterrar provas escondidas no porão. O beco estreito serviu como zona de fuga e distração, com caixas de som simulando passos e sirenes.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '💥'
      },
      {
        id: 'bs16',
        order: 16,
        name: 'Escuridão Perfeita',
        mystery: 'Ninguém viu o que aconteceu — e todos estavam lá.',
        solution: 'Durante um apagão, um assalto ocorreu num beco onde três casais estavam conversando. O criminoso usava óculos de visão noturna e uma rota de fuga escondida sob tábuas de madeira.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🌑'
      },
      {
        id: 'bs17',
        order: 17,
        name: 'Paredes que Ouvem',
        mystery: 'Uma confissão foi gravada sem microfones por perto.',
        solution: 'A parede do beco havia sido usada em testes acústicos de uma antiga rádio da cidade. Os tijolos com microfones embutidos ainda funcionavam e gravaram acidentalmente uma conversa entre dois criminosos.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🎙️'
      },
      {
        id: 'bs18',
        order: 18,
        name: 'Grito Gravado',
        mystery: 'O áudio mostrava um grito... mas ninguém gritava.',
        solution: 'Durante uma perseguição, a polícia analisou um áudio que indicava um grito humano vindo de um beco. Era, na verdade, uma gravação deixada como distração para despistar os agentes.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '📱'
      },
      {
        id: 'bs19',
        order: 19,
        name: 'Cadáver Errado',
        mystery: 'A polícia identificou a vítima... mas ela apareceu viva.',
        solution: 'Um homem foi encontrado morto com documentos de outro. O verdadeiro dono havia perdido sua carteira e um criminoso a usou para enganar as autoridades. O verdadeiro culpado era o suposto morto.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🆔'
      },
      {
        id: 'bs20',
        order: 20,
        name: 'Chuva e Cinzas',
        mystery: 'O beco pegou fogo... em plena chuva.',
        solution: 'Os bombeiros se surpreenderam ao ver um incêndio se espalhar mesmo com a chuva intensa. O fogo vinha de uma substância altamente inflamável despejada no local, vinda de um laboratório clandestino no porão de um prédio.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🌧️'
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
        name: 'Reunião Cancelada',
        mystery: 'A reunião foi cancelada, mas o CEO apareceu morto na sala.',
        solution: 'O executivo foi ao escritório para uma reunião secreta com um chantagista. Foi assassinado para proteger segredos corporativos que poderiam destruir a empresa.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder',
        icon: '💼'
      },
      {
        id: 'jc2',
        order: 2,
        name: 'Café da Manhã',
        mystery: 'O diretor morreu durante o café da manhã da empresa.',
        solution: 'Alguém envenenou sua xícara específica com uma substância que imitava um ataque cardíaco. O assassino conhecia sua rotina matinal e aproveitou a confusão para escapar.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '☕'
      },
      {
        id: 'jc3',
        order: 3,
        name: 'Elevador Vazio',
        mystery: 'O elevador desceu vazio, mas havia sangue no teto.',
        solution: 'Um funcionário foi morto no andar superior e o corpo foi escondido no forro do elevador. O assassino desceu normalmente enquanto as evidências ficaram suspensas sobre todos.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🛗'
      },
      {
        id: 'jc4',
        order: 4,
        name: 'Servidor Hackeado',
        mystery: 'Os dados foram roubados, mas ninguém invadiu o sistema.',
        solution: 'Um funcionário da TI vendeu acesso aos dados para concorrentes. Ele criou uma brecha falsa para esconder que foi um crime interno, não um hack externo.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '💻'
      },
      {
        id: 'jc5',
        order: 5,
        name: 'Apresentação Fatal',
        mystery: 'O projetor explodiu durante a apresentação mais importante do ano.',
        solution: 'Um sabotador infiltrado plantou um dispositivo no projetor para interromper a apresentação de um projeto que prejudicaria sua empresa rival.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📊'
      },
      {
        id: 'jc6',
        order: 6,
        name: 'Contrato Fantasma',
        mystery: 'O contrato de milhões desapareceu da mesa do advogado.',
        solution: 'O próprio advogado destruiu o contrato após descobrir cláusulas ilegais. Ele simulou o roubo para proteger sua carreira e evitar ser cúmplice de fraude.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '📄'
      },
      {
        id: 'jc7',
        order: 7,
        name: 'Reunião Secreta',
        mystery: 'Três CEOs se encontraram em segredo e um desapareceu.',
        solution: 'O encontro era para dividir territórios de mercado ilegalmente. Um deles foi sequestrado por autoridades federais como parte de uma investigação antitruste.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🤝'
      },
      {
        id: 'jc8',
        order: 8,
        name: 'Balanço Alterado',
        mystery: 'Os números do balanço mudaram sozinhos durante a auditoria.',
        solution: 'O contador programou um vírus que alterava automaticamente os dados financeiros sempre que auditores acessavam o sistema, escondendo fraudes por anos.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📈'
      },
      {
        id: 'jc9',
        order: 9,
        name: 'Sala Lacrada',
        mystery: 'O cofre da empresa foi aberto, mas a sala estava lacrada.',
        solution: 'O ladrão era um funcionário de segurança que conhecia o sistema. Ele abriu o cofre durante seu turno e reativou o lacre eletrônico para criar um álibi perfeito.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🔒'
      },
      {
        id: 'jc10',
        order: 10,
        name: 'Funcionário Modelo',
        mystery: 'O funcionário do mês foi encontrado morto em seu carro.',
        solution: 'Ele descobriu que seus colegas estavam roubando da empresa e o ameaçaram. Tentou fugir, mas foi perseguido e assassinado no estacionamento.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🏆'
      },
      {
        id: 'jc11',
        order: 11,
        name: 'Ligação Interrompida',
        mystery: 'A videoconferência com investidores foi cortada no momento crucial.',
        solution: 'Um funcionário descontente sabotou a apresentação cortando cabos específicos. Ele queria que a empresa perdesse o investimento para forçar demissões em massa.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '📹'
      },
      {
        id: 'jc12',
        order: 12,
        name: 'Proposta Rejeitada',
        mystery: 'A proposta foi rejeitada antes mesmo de ser apresentada.',
        solution: 'Um espião corporativo roubou a proposta e a entregou aos concorrentes, que fizeram uma oferta melhor minutos antes da apresentação oficial.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '📋'
      },
      {
        id: 'jc13',
        order: 13,
        name: 'Escritório Vazio',
        mystery: 'Todos os funcionários do andar desapareceram ao mesmo tempo.',
        solution: 'Era um simulado de emergência não comunicado, mas um funcionário aproveitou para roubar documentos confidenciais durante a confusão.',
        difficulty: 'easy',
        theme: 'theft',
        icon: '🏢'
      },
      {
        id: 'jc14',
        order: 14,
        name: 'Impressora Sabotada',
        mystery: 'Todos os contratos importantes saíram em branco da impressora.',
        solution: 'Um técnico em TI alterou o driver da impressora para não imprimir documentos com certas palavras-chave, sabotando acordos que prejudicariam sua empresa anterior.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🖨️'
      },
      {
        id: 'jc15',
        order: 15,
        name: 'Ações em Queda',
        mystery: 'As ações despencaram sem motivo aparente.',
        solution: 'Um grupo de investidores espalhou rumores falsos sobre a empresa através de bots nas redes sociais, manipulando o mercado para comprar ações a preço baixo.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '📉'
      },
      {
        id: 'jc16',
        order: 16,
        name: 'Cliente Fantasma',
        mystery: 'O maior cliente da empresa nunca existiu.',
        solution: 'O diretor comercial criou um cliente fictício para justificar transferências de dinheiro. Ele estava desviando recursos para contas pessoais há anos.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '👻'
      },
      {
        id: 'jc17',
        order: 17,
        name: 'Segurança Comprometida',
        mystery: 'As câmeras de segurança gravaram apenas 30 segundos do crime.',
        solution: 'O chefe de segurança programou o sistema para ter uma falha programada. Ele estava sendo chantageado e precisava criar uma janela para o criminoso agir.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📸'
      },
      {
        id: 'jc18',
        order: 18,
        name: 'Produto Defeituoso',
        mystery: 'O produto principal da empresa começou a falhar simultaneamente.',
        solution: 'Um ex-funcionário demitido havia inserido um código malicioso que seria ativado meses depois de sua saída, causando falhas em massa como vingança.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '⚙️'
      },
      {
        id: 'jc19',
        order: 19,
        name: 'Viagem de Negócios',
        mystery: 'O executivo embarcou no voo, mas não chegou ao destino.',
        solution: 'Ele fingiu embarcar e se escondeu em um hotel. Estava fugindo de investigações federais com dinheiro da empresa e precisava desaparecer.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '✈️'
      },
      {
        id: 'jc20',
        order: 20,
        name: 'Acordo Secreto',
        mystery: 'Duas empresas rivais anunciaram fusão do nada.',
        solution: 'Descobriram que ambas estavam sendo investigadas pelo mesmo crime. A fusão era uma estratégia para confundir as autoridades e dividir a responsabilidade legal.',
        difficulty: 'hard',
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
    image: '/lovable-uploads/23f912c3-cc63-42df-b864-7a3ca8800506.png',
    category: 'classic',
    cases: [
      {
        id: 'ce1',
        order: 1,
        name: 'Mansão Sombria',
        mystery: 'O dono da mansão foi encontrado morto na biblioteca trancada.',
        solution: 'O mordomo usou uma chave mestra para entrar, envenenou o chá e saiu pela janela dos fundos. Ele descobriu que seria demitido e perderia sua pensão.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder',
        icon: '🏚️'
      },
      {
        id: 'ce2',
        order: 2,
        name: 'Baile de Máscaras',
        mystery: 'As joias da condessa desapareceram durante a valsa.',
        solution: 'Seu próprio marido roubou as joias para pagar dívidas de jogo. Ele aproveitou a confusão do baile e a máscara para não ser reconhecido pelos criados.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '🎭'
      },
      {
        id: 'ce3',
        order: 3,
        name: 'Carruagem Vazia',
        mystery: 'A carruagem chegou vazia, mas havia sangue nos assentos.',
        solution: 'O passageiro foi atacado por bandidos na estrada. Ferido, conseguiu se esconder nas matas enquanto os cavalos continuaram sozinhos até a cidade.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🐎'
      },
      {
        id: 'ce4',
        order: 4,
        name: 'Duelo Impossível',
        mystery: 'Ambos os duelistas caíram, mas apenas um tiro foi ouvido.',
        solution: 'Um atirador escondido matou ambos simultaneamente com uma única bala que os atravessou. Era uma armação para eliminar dois inimigos políticos de uma vez.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🔫'
      },
      {
        id: 'ce5',
        order: 5,
        name: 'Carta Perdida',
        mystery: 'A carta com o testamento desapareceu do correio.',
        solution: 'O carteiro foi subornado pelo herdeiro desfavorecido para interceptar e destruir o testamento. Sem o documento, ele herdaria por direito legal.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '✉️'
      },
      {
        id: 'ce6',
        order: 6,
        name: 'Jantar Fatal',
        mystery: 'Todos comeram o mesmo prato, mas só um morreu.',
        solution: 'O veneno estava no remédio que apenas a vítima tomava após as refeições. O assassino conhecia seus hábitos médicos e aproveitou a rotina.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🍽️'
      },
      {
        id: 'ce7',
        order: 7,
        name: 'Relógio Parado',
        mystery: 'Todos os relógios da casa pararam no mesmo horário.',
        solution: 'O assassino parou os relógios para confundir a hora da morte. Ele precisava de um álibi para o momento em que estaria sendo visto em outro local.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🕰️'
      },
      {
        id: 'ce8',
        order: 8,
        name: 'Espelho Quebrado',
        mystery: 'O espelho antigo se quebrou sozinho durante a noite.',
        solution: 'Alguém atirou uma pedra da janela dos fundos para quebrar o espelho e assustar a família. Era uma distração para roubar objetos de valor da sala.',
        difficulty: 'easy',
        theme: 'theft',
        icon: '🪞'
      },
      {
        id: 'ce9',
        order: 9,
        name: 'Cavalo Assombrado',
        mystery: 'O cavalo voltou sozinho, mas o cavaleiro desapareceu.',
        solution: 'O cavaleiro foi sequestrado por credores e mantido em cativeiro. Eles soltaram o cavalo para que voltasse para casa, criando confusão sobre seu paradeiro.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🐴'
      },
      {
        id: 'ce10',
        order: 10,
        name: 'Vela Apagada',
        mystery: 'A vela se apagou e quando foi reacesa, havia um morto na sala.',
        solution: 'O assassino esperou no escuro e matou a vítima nos segundos de escuridão. Ele conhecia o local perfeitamente e planejou cada movimento.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🕯️'
      },
      {
        id: 'ce11',
        order: 11,
        name: 'Jardim Secreto',
        mystery: 'Pegadas levam ao jardim, mas ninguém foi visto saindo.',
        solution: 'Havia um túnel secreto sob o jardim que conectava à adega da casa vizinha. O criminoso usou a passagem para escapar sem ser detectado.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🌹'
      },
      {
        id: 'ce12',
        order: 12,
        name: 'Música Sinistra',
        mystery: 'O piano tocou sozinho durante o funeral.',
        solution: 'O filho da vítima instalou um mecanismo no piano para tocar uma música específica. Era sua forma de revelar que sabia quem havia matado seu pai.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🎹'
      },
      {
        id: 'ce13',
        order: 13,
        name: 'Herança Maldita',
        mystery: 'Todos os herdeiros morreram em uma semana.',
        solution: 'O advogado da família estava envenenando os herdeiros um por um para ficar com a herança. Ele alterou o testamento para se beneficiar após todas as mortes.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💎'
      },
      {
        id: 'ce14',
        order: 14,
        name: 'Retrato Amaldiçoado',
        mystery: 'O retrato na parede sangrava pelos olhos.',
        solution: 'Alguém perfurou o quadro por trás e colocou tinta vermelha que escorria lentamente. Era para assustar a família e forçá-los a vender a casa barato.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '🖼️'
      },
      {
        id: 'ce15',
        order: 15,
        name: 'Chave Dourada',
        mystery: 'A chave dourada abria uma porta que não existia.',
        solution: 'A porta estava escondida atrás de uma estante móvel. A chave abria um cofre secreto onde estavam guardados documentos comprometedores sobre negócios ilegais.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🗝️'
      },
      {
        id: 'ce16',
        order: 16,
        name: 'Fantasma do Teatro',
        mystery: 'A atriz principal morreu no palco durante a peça.',
        solution: 'O contra-regra trocou a adaga cenográfica por uma real. Ele estava apaixonado pela atriz e não suportava vê-la beijar outro homem toda noite.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🎭'
      },
      {
        id: 'ce17',
        order: 17,
        name: 'Livro Proibido',
        mystery: 'Quem lia o livro antigo desaparecia sem deixar rastros.',
        solution: 'O livro continha um mapa para um tesouro escondido. Um grupo secreto sequestrava os leitores para interrogá-los sobre o que haviam descoberto.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '📚'
      },
      {
        id: 'ce18',
        order: 18,
        name: 'Sino da Igreja',
        mystery: 'O sino tocou 13 vezes à meia-noite.',
        solution: 'O sineiro estava sinalizando para contrabandistas que a rota estava livre. O toque extra era o código para que pudessem passar com a mercadoria ilegal.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🔔'
      },
      {
        id: 'ce19',
        order: 19,
        name: 'Casamento Interrompido',
        mystery: 'O noivo desapareceu no altar durante a cerimônia.',
        solution: 'Ele descobriu minutos antes que a noiva era na verdade sua irmã perdida. Fugiu em choque, mas não conseguiu explicar sem revelar o segredo da família.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '💒'
      },
      {
        id: 'ce20',
        order: 20,
        name: 'Última Vontade',
        mystery: 'O testamento mudou após a morte do testador.',
        solution: 'O notário foi chantageado por um dos herdeiros e falsificou uma nova versão. Ele alterou o documento original para favorecer quem tinha provas de seus crimes passados.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📜'
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
        name: 'Perfume Mortal',
        mystery: 'Ela borrifou o perfume novo e desmaiou imediatamente.',
        solution: 'O frasco foi adulterado com um neurotóxico por um ex-namorado químico. Ele sabia que ela sempre testava perfumes novos antes de sair de casa.',
        difficulty: 'hard',
        isFree: true,
        theme: 'danger',
        icon: '💐'
      },
      {
        id: 'dl2',
        order: 2,
        name: 'Laboratório Silencioso',
        mystery: 'Todos os cientistas do laboratório desmaiaram ao mesmo tempo.',
        solution: 'Um experimento com gases tóxicos vazou pelo sistema de ventilação. O responsável havia alterado as válvulas de segurança para acelerar um projeto e lucrar mais.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🧪'
      },
      {
        id: 'dl3',
        order: 3,
        name: 'Água Contaminada',
        mystery: 'A família inteira adoeceu após beber água da torneira.',
        solution: 'Alguém injetou pesticida no encanamento da casa. Era um vizinho que queria forçá-los a vender a propriedade para expandir seu terreno.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '💧'
      },
      {
        id: 'dl4',
        order: 4,
        name: 'Remédio Trocado',
        mystery: 'O remédio para diabetes matou em vez de curar.',
        solution: 'Um farmacêutico trocou os comprimidos por uma substância letal similar. Ele estava sendo chantageado por dívidas e foi forçado a cometer o crime.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💊'
      },
      {
        id: 'dl5',
        order: 5,
        name: 'Flores Venenosas',
        mystery: 'O buquê de flores matou quem o cheirou.',
        solution: 'As flores foram pulverizadas com um aerossol tóxico disfarçado de perfume floral. O assassino conhecia a alergia severa da vítima e potencializou a reação.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🌺'
      },
      {
        id: 'dl6',
        order: 6,
        name: 'Tinta Radioativa',
        mystery: 'O artista morreu pintando sua obra-prima.',
        solution: 'Alguém misturou material radioativo na tinta branca que ele mais usava. Era um colega invejoso que sabia que o artista sempre pintava sem proteção.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🎨'
      },
      {
        id: 'dl7',
        order: 7,
        name: 'Escape de Gás',
        mystery: 'O vazamento de gás não foi acidental.',
        solution: 'O síndico do prédio afrouxou as conexões de gás para forçar os moradores a sair. Ele havia vendido o prédio secretamente e precisava desocupá-lo rapidamente.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '💨'
      },
      {
        id: 'dl8',
        order: 8,
        name: 'Comida Envenenada',
        mystery: 'Apenas um prato do restaurante estava contaminado.',
        solution: 'O chef envenenou especificamente o prato do crítico gastronômico que havia destruído sua carreira com uma resenha negativa anos antes.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🍽️'
      },
      {
        id: 'dl9',
        order: 9,
        name: 'Cigarro Mortal',
        mystery: 'Um único cigarro matou o fumante inveterado.',
        solution: 'Alguém injetou cianeto no filtro de um cigarro específico do maço. O assassino sabia exatamente qual cigarro a vítima fumaria primeiro na manhã seguinte.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🚬'
      },
      {
        id: 'dl10',
        order: 10,
        name: 'Piscina Tóxica',
        mystery: 'A água da piscina queimou a pele dos banhistas.',
        solution: 'Alguém despejou ácido industrial na piscina durante a noite. Era um funcionário demitido que queria se vingar do clube que o humilhou publicamente.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🏊'
      },
      {
        id: 'dl11',
        order: 11,
        name: 'Inseticida Letal',
        mystery: 'O jardineiro morreu usando o inseticida de sempre.',
        solution: 'Alguém concentrou o inseticida comum em uma fórmula 50 vezes mais potente. O jardineiro não usava proteção adequada e foi envenenado pela inalação.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🌱'
      },
      {
        id: 'dl12',
        order: 12,
        name: 'Sabão Corrosivo',
        mystery: 'O sabão em pó queimou as mãos da dona de casa.',
        solution: 'Alguém misturou soda cáustica no sabão em pó. Era uma vizinha invejosa que não suportava ver suas roupas sempre impecáveis.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🧼'
      },
      {
        id: 'dl13',
        order: 13,
        name: 'Ar Contaminado',
        mystery: 'Todos no escritório ficaram doentes no mesmo dia.',
        solution: 'Alguém liberou esporos tóxicos pelo sistema de ar condicionado. Era um ex-funcionário que havia sido demitido e queria se vingar de todos os colegas.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🌪️'
      },
      {
        id: 'dl14',
        order: 14,
        name: 'Vitamina Falsa',
        mystery: 'O suplemento vitamínico causou overdose.',
        solution: 'Um vendedor inescrupuloso misturou drogas sintéticas nos comprimidos para causar dependência e aumentar as vendas. A dosagem ficou descontrolada.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '💊'
      },
      {
        id: 'dl15',
        order: 15,
        name: 'Shampoo Químico',
        mystery: 'O cabelo dela caiu completamente após o banho.',
        solution: 'O ex-marido trocou o shampoo por um produto químico industrial. Ele queria destruir sua autoestima antes da audiência de divórcio.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🧴'
      },
      {
        id: 'dl16',
        order: 16,
        name: 'Álcool Metílico',
        mystery: 'A bebida "premium" cegou todos na festa.',
        solution: 'Um fornecedor desonesto substituiu o álcool etílico por metílico para economizar custos. Ele não sabia das consequências fatais da troca.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🍾'
      },
      {
        id: 'dl17',
        order: 17,
        name: 'Pasta de Dente',
        mystery: 'A escovação diária virou tortura para toda a família.',
        solution: 'Alguém misturou capsaicina (pimenta concentrada) na pasta de dente da família. Era uma babá demitida que queria se vingar das crianças malcriadas.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🦷'
      },
      {
        id: 'dl18',
        order: 18,
        name: 'Preservativo Tóxico',
        mystery: 'O casal foi parar no hospital após a relação.',
        solution: 'Alguém injetou uma substância irritante nos preservativos da marca preferida deles. Era um ex-parceiro obsessivo que queria sabotá-los.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '💊'
      },
      {
        id: 'dl19',
        order: 19,
        name: 'Desinfetante Mortal',
        mystery: 'A limpeza da casa se tornou um pesadelo tóxico.',
        solution: 'Alguém misturou água sanitária com amônia no produto de limpeza, criando gás cloro mortal. Foi um acidente causado por um funcionário inexperiente.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🧽'
      },
      {
        id: 'dl20',
        order: 20,
        name: 'Antídoto Falso',
        mystery: 'O antídoto para o veneno era o próprio veneno.',
        solution: 'O médico estava sendo chantageado para matar o paciente específico. Ele trocou o antídoto real por mais veneno, garantindo que a vítima não sobrevivesse.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💉'
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
        mystery: 'Durante uma tempestade violenta, um homem é encontrado morto em sua casa trancada por dentro. Não há sinais de arrombamento.',
        solution: 'O assassino entrou pela chaminé durante a tempestade, matou a vítima e saiu da mesma forma. A chuva apagou todas as pegadas no telhado.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder',
        icon: '🌧️'
      },
      {
        id: 'ci2',
        order: 2,
        name: 'Neblina Traíçoeira',
        mystery: 'Um carro desaparece completamente na neblina da madrugada. Apenas marcas de pneu até a metade da ponte.',
        solution: 'O carro foi içado por um guindaste escondido na neblina. Era um plano para simular um acidente e coletar o seguro.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🌫️'
      },
      {
        id: 'ci3',
        order: 3,
        name: 'Chuva de Sangue',
        mystery: 'Moradores relatam gotas de sangue caindo do céu durante uma chuva intensa.',
        solution: 'Um assassino havia escondido o corpo no reservatório de água da torre. A chuva fez o sangue vazar pelo sistema de distribuição.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '💧'
      },
      {
        id: 'ci4',
        order: 4,
        name: 'Relâmpago Mortal',
        mystery: 'Uma mulher morre eletrocutada em casa durante uma tempestade, mas não havia equipamentos ligados.',
        solution: 'O marido instalou fios de cobre conectados ao para-raios. Durante a tempestade, direcionou a descarga elétrica para a banheira onde ela estava.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '⚡'
      },
      {
        id: 'ci5',
        order: 5,
        name: 'Pegadas na Lama',
        mystery: 'Pegadas na lama levam a um beco sem saída, mas não há ninguém lá.',
        solution: 'O criminoso usou sapatos com sola falsa que se destacavam, deixando pegadas falsas enquanto caminhava descalço por outro caminho.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '👣'
      },
      {
        id: 'ci6',
        order: 6,
        name: 'Trovão Silencioso',
        mystery: 'Durante uma tempestade, testemunhas ouvem um trovão, mas não veem relâmpago. Minutos depois, encontram um corpo.',
        solution: 'O som foi de um tiro disfarçado durante o barulho da tempestade. O assassino cronometrou perfeitamente o momento.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🔫'
      },
      {
        id: 'ci7',
        order: 7,
        name: 'Janela Quebrada',
        mystery: 'Uma janela se quebra de dentro para fora durante a tempestade, mas não há vento forte o suficiente.',
        solution: 'Alguém quebrou a janela por dentro para simular uma invasão, mas estava tentando sair sem ser visto.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🪟'
      },
      {
        id: 'ci8',
        order: 8,
        name: 'Guarda-Chuva Perdido',
        mystery: 'Dezenas de guarda-chuvas são encontrados abandonados após uma tempestade.',
        solution: 'Era uma distração. Enquanto todos pegavam os guarda-chuvas, ladrões roubavam as casas vazias na chuva.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '☂️'
      },
      {
        id: 'ci9',
        order: 9,
        name: 'Poça Vermelha',
        mystery: 'Uma poça de líquido vermelho se forma durante a chuva, mas não há fonte aparente.',
        solution: 'Tinta vermelha foi plantada em um buraco no asfalto. Era um sinal para cúmplices indicando que a operação havia dado errado.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🔴'
      },
      {
        id: 'ci10',
        order: 10,
        name: 'Carro Fantasma',
        mystery: 'Um carro é visto dirigindo sem motorista durante uma tempestade.',
        solution: 'O carro foi programado para dirigir sozinho usando um sistema de piloto automático improvisado. Era para criar um álibi para o verdadeiro motorista.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '👻'
      },
      {
        id: 'ci11',
        order: 11,
        name: 'Mensagem Molhada',
        mystery: 'Uma mensagem aparece escrita na condensação de uma janela durante a chuva.',
        solution: 'A mensagem foi escrita com gordura invisível. Só aparecia quando o vidro embaçava com a umidade. Era um pedido de socorro.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '💌'
      },
      {
        id: 'ci12',
        order: 12,
        name: 'Raio Duplo',
        mystery: 'Dois raios atingem o mesmo local com segundos de diferença.',
        solution: 'O primeiro "raio" foi um dispositivo explosivo. O segundo foi um raio real atraído pela estrutura metálica plantada no local.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '⚡'
      },
      {
        id: 'ci13',
        order: 13,
        name: 'Chuva Seca',
        mystery: 'Durante uma tempestade, uma área específica permanece completamente seca.',
        solution: 'Uma lona transparente foi estendida sobre o local para proteger evidências de um crime que seria investigado no dia seguinte.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🌧️'
      },
      {
        id: 'ci14',
        order: 14,
        name: 'Vento Suspeito',
        mystery: 'O vento da tempestade sopra apenas em uma direção específica, contrariando a meteorologia.',
        solution: 'Ventiladores industriais escondidos criavam corrente de ar artificial para dispersar gases tóxicos de um laboratório clandestino.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '💨'
      },
      {
        id: 'ci15',
        order: 15,
        name: 'Eco na Chuva',
        mystery: 'Durante a tempestade, um eco estranho ressoa entre os prédios.',
        solution: 'O som vinha de um sistema de alto-falantes escondido. Era usado para mascarar os gritos de uma vítima de sequestro.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🔊'
      },
      {
        id: 'ci16',
        order: 16,
        name: 'Luz na Tempestade',
        mystery: 'Uma luz estranha pisca em padrão específico durante toda a tempestade.',
        solution: 'Era um sinal de código Morse para comunicação entre criminosos. A tempestade mascarava a transmissão de rádio.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '💡'
      },
      {
        id: 'ci17',
        order: 17,
        name: 'Árvore Caída',
        mystery: 'Uma árvore cai exatamente sobre um carro específico durante a tempestade.',
        solution: 'A árvore foi parcialmente cortada dias antes. O vento da tempestade apenas finalizou o que já estava planejado.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🌳'
      },
      {
        id: 'ci18',
        order: 18,
        name: 'Telefone Molhado',
        mystery: 'Um telefone público toca incessantemente durante a tempestade, mas ninguém atende.',
        solution: 'Era um sistema automático ativado pela chuva. O telefone estava programado para tocar quando detectasse umidade - era o sinal para início de uma operação.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '📞'
      },
      {
        id: 'ci19',
        order: 19,
        name: 'Sombra na Chuva',
        mystery: 'Uma sombra humana aparece projetada em uma parede durante a tempestade, mas não há ninguém por perto.',
        solution: 'A projeção vinha de uma fotografia iluminada por um projetor ativado pela chuva. Era uma mensagem póstuma de uma vítima.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👤'
      },
      {
        id: 'ci20',
        order: 20,
        name: 'Última Gota',
        mystery: 'A tempestade para abruptamente no momento exato em que um crime é descoberto.',
        solution: 'O criminoso controlava o sistema de irrigação da cidade. Ele criou a "tempestade" artificial para lavar as evidências e a desligou quando terminou.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '💧'
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
        name: 'Arquivo Fantasma',
        mystery: 'Documentos ultra-secretos desaparecem de um cofre governamental sem deixar rastros. O sistema de segurança não registrou nenhuma entrada.',
        solution: 'Um funcionário da limpeza teve acesso durante anos. Ele memorizava os documentos e os reescrevia em casa, vendendo cópias para outros países.',
        difficulty: 'hard',
        isFree: true,
        theme: 'conspiracy',
        icon: '📁'
      },
      {
        id: 'dc2',
        order: 2,
        name: 'Operação Sombra',
        mystery: 'Agentes governamentais começam a desaparecer um por um, sempre após receberem uma ligação anônima.',
        solution: 'Um ex-agente desonrado estava usando informações internas para chantagear e depois eliminar seus antigos colegas.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '☎️'
      },
      {
        id: 'dc3',
        order: 3,
        name: 'Código Vermelho',
        mystery: 'Uma sequência numérica aparece rabiscada em documentos confidenciais de diferentes departamentos.',
        solution: 'Os números eram coordenadas de locais onde evidências de corrupção estavam escondidas. Um whistleblower estava deixando pistas.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🔢'
      },
      {
        id: 'dc4',
        order: 4,
        name: 'Reunião Secreta',
        mystery: 'Políticos de partidos opostos são vistos se encontrando secretamente em locais diversos.',
        solution: 'Eles estavam sendo chantageados pelo mesmo criminoso que tinha informações comprometedoras sobre todos.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🤝'
      },
      {
        id: 'dc5',
        order: 5,
        name: 'Vazamento Controlado',
        mystery: 'Informações confidenciais vazam para a imprensa, mas sempre beneficiando o governo.',
        solution: 'O próprio governo estava vazando informações falsas para confundir inimigos e testar a lealdade de seus funcionários.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '📰'
      },
      {
        id: 'dc6',
        order: 6,
        name: 'Identidade Dupla',
        mystery: 'Um alto funcionário do governo é visto em dois lugares diferentes ao mesmo tempo.',
        solution: 'Eram gêmeos idênticos compartilhando a mesma identidade há décadas, alternando posições para criar álibis perfeitos.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👥'
      },
      {
        id: 'dc7',
        order: 7,
        name: 'Projeto Apagado',
        mystery: 'Todos os registros de um projeto militar ultra-secreto desaparecem simultaneamente de múltiplos servidores.',
        solution: 'Um vírus programado para ativar em data específica foi implantado pelo próprio criador do projeto, arrependido de sua criação.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '💻'
      },
      {
        id: 'dc8',
        order: 8,
        name: 'Morte Anunciada',
        mystery: 'Um informante é encontrado morto exatamente como havia previsto em uma carta selada.',
        solution: 'Ele próprio planejou sua morte e escreveu a carta. Estava com doença terminal e queria que sua morte parecesse assassinato para proteger sua família.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '📜'
      },
      {
        id: 'dc9',
        order: 9,
        name: 'Espião Interno',
        mystery: 'Operações secretas são sabotadas sempre antes de começar, sugerindo espionagem interna.',
        solution: 'Não havia espião. O próprio sistema de segurança estava comprometido por um hack externo há meses.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🕵️'
      },
      {
        id: 'dc10',
        order: 10,
        name: 'Chave Mestra',
        mystery: 'Uma única pessoa tem acesso a todos os sistemas governamentais, mas oficialmente não existe.',
        solution: 'Era uma identidade criada coletivamente por um grupo de hackers que se passavam por funcionário fantasma há anos.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🗝️'
      },
      {
        id: 'dc11',
        order: 11,
        name: 'Relatório Falso',
        mystery: 'Relatórios oficiais contradizem completamente evidências físicas de uma investigação.',
        solution: 'Os relatórios eram verdadeiros, mas as evidências físicas foram plantadas para desacreditar a investigação oficial.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '📊'
      },
      {
        id: 'dc12',
        order: 12,
        name: 'Testemunha Fantasma',
        mystery: 'Uma testemunha crucial em vários casos governamentais nunca pode ser localizada.',
        solution: 'A testemunha era uma identidade falsa criada para manipular processos legais. Nunca existiu de fato.',
        difficulty: 'easy',
        theme: 'conspiracy',
        icon: '👻'
      },
      {
        id: 'dc13',
        order: 13,
        name: 'Orçamento Secreto',
        mystery: 'Milhões de dólares desaparecem do orçamento sem deixar rastro contábil.',
        solution: 'O dinheiro estava sendo usado para financiar uma operação negra legítima, mas off-the-books para proteger agentes infiltrados.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '💰'
      },
      {
        id: 'dc14',
        order: 14,
        name: 'Comunicação Interceptada',
        mystery: 'Todas as comunicações de um departamento são interceptadas, mas não há equipamento de espionagem.',
        solution: 'Um funcionário tinha implante auditivo médico que captava e transmitia conversas involuntariamente para uma empresa de tecnologia.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '📡'
      },
      {
        id: 'dc15',
        order: 15,
        name: 'Decisão Previsível',
        mystery: 'Decisões governamentais importantes são previstas com precisão por analistas externos.',
        solution: 'Os analistas tinham acesso a inteligência artificial que processava padrões comportamentais dos políticos baseado em dados públicos.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🔮'
      },
      {
        id: 'dc16',
        order: 16,
        name: 'Dossiê Pessoal',
        mystery: 'Arquivos pessoais detalhados de cidadãos comuns são encontrados em computadores governamentais.',
        solution: 'Era um programa de monitoramento de redes sociais que compilava perfis psicológicos para prever comportamentos em massa.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '📋'
      },
      {
        id: 'dc17',
        order: 17,
        name: 'Acidente Programado',
        mystery: 'Acidentes convenientes acontecem sempre que alguém está prestes a expor corrupção.',
        solution: 'Uma empresa de segurança privada estava sendo contratada para criar "acidentes" realísticos que apenas assustavam, não matavam.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🚗'
      },
      {
        id: 'dc18',
        order: 18,
        name: 'Rede Fantasma',
        mystery: 'Uma rede de comunicação criptografada opera dentro do governo sem autorização oficial.',
        solution: 'Era uma rede de apoio psicológico criada por funcionários para lidar com o estresse de trabalhar com informações classificadas.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🕸️'
      },
      {
        id: 'dc19',
        order: 19,
        name: 'Memória Apagada',
        mystery: 'Funcionários governamentais relatam lapsos de memória após participarem de reuniões específicas.',
        solution: 'Eles estavam sendo hipnotizados durante as reuniões para esquecer informações sensíveis como medida de segurança.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🧠'
      },
      {
        id: 'dc20',
        order: 20,
        name: 'Último Segredo',
        mystery: 'Um político morre deixando uma mensagem: "O último segredo está onde tudo começou".',
        solution: 'A mensagem se referia ao primeiro escritório onde ele trabalhou. Lá estava escondido um pen-drive com evidências de uma conspiração de décadas.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🔐'
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
        name: 'Xeque-Mate Mortal',
        mystery: 'Um assassinato é planejado como uma partida de xadrez, com cada movimento previsto e documentado.',
        solution: 'O assassino era um grande mestre de xadrez que planejou cada etapa como jogadas. A vítima era seu oponente em um campeonato que ele perdeu décadas atrás.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder',
        icon: '♟️'
      },
      {
        id: 'fj2',
        order: 2,
        name: 'Gambit da Rainha',
        mystery: 'Uma série de roubos segue o padrão de movimento da rainha no xadrez.',
        solution: 'O ladrão usava os movimentos da rainha para escolher seus alvos em um mapa da cidade, criando um padrão previsível apenas para quem conhece xadrez.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '👑'
      },
      {
        id: 'fj3',
        order: 3,
        name: 'Sacrifício do Peão',
        mystery: 'Várias pessoas são manipuladas para cometer pequenos crimes, todas desconhecendo o plano maior.',
        solution: 'Eram "peões" em um esquema maior. Um criminoso mestre os usava para distrair a polícia enquanto executava o crime principal.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '♟️'
      },
      {
        id: 'fj4',
        order: 4,
        name: 'Torre Solitária',
        mystery: 'Um prédio de apartamentos é isolado por uma série de eventos aparentemente aleatórios.',
        solution: 'O criminoso criou situações para evacuar o prédio metodicamente, como uma torre no xadrez controlando colunas e fileiras.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '🏰'
      },
      {
        id: 'fj5',
        order: 5,
        name: 'Bispo Diagonal',
        mystery: 'Crimes acontecem apenas em estabelecimentos localizados diagonalmente uns aos outros.',
        solution: 'O criminoso seguia as rotas diagonais do bispo no xadrez, aproveitando que a polícia não patrulhava essas conexões específicas.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '⛪'
      },
      {
        id: 'fj6',
        order: 6,
        name: 'Cavalo Saltador',
        mystery: 'Um ladrão aparece em locais impossíveis, como se tivesse saltado por cima de obstáculos.',
        solution: 'Ele usava o movimento em L do cavalo do xadrez para planejar rotas através de telhados e túneis, "saltando" sobre a segurança.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🐴'
      },
      {
        id: 'fj7',
        order: 7,
        name: 'Abertura Siciliana',
        mystery: 'Uma série de eventos criminosos segue exatamente os movimentos de uma abertura famosa de xadrez.',
        solution: 'O criminoso estava recriando sua partida favorita de xadrez na vida real, com cada crime representando um movimento específico.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '📖'
      },
      {
        id: 'fj8',
        order: 8,
        name: 'Roque Impossível',
        mystery: 'Dois crimes acontecem simultaneamente em locais distantes, executados pela mesma pessoa.',
        solution: 'Como no roque do xadrez, ele usou um substituto (sócia) para um dos crimes enquanto executava o outro, trocando de posição rapidamente.',
        difficulty: 'medium',
        theme: 'strategy',
        icon: '🔄'
      },
      {
        id: 'fj9',
        order: 9,
        name: 'En Passant Fatal',
        mystery: 'Uma vítima é morta em um momento específico quando passa por um local aparentemente seguro.',
        solution: 'Como a captura en passant no xadrez, o assassino esperou o momento exato quando a vítima passaria pelo ponto vulnerável.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '⚡'
      },
      {
        id: 'fj10',
        order: 10,
        name: 'Promoção do Peão',
        mystery: 'Um criminoso pequeno subitamente se torna um mastermind do crime organizado.',
        solution: 'Como um peão que vira rainha, ele foi secretamente treinado e financiado para assumir o controle quando chegasse ao "fim do tabuleiro".',
        difficulty: 'medium',
        theme: 'power',
        icon: '⬆️'
      },
      {
        id: 'fj11',
        order: 11,
        name: 'Tempo Perdido',
        mystery: 'Crimes são cometidos sempre que o criminoso está com álibi perfeito.',
        solution: 'Ele usava a estratégia do tempo no xadrez, planejando crimes com antecedência e usando temporizadores para executá-los enquanto estava visível em outro lugar.',
        difficulty: 'easy',
        theme: 'strategy',
        icon: '⏰'
      },
      {
        id: 'fj12',
        order: 12,
        name: 'Zugzwang Criminal',
        mystery: 'A polícia é forçada a fazer movimentos que sempre beneficiam o criminoso.',
        solution: 'Como no zugzwang do xadrez, qualquer ação policial levava a uma situação pior. O criminoso criou um dilema onde todas as opções eram ruins.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '🤔'
      },
      {
        id: 'fj13',
        order: 13,
        name: 'Mate Pastor',
        mystery: 'Vítimas experientes caem em armadilhas aparentemente óbvias.',
        solution: 'Como o mate pastor no xadrez, o criminoso usava táticas básicas que funcionavam porque as vítimas subestimavam a simplicidade.',
        difficulty: 'easy',
        theme: 'strategy',
        icon: '🎯'
      },
      {
        id: 'fj14',
        order: 14,
        name: 'Defesa Francesa',
        mystery: 'Um suspeito sempre tem uma defesa perfeita para cada acusação.',
        solution: 'Ele estudou a "Defesa Francesa" do xadrez e aplicou seus princípios: desenvolver uma estrutura defensiva sólida antes de qualquer ataque.',
        difficulty: 'medium',
        theme: 'strategy',
        icon: '🛡️'
      },
      {
        id: 'fj15',
        order: 15,
        name: 'Centro Controlado',
        mystery: 'Todos os crimes giram em torno de um local central específico.',
        solution: 'Como controlar o centro no xadrez, ele estabeleceu domínio sobre uma área chave da cidade para coordenar todas as operações.',
        difficulty: 'medium',
        theme: 'strategy',
        icon: '🎯'
      },
      {
        id: 'fj16',
        order: 16,
        name: 'Peças Desenvolvidas',
        mystery: 'Vários criminosos pequenos começam a trabalhar em perfeita coordenação.',
        solution: 'Como desenvolver peças no xadrez, um mentor estava treinando e posicionando cada "peça" humana para um ataque coordenado.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '⚔️'
      },
      {
        id: 'fj17',
        order: 17,
        name: 'Rei Exposto',
        mystery: 'Uma figura poderosa fica vulnerável após perder toda sua proteção.',
        solution: 'Seus "peões" (seguranças e aliados) foram sistematicamente removidos, deixando-o exposto como um rei no xadrez sem proteção.',
        difficulty: 'medium',
        theme: 'power',
        icon: '👑'
      },
      {
        id: 'fj18',
        order: 18,
        name: 'Ataque Duplo',
        mystery: 'Um criminoso ameaça dois alvos simultaneamente, forçando uma escolha impossível.',
        solution: 'Como no ataque duplo do xadrez, ele criou uma situação onde proteger um alvo deixava automaticamente o outro vulnerável.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '⚔️'
      },
      {
        id: 'fj19',
        order: 19,
        name: 'Partida Imortal',
        mystery: 'Uma série de crimes recria perfeitamente uma partida histórica de xadrez.',
        solution: 'O criminoso estava homenageando a "Partida Imortal" de Anderssen, recriando cada movimento em crimes reais como sua obra-prima.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '📜'
      },
      {
        id: 'fj20',
        order: 20,
        name: 'Grande Mestre Final',
        mystery: 'O último crime é anunciado com antecedência, mas ninguém consegue impedi-lo.',
        solution: 'Como um grande mestre de xadrez, ele calculou todas as variantes possíveis. Mesmo revelando seu plano, havia criado uma situação de mate inevitável.',
        difficulty: 'hard',
        theme: 'strategy',
        icon: '🏆'
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
    id: 'paradoxos-mortais',
    name: 'Paradoxos Mortais',
    description: 'Mistérios sombrios em cenários urbanos cheios de perigos e segredos.',
    price: 14.80,
    difficulty: 'hard',
    image: '/lovable-uploads/9670a496-6047-4797-8881-53708d7cf69f.png',
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
    image: '/lovable-uploads/49d3890a-5154-4a90-b145-8b78afe84713.png',
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
    image: '/lovable-uploads/7f82fdbc-9be2-4751-a7f4-24a48e8b73fe.png',
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
        solution: 'O criminoso trabalhava no turno da noite e conhecia as rotas de patrulha.',
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
