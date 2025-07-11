import case01Image from '../assets/cases/case-01.png';
import case02Image from '../assets/cases/case-02.png';
import case03Image from '../assets/cases/case-03.png';
import case04Image from '../assets/cases/case-04.png';

import case1 from '../assets/cases/cards/case-1.png';
import case2 from '../assets/cases/cards/case-2.png';
import case3 from '../assets/cases/cards/case-3.png';
import case4 from '../assets/cases/cards/case-4.png';
import case5 from '../assets/cases/cards/case-5.png';
import case6 from '../assets/cases/cards/case-6.png';
import case7 from '../assets/cases/cards/case-7.png';
import case8 from '../assets/cases/cards/case-8.png';
import case9 from '../assets/cases/cards/case-9.png';
import case10 from '../assets/cases/cards/case-10.png';
import case11 from '../assets/cases/cards/case-11.png';
import case12 from '../assets/cases/cards/case-12.png';
import case13 from '../assets/cases/cards/case-13.png';
import case14 from '../assets/cases/cards/case-14.png';
import case15 from '../assets/cases/cards/case-15.png';
import case16 from '../assets/cases/cards/case-16.png';
import case17 from '../assets/cases/cards/case-17.png';
import case18 from '../assets/cases/cards/case-18.png';
import case19 from '../assets/cases/cards/case-19.png';
import case20 from '../assets/cases/cards/case-20.png';
import case21 from '../assets/cases/cards/case-21.png';
import case22 from '../assets/cases/cards/case-22.png';
import case23 from '../assets/cases/cards/case-23.png';
import case24 from '../assets/cases/cards/case-24.png';
import case25 from '../assets/cases/cards/case-25.png';
import case26 from '../assets/cases/cards/case-26.png';
import case27 from '../assets/cases/cards/case-27.png';
import case28 from '../assets/cases/cards/case-28.png';
import case29 from '../assets/cases/cards/case-29.png';
import case30 from '../assets/cases/cards/case-30.png';
import case31 from '../assets/cases/cards/case-31.png';
import case32 from '../assets/cases/cards/case-32.png';
import case33 from '../assets/cases/cards/case-33.png';
import case34 from '../assets/cases/cards/case-34.png';
import case35 from '../assets/cases/cards/case-35.png';
import case36 from '../assets/cases/cards/case-36.png';
import case37 from '../assets/cases/cards/case-37.png';
import case38 from '../assets/cases/cards/case-38.png';
import case39 from '../assets/cases/cards/case-39.png';
import case40 from '../assets/cases/cards/case-40.png';
import case41 from '../assets/cases/cards/case-41.png';
import case42 from '../assets/cases/cards/case-42.png';
import case43 from '../assets/cases/cards/case-43.png';
import case44 from '../assets/cases/cards/case-44.png';
import case45 from '../assets/cases/cards/case-45.png';
import case46 from '../assets/cases/cards/case-46.png';
import case47 from '../assets/cases/cards/case-47.png';
import case48 from '../assets/cases/cards/case-48.png';
import case49 from '../assets/cases/cards/case-49.png';
import case50 from '../assets/cases/cards/case-50.png';
import case51 from '../assets/cases/cards/case-51.png';
import case52 from '../assets/cases/cards/case-52.png';
import case53 from '../assets/cases/cards/case-53.png';
import case54 from '../assets/cases/cards/case-54.png';
import case55 from '../assets/cases/cards/case-55.png';
import case56 from '../assets/cases/cards/case-56.png';
import case57 from '../assets/cases/cards/case-57.png';
import case58 from '../assets/cases/cards/case-58.png';
import case59 from '../assets/cases/cards/case-59.png';
import case60 from '../assets/cases/cards/case-60.png';
import case61 from '../assets/cases/cards/case-61.png';
import case62 from '../assets/cases/cards/case-62.png';
import case63 from '../assets/cases/cards/case-63.png';
import case64 from '../assets/cases/cards/case-64.png';
import case65 from '../assets/cases/cards/case-65.png';
import case66 from '../assets/cases/cards/case-66.png';
import case67 from '../assets/cases/cards/case-67.png';
import case68 from '../assets/cases/cards/case-68.png';
import case69 from '../assets/cases/cards/case-69.png';
import case70 from '../assets/cases/cards/case-70.png';
import case71 from '../assets/cases/cards/case-71.png';
import case72 from '../assets/cases/cards/case-72.png';
import case73 from '../assets/cases/cards/case-73.png';
import case74 from '../assets/cases/cards/case-74.png';
import case75 from '../assets/cases/cards/case-75.png';
import case76 from '../assets/cases/cards/case-76.png';
import case77 from '../assets/cases/cards/case-77.png';
import case78 from '../assets/cases/cards/case-78.png';
import case79 from '../assets/cases/cards/case-79.png';
import case80 from '../assets/cases/cards/case-80.png';
import case81 from '../assets/cases/cards/case-81.png';
import case82 from '../assets/cases/cards/case-82.png';
import case83 from '../assets/cases/cards/case-83.png';
import case84 from '../assets/cases/cards/case-84.png';
import case85 from '../assets/cases/cards/case-85.png';
import case86 from '../assets/cases/cards/case-86.png';
import case87 from '../assets/cases/cards/case-87.png';
import case88 from '../assets/cases/cards/case-88.png';
import case89 from '../assets/cases/cards/case-89.png';
import case90 from '../assets/cases/cards/case-90.png';

import { Pack } from './types';

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
        image: case1
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
        image: case2
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
        image: case3
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
        image: case4
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
        image: case5
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
        image: case6
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
        image: case7
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
        image: case8
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
        image: case9
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
        image: case10
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
        image: case11
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
        image: case12
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
        image: case13
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
        image: case14
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
        image: case15
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
        image: case16
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
        image: case17
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
        image: case18
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
        image: case19
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
        image: case20
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
        image: case21
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
        image: case22
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
        image: case23
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
        image: case24
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
        image: case25
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
        image: case26
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
        image: case27
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
        image: case28
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
        image: case29
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
        image: case30
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
        image: case31
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
        image: case32
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
        image: case33
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
        image: case34
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
        image: case35
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
        image: case36
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
        image: case37
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
        image: case38
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
        image: case39
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
        image: case40
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
        image: case41
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
        image: case42
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
        image: case43
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
        image: case44
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
        image: case45
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
        image: case46
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
        image: case47
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
        image: case48
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
        image: case49
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
        image: case50
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
        image: case51
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
        image: case52
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
        image: case53
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
        image: case54
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
        image: case55
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
        image: case56
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
        image: case57
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
        image: case58
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
        image: case59
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
        image: case60
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
        image: case61
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
        image: case62
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
        image: case63
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
        image: case64
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
        image: case65
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
        image: case66
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
        image: case67
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
        image: case68
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
        image: case69
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
        image: case70
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
        image: case71
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
        image: case72
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
        image: case73
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
        image: case74
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
        image: case75
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
        image: case76
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
        image: case77
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
        image: case78
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
        image: case79
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
        image: case80
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
        image: case81
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
        image: case82
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
        image: case83
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
        image: case84
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
        image: case85
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
        image: case86
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
        image: case87
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
        image: case88
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
        image: case89
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
        image: case90
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
