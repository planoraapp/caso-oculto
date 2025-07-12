
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { getPackCases } from '../data/cases';
import { Pack } from '../data/types';

interface UseUserPacksReturn {
  userPacks: Pack[];
  loading: boolean;
}

export const useUserPacks = (user: any): UseUserPacksReturn => {
  const [userPacks, setUserPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPacks = async () => {
      if (!user?.id) return;

      try {
        console.log('Fetching user packs for user:', user.id);

        // First check if user has complete access
        const { data: profile } = await supabase
          .from('profiles')
          .select('acesso_total')
          .eq('id', user.id)
          .single();

        console.log('User profile:', profile);

        if (profile?.acesso_total) {
          // User has complete access - fetch all packs
          console.log('User has complete access - fetching all packs');
          const { data: allPacks } = await supabase
            .from('packs')
            .select('*')
            .order('created_at', { ascending: false });

          const userPackData = (allPacks || [])
            .map(pack => {
              if (pack && typeof pack === 'object') {
                const cases = getPackCases(pack.id) || [];
                return {
                  id: pack.id,
                  name: pack.name,
                  description: pack.description,
                  image: pack.image,
                  price: pack.price,
                  difficulty: pack.difficulty as 'easy' | 'medium' | 'hard',
                  category: pack.category,
                  created_at: pack.created_at,
                  updated_at: pack.updated_at,
                  cases: cases,
                  owned: true
                };
              }
              return null;
            })
            .filter(Boolean) as Pack[];

          console.log('All packs for complete access user:', userPackData);
          setUserPacks(userPackData);
        } else {
          // Fetch specific packs using user_pack_access as primary source
          console.log('Fetching specific packs from user_pack_access');
          
          const { data: packAccess, error } = await supabase
            .from('user_pack_access')
            .select(`
              pack_id,
              packs (
                id,
                name,
                description,
                image,
                price,
                difficulty,
                category,
                created_at,
                updated_at
              )
            `)
            .eq('user_id', user.id)
            .eq('is_active', true);

          console.log('Pack access data:', packAccess, 'Error:', error);

          if (error) {
            console.error('Error fetching user packs:', error);
            return;
          }

          const userPackData = (packAccess || [])
            .map(access => {
              // Type assertion to help TypeScript understand the structure
              const pack = access.packs as any;
              if (pack && typeof pack === 'object') {
                const cases = getPackCases(pack.id) || [];
                return { 
                  id: pack.id,
                  name: pack.name,
                  description: pack.description,
                  image: pack.image,
                  price: pack.price,
                  difficulty: pack.difficulty as 'easy' | 'medium' | 'hard',
                  category: pack.category,
                  created_at: pack.created_at,
                  updated_at: pack.updated_at,
                  cases: cases,
                  owned: true 
                };
              }
              return null;
            })
            .filter(Boolean) as Pack[];

          console.log('User specific packs:', userPackData);
          setUserPacks(userPackData);
        }
      } catch (error) {
        console.error('Error fetching user packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  return { userPacks, loading };
};
