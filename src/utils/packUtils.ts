
import { supabase } from '../integrations/supabase/client';
import { Pack, Case } from '../data/types';

// Generate cases for each pack dynamically
export const generateCasesForPack = (packId: string, packName: string): Case[] => {
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
