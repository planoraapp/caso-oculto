
// Re-export all pack utilities from the new service layer
export {
  PackService
} from '../services/packService';

// Mantém compatibilidade com o código existente
export const getAllPacks = PackService.getAllPacks;
export const getPackById = PackService.getPackById;
export const getUserPacks = PackService.getUserPacks;
export const createPack = PackService.createPack;
export const updatePack = PackService.updatePack;
export const deletePack = PackService.deletePack;

// Mantém as funções de utilitários existentes
export {
  validatePackData,
  formatPackPrice,
  getDifficultyColor,
  getDifficultyEmoji,
  calculatePackProgress,
  getCategoryColor
} from './pack/packHelpers';
