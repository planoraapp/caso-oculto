
import { Case } from '../types';
import { labirintosMentaisCases } from './labirintosMentaisCases';
import { jogosCorporativosCases } from './jogosCorporativosCases';
import { sussurrosAlemCases } from './sussurrosAlemCases';
import { sombrasNoiteCases } from './sombrasNoiteCases';
import { crimesImperfeitosCases } from './crimesImperfeitosCases';
import { lendasUrbanasCases } from './lendasUrbanasCases';
import { paradoxosMortaisCases } from './paradoxosMortaisCases';

// Map of pack IDs to their respective cases - using correct Supabase IDs
export const packCasesMap: Record<string, Case[]> = {
  // Packs with correct IDs from Supabase database
  'sussurros-do-alem': sussurrosAlemCases,
  'sombras-da-noite': sombrasNoiteCases,
  'crimes-imperfeitos': crimesImperfeitosCases,
  'lendas-urbanas': lendasUrbanasCases,
  'paradoxos-mortais': paradoxosMortaisCases,
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
    },
    {
      id: 'dossie-confidencial-002',
      order: 2,
      mystery: 'Documentos secretos desaparecem da embaixada durante uma recepção diplomática.',
      solution: 'O embaixador vendeu os documentos para saldar dívidas de jogo, usando a recepção como álibi.',
      difficulty: 'medium',
      theme: 'conspiracy',
      name: 'O Diplomata Corrupto',
      title: 'O Diplomata Corrupto',
      description: 'Traição nas mais altas esferas.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    {
      id: 'dossie-confidencial-003',
      order: 3,
      mystery: 'Um informante é assassinado antes de revelar segredos governamentais.',
      solution: 'O informante foi morto por um agente duplo que trabalhava para ambos os lados.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'Agente Duplo',
      title: 'Agente Duplo',
      description: 'Lealdades divididas são perigosas.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop'
    },
    // Add 17 more cases for dossie-confidencial...
    {
      id: 'dossie-confidencial-020',
      order: 20,
      mystery: 'Uma operação secreta é comprometida por uma fuga de informação.',
      solution: 'A fuga foi causada por um sistema de vigilância que foi hackeado por uma potência estrangeira.',
      difficulty: 'hard',
      theme: 'conspiracy',
      name: 'Operação Comprometida',
      title: 'Operação Comprometida',
      description: 'Quando a tecnologia se volta contra você.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop'
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
    },
    {
      id: 'dose-letal-002',
      order: 2,
      mystery: 'Uma enfermeira morre após administrar uma injeção em um paciente.',
      solution: 'Ela acidentalmente se injetou com a agulha contaminada com uma substância experimental.',
      difficulty: 'medium',
      theme: 'danger',
      name: 'Acidente Hospitalar',
      title: 'Acidente Hospitalar',
      description: 'Quando o cuidador precisa de cuidados.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop'
    },
    {
      id: 'dose-letal-003',
      order: 3,
      mystery: 'Um jardineiro morre após pulverizar pesticida em sua plantação.',
      solution: 'O equipamento de proteção estava defeituoso, permitindo que os vapores tóxicos fossem inalados.',
      difficulty: 'easy',
      theme: 'danger',
      name: 'Proteção Falha',
      title: 'Proteção Falha',
      description: 'Equipamentos que não protegem.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    // Add 17 more cases for dose-letal...
    {
      id: 'dose-letal-020',
      order: 20,
      mystery: 'Um pesquisador morre após trabalhar com uma nova substância química.',
      solution: 'A substância reagiu com o suor de suas mãos, criando um composto letal que foi absorvido pela pele.',
      difficulty: 'hard',
      theme: 'danger',
      name: 'Reação Inesperada',
      title: 'Reação Inesperada',
      description: 'A química pode ser imprevisível.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
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
    },
    {
      id: 'fim-jogo-002',
      order: 2,
      mystery: 'Um jogador de pôquer morre durante uma partida de apostas altas.',
      solution: 'Ele foi envenenado por uma carta marcada com uma substância tóxica que absorveu pela pele.',
      difficulty: 'hard',
      theme: 'murder',
      name: 'Carta Marcada',
      title: 'Carta Marcada',
      description: 'Quando trapacear pode ser fatal.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop'
    },
    {
      id: 'fim-jogo-003',
      order: 3,
      mystery: 'Um atleta morre durante uma competição de dardos.',
      solution: 'Um dos dardos foi envenenado. O atleta se cortou acidentalmente ao retirá-lo do alvo.',
      difficulty: 'medium',
      theme: 'murder',
      name: 'Dardo Mortal',
      title: 'Dardo Mortal',
      description: 'Precisão pode ser perigosa.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop'
    },
    // Add 17 more cases for fim-de-jogo...
    {
      id: 'fim-jogo-020',
      order: 20,
      mystery: 'Um gamer profissional morre durante uma competição online.',
      solution: 'Ele foi eletrocutado por um controle modificado por um rival para dar choques fatais.',
      difficulty: 'hard',
      theme: 'murder',
      name: 'Game Over',
      title: 'Game Over',
      description: 'Quando o jogo se torna realidade.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop'
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
    },
    {
      id: 'absurdamente-real-002',
      order: 2,
      mystery: 'Uma mulher morre sufocada por uma almofada que explodiu.',
      solution: 'A almofada estava cheia de penas tratadas com produtos químicos que se tornaram tóxicos com o calor.',
      difficulty: 'easy',
      theme: 'danger',
      name: 'Almofada Explosiva',
      title: 'Almofada Explosiva',
      description: 'Conforto pode ser perigoso.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop'
    },
    {
      id: 'absurdamente-real-003',
      order: 3,
      mystery: 'Um homem morre esmagado por uma televisão que caiu do teto.',
      solution: 'A TV estava mal fixada e caiu quando ele aumentou o volume, fazendo-a vibrar.',
      difficulty: 'easy',
      theme: 'danger',
      name: 'TV Assassina',
      title: 'TV Assassina',
      description: 'Entretenimento pode ser mortal.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    },
    // Add 17 more cases for absurdamente-real...
    {
      id: 'absurdamente-real-020',
      order: 20,
      mystery: 'Um homem morre após ser atingido por um meteorito.',
      solution: 'Na verdade, foi atingido por gelo que caiu de um avião, mas a raridade do evento fez parecer sobrenatural.',
      difficulty: 'hard',
      theme: 'danger',
      name: 'Chuva de Gelo',
      title: 'Chuva de Gelo',
      description: 'Quando o impossível acontece.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop'
    }
  ]
};

// Function to get cases for a specific pack
export const getPackCases = (packId: string): Case[] => {
  return packCasesMap[packId] || [];
};
