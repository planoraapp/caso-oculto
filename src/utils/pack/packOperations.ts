
import { supabase } from '@/integrations/supabase/client';
import { Pack } from '@/data/types';
import { getPackCases } from '@/data/cases';

// Create a new pack (admin only)
export const createPack = async (pack: Omit<Pack, 'cases'>): Promise<Pack | null> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .insert([{
        id: pack.id,
        name: pack.name,
        description: pack.description,
        price: pack.price,
        difficulty: pack.difficulty,
        image: pack.image,
        category: pack.category
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating pack:', error);
      throw error;
    }

    if (!data) return null;

    return {
      ...data,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
      cases: []
    };
  } catch (error) {
    console.error('Error in createPack:', error);
    return null;
  }
};

// Update an existing pack (admin only)
export const updatePack = async (packId: string, updates: Partial<Omit<Pack, 'cases'>>): Promise<Pack | null> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .update(updates)
      .eq('id', packId)
      .select()
      .single();

    if (error) {
      console.error('Error updating pack:', error);
      throw error;
    }

    if (!data) return null;

    return {
      ...data,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
      cases: getPackCases(data.id) || []
    };
  } catch (error) {
    console.error('Error in updatePack:', error);
    return null;
  }
};

// Delete a pack (admin only)
export const deletePack = async (packId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('packs')
      .delete()
      .eq('id', packId);

    if (error) {
      console.error('Error deleting pack:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePack:', error);
    return false;
  }
};
