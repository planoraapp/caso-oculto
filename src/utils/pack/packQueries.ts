
import { supabase } from '@/integrations/supabase/client';
import { Pack } from '@/data/types';
import { getPackCases } from '@/data/cases';

// Get all packs from Supabase with their respective cases
export const getAllPacks = async (): Promise<Pack[]> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching packs:', error);
      throw error;
    }

    // Add cases to each pack and properly type the difficulty
    const packsWithCases = data?.map(pack => {
      const cases = getPackCases(pack.id);
      console.log(`Pack ${pack.id} (${pack.name}) has ${cases.length} cases`);
      
      return {
        ...pack,
        difficulty: pack.difficulty as 'easy' | 'medium' | 'hard',
        cases: cases
      };
    }) || [];

    return packsWithCases;
  } catch (error) {
    console.error('Error in getAllPacks:', error);
    throw error;
  }
};

// Get a specific pack by ID from Supabase with its cases
export const getPackById = async (packId: string): Promise<Pack | null> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .eq('id', packId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching pack:', error);
      throw error;
    }

    if (!data) return null;

    // Add cases to the pack and properly type the difficulty
    const cases = getPackCases(data.id);
    console.log(`Pack ${data.id} (${data.name}) loaded with ${cases.length} cases`);

    const packWithCases = {
      ...data,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
      cases: cases
    };

    return packWithCases;
  } catch (error) {
    console.error('Error in getPackById:', error);
    return null;
  }
};

// Get user's purchased packs
export const getUserPacks = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('user_pack_access')
      .select('pack_id')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching user packs:', error);
      throw error;
    }

    return data?.map(item => item.pack_id) || [];
  } catch (error) {
    console.error('Error in getUserPacks:', error);
    return [];
  }
};
