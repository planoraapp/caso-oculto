
import { supabase } from '../integrations/supabase/client';
import { Pack, Case } from '../data/types';

// Helper function to map emoji difficulty to string
const mapEmojiToDifficulty = (emoji: string): 'easy' | 'medium' | 'hard' => {
  switch (emoji) {
    case '🟢': return 'easy';
    case '🟡': return 'medium';
    case '🔴': return 'hard';
    default: return 'medium';
  }
};

// Specific cases for "Sussurros do Além" pack
const generateSussurrosDoAlemCases = (packId: string): Case[] => {
  const cases = [
    { title: 'O Reflexo Atrasado', emoji: '🔴', mystery: 'Durante uma tempestade, um homem vê o seu próprio reflexo na janela, mas o reflexo sorri um segundo antes de ele o fazer. Ele morre de ataque cardíaco.', solution: 'Não era o seu reflexo. O seu irmão gémeo, de quem não tinha notícias há anos, estava do lado de fora na varanda, prestes a fazer uma pegadinha. O choque do reencontro inesperado foi fatal.' },
    { title: 'A Frequência Perdida', emoji: '🟡', mystery: 'Um rádio antigo, desligado da tomada, começa a transmitir uma mensagem de socorro de um navio que desapareceu há 50 anos.', solution: 'O rádio continha um cristal de galena, usado nos primeiros rádios, que pode captar ondas de rádio sem uma fonte de energia externa. Ele estava a captar uma transmissão de um grupo de teatro radiofónico que reencenava o famoso desastre naval.' },
    { title: 'Lágrimas de Sal', emoji: '🔴', mystery: 'Um quadro de uma mulher a chorar, herdado por uma família, começa a verter lágrimas reais sempre que chove.', solution: 'O artista, para criar uma textura única, misturou sal na tinta. O sal é higroscópico e absorve a umidade do ar. Em dias de chuva, a umidade acumulada condensa e escorre pela pintura.' },
    { title: 'A Sauna Gelada', emoji: '🔴', mystery: 'Um homem é encontrado morto, congelado, dentro de uma sauna de luxo trancada por dentro.', solution: 'A sauna estava instalada num navio de cruzeiro que navegava no Ártico. Ocorreu uma falha de energia geral no navio. O aquecimento da sauna desligou-se, e o quarto, sem isolamento para o frio extremo, tornou-se um congelador.' },
    { title: 'O Peso Invisível', emoji: '🟡', mystery: 'Um casal acorda todas as manhãs com a sensação de que alguém esteve sentado na beira da sua cama, pois o colchão está afundado nesse ponto.', solution: 'O seu gato, que dorme na cama durante a noite sem que eles saibam, sai da cama antes de eles levantarem, todas as manhãs. O peso do gato, concentrado num ponto, cria a impressão no colchão de espuma com memória.' },
    { title: 'O Eco da Caverna', emoji: '🔴', mystery: 'Um explorador entra numa caverna e começa a ouvir os seus próprios pensamentos a serem sussurrados de volta para ele. Ele enlouquece.', solution: 'A caverna tinha uma acústica única que causava um fenómeno raro chamado "audição por pareidolia". Os sons da água a pingar eram distorcidos e refletidos de tal forma que o cérebro dele os interpretava como palavras, moldando-os com base nos seus próprios pensamentos ansiosos.' },
    { title: 'A Linha Cruzada', emoji: '🟡', mystery: 'Um telefone antigo e desligado numa casa abandonada toca uma vez por ano, no aniversário da morte do antigo proprietário.', solution: 'O telefone está ligado a uma linha cruzada com o sistema de alarme de uma fábrica próxima. A fábrica faz um teste anual ao sistema, que envia um pulso elétrico pela linha exatamente no mesmo dia.' },
    { title: 'A Sombra Protetora', emoji: '🟡', mystery: 'Todas as plantas no jardim de uma mulher morrem, exceto as que estão na sombra de uma estátua. Ela acredita que a estátua é protetora.', solution: 'O seu vizinho, irritado com ela, estava a pulverizar o jardim dela com herbicida durante a noite. As plantas na sombra da estátua foram as únicas que não foram atingidas pelo spray.' },
    { title: 'O Papel Instável', emoji: '🔴', mystery: 'Numa fotografia de família antiga, guardada numa gaveta, a imagem da casa ao fundo desapareceu completamente, deixando apenas as pessoas a flutuar num vazio branco.', solution: 'A fotografia era uma montagem. A imagem da família foi impressa em papel fotográfico de alta qualidade, mas o fundo (a casa) foi impresso em papel barato com químicos instáveis. Com o tempo, a imagem da casa degradou-se e desvaneceu-se completamente.' },
    { title: 'O Canto Assombrado', emoji: '🟢', mystery: 'Um cão late freneticamente para um canto vazio da sala todas as noites. Os donos temem que seja um fantasma.', solution: 'Um dispositivo ultrassónico para afastar roedores, instalado pelos vizinhos do apartamento ao lado, estava a funcionar mal e a emitir um som agudo que só o cão conseguia ouvir.' },
    { title: 'A Nuvem de Esporos', emoji: '🔴', mystery: 'Um mergulhador a explorar um galeão naufragado encontra um baú. Ao abri-lo, uma nuvem de "fumo" preto sai e ele morre instantaneamente.', solution: 'O baú não continha tesouro, mas sim milhares de esporos marinhos raros e dormentes. A súbita mudança de pressão e a exposição ao oxigénio fizeram com que os esporos libertassem uma neurotoxina potente e fatal.' },
    { title: 'O Vulto no Corredor', emoji: '🟡', mystery: 'Câmaras de segurança de um hospital antigo registram um vulto escuro flutuando pelo corredor todas as noites às 3:33 da manhã.', solution: 'É a sombra de um galho de árvore do lado de fora, que só é projetada para dentro quando o farol de um trem noturno passa num ângulo muito específico.' },
    { title: 'O Legado Tóxico', emoji: '🔴', mystery: 'Um homem herda uma mansão e é encontrado morto em frente a um retrato do seu falecido tio. A causa da morte foi envenenamento.', solution: 'O tio, um químico, sabia que o sobrinho ganancioso o queria ver morto pela herança. Antes de morrer, ele misturou um composto volátil e tóxico na tinta do seu autorretrato, prevendo que o sobrinho passaria horas a admirá-lo. Com o tempo, o gás libertado tornou o ar da sala venenoso.' },
    { title: 'O Lamento da Mansão', emoji: '🟡', mystery: 'Uma casa antiga emite gemidos e lamentos assustadores sempre que o vento sopra forte.', solution: 'O sistema de canalização antigo e parcialmente oco da casa tem fissuras em locais específicos. Quando o vento sopra num determinado ângulo, funciona como uma flauta gigante.' },
    { title: 'A Porta Secreta', emoji: '🟢', mystery: 'Numa sessão espírita, todos sentem um "toque gelado" quando o "espírito" é invocado.', solution: 'O médium, que é uma fraude, senta-se sempre perto de uma porta. No momento certo, ele abre-a ligeiramente, criando uma corrente de ar frio.' },
    { title: 'O Retrato que chora sangue', emoji: '🔴', mystery: 'Um retrato antigo de um general começa a "chorar" um líquido vermelho e espesso, que se assemelha a sangue.', solution: 'O retrato estava pendurado numa parede que fazia fronteira com uma adega de vinhos. Uma pequena fissura na parede, atrás do quadro, permitia que o vinho tinto de um barril com uma fuga lenta se infiltrasse e escorresse pela tela.' },
    { title: 'Os Inquilinos Secretos', emoji: '🟡', mystery: 'Objetos voam e portas batem no sótão de uma casa. Os donos acreditam que está assombrada.', solution: 'Um grupo de guaxinins entrou no sótão e fez dele o seu lar. Estavam a lutar por território, derrubando objetos e causando todo o barulho.' },
    { title: 'O Sabão Invisível', emoji: '🟡', mystery: 'Após um banho quente, uma mensagem ameaçadora ("Estou a ver-te") aparece escrita no espelho embaçado do banheiro.', solution: 'Alguém escreveu a mensagem no espelho antes com um sabonete. A escrita é invisível quando o espelho está seco, mas repele a condensação, revelando a mensagem quando o vidro embaça.' },
    { title: 'As mãos que brilham', emoji: '🔴', mystery: 'Um explorador numa caverna vê pegadas de mãos brilhantes nas paredes que parecem mover-se. Ele segue-as e nunca mais é visto.', solution: 'As "pegadas" eram uma espécie de fungo bioluminescente que reage ao dióxido de carbono. Ao respirar, o explorador ativava novos focos de fungos mais à frente, que o atraíram para as profundezas da caverna até ele se perder.' },
    { title: 'O Abraço Inesperado', emoji: '🟡', mystery: 'Um homem sobrevive a um acidente de carro terrível sem um único arranhão. Ele jura que sentiu "algo" a segurá-lo com força.', solution: 'O airbag do seu carro, que ele não sabia que existia (era um modelo antigo extra raro), funcionou perfeitamente, amortecendo o impacto.' }
  ];

  return cases.map((caseData, index) => ({
    id: `${packId}-case-${index + 1}`,
    order: index + 1,
    mystery: caseData.mystery,
    solution: caseData.solution,
    difficulty: mapEmojiToDifficulty(caseData.emoji),
    theme: 'supernatural' as any,
    name: caseData.title,
    icon: 'ghost',
    title: caseData.title,
    description: `Um mistério sobrenatural para ser desvendado`,
    image: `/lovable-uploads/pack${(index % 5) + 1}/case${index + 1}.png`,
    isFree: index === 0
  }));
};

