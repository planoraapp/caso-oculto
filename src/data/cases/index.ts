
import { Case } from '../types';
import { labirintosMentaisCases } from './labirintosMentaisCases';
import { jogosCorporativosCases } from './jogosCorporativosCases';
import { sussurrosAlemCases } from './sussurrosAlemCases';
import { sombrasNoiteCases } from './sombrasNoiteCases';
import { crimesImperfeitosCases } from './crimesImperfeitosCases';
import { lendasUrbanasCases } from './lendasUrbanasCases';
import { paradoxosMortaisCases } from './paradoxosMortaisCases';
import { ironiasDestinoCases } from './ironiasDestinoCases';
import { becoSemSaidaCases } from './becoSemSaidaCases';
import { crimesEpocaCases } from './crimesEpocaCases';
import { viagemSemVoltaCases } from './viagemSemVoltaCases';
import { dossieConfidencialCases } from './dossieConfidencialCases';
import { doseLetalCases } from './doseLetalCases';
import { fimDeJogoCases } from './fimDeJogoCases';
import { absurdamenteRealCases } from './absurdamenteRealCases';

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
  'ironias-do-destino': ironiasDestinoCases,
  'beco-sem-saida': becoSemSaidaCases,
  'crimes-de-epoca': crimesEpocaCases,
  'viagem-sem-volta': viagemSemVoltaCases,
  'dossie-confidencial': dossieConfidencialCases,
  'dose-letal': doseLetalCases,
  'fim-de-jogo': fimDeJogoCases,
  'absurdamente-real': absurdamenteRealCases
};

// Function to get cases for a specific pack
export const getPackCases = (packId: string): Case[] => {
  return packCasesMap[packId] || [];
};
