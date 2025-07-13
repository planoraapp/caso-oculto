

import { PackService } from '../services/packService';

// Re-export all pack utilities from the new service layer
export { PackService };

// Mantém compatibilidade com o código existente
export const getAllPacks = () => PackService.getAllPacks();
export const getPackById = (packId: string) => PackService.getPackById(packId);
export const getUserPacks = (userId: string) => PackService.getUserPacks(userId);
export const createPack = (pack: any) => PackService.createPack(pack);
export const updatePack = (packId: string, updates: any) => PackService.updatePack(packId, updates);
export const deletePack = (packId: string) => PackService.deletePack(packId);

// Mantém as funções de utilitários existentes
export {
  validatePackData,
  formatPackPrice,
  getDifficultyColor,
  getDifficultyEmoji,
  calculatePackProgress,
  getCategoryColor
} from './pack/packHelpers';