// Specific cases for "Sombras da Noite" pack
const generateSombrasDaNoiteCases = (packId: string): Case[] => {
  const cases = [
    { title: 'O Grito no Pátio', emoji: '🟢', mystery: 'Um vigia noturno ouve um grito, corre para o pátio de uma construção e encontra um homem morto. A polícia conclui que foi suicídio, pois nenhuma arma foi encontrada.', solution: 'O homem era um limpador de janelas de arranha-céus. Ele escorregou da sua plataforma durante o turno da noite, gritou e caiu para a morte. A "arma" foi a gravidade.' },
    { title: 'A sombra na parede', emoji: '🟡', mystery: 'Um homem vê uma sombra disforme a mover-se na parede do seu quarto todas as noites. Uma noite, ele atira contra a sombra e mata o seu vizinho.', solution: 'Ele morava ao lado de um cinema drive-in. A "sombra" era a projeção distorcida do filme na sua parede. Naquela noite, passava um filme de terror, e ele confundiu a sombra de um ator com um intruso real. A bala atravessou a parede fina.' },
    { title: 'Sistema a laser', emoji: '🟢', mystery: 'Um ladrão invade uma casa à noite. Ele vê uma pequena luz vermelha a dançar pelas paredes e foge, pensando que é um sistema de alarme a laser. Ele é apanhado logo em seguida.', solution: 'A "luz" era o ponteiro laser de um brinquedo de gato automático que se ligava à noite. O ladrão foi apanhado porque, na sua fuga apressada, tropeçou e deixou cair a sua carteira no jardim.' },
    { title: 'A Luz', emoji: '🟡', mystery: 'Todas as noites, um homem desliga as luzes de seu lar para dormir, exceto uma. Certa noite, ele desliga todas e morre.', solution: 'Ele era da Marinha e vivia num submarino. A luz que ele desligou por engano era a que indicava o nível crítico de oxigênio. Ele morreu sufocado.' },
    { title: 'A Voz do outro lado', emoji: '🟡', mystery: 'Um homem morre sozinho num quarto de hotel trancado por dentro. Minutos depois, pessoas no corredor ouvem uma voz pedindo ajuda.', solution: 'Ele estava numa chamada de vídeo com a sua família. Sofreu um ataque cardíaco súbito e caiu. A chamada continuou ativa, e a sua família, ao vê-lo caído, começou a gritar por ajuda através do viva-voz.' },
    { title: 'O Fone de Ouvido', emoji: '🔴', mystery: 'Um DJ famoso morre no meio da sua apresentação numa boate escura e lotada. Ninguém percebeu até as luzes se acenderem.', solution: 'Ele usava fones com cancelamento de ruído. Um curto-circuito no equipamento de som causou uma descarga elétrica fatal através dos fones. O set pronto continuou tocando.' },
    { title: 'Quase lá', emoji: '🟡', mystery: 'Um homem é encontrado morto de hipotermia na porta de sua própria casa numa noite de nevoeiro cerrado.', solution: 'O nevoeiro era tão denso que, ao chegar em casa, ele não conseguiu encontrar a fechadura da porta. Passou horas tentando, não conseguiu, e a poucos metros de um abrigo acabou por sucumbir ao frio.' },
    { title: 'O Telescópio Solitário', emoji: '🔴', mystery: 'Um astrônomo amador morre em seu quintal enquanto observava as estrelas. Sua cabeça está esmagada.', solution: 'Um pequeno meteorito, do tamanho de um punho, caiu exatamente sobre ele.' },
    { title: 'O Alarme da Vida', emoji: '🟡', mystery: 'Um homem morre de medo em seu próprio quarto durante uma falha de energia.', solution: 'Ele tinha uma condição cardíaca grave e usava um dispositivo médico que dependia de eletricidade. Quando a energia falhou, o alarme do dispositivo soou no escuro, e o susto provocou-lhe um ataque cardíaco fatal.' },
    { title: 'A Primeira Sombra', emoji: '🟢', mystery: 'Um explorador de cavernas é encontrado morto logo na entrada da caverna, com todo o seu equipamento intacto.', solution: 'Ele era extremamente supersticioso e tinha medo do escuro. Quando sua lanterna falhou na entrada, ele entrou em pânico e teve um ataque de asma fatal. Ele nunca chegou a entrar na escuridão.' },
    { title: 'O Teste do Rádio', emoji: '🟡', mystery: 'Um homem é encontrado morto em seu jardim durante a noite. A única pista é um rádio tocando música clássica.', solution: 'Ele estava tentando roubar cabos de cobre de um poste elétrico próximo. Usou o rádio para testar se a corrente estava ligada. Estava.' },
    { title: 'Travessia Equivocada', emoji: '🟡', mystery: 'Numa cidade sem luzes, um homem morre ao atravessar a rua.', solution: 'Ele era cego e confiava no som dos semáforos para atravessar. Durante um apagão geral, os sinais sonoros falharam e ele foi atropelado.' },
    { title: 'O Guardião do Museu', emoji: '🔴', mystery: 'Um segurança de museu é encontrado morto em frente a um quadro famoso. As câmeras mostram que ninguém entrou ou saiu da sala.', solution: 'O quadro emitia uma quantidade mínima de radiação (de um pigmento antigo). Ao longo de anos trabalhando no turno da noite, sempre perto daquele quadro, a exposição acumulada foi fatal.' },
    { title: 'A Luz do Espetáculo', emoji: '🔴', mystery: 'Um homem morre a ver fogos de artifício da sua varanda.', solution: 'Ele era um espião. O fogo de artifício era um sinal combinado para um atirador de elite, que estava posicionado num prédio distante. O clarão do fogo de artifício iluminou-o, fazendo dele um alvo fácil.' },
    { title: 'A Onda de Choque', emoji: '🔴', mystery: 'Uma mulher morre na cama durante uma tempestade. A janela está partida.', solution: 'A mudança de pressão atmosférica causada por um relâmpago próximo fez uma garrafa de perfume de vidro na sua mesa de cabeceira explodir. Um estilhaço de vidro atingiu-a numa artéria.' },
    { title: 'O Pão da Manhã', emoji: '🟡', mystery: 'Um padeiro é encontrado morto na sua padaria antes do amanhecer.', solution: 'Houve uma fuga de gás durante a noite. Ele não sentiu o cheiro porque tinha perdido o olfato devido a uma forte gripe. Ao ligar o forno, a faísca consumiu o oxigênio restante.' },
    { title: 'Mergulho no Escuro', emoji: '🟡', mystery: 'Um carro é encontrado no fundo de um lago com as luzes acesas. O motorista está morto na margem.', solution: 'Ele conduziu para dentro do lago por engano numa noite escura. Conseguiu sair do carro e nadar até à margem, mas morreu de hipotermia antes de conseguir pedir ajuda.' },
    { title: 'O Leitor Descuidado', emoji: '🔴', mystery: 'Um homem morre de ataque cardíaco enquanto lê um livro à luz de uma vela.', solution: 'Uma corrente de ar apagou a vela. No escuro, ele tropeçou e deixou cair o seu livro extremamente raro e valioso na lareira acesa. O choque de ver a sua posse mais valiosa a ser destruída causou o ataque cardíaco.' },
    { title: 'O Terror da Mente', emoji: '🟡', mystery: 'Um homem acorda a meio da noite e vê um vulto em seu quarto. Ele não se mexe e morre.', solution: 'Ele sofria de paralisia do sono. O vulto era uma alucinação comum nesse estado. O pânico extremo, combinado com a incapacidade de se mover ou gritar, levou a uma paragem cardíaca.' },
    { title: 'O Altímetro Apagado', emoji: '🟡', mystery: 'Numa noite sem lua, um homem salta de um penhasco e morre.', solution: 'Ele era um praticante de "base jumping" noturno. O seu altímetro, que não tinha luz de fundo, falhou e ele abriu o paraquedas tarde demais.' }
  ];

  return cases.map((caseData, index) => ({
    id: `${packId}-case-${index + 1}`,
    order: index + 1,
    mystery: caseData.mystery,
    solution: caseData.solution,
    difficulty: mapEmojiToDifficulty(caseData.emoji),
    theme: 'mystery' as any,
    name: caseData.title,
    icon: 'moon',
    title: caseData.title,
    description: `Um mistério noturno para ser desvendado`,
    image: `/lovable-uploads/pack${(index % 5) + 1}/case${index + 1}.png`,
    isFree: index === 0
  }));
};

