import { Case } from '../types';
import { labirintosMentaisCases } from './labirintosMentaisCases';
import { jogosCorporativosCases } from './jogosCorporativosCases';
import { sussurrosAlemCases } from './sussurrosAlemCases';
import { sombrasNoiteCases } from './sombrasNoiteCases';
import { crimesImperfeitosCases } from './crimesImperfeitosCases';
import { lendasUrbanasCases } from './lendasUrbanasCases';
import { paradoxosMortaisCases } from './paradoxosMortaisCases';

// Map of pack IDs to their respective cases
export const packCasesMap: Record<string, Case[]> = {
  'pack-01': [
    {
      id: 'case-001',
      order: 1,
      mystery: 'Uma mansão vitoriana, um testamento polêmico e uma morte suspeita durante o chá da tarde.',
      solution: 'O mordomo adicionou veneno ao chá da tarde usando uma seringa escondida no açucareiro. A motivação foi a descoberta de que seria demitido após 30 anos de serviço.',
      difficulty: 'easy',
      isFree: true,
      theme: 'murder',
      name: 'A Herança Envenenada',
      title: 'A Herança Envenenada',
      description: 'Uma mansão vitoriana, um testamento polêmico e uma morte suspeita.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop'
    },
    {
      id: 'case-002',
      order: 2,
      mystery: 'Um quadro valioso desaparece durante uma exposição. Quem está por trás do roubo?',
      solution: 'O ladrão era o próprio curador do museu, que planejou o roubo para cobrar o seguro e pagar dívidas de jogo.',
      difficulty: 'medium',
      theme: 'theft',
      name: 'O Mistério do Quadro Roubado',
      title: 'O Mistério do Quadro Roubado',
      description: 'Um quadro valioso desaparece durante uma exposição.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-003',
      order: 3,
      mystery: 'Um cofre misterioso guarda segredos que podem mudar o destino da cidade.',
      solution: 'A senha do cofre estava escondida em um poema antigo encontrado na biblioteca da família.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'O Segredo do Cofre',
      title: 'O Segredo do Cofre',
      description: 'Um cofre misterioso guarda segredos que podem mudar o destino da cidade.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    },
    {
      id: 'case-004',
      order: 4,
      mystery: 'Um incêndio destrói uma fábrica. Foi acidente ou sabotagem?',
      solution: 'O incêndio foi provocado pelo sócio traidor que queria assumir o controle da empresa.',
      difficulty: 'medium',
      theme: 'danger',
      name: 'A Noite do Incêndio',
      title: 'A Noite do Incêndio',
      description: 'Um incêndio destrói uma fábrica. Foi acidente ou sabotagem?',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'case-005',
      order: 5,
      mystery: 'Uma pessoa desaparece misteriosamente em uma floresta densa.',
      solution: 'A vítima fugiu para começar uma nova vida, deixando pistas falsas para despistar os perseguidores.',
      difficulty: 'easy',
      theme: 'investigation',
      name: 'O Desaparecimento na Floresta',
      title: 'O Desaparecimento na Floresta',
      description: 'Uma pessoa desaparece misteriosamente em uma floresta densa.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
    },
    {
      id: 'case-006',
      order: 6,
      mystery: 'Um relógio antigo guarda um segredo que pode resolver um crime antigo.',
      solution: 'O relógio escondia um compartimento secreto com documentos importantes.',
      difficulty: 'hard',
      theme: 'mystery',
      name: 'O Enigma do Relógio',
      title: 'O Enigma do Relógio',
      description: 'Um relógio antigo guarda um segredo que pode resolver um crime antigo.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 'case-007',
      order: 7,
      mystery: 'Uma carta anônima revela pistas sobre um crime não resolvido.',
      solution: 'A carta foi escrita pelo irmão da vítima, tentando proteger a família.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'A Carta Anônima',
      title: 'A Carta Anônima',
      description: 'Uma carta anônima revela pistas sobre um crime não resolvido.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'case-008',
      order: 8,
      mystery: 'Luzes estranhas no farol assustam os moradores da costa.',
      solution: 'O farol era usado para sinalizar contrabandistas durante a noite.',
      difficulty: 'medium',
      theme: 'thriller',
      name: 'O Mistério do Farol',
      title: 'O Mistério do Farol',
      description: 'Luzes estranhas no farol assustam os moradores da costa.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop'
    },
    {
      id: 'case-009',
      order: 9,
      mystery: 'Um jardim aparentemente comum guarda um segredo sombrio.',
      solution: 'O jardim escondia uma passagem secreta para um túnel antigo.',
      difficulty: 'easy',
      theme: 'conspiracy',
      name: 'O Segredo do Jardim',
      title: 'O Segredo do Jardim',
      description: 'Um jardim aparentemente comum guarda um segredo sombrio.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop'
    },
    {
      id: 'case-010',
      order: 10,
      mystery: 'Lendas de um fantasma assombram uma antiga mansão.',
      solution: 'O "fantasma" era um cúmplice disfarçado tentando assustar os suspeitos.',
      difficulty: 'hard',
      theme: 'thriller',
      name: 'A Vingança do Fantasma',
      title: 'A Vingança do Fantasma',
      description: 'Lendas de um fantasma assombram uma antiga mansão.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop'
    },
    {
      id: 'case-011',
      order: 11,
      mystery: 'Um diamante valioso desaparece durante uma exposição.',
      solution: 'O roubo foi planejado por um joalheiro que queria vender a pedra no mercado negro.',
      difficulty: 'medium',
      theme: 'theft',
      name: 'O Caso do Diamante Roubado',
      title: 'O Caso do Diamante Roubado',
      description: 'Um diamante valioso desaparece durante uma exposição.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop'
    },
    {
      id: 'case-012',
      order: 12,
      mystery: 'Eventos estranhos acontecem em uma biblioteca antiga.',
      solution: 'Os livros foram rearranjados para formar uma mensagem codificada.',
      difficulty: 'medium',
      theme: 'mystery',
      name: 'O Mistério da Biblioteca',
      title: 'O Mistério da Biblioteca',
      description: 'Eventos estranhos acontecem em uma biblioteca antiga.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-013',
      order: 13,
      mystery: 'Histórias de um navio fantasma circulam entre os pescadores.',
      solution: 'O navio foi usado para contrabando e desapareceu após uma tempestade.',
      difficulty: 'hard',
      theme: 'danger',
      name: 'O Segredo do Navio Fantasma',
      title: 'O Segredo do Navio Fantasma',
      description: 'Histórias de um navio fantasma circulam entre os pescadores.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    },
    {
      id: 'case-014',
      order: 14,
      mystery: 'Um conselho municipal esconde segredos obscuros.',
      solution: 'Membros do conselho estavam envolvidos em corrupção e fraude.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'A Conspiração do Conselho',
      title: 'A Conspiração do Conselho',
      description: 'Um conselho municipal esconde segredos obscuros.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'case-015',
      order: 15,
      mystery: 'Um relógio de ouro desaparece durante um baile de gala.',
      solution: 'O relógio foi roubado para pagar uma dívida de jogo.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'O Mistério do Relógio de Ouro',
      title: 'O Mistério do Relógio de Ouro',
      description: 'Um relógio de ouro desaparece durante um baile de gala.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
    },
    {
      id: 'case-016',
      order: 16,
      mystery: 'Uma estátua valiosa desaparece misteriosamente.',
      solution: 'A estátua foi vendida ilegalmente por um funcionário do museu.',
      difficulty: 'medium',
      theme: 'theft',
      name: 'O Caso da Estátua Desaparecida',
      title: 'O Caso da Estátua Desaparecida',
      description: 'Uma estátua valiosa desaparece misteriosamente.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 'case-017',
      order: 17,
      mystery: 'Um assassinato em uma sala trancada intriga os detetives.',
      solution: 'A vítima foi assassinada antes de trancar a sala por dentro.',
      difficulty: 'hard',
      theme: 'murder',
      name: 'O Enigma da Sala Trancada',
      title: 'O Enigma da Sala Trancada',
      description: 'Um assassinato em uma sala trancada intriga os detetives.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'case-018',
      order: 18,
      mystery: 'Eventos estranhos acontecem em um cemitério antigo.',
      solution: 'O cemitério escondia túmulos falsos usados para esconder contrabando.',
      difficulty: 'medium',
      theme: 'thriller',
      name: 'O Mistério do Cemitério',
      title: 'O Mistério do Cemitério',
      description: 'Eventos estranhos acontecem em um cemitério antigo.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop'
    },
    {
      id: 'case-019',
      order: 19,
      mystery: 'Uma joalheria é roubada durante a noite.',
      solution: 'O roubo foi facilitado por um funcionário que desativou o alarme.',
      difficulty: 'medium',
      theme: 'theft',
      name: 'A Noite do Roubo na Joalheria',
      title: 'A Noite do Roubo na Joalheria',
      description: 'Uma joalheria é roubada durante a noite.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop'
    },
    {
      id: 'case-020',
      order: 20,
      mystery: 'Um manuscrito antigo é a chave para um grande segredo.',
      solution: 'O manuscrito continha informações que poderiam derrubar uma poderosa família.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'O Segredo do Manuscrito',
      title: 'O Segredo do Manuscrito',
      description: 'Um manuscrito antigo é a chave para um grande segredo.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop'
    }
  ],
  'pack-02': [
    {
      id: 'case-031',
      order: 31,
      mystery: 'Um professor desaparece misteriosamente da universidade após uma descoberta revolucionária.',
      solution: 'O professor fugiu para proteger uma descoberta científica revolucionária de corporações que queriam roubá-la.',
      difficulty: 'medium',
      theme: 'investigation',
      name: 'O Desaparecimento do Professor',
      title: 'O Desaparecimento do Professor',
      description: 'Uma descoberta que vale mais que a vida.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop',
      isFree: true
    },
    {
      id: 'case-032',
      order: 32,
      mystery: 'Um trem fantasma aparece em trilhos abandonados.',
      solution: 'O trem era usado para transportar mercadorias ilegais durante a noite.',
      difficulty: 'hard',
      theme: 'thriller',
      name: 'O Mistério do Trem Fantasma',
      title: 'O Mistério do Trem Fantasma',
      description: 'Um trem fantasma aparece em trilhos abandonados.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-033',
      order: 33,
      mystery: 'Corrupção e segredos na prefeitura da cidade.',
      solution: 'Funcionários corruptos desviavam verbas públicas há anos.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'A Conspiração na Prefeitura',
      title: 'A Conspiração na Prefeitura',
      description: 'Corrupção e segredos na prefeitura da cidade.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    },
    {
      id: 'case-034',
      order: 34,
      mystery: 'Um pintor desaparece sem deixar rastros.',
      solution: 'O pintor foi sequestrado por um colecionador obcecado por suas obras.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'O Caso do Pintor Desaparecido',
      title: 'O Caso do Pintor Desaparecido',
      description: 'Um pintor desaparece sem deixar rastros.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'case-035',
      order: 35,
      mystery: 'Uma chave perdida leva a um segredo antigo.',
      solution: 'A chave abria um cofre com documentos secretos.',
      difficulty: 'medium',
      theme: 'mystery',
      name: 'O Enigma da Chave Perdida',
      title: 'O Enigma da Chave Perdida',
      description: 'Uma chave perdida leva a um segredo antigo.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
    },
    {
      id: 'case-036',
      order: 36,
      mystery: 'Um farol apaga misteriosamente durante uma tempestade.',
      solution: 'O farol foi sabotado para causar um acidente marítimo.',
      difficulty: 'hard',
      theme: 'danger',
      name: 'O Mistério do Farol Apagado',
      title: 'O Mistério do Farol Apagado',
      description: 'Um farol apaga misteriosamente durante uma tempestade.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 'case-037',
      order: 37,
      mystery: 'Uma mansão é roubada durante uma festa luxuosa.',
      solution: 'O roubo foi planejado por um dos convidados da festa.',
      difficulty: 'medium',
      theme: 'theft',
      name: 'A Noite do Roubo na Mansão',
      title: 'A Noite do Roubo na Mansão',
      description: 'Uma mansão é roubada durante uma festa luxuosa.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'case-038',
      order: 38,
      mystery: 'Um cofre escondido guarda segredos perigosos.',
      solution: 'O cofre escondia provas que incriminavam um político influente.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'O Segredo do Cofre Escondido',
      title: 'O Segredo do Cofre Escondido',
      description: 'Um cofre escondido guarda segredos perigosos.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-039',
      order: 39,
      mystery: 'Um assassino deixa poucas pistas para trás.',
      solution: 'O assassino usava disfarces para não ser reconhecido.',
      difficulty: 'hard',
      theme: 'murder',
      name: 'O Caso do Assassino Invisível',
      title: 'O Caso do Assassino Invisível',
      description: 'Um assassino deixa poucas pistas para trás.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    },
    {
      id: 'case-040',
      order: 40,
      mystery: 'Uma carta queimada pode ser a chave para um crime.',
      solution: 'A carta continha uma confissão que foi parcialmente queimada.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'O Mistério da Carta Queimada',
      title: 'O Mistério da Carta Queimada',
      description: 'Uma carta queimada pode ser a chave para um crime.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'case-041',
      order: 41,
      mystery: 'Um relógio parado intriga os investigadores.',
      solution: 'O relógio parou no momento exato do crime.',
      difficulty: 'medium',
      theme: 'mystery',
      name: 'O Enigma do Relógio Parado',
      title: 'O Enigma do Relógio Parado',
      description: 'Um relógio parado intriga os investigadores.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-042',
      order: 42,
      mystery: 'Um tesouro perdido intriga caçadores de aventuras.',
      solution: 'O tesouro estava escondido em um túnel secreto sob a cidade.',
      difficulty: 'hard',
      theme: 'thriller',
      name: 'O Caso do Tesouro Escondido',
      title: 'O Caso do Tesouro Escondido',
      description: 'Um tesouro perdido intriga caçadores de aventuras.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop'
    },
    {
      id: 'case-043',
      order: 43,
      mystery: 'Um incêndio destrói evidências importantes.',
      solution: 'O incêndio foi provocado para destruir provas de um crime.',
      difficulty: 'medium',
      theme: 'danger',
      name: 'A Noite do Incêndio Misterioso',
      title: 'A Noite do Incêndio Misterioso',
      description: 'Um incêndio destrói evidências importantes.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 'case-044',
      order: 44,
      mystery: 'Um quadro antigo guarda um segredo valioso.',
      solution: 'O quadro escondia um mapa para um local secreto.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'O Mistério do Quadro Escondido',
      title: 'O Mistério do Quadro Escondido',
      description: 'Um quadro antigo guarda um segredo valioso.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-045',
      order: 45,
      mystery: 'Um médico é suspeito de corrupção e fraude.',
      solution: 'O médico usava sua posição para cometer fraudes.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'O Caso do Médico Corrupto',
      title: 'O Caso do Médico Corrupto',
      description: 'Um médico é suspeito de corrupção e fraude.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    {
      id: 'case-046',
      order: 46,
      mystery: 'Uma sala secreta intriga os investigadores.',
      solution: 'A sala secreta era usada para reuniões clandestinas.',
      difficulty: 'hard',
      theme: 'thriller',
      name: 'O Enigma da Sala Secreta',
      title: 'O Enigma da Sala Secreta',
      description: 'Uma sala secreta intriga os investigadores.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'case-047',
      order: 47,
      mystery: 'Um farol abandonado guarda segredos obscuros.',
      solution: 'O farol era usado para sinalizar navios contrabandistas.',
      difficulty: 'medium',
      theme: 'danger',
      name: 'O Mistério do Farol Abandonado',
      title: 'O Mistério do Farol Abandonado',
      description: 'Um farol abandonado guarda segredos obscuros.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-048',
      order: 48,
      mystery: 'Um sequestro misterioso intriga a polícia.',
      solution: 'O sequestro foi encenado para encobrir um roubo.',
      difficulty: 'medium',
      theme: 'crime',
      name: 'A Noite do Sequestro Misterioso',
      title: 'A Noite do Sequestro Misterioso',
      description: 'Um sequestro misterioso intriga a polícia.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'case-049',
      order: 49,
      mystery: 'Um manuscrito antigo guarda segredos perigosos.',
      solution: 'O manuscrito continha segredos que poderiam derrubar uma família poderosa.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'O Segredo do Manuscrito Antigo',
      title: 'O Segredo do Manuscrito Antigo',
      description: 'Um manuscrito antigo guarda segredos perigosos.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'case-050',
      order: 50,
      mystery: 'Um teatro antigo é palco de eventos estranhos.',
      solution: 'O teatro era palco de um esquema de chantagem.',
      difficulty: 'medium',
      theme: 'thriller',
      name: 'O Mistério do Teatro Assombrado',
      title: 'O Mistério do Teatro Assombrado',
      description: 'Um teatro antigo é palco de eventos estranhos.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    }
  ],
  'pack-03': sussurrosAlemCases,
  'pack-04': sombrasNoiteCases,
  'pack-05': crimesImperfeitosCases,
  'pack-06': lendasUrbanasCases,
  'pack-07': paradoxosMortaisCases,
  'labirintos-mentais': labirintosMentaisCases,
  'jogos-corporativos': jogosCorporativosCases,
  'dossie-confidencial': [
    {
      id: 'dossie-confidencial-001',
      order: 1,
      mystery: 'Um agente secreto é encontrado morto com um dossier classificado ao lado do corpo.',
      solution: 'O dossier era uma isca. O agente foi traído por seu próprio superior, que plantou informações falsas para expô-lo.',
      difficulty: 'hard',
      isFree: true,
      theme: 'conspiracy',
      name: 'A Traição Interna',
      title: 'A Traição Interna',
      description: 'Quando não se pode confiar em ninguém.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    }
  ],
  'dose-letal': [
    {
      id: 'dose-letal-001',
      order: 1,
      mystery: 'Um químico morre envenenado em seu próprio laboratório.',
      solution: 'Ele acidentalmente misturou dois produtos de limpeza comuns, criando um gás tóxico letal.',
      difficulty: 'easy',
      isFree: true,
      theme: 'danger',
      name: 'A Mistura Fatal',
      title: 'A Mistura Fatal',
      description: 'Perigos escondidos no cotidiano.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop'
    }
  ],
  'fim-de-jogo': [
    {
      id: 'fim-jogo-001',
      order: 1,
      mystery: 'Um jogador de xadrez morre durante uma partida decisiva.',
      solution: 'Seu oponente envenenou as peças do xadrez. O jogador tinha o hábito de tocar os lábios depois de mover as peças.',
      difficulty: 'medium',
      isFree: true,
      theme: 'murder',
      name: 'Xeque-Mate Final',
      title: 'Xeque-Mate Final',
      description: 'O jogo mais mortal de todos.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop'
    }
  ],
  'absurdamente-real': [
    {
      id: 'absurdamente-real-001',
      order: 1,
      mystery: 'Um homem morre eletrocutado por um peixe em um aquário.',
      solution: 'O aquário tinha um defeito elétrico no sistema de filtragem, e o homem estava com as mãos molhadas ao tentar alimentar o peixe.',
      difficulty: 'medium',
      isFree: true,
      theme: 'danger',
      name: 'O Peixe Elétrico',
      title: 'O Peixe Elétrico',
      description: 'Acidentes absurdos, mas perfeitamente explicáveis.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    }
  ]
};

// Function to get cases for a specific pack
export const getPackCases = (packId: string): Case[] => {
  return packCasesMap[packId] || [];
};
