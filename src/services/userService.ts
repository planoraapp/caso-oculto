
import { supabase } from '../integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  acesso_total: boolean;
  packs_liberados: string[];
  created_at: string;
  updated_at: string;
}

export interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

export class UserService {
  static async getAllUsers(): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('admin-list-users');
      
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      return data.users || [];
    } catch (error) {
      console.error('Error loading users:', error);
      throw error;
    }
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  static async getUserPackAccess(userId: string): Promise<UserPackAccess[]> {
    try {
      const { data, error } = await supabase
        .from('user_pack_access')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching user pack access:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserPackAccess:', error);
      return [];
    }
  }

  static async grantPackAccess(userId: string, packId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .insert([{
          user_id: userId,
          pack_id: packId,
          is_active: true
        }]);

      if (error) {
        console.error('Error granting pack access:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in grantPackAccess:', error);
      return false;
    }
  }

  static async revokePackAccess(accessId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .update({ is_active: false })
        .eq('id', accessId);

      if (error) {
        console.error('Error revoking pack access:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in revokePackAccess:', error);
      return false;
    }
  }

  static async deleteUser(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}