// Specific cases for "Crimes Imperfeitos" pack
const generateCrimesImperfeitosCases = (packId: string): Case[] => {
  const cases = [
    { title: 'Mão Única', emoji: '🟢', mystery: 'Um ladrão rouba uma joalheria, mas é apanhado porque deixou para trás uma única luva.', solution: 'Ele era maneta e usava um gancho. A polícia encontrou a luva da mão direita no balcão e deduziu que o ladrão só tinha a mão esquerda, uma característica muito específica.' },
    { title: 'Crime no Escuro', emoji: '🟡', mystery: 'Um assassino mata a sua vítima com um tiro. Ele limpa todas as suas impressões digitais, mas a polícia sabe quem ele é por causa do interruptor que ele não tocou.', solution: 'A vítima era cega. O assassino desligou a luz, algo que só alguém que não conhecia a rotina da vítima faria. Fato que facilitou a busca policial.' },
    { title: 'O Detalhe Oculto', emoji: '🔴', mystery: 'Um falsificador troca um quadro num museu por uma cópia. Ele é apanhado porque a sua cópia era "perfeita demais".', solution: 'A pintura original tinha uma falha conhecida, um "pentimento" (uma pintura anterior por baixo da camada visível) que só era detectável com raios-x. A cópia dele não tinha essa falha.' },
    { title: 'O Sabor do Crime', emoji: '🟡', mystery: 'Dois ladrões roubam um banco. Um deles é apanhado porque comprou um picolé.', solution: 'O picolé era de uma marca rara vendida apenas numa loja ao lado do banco. As câmeras da loja de picolés o filmaram sem máscara, minutos antes do assalto.' },
    { title: 'Amostra de azar', emoji: '🟢', mystery: 'Um ladrão azarado invade uma casa para roubar. Ele sai de mãos abanando e é preso no dia seguinte.', solution: 'Ele teve uma crise alérgica tão forte que espirrou por toda a casa, deixando amostras de DNA por todo o lado. A polícia recolheu as amostras e o identificou.' },
    { title: 'Voo Atrasado', emoji: '🟡', mystery: 'Um grande contrabandista estava acostumado a esconder seus diamantes e sair ileso. Um atraso acabou com todos os seus planos.', solution: 'Ele escondia seus diamantes em cubos de gelo, em seu Drink. Devido ao atraso, o gelo derreteu completamente antes de ele chegar à alfândega. Os diamantes estavam no fundo do copo, à vista de todos.' },
    { title: 'Remetente Curioso', emoji: '🟢', mystery: 'Um assassino envia uma carta-bomba ao seu inimigo. A bomba não explode e o assassino é preso.', solution: 'Ele não colocou selos suficientes na carta. A carta foi devolvida ao remetente. Curioso, ele a abriu.' },
    { title: 'Conexão Instável', emoji: '🔴', mystery: 'Um hacker invade o sistema de um banco. Mesmo com sua experiência, um deslize o entregou à policia.', solution: 'Ele usava uma VPN para esconder seu IP. Ele estava no interior e sua internet caiu e se reconectou, sua transferência continuou por uma fração de segundo com seu IP real exposto, o que foi suficiente para localizá-lo.' },
    { title: 'Estilo Inconfundível', emoji: '🟡', mystery: 'Um ladrão usa um disfarce perfeito, mas é identificado pela forma como corre.', solution: 'Ele era um atleta olímpico famoso que tinha um estilo de corrida muito característico. Um policial, fã de esporte, o reconheceu nas filmagens de vigilância.' },
    { title: 'O Vizinho Barulhento', emoji: '🟡', mystery: 'Um assassino comete o crime perfeito e foge. Semanas depois, ele confessa tudo à polícia. Por quê?', solution: 'Ele matou seu vizinho barulhento. Após o crime, o silêncio tornou-se tão absoluto e enlouquecedor que ele não aguentou e confessou para poder ter um companheiro de cela com quem conversar.' },
    { title: 'Quase uma carona', emoji: '🟢', mystery: 'Um ladrão de carros rouba um modelo de luxo e o abandona a poucos quarteirões de distância.', solution: 'O carro era elétrico e ele não sabia onde o carregar. A bateria acabou e o localizador GPS do carro o entregou.' },
    { title: 'Água especial', emoji: '🔴', mystery: 'Um assassino usa um veneno que não deixa rastro. Ele é apanhado por causa da água que a vítima bebeu.', solution: 'A vítima era uma provadora de água profissional com um paladar extremamente apurado. Antes de morrer, ela escreveu uma nota dizendo que a água tinha um "sabor metálico sutil", o que levou a polícia a encontrar o veneno.' },
    { title: 'O Lanche do Ladrão', emoji: '🟢', mystery: 'Um ladrão entra numa casa e não rouba nada, mas é preso por roubo.', solution: 'Ele comeu um iogurte muito caro e raro que estava na geladeira. O dono da casa deu queixa do roubo do iogurte, e a polícia encontrou as impressões digitais do ladrão no recipiente.' },
    { title: 'A Prova de Ouro', emoji: '🟡', mystery: 'Um espião troca uma mala secreta por uma idêntica. Ele é apanhado porque a mala que ele levou era mais leve.', solution: 'A mala original continha documentos e uma barra de ouro para equilibrar o peso. A diferença de peso alertou o outro agente.' },
    { title: 'O Carro da Esposa', emoji: '🟢', mystery: 'Um homem planeia matar sua esposa sabotando o carro dela. Em vez disso, ele é quem morre.', solution: 'Ele cortou os freios. Ela pediu-lhe para ir ao supermercado com o carro dela, pois o dele estava bloqueando a saída. Ele se esqueceu da própria sabotagem.' },
    { title: 'O Vizinho Vigilante', emoji: '🟢', mystery: 'Um ladrão desativa as câmeras de segurança, mas é filmado da mesma forma.', solution: 'Ele não sabia que o vizinho da frente tinha uma câmera na campainha que filmava a entrada da casa que ele estava roubando.' },
    { title: 'Queda livre', emoji: '🟡', mystery: 'Um assassino usa um drone para cometer um crime. Ele é apanhado e perde seu drone.', solution: 'Uma águia atacou o drone em pleno voo, fazendo-o cair. O drone tinha um número de série registrado no nome do assassino.' },
    { title: 'Não é esse!', emoji: '🔴', mystery: 'Um ladrão rouba um artefato de um museu, substituindo-o por uma réplica. É apanhado porque a réplica esqueceu não tinha um detalhe.', solution: 'O curador notou que a réplica estava impecavelmente limpa. O original, selado há anos, deveria ter uma fina camada de pó microscópico.' },
    { title: 'O Cartão Rastreável', emoji: '🟢', mystery: 'Um criminoso foge da polícia e se esconde num cinema. Ele quis se misturar aos clientes, mas não deu certo.', solution: 'Ele pagou uma pipoca com um cartão de crédito roubado. A polícia estava monitorando as transações do cartão.' },
    { title: 'O Álibi de Vidro', emoji: '🔴', mystery: 'Um homem comete um assalto e tem um álibi perfeito: estava fazendo uma transmissão ao vivo para milhares de pessoas.', solution: 'Durante a transmissão, um reflexo nos seus óculos mostrou brevemente a sua localização real, que era a cena do crime.' }
  ];

  return cases.map((caseData, index) => ({
    id: `${packId}-case-${index + 1}`,
    order: index + 1,
    mystery: caseData.mystery,
    solution: caseData.solution,
    difficulty: mapEmojiToDifficulty(caseData.emoji),
    theme: 'crime' as any,
    name: caseData.title,
    icon: 'fingerprint',
    title: caseData.title,
    description: `Um crime imperfeito para ser desvendado`,
    image: `/lovable-uploads/pack${(index % 5) + 1}/case${index + 1}.png`,
    isFree: index === 0
  }));
};

