
import { Pack, Case } from '@/data/types';

// Helper function to validate pack data
export const validatePackData = (pack: Partial<Pack>): boolean => {
  return !!(pack.id && pack.name && pack.description && pack.price && pack.difficulty);
};

// Helper function to format pack price
export const formatPackPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

// Helper function to get difficulty color
export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

// Helper function to get difficulty emoji
export const getDifficultyEmoji = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy':
      return '🟢';
    case 'medium':
      return '🟡';
    case 'hard':
      return '🔴';
    default:
      return '⚪';
  }
};

// Helper function to calculate pack progress
export const calculatePackProgress = (cases: Case[], solvedCases: string[]): number => {
  if (!cases || cases.length === 0) return 0;
  const solvedCount = cases.filter(c => solvedCases.includes(c.id)).length;
  return Math.round((solvedCount / cases.length) * 100);
};

// Helper function to get pack category color
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'mystery':
      return 'bg-purple-500';
    case 'thriller':
      return 'bg-red-500';
    case 'crime':
      return 'bg-orange-500';
    case 'conspiracy':
      return 'bg-gray-500';
    case 'danger':
      return 'bg-yellow-500';
    case 'murder':
      return 'bg-red-700';
    default:
      return 'bg-blue-500';
  }
};
