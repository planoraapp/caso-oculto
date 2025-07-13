
import { supabase } from '../integrations/supabase/client';
import { Pack } from '../data/types';
import { getPackCases } from '../data/cases';

export class PackService {
  static async getAllPacks(): Promise<Pack[]> {
    try {
      const { data, error } = await supabase
        .from('packs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching packs:', error);
        throw error;
      }

      const packsWithCases = data?.map(pack => {
        const cases = getPackCases(pack.id);
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
  }

  static async getPackById(packId: string): Promise<Pack | null> {
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

      const cases = getPackCases(data.id);
      return {
        ...data,
        difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
        cases: cases
      };
    } catch (error) {
      console.error('Error in getPackById:', error);
      return null;
    }
  }

  static async getUserPacks(userId: string): Promise<string[]> {
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
  }

  static async createPack(pack: Omit<Pack, 'cases'>): Promise<Pack | null> {
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
  }

  static async updatePack(packId: string, updates: Partial<Omit<Pack, 'cases'>>): Promise<Pack | null> {
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
  }

  static async deletePack(packId: string): Promise<boolean> {
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
  }
}