// Specific cases for "Lendas Urbanas" pack
const generateLendasUrbanasCases = (packId: string): Case[] => {
  const cases = [
    { title: 'O Casaco no Banco de Trás', emoji: '🟢', mystery: 'Um homem dá carona a uma jovem numa estrada deserta. No dia seguinte, encontra o casaco dela no seu carro, mas descobre que ela morreu há 20 anos.', solution: 'A "jovem" era a neta da falecida, que se vestiu como a avó para fazer uma pegadinha, usando uma história famosa para assustar o motorista.' },
    { title: 'O Piscar de Faróis', emoji: '🟡', mystery: 'Uma mulher é seguida por um caminhão que não parava de piscar os faróis para ela. Ao chegar à casa, o caminhoneiro a aborda.', solution: 'O caminhoneiro via um homem com uma faca escondido no banco de trás do carro dela. Cada vez que o homem se levantava, ele piscava os faróis para o assustar.' },
    { title: 'O Ritual Perigoso', emoji: '🔴', mystery: 'Um jovem é encontrado morto de ataque cardíaco, sozinho, num elevador de um prédio abandonado.', solution: 'Ele estava a tentar realizar um "ritual" de uma lenda da internet, que supostamente invocaria um espírito. Os seus amigos, como partida, manipularam as luzes do elevador e usaram um alto-falante escondido para criar sons assustadores. O susto, combinado com uma condição cardíaca não diagnosticada, foi fatal.' },
    { title: 'A Mão Debaixo da Cama', emoji: '🔴', mystery: 'Uma jovem ouve um barulho. Estende a mão para debaixo da cama e o seu cão a lambe. Na manhã seguinte, encontra o cão morto com um bilhete: "Os humanos também sabem lamber".', solution: 'O assassino estava debaixo da cama dela o tempo todo. Foi ele quem lambeu a sua mão.' },
    { title: 'A Morte da Loira', emoji: '🟡', mystery: 'Um grupo de estudantes invoca a "Loira do Banheiro". As luzes piscam e uma garota morre com os cabelos subitamente loiros.', solution: 'Uma "amiga" invejosa atirou-lhe um balde de alvejante. A vítima, que tinha uma alergia grave, morreu de choque anafilático.' },
    { title: 'O Ímã Escondido', emoji: '🟢', mystery: 'Crianças brincam com um compasso e um caderno. O compasso se move sozinho e uma das crianças morre após ver isso.', solution: 'Uma das crianças mais velhas estava movendo o compasso com um ímã debaixo da mesa. A vítima tinha uma condição cardíaca não diagnosticada e se assustou.' },
    { title: 'O Baú de Brinquedos', emoji: '🟡', mystery: 'Uma criança desobediente desaparece. Os pais encontram um saco de estopa vazio no seu quarto.', solution: 'A criança, brincando de "Homem do Saco", escondeu-se dentro de um baú antigo. A tampa se fechou e a trancou por dentro e ele morreu asfixiado.' },
    { title: 'A Babá e o Telefone', emoji: '🟡', mystery: 'Uma babá recebe várias ligações anônimas com uma voz dizendo: "Já verificou as crianças?". Assustada, liga à polícia.', solution: 'Os pais viajavam para uma área sem sinal, e a babá sabia que não receberia mensagens. A polícia rastreou a chamada e descobre que vem de dentro da própria casa. O intruso já estava no andar de cima, e sequestrou as crianças.' },
    { title: 'Apego Fatal', emoji: '🟡', mystery: 'Uma família compra uma boneca antiga. A filha mais nova é encontrada morta no seu quarto.', solution: 'A tinta da boneca antiga continha uma alta concentração de chumbo. A criança, que tinha o hábito de lamber brinquedos, morreu envenenada.' },
    { title: 'Crime Calculado', emoji: '🔴', mystery: 'Todos que fazem uma curva específica numa estrada à noite morrem num acidente. A estrada é perfeita.', solution: 'Um projetor projeta uma imagem hiper-realista de uma parede de tijolos na curva. Os motoristas desviam e caem do penhasco.' },
    { title: 'Chupa-Cabra', emoji: '🟡', mystery: 'Várias cabras de uma fazenda aparecem mortas, com o sangue todo drenado.', solution: 'O dono da fazenda estava tentando criar uma nova raça de morcegos-vampiros geneticamente modificados para um laboratório. Eles escaparam.' },
    { title: 'O Celular Roubado', emoji: '🟢', mystery: 'Uma viúva começa a receber mensagens de texto do número do seu falecido marido. A última diz: "Estou te vendo". Ela morre de susto.', solution: 'O ladrão que roubou o celular do marido no local do acidente estava enviando as mensagens.' },
    { title: 'Rádio Amador', emoji: '🟢', mystery: 'Um homem compra um carro antigo e começa a ouvir vozes. Ele se assusta, bate o carro e morre.', solution: 'O rádio antigo do carro captava frequências de rádio amador. As "vozes" eram interferências.' },
    { title: 'A Brincadeira Cruel', emoji: '🟡', mystery: 'Um homem assiste a um filme e sente uma picada. Ao lado, encontra um bilhete: "Bem-vindo ao clube da AIDS". Ele morre.', solution: 'Ele não morreu de AIDS. Aterrorizado, correu para fora do cinema e foi atropelado.' },
    { title: 'O Amigo Orgulhoso', emoji: '🔴', mystery: 'Um homem convida um antigo amigo para jantar. No dia seguinte ao marcado, o amigo é encontrado morto de fome.', solution: 'O amigo era extremamente pobre. O anfitrião adormeceu e se esqueceu do jantar. O amigo, por orgulho, não pediu ajuda.' },
    { title: 'Gato frito', emoji: '🟢', mystery: 'Uma senhora idosa tenta secar seu gato no micro-ondas, matando-o. Ela ganha um processo milionário.', solution: 'O manual de instruções do produto não incluía um aviso para "não secar animais de estimação". Seu advogado argumentou negligência.' },
    { title: 'Morreu de Trabalho', emoji: '🔴', mystery: 'Uma mulher morre envenenada após anos no mesmo trabalho', solution: 'Ela lambia envelopes, a cola dos envelopes, de baixa qualidade, estava contaminada com uma toxina rara. A dose acumulada foi fatal.' },
    { title: 'O Jogo da Meia-Noite', emoji: '🟡', mystery: 'Um adolescente é encontrado morto em frente ao seu computador. Ele estava a participar num desafio online que prometia contactar espíritos.', solution: 'O "desafio" instruía os participantes a tomar uma combinação de medicamentos de venda livre para "abrir a mente". A combinação, em doses elevadas, foi fatal.' },
    { title: 'O Vizinho Observador', emoji: '🔴', mystery: 'Um homem queixa-se de barulhos constantes vindos do apartamento vizinho, que está oficialmente vazio há anos. Um dia, ele desaparece.', solution: 'O apartamento era uma fachada usada por uma agência de inteligência para vigilância. O homem, um jornalista curioso, descobriu a operação. Para o silenciar, os agentes forjaram o seu desaparecimento.' },
    { title: 'O Ladrão Disfarçado', emoji: '🟡', mystery: 'Uma funcionária de uma loja de roupas é encontrada morta após avisar a outra vendedora que ia ajustar a vitrine que estava torta.', solution: 'Um ladrão se escondia na loja todas as noites, disfarçando-se de manequim. Naquela noite, ela o descobriu.' }
  ];

  return cases.map((caseData, index) => ({
    id: `${packId}-case-${index + 1}`,
    order: index + 1,
    mystery: caseData.mystery,
    solution: caseData.solution,
    difficulty: mapEmojiToDifficulty(caseData.emoji),
    theme: 'mystery' as any,
    name: caseData.title,
    icon: 'eye',
    title: caseData.title,
    description: `Uma lenda urbana para ser desvendada`,
    image: `/lovable-uploads/pack${(index % 5) + 1}/case${index + 1}.png`,
    isFree: index === 0
  }));
};

