
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
        console.log('useUserPacks: No user ID provided', { user });
        setLoading(false);
        return;
      }

      try {
        console.log('useUserPacks: Fetching user packs for user:', user.id);
        console.log('useUserPacks: User object:', user);
        setError(null);

        // First check if user has complete access
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('acesso_total')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('useUserPacks: Error fetching profile:', profileError);
        }

        console.log('useUserPacks: User profile:', profile);

        if (profile?.acesso_total) {
          // User has complete access - fetch all packs
          console.log('useUserPacks: User has complete access - fetching all packs');
          const { data: allPacks, error: packsError } = await supabase
            .from('packs')
            .select('*')
            .neq('id', 'pack-03') // Excluir Pack Misterioso 03
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
          // Fetch user's purchased packs from payment_sessions
          console.log('useUserPacks: Fetching user specific packs from payment_sessions');
          
          const { data: paymentSessions, error: paymentsError } = await supabase
            .from('payment_sessions')
            .select('pack_id, selected_pack_ids')
            .eq('user_id', user.id)
            .eq('status', 'approved');

          if (paymentsError) {
            console.error('useUserPacks: Error fetching payment sessions:', paymentsError);
            throw paymentsError;
          }

          console.log('useUserPacks: Payment sessions found:', paymentSessions?.length || 0);

          // Collect all pack IDs from purchases
          const packIds = new Set<string>();
          
          if (paymentSessions) {
            paymentSessions.forEach(session => {
              if (session.pack_id) {
                packIds.add(session.pack_id);
              }
              if (session.selected_pack_ids && Array.isArray(session.selected_pack_ids)) {
                session.selected_pack_ids.forEach(id => packIds.add(id));
              }
            });
          }

          // Also check user_pack_access table as fallback
          const { data: packAccess, error: accessError } = await supabase
            .from('user_pack_access')
            .select('pack_id')
            .eq('user_id', user.id)
            .eq('is_active', true);

          if (accessError) {
            console.log('useUserPacks: Could not fetch user_pack_access (expected if no direct access)');
          } else if (packAccess) {
            packAccess.forEach(access => {
              if (access.pack_id) packIds.add(access.pack_id);
            });
          }

          console.log('useUserPacks: Collected pack IDs:', Array.from(packIds));

          if (packIds.size === 0) {
            console.log('useUserPacks: No packs found for user');
            setUserPacks([]);
            return;
          }

          // Fetch pack details
          const { data: packs, error: packsError } = await supabase
            .from('packs')
            .select('*')
            .in('id', Array.from(packIds))
            .neq('id', 'pack-03'); // Excluir Pack Misterioso 03

          if (packsError) {
            console.error('useUserPacks: Error fetching packs:', packsError);
            throw packsError;
          }

          const userPackData = (packs || [])
            .map(pack => {
              if (pack && typeof pack === 'object') {
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
                console.warn('useUserPacks: Invalid pack data:', pack);
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
