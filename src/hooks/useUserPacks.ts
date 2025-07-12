
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { getPackCases } from '../data/cases';
import { Pack } from '../data/types';

interface UseUserPacksReturn {
  userPacks: Pack[];
  loading: boolean;
  error: string | null;
}

export const useUserPacks = (user: any): UseUserPacksReturn => {
  const [userPacks, setUserPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPacks = async () => {
      if (!user?.id) {
        console.log('useUserPacks: No user ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('useUserPacks: Fetching user packs for user:', user.id);
        setError(null);

        // First check if user has complete access
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('acesso_total')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('useUserPacks: Error fetching profile:', profileError);
          // Continue without throwing error - user might not have profile yet
        }

        console.log('useUserPacks: User profile:', profile);

        if (profile?.acesso_total) {
          // User has complete access - fetch all packs
          console.log('useUserPacks: User has complete access - fetching all packs');
          const { data: allPacks, error: packsError } = await supabase
            .from('packs')
            .select('*')
            .order('created_at', { ascending: false });

          if (packsError) {
            console.error('useUserPacks: Error fetching all packs:', packsError);
            throw packsError;
          }

          const userPackData = (allPacks || [])
            .map(pack => {
              if (pack && typeof pack === 'object') {
                const cases = getPackCases(pack.id) || [];
                console.log(`useUserPacks: Pack ${pack.id} has ${cases.length} cases`);
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

          console.log('useUserPacks: All packs for complete access user:', userPackData.length);
          setUserPacks(userPackData);
        } else {
          // Fetch specific packs using user_pack_access as primary source
          console.log('useUserPacks: Fetching specific packs from user_pack_access');
          
          const { data: packAccess, error: accessError } = await supabase
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

          console.log('useUserPacks: Pack access query result:', { 
            data: packAccess, 
            error: accessError,
            count: packAccess?.length || 0 
          });

          if (accessError) {
            console.error('useUserPacks: Error fetching user pack access:', accessError);
            throw accessError;
          }

          if (!packAccess || packAccess.length === 0) {
            console.log('useUserPacks: No pack access found for user');
            setUserPacks([]);
            return;
          }

          const userPackData = (packAccess || [])
            .map((access, index) => {
              console.log(`useUserPacks: Processing access record ${index}:`, access);
              
              // Type assertion to help TypeScript understand the structure
              const pack = access.packs as any;
              if (pack && typeof pack === 'object' && pack.id) {
                const cases = getPackCases(pack.id) || [];
                console.log(`useUserPacks: Pack ${pack.id} (${pack.name}) has ${cases.length} cases`);
                
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
              } else {
                console.warn('useUserPacks: Invalid pack data for access record:', access);
                return null;
              }
            })
            .filter(Boolean) as Pack[];

          console.log('useUserPacks: User specific packs loaded:', userPackData.length);
          setUserPacks(userPackData);
        }
      } catch (error) {
        console.error('useUserPacks: Error fetching user packs:', error);
        setError(error instanceof Error ? error.message : 'Erro ao carregar packs');
        setUserPacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  return { userPacks, loading, error };
};