// Generate cases for each pack dynamically (for non-specific packs)
export const generateCasesForPack = (packId: string, packName: string): Case[] => {
  // Check if this is one of our specific packs
  switch (packId) {
    case 'sussurros-do-alem':
      return generateSussurrosDoAlemCases(packId);
    case 'sombras-da-noite':
      return generateSombrasDaNoiteCases(packId);
    case 'crimes-imperfeitos':
      return generateCrimesImperfeitosCases(packId);
    case 'lendas-urbanas':
      return generateLendasUrbanasCases(packId);
    default:
      // Fall back to generic case generation for other packs
      const themes = ['mystery', 'murder', 'theft', 'investigation', 'thriller', 'crime', 'conspiracy', 'danger', 'power'];
      const difficulties = ['easy', 'medium', 'hard'];
      
      return Array.from({ length: 10 }, (_, index) => ({
        id: `${packId}-case-${index + 1}`,
        order: index + 1,
        mystery: `Mistério ${index + 1} de ${packName}`,
        solution: `Solução do mistério ${index + 1}`,
        difficulty: difficulties[index % 3] as 'easy' | 'medium' | 'hard',
        theme: themes[index % themes.length] as any,
        name: `Caso ${index + 1}`,
        icon: 'mystery',
        title: `O Enigma ${index + 1}`,
        description: `Um mistério intrigante para ser desvendado em ${packName}`,
        image: `/lovable-uploads/pack${(index % 5) + 1}/case${index + 1}.png`,
        isFree: index === 0 // First case is always free
      }));
  }
};

// Helper function to ensure difficulty is properly typed
const mapDifficulty = (difficulty: string): 'easy' | 'medium' | 'hard' => {
  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
    return difficulty;
  }
  return 'medium'; // Default fallback
};

// Get pack by ID from Supabase
export const getPackById = async (id: string): Promise<Pack | undefined> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      ...data,
      difficulty: mapDifficulty(data.difficulty),
      cases: generateCasesForPack(data.id, data.name)
    };
  } catch (error) {
    console.error('Error fetching pack by ID:', error);
    return undefined;
  }
};

// Get user's owned packs
export const getUserPacks = async (userId: string): Promise<string[]> => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('user_pack_access')
      .select('pack_id')
      .eq('user_id', userId)
      .eq('is_active', true);
    
    if (error) throw error;
    
    return data.map(item => item.pack_id);
  } catch (error) {
    console.error('Error fetching user packs:', error);
    return [];
  }
};

// Get all packs from Supabase
export const getAllPacks = async (): Promise<Pack[]> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data.map(pack => ({
      ...pack,
      difficulty: mapDifficulty(pack.difficulty),
      cases: generateCasesForPack(pack.id, pack.name)
    }));
  } catch (error) {
    console.error('Error fetching all packs:', error);
    return [];
  }
};
