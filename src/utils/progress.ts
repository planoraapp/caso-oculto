
import { Case } from '../data/types';

export const calculatePackProgress = (
  cases: Case[], 
  solvedCases: string[]
): { progress: number; solvedCount: number; totalCount: number } => {
  if (!cases?.length) return { progress: 0, solvedCount: 0, totalCount: 0 };
  
  const solvedCount = cases.filter(c => solvedCases.includes(c.id)).length;
  const totalCount = cases.length;
  const progress = Math.round((solvedCount / totalCount) * 100);
  
  return { progress, solvedCount, totalCount };
};

export const getLocalStorageKey = (type: string, userId: string, packId: string): string => 
  `${type}_${userId}_${packId}`;

export const getSolvedCards = (userId: string, packId: string): string[] =>
  JSON.parse(localStorage.getItem(getLocalStorageKey('solved', userId, packId)) || '[]');

export const setSolvedCards = (userId: string, packId: string, solvedCards: string[]): void =>
  localStorage.setItem(getLocalStorageKey('solved', userId, packId), JSON.stringify(solvedCards));
