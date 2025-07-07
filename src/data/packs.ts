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
        name: 'A Cor que Mata',
        mystery: 'Um homem entra numa sala pintada de amarelo e morre instantaneamente de ataque cardíaco.',
        solution: 'Ele sofria de uma fobia extremamente rara e severa à cor amarela (xantofobia), desenvolvida após um trauma de infância. A exposição súbita e intensa desencadeou a paragem cardíaca.',
        difficulty: 'medium',
        isFree: true,
        theme: 'mystery',
        icon: '🟡'
      },
      {
        id: 'lm2',
        order: 2,
        name: 'O Espelho Vazio',
        mystery: 'Um homem olha-se ao espelho e não vê o seu reflexo. Convencido de que se tornou um vampiro, ele suicida-se.',
        solution: 'Ele sofreu um AVC que lhe causou prosopagnosia, a incapacidade de reconhecer rostos, incluindo o seu próprio. Ele via um "estranho" no espelho a imitá-lo e entrou em delírio.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🪞'
      },
      {
        id: 'lm3',
        order: 3,
        name: 'O Som Fantasma',
        mystery: 'Uma mulher idosa que vive em silêncio absoluto chama a polícia várias vezes a queixar-se de música alta vinda do apartamento vazio ao lado. Ela é encontrada morta, de exaustão.',
        solution: 'Ela sofria da Síndrome do Ouvido Musical, uma condição em que a perda de audição faz o cérebro "criar" alucinações auditivas, como música. Ela não dormia há dias por causa do "barulho" incessante.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '🎵'
      },
      {
        id: 'lm4',
        order: 4,
        name: 'O Quarto que Encolhe',
        mystery: 'Um homem participa numa experiência científica e é encontrado morto num quarto espaçoso. A causa da morte foi esmagamento, mas as paredes estão intactas.',
        solution: 'A experiência era sobre perceção espacial. As paredes eram ecrãs que projetavam uma imagem que se aproximava lentamente, enquanto o teto descia milimetricamente. A ilusão visual e a pressão real, combinadas, induziram um ataque de pânico e uma sensação de esmagamento tão forte que o seu corpo reagiu como se fosse real.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '📐'
      },
      {
        id: 'lm5',
        order: 5,
        name: 'O Toque Contaminado',
        mystery: 'Um homem morre de desidratação ao lado de uma piscina cheia de água potável.',
        solution: 'Ele sofria de misofobia (medo de germes) e viu uma folha cair na piscina. Para ele, a água estava "contaminada" e ele recusou-se a bebê-la, mesmo à beira da morte.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '💧'
      },
      {
        id: 'lm6',
        order: 6,
        name: 'O Déjà Vu Fatal',
        mystery: 'Um homem morre envenenado por beber de uma garrafa com um aviso de veneno bem visível.',
        solution: 'Ele sofria de amnésia anterógrada, como no filme "Memento". Não conseguia formar novas memórias. Ele lia o aviso, esquecia-se segundos depois, sentia sede e bebia da garrafa, repetindo o ciclo até ser fatal.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🔄'
      },
      {
        id: 'lm7',
        order: 7,
        name: 'A Testemunha Ocular',
        mystery: 'Numa investigação de homicídio, duas testemunhas descrevem o suspeito de formas completamente opostas: uma diz que ele parecia triste, a outra que parecia zangado. Ambas estão a dizer a verdade.',
        solution: 'O suspeito tinha uma expressão facial neutra. A primeira testemunha viu-o a olhar para um funeral que passava na rua. A segunda viu-o a olhar para uma acesa discussão de trânsito. O cérebro de cada uma interpretou a mesma expressão facial com base no contexto que viram.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '👁️'
      },
      {
        id: 'lm8',
        order: 8,
        name: 'O Salto da Ponte',
        mystery: 'Duas irmãs gémeas saltam de uma ponte de mãos dadas. Uma sobrevive e diz que estavam a fugir de "homens-sombra". Não havia mais ninguém na ponte.',
        solution: 'As irmãs sofriam de um transtorno psicótico partilhado (Folie à Deux), onde uma desenvolve um delírio e o transmite à outra. Elas partilhavam a mesma alucinação de que estavam a ser perseguidas.',
        difficulty: 'medium',
        theme: 'thriller',
        icon: '🌉'
      },
      {
        id: 'lm9',
        order: 9,
        name: 'O Cheiro da Morte',
        mystery: 'Um homem morre numa fuga de gás em sua casa. Os seus vizinhos chamaram os bombeiros, mas ele recusou-se a sair, dizendo que "não cheirava a nada".',
        solution: 'Ele sofria de fantosmia, uma alucinação olfativa que lhe causava um cheiro constante a flores. Este cheiro "fantasma" mascarou completamente o cheiro do gás, e ele não percebeu o perigo.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🌸'
      },
      {
        id: 'lm10',
        order: 10,
        name: 'A Mão Alienígena',
        mystery: 'Um homem é encontrado estrangulado na sua cama. As únicas impressões digitais no seu pescoço são as suas.',
        solution: 'Ele sofria da Síndrome da Mão Alheia, uma condição neurológica rara onde uma das mãos age de forma autónoma, fora do controlo do indivíduo. A sua própria mão estrangulou-o durante o sono.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '✋'
      },
      {
        id: 'lm11',
        order: 11,
        name: 'O Rosto na Multidão',
        mystery: 'Um segurança identifica um suspeito numa fotografia de uma multidão. Quando vê a mesma foto na orientação correta, percebe que se enganou.',
        solution: 'A fotografia estava de cabeça para baixo. O cérebro humano é péssimo a reconhecer características faciais em rostos invertidos, um fenómeno conhecido como Efeito Thatcher. O segurança só viu o erro quando a foto foi virada.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '📸'
      },
      {
        id: 'lm12',
        order: 12,
        name: 'O Cofre Vazio',
        mystery: 'Um ladrão abre um cofre e não vê um maço de notas que está bem à sua frente. Ele sai frustrado e é apanhado.',
        solution: 'Ele estava tão focado em procurar por diamantes (o seu alvo principal) que o seu cérebro ignorou completamente o dinheiro. Este fenómeno é conhecido como cegueira por desatenção.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '💎'
      },
      {
        id: 'lm13',
        order: 13,
        name: 'O Membro Fantasma',
        mystery: 'Um veterano de guerra sem uma perna morre de overdose de analgésicos. Ele não tinha outras dores.',
        solution: 'Ele sofria de uma dor insuportável no seu membro fantasma. Desesperado por alívio, e sem que os médicos encontrassem uma solução, ele abusou dos medicamentos até ser fatal.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🦵'
      },
      {
        id: 'lm14',
        order: 14,
        name: 'O Falso Prisioneiro',
        mystery: 'Num estudo psicológico, um participante que fazia o papel de prisioneiro tem um colapso nervoso e morre, embora nunca tenha sido fisicamente maltratado.',
        solution: 'A simulação era tão realista que ele começou a acreditar que era realmente um prisioneiro. O stress psicológico extremo e a perda de identidade levaram a um colapso fatal.',
        difficulty: 'medium',
        theme: 'thriller',
        icon: '⛓️'
      },
      {
        id: 'lm15',
        order: 15,
        name: 'A Palavra Gatilho',
        mystery: 'Um homem comete um crime e não se lembra de nada. A polícia encontra um bilhete no seu bolso com uma única palavra.',
        solution: 'Ele foi hipnotizado por um criminoso para cometer o crime. A palavra no bilhete era o gatilho para a amnésia pós-hipnótica, fazendo-o esquecer tudo o que fez.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '💭'
      },
      {
        id: 'lm16',
        order: 16,
        name: 'O Labirinto de Espelhos',
        mystery: 'Um homem morre de uma queda dentro de um labirinto de espelhos num parque de diversões.',
        solution: 'Os múltiplos reflexos e a desorientação causaram-lhe um ataque severo de vertigem. Ele desmaiou, caiu e bateu com a cabeça de forma fatal.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '🪞'
      },
      {
        id: 'lm17',
        order: 17,
        name: 'O Efeito Placebo',
        mystery: 'Num ensaio clínico, um homem morre após tomar uma pílula. A autópsia revela que a pílula era apenas açúcar.',
        solution: 'Ele estava no grupo de controlo (placebo), mas foi informado dos possíveis efeitos secundários graves do medicamento real. Ele sofreu um "efeito nocebo": a sua crença nos efeitos secundários foi tão forte que o seu corpo reagiu, causando um ataque psicossomático fatal.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '💊'
      },
      {
        id: 'lm18',
        order: 18,
        name: 'O Homem que Não Mentia',
        mystery: 'Um homem é acusado de um crime. Durante o interrogatório, ele só diz frases sem sentido, mas o detetor de mentiras indica que ele está a dizer a verdade.',
        solution: 'Ele sofreu um pequeno AVC que lhe causou Afasia de Wernicke, uma condição em que a pessoa fala fluentemente, mas as frases não têm qualquer significado. Ele não conseguia comunicar, mas também não estava a mentir.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🗣️'
      },
      {
        id: 'lm19',
        order: 19,
        name: 'A Memória Falsa',
        mystery: 'Um homem confessa um crime em detalhe, mas as provas mostram que é impossível ele tê-lo cometido.',
        solution: 'Um terapeuta, usando técnicas sugestivas, implantou acidentalmente uma memória falsa na sua mente. O homem estava a confessar um crime que ele genuinamente acreditava ter cometido.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '🧠'
      },
      {
        id: 'lm20',
        order: 20,
        name: 'O Quarto de Ames',
        mystery: 'Duas pessoas da mesma altura entram num quarto. Uma parece um gigante, a outra um anão. Uma delas morre de susto.',
        solution: 'Eles entraram num "Quarto de Ames", uma sala com uma ilusão de ótica que distorce a perceção de tamanho. A pessoa que se viu subitamente como um "anão" tinha uma fobia rara a encolher, e o choque foi fatal.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '📐'
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
        name: 'A Queda na Reunião',
        mystery: 'Durante uma reunião tensa no último andar, um CEO atira-se contra a janela e morre. Não foi suicídio.',
        solution: 'Um rival sabotou o vidro inteligente da sala, que normalmente era à prova de bala. Ele desativou a camada de proteção remotamente, momentos antes de o CEO, que tinha o hábito de se encostar à janela para dramatizar, o fazer pela última vez.',
        difficulty: 'medium',
        isFree: true,
        theme: 'murder',
        icon: '🏢'
      },
      {
        id: 'jc2',
        order: 2,
        name: 'O Café da Manhã',
        mystery: 'Um executivo morre envenenado após beber o seu café matinal. A sua secretária, que preparou o café, é a principal suspeita.',
        solution: 'A secretária é inocente. O veneno estava na caneca pessoal do executivo, que tinha a inscrição "Melhor Chefe do Mundo". Um colega invejoso aplicou o veneno na caneca na noite anterior, sabendo que só ele a usaria.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '☕'
      },
      {
        id: 'jc3',
        order: 3,
        name: 'O Relatório Fatal',
        mystery: 'Um analista financeiro morre de ataque cardíaco na sua secretária. A única coisa à sua frente é um relatório de mercado positivo.',
        solution: 'Ele estava envolvido em "insider trading". O seu cúmplice enviou-lhe o relatório positivo como um sinal de que o plano tinha funcionado. Mas o relatório era falso, criado para enganá-lo. Ao ver as ações da sua empresa a cair a pique no seu segundo monitor, percebeu que foi traído e o choque foi fatal.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '📊'
      },
      {
        id: 'jc4',
        order: 4,
        name: 'A Caneta-Espiã',
        mystery: 'Um diretor de uma empresa farmacêutica suicida-se. No seu bolso, a polícia encontra uma caneta que não escreve.',
        solution: 'A caneta era um dispositivo de escuta, dado por um concorrente. Ele foi gravado a admitir fraude e estava a ser chantageado. Incapaz de ver uma saída, ele tirou a própria vida.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '🖊️'
      },
      {
        id: 'jc5',
        order: 5,
        name: 'A Senha no Post-it',
        mystery: 'O cofre de uma empresa é esvaziado durante a noite. Não há sinais de arrombamento e o único suspeito, o guarda noturno, passou no teste do polígrafo.',
        solution: 'Uma "consultora" de segurança passou o dia na empresa. Ela convenceu um gestor a escrever a senha do cofre num post-it e a colá-lo debaixo da secretária "por segurança". O guarda noturno era o seu cúmplice; ela disse-lhe onde encontrar a senha.',
        difficulty: 'easy',
        theme: 'theft',
        icon: '📝'
      },
      {
        id: 'jc6',
        order: 6,
        name: 'O Elevador Privado',
        mystery: 'O CEO de uma empresa rival fica preso no elevador privado do seu concorrente e morre de asma. O seu inalador estava vazio.',
        solution: 'O concorrente sabia da asma do CEO. Ele convidou-o para uma reunião e sabotou o elevador. Antes, pagou a um funcionário para trocar o inalador do CEO por um vazio durante uma distração.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🛗'
      },
      {
        id: 'jc7',
        order: 7,
        name: 'O Brinde Envenenado',
        mystery: 'Numa festa da empresa, um gestor morre envenenado. Todos beberam do mesmo champanhe.',
        solution: 'O assassino sabia que a vítima era a única pessoa que pedia sempre uma pedra de gelo no seu champanhe (um hábito peculiar). O veneno estava no único cubo de gelo que o empregado de mesa foi instruído a colocar na taça "daquele gestor excêntrico".',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🥂'
      },
      {
        id: 'jc8',
        order: 8,
        name: 'O Acidente na Garagem',
        mystery: 'Um engenheiro de uma empresa de tecnologia automóvel é encontrado atropelado na garagem da empresa pelo seu próprio protótipo de carro autónomo.',
        solution: 'Um colega hackerizou o software do carro, desativando os sensores de proximidade e programando-o para acelerar quando detetasse o telemóvel específico do engenheiro.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🚗'
      },
      {
        id: 'jc9',
        order: 9,
        name: 'A Fuga de Informação',
        mystery: 'Uma startup perde uma ideia milionária para um concorrente. Não há sinais de espionagem digital.',
        solution: 'O CEO tirou uma fotografia da equipa a celebrar em frente a um quadro branco onde todo o plano de negócios estava desenhado. Ele publicou a foto nas redes sociais, e o concorrente simplesmente deu zoom na imagem.',
        difficulty: 'easy',
        theme: 'conspiracy',
        icon: '📷'
      },
      {
        id: 'jc10',
        order: 10,
        name: 'A Promoção Mortal',
        mystery: 'Dois funcionários competem por uma promoção. Um deles morre de uma reação alérgica grave após comer um bolo na festa da empresa.',
        solution: 'O outro funcionário sabia da alergia fatal do colega a amendoins. Ele trouxe o bolo, garantindo a todos que era seguro, mas tinha contaminado a sua fatia com uma pequena quantidade de pó de amendoim.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🎂'
      },
      {
        id: 'jc11',
        order: 11,
        name: 'O Destruidor de Documentos',
        mystery: 'Um funcionário é despedido por destruir documentos importantes. Ele jura que os colocou no cofre.',
        solution: 'Um rival deu-lhe uma caneta especial. A tinta parecia normal, mas desaparecia completamente após 24 horas com a exposição ao ar, fazendo parecer que os documentos estavam em branco.',
        difficulty: 'easy',
        theme: 'conspiracy',
        icon: '📄'
      },
      {
        id: 'jc12',
        order: 12,
        name: 'O Bónus Anual',
        mystery: 'Todo o conselho de administração de uma empresa é encontrado morto na sala de reuniões após anunciarem bónus dececionantes. A sala estava trancada.',
        solution: 'O chefe de segurança, que foi despedido injustamente, usou o seu conhecimento do edifício para libertar um gás inodoro e tóxico através do sistema de ventilação da sala de reuniões, que ele depois selou remotamente.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💰'
      },
      {
        id: 'jc13',
        order: 13,
        name: 'A Impressora 3D',
        mystery: 'Uma patente secreta é roubada de um cofre. A única chave estava com o CEO, que tem um álibi perfeito.',
        solution: 'Um espião industrial tirou uma fotografia de alta resolução da chave na secretária do CEO. Com a foto, ele imprimiu uma cópia perfeita em 3D e usou-a para abrir o cofre.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '🖨️'
      },
      {
        id: 'jc14',
        order: 14,
        name: 'O Desvio de Fundos',
        mystery: 'Um contabilista desvia milhões de uma empresa durante anos sem que ninguém se aperceba.',
        solution: 'Ele programou o sistema para desviar as frações de cêntimos de milhares de transações diárias para uma conta sua. Cada desvio era minúsculo, mas o volume tornou-o milionário. (Técnica de "salami slicing").',
        difficulty: 'medium',
        theme: 'theft',
        icon: '💻'
      },
      {
        id: 'jc15',
        order: 15,
        name: 'A Morte no Campo de Golfe',
        mystery: 'Um empresário morre numa explosão enquanto joga golfe com um rival.',
        solution: 'O rival trocou a bola de golfe da vítima por uma bola de brincadeira que explode ao impacto. Ele não sabia que um funcionário do clube, por engano, tinha enchido a bola com material explosivo real em vez de pó inofensivo.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '⛳'
      },
      {
        id: 'jc16',
        order: 16,
        name: 'O Segredo na Planta',
        mystery: 'Um segredo industrial é revelado. A sala de reuniões tinha sido varrida e estava "limpa" de microfones.',
        solution: 'O microfone não estava na sala, mas sim no vaso de uma planta no corredor, exatamente em frente à porta da sala de reuniões, que era sempre deixada entreaberta.',
        difficulty: 'easy',
        theme: 'conspiracy',
        icon: '🪴'
      },
      {
        id: 'jc17',
        order: 17,
        name: 'O Ataque de Pânico',
        mystery: 'Um executivo com fobia de abelhas morre de pânico na sua sala. Não há abelhas no escritório.',
        solution: 'Um concorrente, sabendo da sua fobia, escondeu um pequeno dispositivo de som na sua sala que emitia um zumbido de abelha de baixa frequência, quase inaudível, mas suficiente para desencadear um ataque de pânico fatal.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🐝'
      },
      {
        id: 'jc18',
        order: 18,
        name: 'A Falsa Ameaça de Bomba',
        mystery: 'Uma ameaça de bomba força a evacuação de um prédio de escritórios. Nada explode, mas um protótipo valioso desaparece.',
        solution: 'O ladrão fez a ameaça de bomba. Durante a evacuação caótica, ele entrou no prédio vestido como um membro da brigada anti-bombas e roubou o protótipo à vista de todos.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '💣'
      },
      {
        id: 'jc19',
        order: 19,
        name: 'O Café da Competição',
        mystery: 'O CEO de uma empresa de refrigerantes morre após beber um café adoçado.',
        solution: 'Ele era diabético. Um rival trocou o seu adoçante artificial por açúcar normal. O pico de açúcar no sangue foi fatal.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '🍯'
      },
      {
        id: 'jc20',
        order: 20,
        name: 'A Queda das Ações',
        mystery: 'Um investidor arruinado suicida-se. Ele tinha acabado de vender todas as suas ações com prejuízo. No dia seguinte, as ações disparam.',
        solution: 'Um grupo de manipuladores de mercado espalhou uma notícia falsa e credível sobre a empresa, causando pânico e a queda das ações. Eles compraram as ações a baixo preço, e quando a notícia foi desmentida, as ações recuperaram, deixando o investidor original na ruína.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '📈'
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
    image: '/lovable-uploads/daa83e7f-c9df-4b63-ac36-f4f4db10cf5d.png',
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
    image: '/lovable-uploads/188a8e9d-d579-487f-bf2d-6aa019d02e36.png',
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
    image: '/lovable-uploads/188a8e9d-d579-487f-bf2d-6aa019d02e36.png',
    category: 'folklore',
    cases: [
      {
        id: 'lu1',
        order: 1,
        name: 'A Boleia Fantasma',
        mystery: 'Um homem dá boleia a uma jovem numa estrada deserta. No dia seguinte, encontra o casaco dela no seu carro, mas descobre que ela morreu há 20 anos.',
        solution: 'A "jovem" era a neta da falecida, que se vestiu como a avó para pregar uma partida, usando uma história famosa para assustar o motorista. Ela deixou o casaco de propósito.',
        difficulty: 'easy',
        isFree: true,
        theme: 'mystery',
        icon: '👻'
      },
      {
        id: 'lu2',
        order: 2,
        name: 'O Assassino Oculto',
        mystery: 'Uma mulher é seguida por um camião que não para de piscar os faróis. Ao chegar a casa, o camionista aborda-a.',
        solution: 'O camionista não a estava a perseguir. Ele via um homem com uma faca escondido no banco de trás do carro dela. Cada vez que o homem se levantava, o camionista piscava os faróis para o assustar.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🚛'
      },
      {
        id: 'lu3',
        order: 3,
        name: 'O Rim Roubado',
        mystery: 'Um homem acorda numa banheira de gelo num hotel, com uma cicatriz nas costas e um bilhete a dizer "Chame uma ambulância".',
        solution: 'Ele foi vítima de uma rede de tráfico de órgãos. Eles drogaram-no e removeram um dos seus rins. O gelo era para preservar o órgão até à sua recolha.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🧊'
      },
      {
        id: 'lu4',
        order: 4,
        name: 'O Lamber Humano',
        mystery: 'Uma jovem, sozinha em casa, ouve um barulho. Estende a mão para debaixo da cama e o seu cão lambe-a. Na manhã seguinte, encontra o cão morto com um bilhete: "Os humanos também sabem lamber".',
        solution: 'O assassino estava debaixo da cama dela o tempo todo. Foi ele quem lambeu a sua mão para a acalmar.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🐕'
      },
      {
        id: 'lu5',
        order: 5,
        name: 'A Loira do Banheiro',
        mystery: 'Um grupo de estudantes invoca a "Loira do Banheiro". As luzes piscam e uma rapariga morre com os cabelos subitamente loiros.',
        solution: 'Uma "amiga" invejosa atirou-lhe um balde de lixívia (água sanitária) durante o apagão planeado. A vítima, que tinha uma alergia grave, morreu de choque anafilático.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '👩‍🦱'
      },
      {
        id: 'lu6',
        order: 6,
        name: 'O Jogo do Compasso',
        mystery: 'Crianças brincam com um compasso e um caderno. O compasso move-se sozinho e uma das crianças morre de susto.',
        solution: 'Uma das crianças mais velhas estava a mover o compasso com um íman debaixo da mesa. A vítima tinha uma condição cardíaca não diagnosticada e o susto foi fatal.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '🧭'
      },
      {
        id: 'lu7',
        order: 7,
        name: 'O Homem do Saco',
        mystery: 'Uma criança desobediente desaparece. Os pais encontram um saco de serapilheira vazio no seu quarto. Não há sinais de arrombamento.',
        solution: 'A criança, a brincar ao "Homem do Saco", escondeu-se dentro de um baú antigo. A tampa do baú fechou-se e trancou-a por dentro, e ela morreu sufocada.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '👤'
      },
      {
        id: 'lu8',
        order: 8,
        name: 'A Estátua do Palhaço',
        mystery: 'Uma babysitter liga aos pais a perguntar se pode cobrir a estátua de um palhaço que a assusta. O pai grita: "Tire as crianças de casa! Nós não temos uma estátua de um palhaço!".',
        solution: 'O "palhaço" era um ladrão que se escondeu na casa. Quando a babysitter o expôs, ele cortou a linha telefónica. Ninguém morreu; a polícia chegou a tempo.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🤡'
      },
      {
        id: 'lu9',
        order: 9,
        name: 'A Boneca Envenenada',
        mystery: 'Uma família compra uma boneca antiga. A filha mais nova é encontrada morta no seu quarto, com a boneca ao seu lado.',
        solution: 'A tinta da boneca antiga continha uma alta concentração de chumbo. A criança, que tinha o hábito de roer os brinquedos, morreu de envenenamento por chumbo.',
        difficulty: 'medium',
        theme: 'danger',
        icon: '🪆'
      },
      {
        id: 'lu10',
        order: 10,
        name: 'A Curva da Morte',
        mystery: 'Todos os que fazem uma curva específica numa estrada à noite morrem num acidente. A estrada é perfeita.',
        solution: 'Um projetor de alta potência, instalado por um artista local, projeta uma imagem hiper-realista de uma parede de tijolos na curva. Os condutores desviam-se e caem do penhasco.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🛣️'
      },
      {
        id: 'lu11',
        order: 11,
        name: 'O Chupa-Cabra',
        mystery: 'Várias cabras de uma quinta aparecem mortas, com o sangue todo drenado, mas sem sinais de luta.',
        solution: 'O dono da quinta estava a tentar criar uma nova raça de morcegos-vampiros geneticamente modificados para um laboratório. Eles escaparam e atacaram as cabras.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '🐐'
      },
      {
        id: 'lu12',
        order: 12,
        name: 'A Mensagem do Além',
        mystery: 'Após a morte do seu marido, uma viúva começa a receber mensagens de texto do número dele. A última diz: "Estou a ver-te". Ela morre de susto.',
        solution: 'O ladrão que roubou o telemóvel do marido no local do acidente estava a enviar as mensagens. Ele estava a observá-la do outro lado da rua.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '📱'
      },
      {
        id: 'lu13',
        order: 13,
        name: 'O Carro Assombrado',
        mystery: 'Um homem compra um carro antigo e começa a ouvir vozes. Ele despista-se e morre.',
        solution: 'O rádio antigo do carro captava frequências de rádio amador e baby-monitors. As "vozes" eram interferências. O homem, convencido de que o carro estava assombrado, assustou-se e perdeu o controlo.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '🚗'
      },
      {
        id: 'lu14',
        order: 14,
        name: 'A Agulha no Cinema',
        mystery: 'Um homem assiste a um filme e sente uma picada. Ao lado, encontra um bilhete: "Bem-vindo ao clube da SIDA". Ele morre.',
        solution: 'Ele não morreu de SIDA. Aterrorizado, correu para fora do cinema, atravessou a rua sem olhar e foi atropelado. A agulha e o bilhete eram uma "partida" de mau gosto.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🎬'
      },
      {
        id: 'lu15',
        order: 15,
        name: 'O Jantar Esquecido',
        mystery: 'Um homem convida um amigo para jantar. O amigo nunca aparece. No dia seguinte, é encontrado morto no seu apartamento, de fome.',
        solution: 'O amigo era extremamente pobre e contava com aquele jantar. O anfitrião adormeceu e esqueceu-se. O amigo, por orgulho, não pediu ajuda e morreu de inanição.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🍽️'
      },
      {
        id: 'lu16',
        order: 16,
        name: 'O Gato no Micro-ondas',
        mystery: 'Uma senhora idosa tenta secar o seu gato no micro-ondas, matando-o. Ela ganha um processo milionário contra o fabricante.',
        solution: 'O manual de instruções não incluía um aviso para "não secar animais de estimação". O seu advogado argumentou com sucesso que o fabricante foi negligente.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🐱'
      },
      {
        id: 'lu17',
        order: 17,
        name: 'O Veneno no Envelope',
        mystery: 'Uma mulher morre envenenada após lamber centenas de envelopes para uma campanha de caridade.',
        solution: 'A cola dos envelopes, de baixa qualidade, estava contaminada com uma toxina rara. A dose acumulada ao lamber tantos envelopes foi fatal.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '✉️'
      },
      {
        id: 'lu18',
        order: 18,
        name: 'O Roubo do Bonsai',
        mystery: 'Um ladrão invade uma casa e rouba apenas um pequeno bonsai. Ele é preso no dia seguinte.',
        solution: 'O bonsai era um presente de um chefe da Yakuza e tinha um pequeno localizador GPS escondido no vaso como medida de segurança.',
        difficulty: 'medium',
        theme: 'theft',
        icon: '🌳'
      },
      {
        id: 'lu19',
        order: 19,
        name: 'A Passadeira 3D',
        mystery: 'Uma cidade instala uma passadeira 3D que parece flutuar para forçar os carros a abrandar. Um peão morre atropelado nela.',
        solution: 'Um condutor idoso, com problemas de visão, assustou-se com os "obstáculos flutuantes", teve um ataque cardíaco e perdeu o controlo do carro, atropelando o peão.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🚶'
      },
      {
        id: 'lu20',
        order: 20,
        name: 'O Sorriso do Manequim',
        mystery: 'Uma funcionária de uma loja que trabalha até tarde queixa-se de que um dos manequins parece sorrir para ela. Uma noite, ela é encontrada morta.',
        solution: 'Um ladrão escondia-se na loja todas as noites, disfarçando-se de manequim. Naquela noite, ela descobriu-o, e ele matou-a.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🏪'
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
