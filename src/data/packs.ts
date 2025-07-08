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
      },
      {
        id: 'lm4',
        order: 4,
        name: 'Reflexo Distorcido',
        mystery: 'Ela vê pessoas diferentes quando olha no espelho, mas todos veem ela normalmente.',
        solution: 'Sofre de prosopagnosia (cegueira facial) e não reconhece o próprio rosto. Vê estranhos no espelho porque não consegue processar feições faciais corretamente.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '🪞'
      },
      {
        id: 'lm5',
        order: 5,
        name: 'Memórias Emprestadas',
        mystery: 'Um homem tem lembranças vívidas de uma vida que nunca viveu.',
        solution: 'Sua irmã gêmea morreu na infância e ele internalizou as histórias dela como próprias. O trauma criou falsas memórias para preencher o vazio emocional.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👥'
      },
      {
        id: 'lm6',
        order: 6,
        name: 'Cores Proibidas',
        mystery: 'Uma mulher enxerga cores que mais ninguém vê e isso a está deixando louca.',
        solution: 'Ela tem tetracromacia (quatro tipos de cones na retina) e vê milhões de cores a mais que pessoas normais. O excesso sensorial causa sobrecarga neurológica.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🌈'
      },
      {
        id: 'lm7',
        order: 7,
        name: 'Dupla Personalidade',
        mystery: 'Um paciente afirma ser duas pessoas diferentes e ambas sabem coisas que ele não deveria saber.',
        solution: 'Ele tem transtorno dissociativo de identidade. Uma personalidade testemunhou um crime que a personalidade principal reprimiu da memória.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🎭'
      },
      {
        id: 'lm8',
        order: 8,
        name: 'Tempo Perdido',
        mystery: 'Ele sempre perde exatamente 3 horas e 27 minutos todos os dias.',
        solution: 'Sofre de fuga dissociativa relacionada ao trauma. Inconsciente, visita o túmulo da filha morta no mesmo horário do acidente que ele reprimiu.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '⏰'
      },
      {
        id: 'lm9',
        order: 9,
        name: 'Vozes Familiares',
        mystery: 'Uma mulher ouve a voz de sua mãe morta, mas apenas quando está sozinha.',
        solution: 'Desenvolveu alucinações auditivas após culpa extrema. A "voz da mãe" é sua própria consciência punindo-a por não ter visitado antes da morte.',
        difficulty: 'medium',
        theme: 'thriller',
        icon: '👻'
      },
      {
        id: 'lm10',
        order: 10,
        name: 'Matemática Impossível',
        mystery: 'Um gênio matemático não consegue mais resolver problemas simples, mas resolve equações complexas dormindo.',
        solution: 'Desenvolveu savantismo pós-traumático após acidente. O trauma bloqueou funções básicas mas liberou habilidades extraordinárias no subconsciente.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🔢'
      },
      {
        id: 'lm11',
        order: 11,
        name: 'Medo do Espelho',
        mystery: 'Toda vez que ele olha no espelho, vê alguém atacando pelas costas.',
        solution: 'Testemunhou o próprio pai ser esfaqueado pelas costas na infância. O cérebro projeta a memória traumática em todos os reflexos como mecanismo de proteção.',
        difficulty: 'medium',
        theme: 'thriller',
        icon: '😱'
      },
      {
        id: 'lm12',
        order: 12,
        name: 'Língua Perdida',
        mystery: 'Uma poliglota esquece completamente uma língua que falava fluentemente.',
        solution: 'Sofreu trauma emocional severo associado àquela língua. O cérebro bloqueou completamente o idioma para protegê-la das memórias dolorosas conectadas a ele.',
        difficulty: 'easy',
        theme: 'mystery',
        icon: '🗣️'
      },
      {
        id: 'lm13',
        order: 13,
        name: 'Cegueira Seletiva',
        mystery: 'Ele não consegue ver objetos vermelhos, mas sua visão é perfeita para tudo mais.',
        solution: 'Desenvolveu cegueira histérica para a cor vermelha após ver sangue em acidente traumático. É um bloqueio psicológico, não físico.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '👁️'
      },
      {
        id: 'lm14',
        order: 14,
        name: 'Escrita Automática',
        mystery: 'Suas mãos escrevem mensagens sozinhas enquanto ela dorme.',
        solution: 'Tem sonambulismo complexo e transtorno dissociativo. Durante o sono, sua mente processa traumas através da escrita automática como terapia inconsciente.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '✍️'
      },
      {
        id: 'lm15',
        order: 15,
        name: 'Paralisia do Medo',
        mystery: 'Ele fica completamente paralisado sempre que ouve música clássica.',
        solution: 'Vivenciou abuso na infância sempre acompanhado de música clássica. O som serve como gatilho que ativa resposta de congelamento traumático.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🎵'
      },
      {
        id: 'lm16',
        order: 16,
        name: 'Envelhecimento Mental',
        mystery: 'Uma jovem de 20 anos tem memórias e comportamentos de uma idosa de 80.',
        solution: 'Cuidou da avó com Alzheimer por anos, internalizando suas histórias e maneirismos. Após a morte da avó, assumiu sua identidade como mecanismo de luto.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👵'
      },
      {
        id: 'lm17',
        order: 17,
        name: 'Dor Fantasma',
        mystery: 'Ela sente dor intensa em um braço que nunca perdeu.',
        solution: 'Sua irmã gêmea perdeu o braço em acidente. Devido à conexão emocional extrema, ela desenvolveu dor psicossomática no mesmo local do membro amputado.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '💔'
      },
      {
        id: 'lm18',
        order: 18,
        name: 'Sinestesia Mortal',
        mystery: 'Ele vê cores quando ouve sons, mas certas cores o fazem desmaiar.',
        solution: 'Tem sinestesia cromestésica e PTSD. Cores específicas ativam memórias traumáticas de um incêndio, causando ataques de pânico e perda de consciência.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🎨'
      },
      {
        id: 'lm19',
        order: 19,
        name: 'Pesadelo Acordado',
        mystery: 'Ela tem pesadelos horríveis, mas apenas quando está acordada.',
        solution: 'Sofre de alucinações hipnagógicas invertidas causadas por trauma. Seu cérebro projeta pesadelos durante a vigília como punição por culpa reprimida.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '😴'
      },
      {
        id: 'lm20',
        order: 20,
        name: 'Identidade Fragmentada',
        mystery: 'Ele é cinco pessoas diferentes, mas apenas uma delas sabe a verdade sobre sua família.',
        solution: 'Desenvolveu transtorno dissociativo após descobrir que foi adotado e seus "pais" eram sequestradores. Cada personalidade protege um pedaço da verdade traumática.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🧩'
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
        mystery: 'Um assassinato ocorre durante uma tempestade, sem testemunhas.',
        solution: 'O assassino usou a chuva para escapar sem ser visto.',
        difficulty: 'hard',
        isFree: true,
        theme: 'murder',
        icon: '🌧️'
      },
      {
        id: 'ci2',
        order: 2,
        name: 'Neblina Traíçoeira',
        mystery: 'Um carro desaparece na neblina da noite chuvosa.',
        solution: 'Foi roubado para encobrir outro crime.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '🌫️'
      },
      {
        id: 'ci3',
        order: 3,
        name: 'Mensagem Molhada',
        mystery: 'Uma mensagem codificada é encontrada em uma garrafa na chuva.',
        solution: 'A mensagem revela a localização de um esconderijo.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '💌'
      },
      {
        id: 'ci4',
        order: 4,
        name: 'Pegadas na Lama',
        mystery: 'O criminoso deixou pegadas perfeitas na lama, mas elas levam ao nada.',
        solution: 'Ele usou sapatos maiores e caminhou de costas, criando pegadas falsas. As verdadeiras pegadas estavam sob uma lona impermeável que removeu depois.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '👟'
      },
      {
        id: 'ci5',
        order: 5,
        name: 'Álibi Perfeito',
        mystery: 'Ele estava sendo filmado em um local público durante o crime.',
        solution: 'Usou um sósia e uma gravação pré-programada em seu celular. Enquanto o sósia mantinha o álibi, ele cometeu o crime e voltou para trocar de lugar.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '📱'
      },
      {
        id: 'ci6',
        order: 6,
        name: 'Arma Desaparecida',
        mystery: 'A arma do crime sumiu da cena, mas ninguém saiu do local.',
        solution: 'O assassino engoliu a arma: uma agulha de tricô retrátil feita de gelo. A "arma" derreteu dentro do estômago da vítima.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '🧊'
      },
      {
        id: 'ci7',
        order: 7,
        name: 'Confissão Gravada',
        mystery: 'Ele confessou o crime em áudio, mas estava provadamente em outro país.',
        solution: 'Gravou a confissão antes de viajar usando IA para alterar a voz. Programou o envio automático para criar um álibi falso e despistar a investigação.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🎙️'
      },
      {
        id: 'ci8',
        order: 8,
        name: 'Impressão Digital Falsa',
        mystery: 'As impressões digitais do criminoso estavam por toda a cena, mas ele nunca esteve lá.',
        solution: 'Sua ex-esposa coletou suas impressões de objetos pessoais e as transferiu para a cena usando fita adesiva especial e silicone.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '👆'
      },
      {
        id: 'ci9',
        order: 9,
        name: 'Hora da Morte',
        mystery: 'O corpo parecia morto há horas, mas testemunhas o viram vivo depois.',
        solution: 'Foi envenenado com uma substância que simula morte temporária. "Morreu" publicamente, foi enterrado vivo e sufocou no caixão - o assassino ganhou tempo para escapar.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '⏱️'
      },
      {
        id: 'ci10',
        order: 10,
        name: 'DNA Plantado',
        mystery: 'O DNA do suspeito estava na vítima, mas eles nunca se encontraram.',
        solution: 'Um técnico forense corrupto plantou amostras antigas de DNA coletadas em outro caso. Ele foi pago para incriminar o suspeito inocente.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '🧬'
      },
      {
        id: 'ci11',
        order: 11,
        name: 'Câmera Cega',
        mystery: 'A câmera de segurança funcionava perfeitamente, mas não gravou o crime.',
        solution: 'O criminoso projetou uma imagem estática do local vazio diretamente na lente da câmera. Cometeu o crime atrás da projeção.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '📹'
      },
      {
        id: 'ci12',
        order: 12,
        name: 'Testemunha Cega',
        mystery: 'A única testemunha viu tudo claramente, mas sua descrição não bate com ninguém.',
        solution: 'A testemunha foi hipnotizada antes do crime e implantaram memórias falsas. Ela acredita ter visto um crime diferente do que realmente aconteceu.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '👁️'
      },
      {
        id: 'ci13',
        order: 13,
        name: 'Motivo Inexistente',
        mystery: 'O assassino não tinha motivo algum para matar a vítima.',
        solution: 'Era um assassino de aluguel contratado por app criptografado. Não conhecia nem o cliente nem a vítima - apenas recebeu coordenadas e pagamento.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '📍'
      },
      {
        id: 'ci14',
        order: 14,
        name: 'Suicídio Forjado',
        mystery: 'Tudo indicava suicídio, mas a vítima era canhota e a arma estava na mão direita.',
        solution: 'O assassino não sabia que ela era canhota. Essa pequena falha no staging revelou que foi homicídio disfarçado de suicídio.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '🔫'
      },
      {
        id: 'ci15',
        order: 15,
        name: 'Rastro Eletrônico',
        mystery: 'O celular do criminoso mostrava que ele estava em casa durante o crime.',
        solution: 'Deixou o celular em casa ligado no Netflix para criar rastro digital falso. Usou transporte público pagando em dinheiro para não deixar rastros.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '📶'
      },
      {
        id: 'ci16',
        order: 16,
        name: 'Veneno Invisível',
        mystery: 'A vítima foi envenenada, mas não havia veneno em seu organismo.',
        solution: 'Foi envenenada com insulina em excesso. Para um diabético, causa morte natural. O assassino não sabia que ela não tinha diabetes - a autópsia revelou a farsa.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💉'
      },
      {
        id: 'ci17',
        order: 17,
        name: 'Carta de Despedida',
        mystery: 'A carta de suicídio estava escrita à mão, mas a letra não conferia.',
        solution: 'O assassino treinou a caligrafia da vítima por meses, mas sob pressão não conseguiu replicar perfeitamente. A análise grafológica expôs a falsificação.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '✍️'
      },
      {
        id: 'ci18',
        order: 18,
        name: 'Acidente Programado',
        mystery: 'O acidente de carro parecia natural, mas foi muito conveniente.',
        solution: 'Hackeou o sistema do carro autônomo e programou a falha. Não previu que o software teria logs detalhados que revelariam a interferência externa.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🚗'
      },
      {
        id: 'ci19',
        order: 19,
        name: 'Testemunho Contraditório',
        mystery: 'Duas testemunhas viram a mesma cena, mas relataram crimes diferentes.',
        solution: 'Uma testemunha foi subornada para mentir, mas não sabia os detalhes reais. Suas mentiras não bateram com o depoimento da testemunha honesta.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '👥'
      },
      {
        id: 'ci20',
        order: 20,
        name: 'Crime Perfeito',
        mystery: 'O criminoso planejou tudo perfeitamente, mas foi pego por um detalhe ínfimo.',
        solution: 'Esqueceu de trocar a pilha do relógio da vítima. O relógio parou na hora exata da morte, contradizendo seu álibi que dependia de um horário diferente.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '⌚'
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
      },
      {
        id: 'dc4',
        order: 4,
        name: 'Operação Fantasma',
        mystery: 'Uma operação militar oficial nunca existiu nos registros.',
        solution: 'Era uma operação não-oficial financiada por fundos paralelos. Todos os registros foram destruídos para negar qualquer envolvimento governamental.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '👻'
      },
      {
        id: 'dc5',
        order: 5,
        name: 'Identidade Apagada',
        mystery: 'Um agente existe fisicamente, mas não há registros de sua existência.',
        solution: 'Sua identidade foi completamente fabricada por uma agência de inteligência. Ele acredita ser real, mas toda sua vida é uma construção para uma missão profunda.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '👤'
      },
      {
        id: 'dc6',
        order: 6,
        name: 'Código Indecifrado',
        mystery: 'Uma mensagem interceptada usa um código que ninguém consegue quebrar.',
        solution: 'O código é baseado em um livro específico que foi queimado propositalmente. Apenas três pessoas no mundo conheciam a chave - todas foram eliminadas.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🔐'
      },
      {
        id: 'dc7',
        order: 7,
        name: 'Projeto Cancelado',
        mystery: 'Um projeto de pesquisa foi cancelado abruptamente sem explicação.',
        solution: 'Os cientistas descobriram algo que não deviam saber. O projeto foi cancelado e todos os pesquisadores foram transferidos para locais diferentes para evitar comunicação.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🧪'
      },
      {
        id: 'dc8',
        order: 8,
        name: 'Diplomata Morto',
        mystery: 'Um diplomata morre em um acidente suspeito antes de uma reunião importante.',
        solution: 'Ele ia revelar acordos secretos que prejudicariam vários países. Foi eliminado por uma organização internacional que protege esses segredos.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🌍'
      },
      {
        id: 'dc9',
        order: 9,
        name: 'Satélite Silencioso',
        mystery: 'Um satélite militar para de transmitir dados sem explicação.',
        solution: 'Foi hackeado por uma potência estrangeira que está usando suas câmeras para espionagem. O governo prefere fingir que está quebrado a admitir a violação.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🛰️'
      },
      {
        id: 'dc10',
        order: 10,
        name: 'Testemunha Protegida',
        mystery: 'Uma testemunha em proteção desaparece do programa oficial.',
        solution: 'Foi transferida para um programa ainda mais secreto após descobrir que havia infiltrados no primeiro programa. Sua "morte" foi encenada.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🥸'
      },
      {
        id: 'dc11',
        order: 11,
        name: 'Eleição Hackeada',
        mystery: 'Resultados eleitorais são alterados, mas não há evidência digital.',
        solution: 'A alteração foi física: técnicos substituíram componentes das urnas por peças idênticas programadas. Os chips originais foram destruídos.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '🗳️'
      },
      {
        id: 'dc12',
        order: 12,
        name: 'Fundo Fantasma',
        mystery: 'Milhões desaparecem de um fundo governamental que oficialmente não existe.',
        solution: 'O fundo era usado para financiar operações ilegais. O dinheiro foi desviado por um funcionário que descobriu sua existência e chantageou seus superiores.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '💰'
      },
      {
        id: 'dc13',
        order: 13,
        name: 'Experimento Humano',
        mystery: 'Centenas de pessoas relatam os mesmos sintomas sem causa aparente.',
        solution: 'Foram expostas involuntariamente a um experimento químico através do fornecimento de água. O governo testava uma substância de controle mental.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🧠'
      },
      {
        id: 'dc14',
        order: 14,
        name: 'Jornalista Acidentado',
        mystery: 'Um jornalista investigativo morre em um acidente de carro suspeito.',
        solution: 'Suas freadas foram sabotadas após ele descobrir documentos sobre corrupção em alto escalão. O acidente foi programado para parecer falha mecânica.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '📰'
      },
      {
        id: 'dc15',
        order: 15,
        name: 'Arquivo Inexistente',
        mystery: 'Referências apontam para um arquivo que nunca foi criado.',
        solution: 'O arquivo foi criado, mas imediatamente classificado em um nível tão alto que foi removido de todos os sistemas. Existe apenas uma cópia física em local ultrassecreto.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '📂'
      },
      {
        id: 'dc16',
        order: 16,
        name: 'Rede de Contatos',
        mystery: 'Vários funcionários públicos se conhecem, mas negam qualquer conexão.',
        solution: 'Fazem parte de uma sociedade secreta que influencia decisões governamentais. Comunicam-se através de códigos em redes sociais aparentemente normais.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🕸️'
      },
      {
        id: 'dc17',
        order: 17,
        name: 'Orçamento Secreto',
        mystery: 'Uma verba pública é aprovada para um projeto que ninguém consegue localizar.',
        solution: 'O projeto existe, mas é camuflado como manutenção urbana. Na verdade, financia uma rede de vigilância massiva através de câmeras "decorativas".',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '💳'
      },
      {
        id: 'dc18',
        order: 18,
        name: 'Chamada Interceptada',
        mystery: 'Uma ligação entre dois ministros é gravada, mas eles negam ter se falado.',
        solution: 'A conversa aconteceu, mas ambos usavam tecnologia que deveria impedir interceptação. A gravação prova que até sistemas ultrassecretos podem ser violados.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '📞'
      },
      {
        id: 'dc19',
        order: 19,
        name: 'Cientista Desaparecido',
        mystery: 'Um pesquisador nuclear some após descobrir uma anomalia em testes.',
        solution: 'Descobriu que testes "defensivos" eram na verdade desenvolvimento de armas proibidas. Foi relocado com nova identidade para evitar vazamento internacional.',
        difficulty: 'medium',
        theme: 'danger',
        icon: '☢️'
      },
      {
        id: 'dc20',
        order: 20,
        name: 'Operação Encerrada',
        mystery: 'Uma investigação de anos é encerrada abruptamente sem explicação.',
        solution: 'A investigação chegou muito perto de revelar que o próprio chefe da operação estava envolvido no esquema. Ele encerrou tudo para proteger a si mesmo.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🚫'
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
      },
      {
        id: 'fj4',
        order: 4,
        name: 'Último Movimento',
        mystery: 'Ele tinha apenas um movimento para salvar sua vida, mas escolheu errado.',
        solution: 'Era um teste psicológico. O "erro" foi escolher salvar-se em vez de salvar o refém. Isso revelou sua verdadeira natureza e selou seu destino.',
        difficulty: 'hard',
        theme: 'power',
        icon: '⚡'
      },
      {
        id: 'fj5',
        order: 5,
        name: 'Sequência Fatal',
        mystery: 'Três pessoas morrem seguindo uma sequência matemática perfeita.',
        solution: 'O assassino seguia a sequência de Fibonacci para escolher as vítimas. A próxima vítima seria alguém com 13 letras no nome - era uma armadilha para o próprio assassino.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '🔢'
      },
      {
        id: 'fj6',
        order: 6,
        name: 'Paradoxo Temporal',
        mystery: 'A vítima morreu antes de encontrar o assassino, mas ele só decidiu matá-la depois.',
        solution: 'O assassino programou um dispositivo para matar se certas condições fossem atendidas. Quando decidiu matá-la, as condições já estavam ativas há horas.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '⏳'
      },
      {
        id: 'fj7',
        order: 7,
        name: 'Escolha Impossível',
        mystery: 'Ele teve que escolher entre salvar sua esposa ou cem desconhecidos.',
        solution: 'Era um dilema falso. Ambas as situações eram simulações. O teste real era ver se ele descobriria que estava sendo manipulado psicologicamente.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '⚖️'
      },
      {
        id: 'fj8',
        order: 8,
        name: 'Estratégia Suicida',
        mystery: 'O plano perfeito exigia que o criminoso morresse no final.',
        solution: 'Ele estava com câncer terminal e queria proteger sua família de sua dívida com criminosos. Sua morte "acidental" acionou um seguro que pagou tudo.',
        difficulty: 'medium',
        theme: 'power',
        icon: '🎭'
      },
      {
        id: 'fj9',
        order: 9,
        name: 'Traição Calculada',
        mystery: 'Ele traiu seu melhor amigo exatamente quando isso seria mais devastador.',
        solution: 'Descobriu que o "amigo" estava planejando trair ele primeiro. A traição foi preventiva - uma jogada de mestre baseada em informações privilegiadas.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🗡️'
      },
      {
        id: 'fj10',
        order: 10,
        name: 'Vitória Pírrica',
        mystery: 'Ele venceu o jogo, mas perdeu tudo que importava.',
        solution: 'O "jogo" era um teste de personalidade disfarçado. Vencer exigia abandonar seus valores morais. Ao vencer, provou ser exatamente o tipo de pessoa que a empresa não queria.',
        difficulty: 'medium',
        theme: 'power',
        icon: '👑'
      },
      {
        id: 'fj11',
        order: 11,
        name: 'Xeque-Mate Duplo',
        mystery: 'Dois jogadores deram xeque-mate simultaneamente no mesmo tabuleiro.',
        solution: 'Estavam jogando dois jogos diferentes no mesmo tabuleiro. Cada um via apenas suas próprias peças devido a lentes especiais. O "impossível" aconteceu por ilusão óptica.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '👁️'
      },
      {
        id: 'fj12',
        order: 12,
        name: 'Profecia Autorrealizável',
        mystery: 'A previsão da morte se cumpriu exatamente como previsto.',
        solution: 'A própria previsão causou os eventos que levaram à morte. A vítima tentou evitar seu destino, mas cada ação para escapar a levou mais perto do final previsto.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🔮'
      },
      {
        id: 'fj13',
        order: 13,
        name: 'Jogo Infinito',
        mystery: 'Uma partida que nunca poderia terminar, mas terminou.',
        solution: 'Os jogadores descobriram que estavam presos em um loop temporal. A única forma de escapar era um dos jogadores desistir voluntariamente - quebrando o padrão infinito.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '♾️'
      },
      {
        id: 'fj14',
        order: 14,
        name: 'Sacrifício Calculado',
        mystery: 'Ele sacrificou sua peça mais valiosa sem motivo aparente.',
        solution: 'O sacrifício não era no jogo de xadrez, mas na vida real. Perdeu propositalmente a partida para ganhar a confiança do oponente e depois roubou seus segredos.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '♛'
      },
      {
        id: 'fj15',
        order: 15,
        name: 'Regras Quebradas',
        mystery: 'O movimento era impossível pelas regras, mas aconteceu.',
        solution: 'Estavam jogando com regras secretas que apenas um conhecia. O "movimento impossível" era válido nas regras verdadeiras - uma trapaça sofisticada.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '📜'
      },
      {
        id: 'fj16',
        order: 16,
        name: 'Estratégia Emergente',
        mystery: 'A estratégia vencedora surgiu do que parecia ser uma série de erros.',
        solution: 'Cada "erro" era intencional. O jogador fingiu incompetência para que o adversário baixasse a guarda, então executou uma sequência letal de movimentos.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🧠'
      },
      {
        id: 'fj17',
        order: 17,
        name: 'Tempo Esgotado',
        mystery: 'O relógio parou exatamente quando ele ia fazer o movimento vencedor.',
        solution: 'O adversário havia programado um dispositivo para interferir no relógio. Mas não sabia que isso também invalidaria sua própria vitória pelas regras do torneio.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '⏰'
      },
      {
        id: 'fj18',
        order: 18,
        name: 'Peão Coroado',
        mystery: 'O peão mais fraco se tornou a peça decisiva.',
        solution: 'Era uma metáfora da vida real. O "peão" era um funcionário subalterno que coletou informações sobre corrupção. Quando promovido, usou tudo para derrubar o sistema.',
        difficulty: 'medium',
        theme: 'power',
        icon: '♟️'
      },
      {
        id: 'fj19',
        order: 19,
        name: 'Partida Fantasma',
        mystery: 'Dois grandes mestres jogaram uma partida que não foi registrada em lugar nenhum.',
        solution: 'A partida decidiu quem seria morto e quem sobreviveria. Ambos eram espiões rivais - o perdedor cumpriria uma missão suicida. O jogo foi sua forma "civilizada" de decidir.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '👻'
      },
      {
        id: 'fj20',
        order: 20,
        name: 'Mate do Pastor',
        mystery: 'O movimento mais básico derrotou o campeão mundial.',
        solution: 'O campeão estava dopado com substâncias que afetavam sua cognição, mas potencializavam reflexos básicos. Contra estratégias simples, ficou vulnerável - sua sofisticação virou fraqueza.',
        difficulty: 'hard',
        theme: 'investigation',
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
      },
      {
        id: 'id4',
        order: 4,
        name: 'Carta Devolvida',
        mystery: 'Uma carta de amor volta 30 anos depois para destruir um casamento.',
        solution: 'Foi escrita por um jovem apaixonado que virou carteiro. Guardou a carta décadas, esperando o momento certo para arruinar a vida de quem rejeitou seu amor.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '💌'
      },
      {
        id: 'id5',
        order: 5,
        name: 'Herança Maldita',
        mystery: 'Cada herdeiro da fortuna morre exatamente um ano após recebê-la.',
        solution: 'O patriarca envenenou as moedas de ouro da herança com uma substância que causa morte lenta. Queria se vingar da família que o abandonou na velhice.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💰'
      },
      {
        id: 'id6',
        order: 6,
        name: 'Foto Reveladora',
        mystery: 'Uma foto de família revela um crime após 20 anos.',
        solution: 'No fundo da foto, quase imperceptível, está uma criança que deveria estar morta. A família fingiu sua morte para esconder abuso - ela cresceu escondida no sótão.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '📸'
      },
      {
        id: 'id7',
        order: 7,
        name: 'Remédio Fatal',
        mystery: 'O remédio que salvou sua vida na juventude a matou na velhice.',
        solution: 'O medicamento experimental criou dependência química única. Décadas depois, quando parou de ser produzido, seu corpo entrou em colapso fatal por abstinência.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '💊'
      },
      {
        id: 'id8',
        order: 8,
        name: 'Vingança Tardia',
        mystery: 'Um homem se vinga de uma ofensa após 40 anos de planejamento.',
        solution: 'Esperou que o inimigo tivesse filhos e netos. Sua vingança foi destruir três gerações simultaneamente revelando segredos familiares cuidadosamente coletados por décadas.',
        difficulty: 'medium',
        theme: 'conspiracy',
        icon: '⏳'
      },
      {
        id: 'id9',
        order: 9,
        name: 'Sorte Azarada',
        mystery: 'Ganhar na loteria foi a pior coisa que aconteceu em sua vida.',
        solution: 'O bilhete premiado foi roubado de um criminoso perigoso. Quando os números saíram, o ladrão se tornou alvo de uma organização criminosa que rastreava o bilhete.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🎰'
      },
      {
        id: 'id10',
        order: 10,
        name: 'Mentira Salvadora',
        mystery: 'Uma mentira que deveria arruinar sua vida acabou salvando-a.',
        solution: 'Mentiu sobre estar doente para não viajar de avião. O avião caiu. Anos depois, descobriu que o pai sabia da tragédia antecipadamente e plantou a "mentira" para salvá-la.',
        difficulty: 'medium',
        theme: 'mystery',
        icon: '✈️'
      },
      {
        id: 'id11',
        order: 11,
        name: 'Troca de Bebês',
        mystery: 'Duas famílias descobrem que criaram os filhos errados por 18 anos.',
        solution: 'A troca foi intencional. Uma enfermeira vingativa trocou os bebês de famílias ricas e pobres para "equilibrar" as injustiças sociais. O tempo revelou sua experiência social.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '👶'
      },
      {
        id: 'id12',
        order: 12,
        name: 'Conselho Mortal',
        mystery: 'Seguir o conselho de um estranho levou à morte.',
        solution: 'O "estranho" era um assassino que estudava suas vítimas. Dava conselhos aparentemente úteis que levavam as pessoas a situações fatais. Cada conselho era uma armadilha disfarçada.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '💀'
      },
      {
        id: 'id13',
        order: 13,
        name: 'Presente Envenenado',
        mystery: 'O presente de aniversário mais desejado se tornou uma maldição.',
        solution: 'Era um relógio antigo radioativo. O doador não sabia, mas um relojoeiro descobriu que era feito com rádio luminoso. Décadas de uso causaram câncer lento e doloroso.',
        difficulty: 'medium',
        theme: 'danger',
        icon: '🎁'
      },
      {
        id: 'id14',
        order: 14,
        name: 'Amor Cego',
        mystery: 'Ela se apaixonou pela voz ao telefone, mas nunca se encontraram.',
        solution: 'Era um sequestrador que ligava para suas vítimas antes dos crimes. Desenvolveu obsessão por uma delas e mantinha contato. Quando se encontraram, ela descobriu a verdade terrível.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '📞'
      },
      {
        id: 'id15',
        order: 15,
        name: 'Segredo de Família',
        mystery: 'Descobrir a verdade sobre sua origem destruiu três gerações.',
        solution: 'Descobriu que foi adotada após seus pais "verdadeiros" assassinarem sua família biológica. A busca pelas origens revelou que vivia com os próprios assassinos há décadas.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🧬'
      },
      {
        id: 'id16',
        order: 16,
        name: 'Destino Trocado',
        mystery: 'Duas pessoas trocaram de vida completamente por acaso.',
        solution: 'Um erro no hospital trocou suas pulseiras de identificação. Uma estava marcada para cirurgia simples, outra para procedimento arriscado. A troca mudou seus destinos para sempre.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🏥'
      },
      {
        id: 'id17',
        order: 17,
        name: 'Profecia Cumprida',
        mystery: 'Uma cigana previu sua morte e ela aconteceu exatamente como previsto.',
        solution: 'A "cigana" era uma assassina que estudava suas vítimas e planejava suas mortes. As "previsões" eram na verdade planos de assassinato disfarçados de misticismo.',
        difficulty: 'easy',
        theme: 'murder',
        icon: '🔮'
      },
      {
        id: 'id18',
        order: 18,
        name: 'Erro Médico',
        mystery: 'O erro médico que quase a matou acabou curando uma doença fatal.',
        solution: 'A medicação errada reagiu quimicamente com um tumor que os médicos não haviam detectado. O "erro" criou uma reação que destruiu o câncer antes que fosse descoberto.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '💉'
      },
      {
        id: 'id19',
        order: 19,
        name: 'Último Desejo',
        mystery: 'Cumprir o último desejo de um moribundo trouxe consequências terríveis.',
        solution: 'O "moribundo" era um criminoso fingindo estar à morte. Seu "último desejo" foi entregar uma carta que na verdade era um código para ativar uma célula terrorista.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '📝'
      },
      {
        id: 'id20',
        order: 20,
        name: 'Círculo Fechado',
        mystery: 'Após 50 anos, ela descobriu que estava no mesmo lugar onde tudo começou.',
        solution: 'Fugiu de casa criança para escapar de abuso. Após décadas, comprou uma casa para viver seus últimos anos. Era a mesma casa de onde fugiu - agora herdada do próprio abusador.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🔄'
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
      },
      {
        id: 'pm4',
        order: 4,
        name: 'Elevador Infinito',
        mystery: 'O elevador sobe infinitamente, mas o prédio tem apenas 20 andares.',
        solution: 'Foi reprogramado por um engenheiro louco que criou um loop nos sensores. As pessoas ficavam presas em movimento perpétuo entre os andares 19 e 20.',
        difficulty: 'hard',
        theme: 'mystery',
        icon: '🛗'
      },
      {
        id: 'pm5',
        order: 5,
        name: 'Sombra Sem Dono',
        mystery: 'Uma sombra caminha pelas ruas, mas não há ninguém projetando-a.',
        solution: 'Um assassino usa um projetor portátil de sombras para distrair vítimas. Enquanto olham a "sombra impossível", ele ataca pelas costas.',
        difficulty: 'hard',
        theme: 'murder',
        icon: '👤'
      },
      {
        id: 'pm6',
        order: 6,
        name: 'Espelho Temporal',
        mystery: 'Um espelho mostra o que aconteceu 5 minutos no passado.',
        solution: 'É um monitor disfarçado reproduzindo gravações com delay. Alguém instalou câmeras ocultas e usa o truque para prever movimentos das vítimas.',
        difficulty: 'medium',
        theme: 'investigation',
        icon: '🪞'
      },
      {
        id: 'pm7',
        order: 7,
        name: 'Porta Que Some',
        mystery: 'Uma porta existe durante o dia, mas desaparece à noite.',
        solution: 'É uma parede móvel controlada remotamente. Durante o dia, criminosos usam o acesso secreto. À noite, fecham a passagem para esconder evidências.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🚪'
      },
      {
        id: 'pm8',
        order: 8,
        name: 'Telefone do Além',
        mystery: 'Um telefone público recebe ligações de pessoas mortas há anos.',
        solution: 'Um hacker descobriu como acessar gravações antigas de conversas telefônicas e as reproduz no telefone. Usa isso para chantagear famílias das vítimas.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '☎️'
      },
      {
        id: 'pm9',
        order: 9,
        name: 'Escada Paradoxal',
        mystery: 'Subindo sempre pela mesma escada, você chega onde começou.',
        solution: 'É uma escada rolante circular oculta. Arquitetos criminosos criaram uma ilusão arquitetônica para desorientar testemunhas e facilitar fugas.',
        difficulty: 'hard',
        theme: 'investigation',
        icon: '🪜'
      },
      {
        id: 'pm10',
        order: 10,
        name: 'Chuva Seletiva',
        mystery: 'Chove apenas em uma pessoa específica, mesmo em dia ensolarado.',
        solution: 'Um perseguidor usa drones microscópicos para borrifar água na vítima. É uma forma de tortura psicológica antes do ataque final.',
        difficulty: 'medium',
        theme: 'thriller',
        icon: '🌧️'
      },
      {
        id: 'pm11',
        order: 11,
        name: 'Multidão Fantasma',
        mystery: 'Centenas de pessoas aparecem em uma rua vazia e somem em segundos.',
        solution: 'É um holograma projetado por criminosos para criar confusão durante um assalto próximo. A "multidão" distrai testemunhas e polícia.',
        difficulty: 'easy',
        theme: 'crime',
        icon: '👥'
      },
      {
        id: 'pm12',
        order: 12,
        name: 'Tempo Congelado',
        mystery: 'Por 10 minutos, todos os relógios da cidade param simultaneamente.',
        solution: 'Hackers atacaram a rede de sincronização de horário para criar uma janela temporal perfeita para um crime. Durante o "tempo congelado", ninguém sabia a hora exata.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '⏰'
      },
      {
        id: 'pm13',
        order: 13,
        name: 'Voz Eterna',
        mystery: 'Uma voz ecoa pelas ruas pedindo ajuda, mas nunca encontram a fonte.',
        solution: 'É uma gravação de uma vítima já morta, reproduzida em alto-falantes ocultos. O assassino usa isso para atrair mais vítimas ao local do primeiro crime.',
        difficulty: 'medium',
        theme: 'murder',
        icon: '🔊'
      },
      {
        id: 'pm14',
        order: 14,
        name: 'Gravidade Invertida',
        mystery: 'Objetos caem para cima em um quarteirão específico da cidade.',
        solution: 'Magnetos industriais ocultos sob o asfalto foram instalados por ladrões. Atraem objetos metálicos "para cima" criando distração para roubar pessoas confusas.',
        difficulty: 'hard',
        theme: 'crime',
        icon: '🧲'
      },
      {
        id: 'pm15',
        order: 15,
        name: 'Labirinto Urbano',
        mystery: 'As ruas de um bairro mudam de configuração toda noite.',
        solution: 'Placas de rua são trocadas por uma gangue que controla o território. Modificam sinalizações para confundir rivais e facilitar suas operações ilegais.',
        difficulty: 'medium',
        theme: 'crime',
        icon: '🗺️'
      },
      {
        id: 'pm16',
        order: 16,
        name: 'Pessoa Transparente',
        mystery: 'Câmeras de segurança mostram uma pessoa completamente transparente cometendo crimes.',
        solution: 'É um criminoso usando um traje experimental de camuflagem óptica. A tecnologia militar vazada permite invisibilidade quase perfeita.',
        difficulty: 'hard',
        theme: 'theft',
        icon: '👻'
      },
      {
        id: 'pm17',
        order: 17,
        name: 'Eco Infinito',
        mystery: 'Um grito ecoa para sempre em um túnel, mesmo depois que a pessoa se foi.',
        solution: 'O túnel foi modificado com tecnologia de cancelamento de ruído invertida. Amplifica e perpetua sons específicos para torturar psicologicamente inimigos.',
        difficulty: 'easy',
        theme: 'investigation',
        icon: '🔄'
      },
      {
        id: 'pm18',
        order: 18,
        name: 'Idade Reversa',
        mystery: 'Uma pessoa envelhece ao contrário: fica mais jovem a cada dia.',
        solution: 'É uma cobaia de experimentos médicos ilegais com células-tronco. O tratamento experimental reverteu o envelhecimento, mas está matando-a lentamente.',
        difficulty: 'hard',
        theme: 'danger',
        icon: '🧬'
      },
      {
        id: 'pm19',
        order: 19,
        name: 'Memória Coletiva',
        mystery: 'Toda uma cidade lembra de eventos que nunca aconteceram.',
        solution: 'Experimento de controle mental através da água potável. Uma substância química implanta falsas memórias coletivas para encobrir crimes reais do passado.',
        difficulty: 'hard',
        theme: 'conspiracy',
        icon: '🧠'
      },
      {
        id: 'pm20',
        order: 20,
        name: 'Realidade Duplicada',
        mystery: 'Duas versões da mesma cidade existem simultaneamente no mesmo espaço.',
        solution: 'Realidade virtual avançada projetada em lentes de contato especiais. Criminosos criaram uma "cidade fantasma" para confundir vítimas e executar crimes perfeitos na confusão entre real e virtual.',
        difficulty: 'hard',
        theme: 'thriller',
        icon: '🌍'
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
        solution: 'O criminoso trabalha no turno da noite e conhece as rotas de patrulha.',
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
