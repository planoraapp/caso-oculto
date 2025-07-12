
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
        console.log('=== FETCHING USER PACKS DEBUG ===');
        console.log('User ID:', user.id);
        setError(null);

        // First check if user has complete access
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('acesso_total, packs_liberados')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
        }

        console.log('User profile:', profile);

        if (profile?.acesso_total) {
          console.log('User has complete access - fetching all packs');
          const { data: allPacks, error: packsError } = await supabase
            .from('packs')
            .select('*')
            .neq('id', 'pack-03')
            .order('created_at', { ascending: false });

          if (packsError) {
            console.error('Error fetching all packs:', packsError);
            throw packsError;
          }

          const userPackData = (allPacks || [])
            .map(pack => {
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
            });

          console.log('Complete access packs loaded:', userPackData.length);
          setUserPacks(userPackData);
        } else {
          // Collect pack IDs from multiple sources
          const packIds = new Set<string>();

          // 1. From payment_sessions (approved purchases)
          console.log('Fetching from payment_sessions...');
          const { data: paymentSessions, error: paymentsError } = await supabase
            .from('payment_sessions')
            .select('pack_id, selected_pack_ids, payment_type, status')
            .eq('user_id', user.id)
            .eq('status', 'approved');

          if (paymentsError) {
            console.error('Error fetching payment sessions:', paymentsError);
          } else {
            console.log('Payment sessions found:', paymentSessions?.length || 0);
            paymentSessions?.forEach(session => {
              console.log('Processing session:', session);
              if (session.pack_id) {
                packIds.add(session.pack_id);
                console.log('Added individual pack:', session.pack_id);
              }
              if (session.selected_pack_ids && Array.isArray(session.selected_pack_ids)) {
                session.selected_pack_ids.forEach(id => {
                  packIds.add(id);
                  console.log('Added combo pack:', id);
                });
              }
            });
          }

          // 2. From user_pack_access (manual grants)
          console.log('Fetching from user_pack_access...');
          const { data: packAccess, error: accessError } = await supabase
            .from('user_pack_access')
            .select('pack_id')
            .eq('user_id', user.id)
            .eq('is_active', true);

          if (accessError) {
            console.error('Error fetching pack access:', accessError);
          } else {
            console.log('Pack access found:', packAccess?.length || 0);
            packAccess?.forEach(access => {
              if (access.pack_id) {
                packIds.add(access.pack_id);
                console.log('Added manual access pack:', access.pack_id);
              }
            });
          }

          // 3. From profile packs_liberados (legacy)
          if (profile?.packs_liberados && Array.isArray(profile.packs_liberados)) {
            console.log('Adding legacy packs from profile:', profile.packs_liberados);
            profile.packs_liberados.forEach(packId => packIds.add(packId));
          }

          console.log('Total unique pack IDs collected:', Array.from(packIds));

          if (packIds.size === 0) {
            console.log('No packs found for user');
            setUserPacks([]);
            return;
          }

          // Fetch pack details
          const { data: packs, error: packsError } = await supabase
            .from('packs')
            .select('*')
            .in('id', Array.from(packIds))
            .neq('id', 'pack-03');

          if (packsError) {
            console.error('Error fetching pack details:', packsError);
            throw packsError;
          }

          console.log('Pack details fetched:', packs?.length || 0);

          const userPackData = (packs || [])
            .map(pack => {
              const cases = getPackCases(pack.id) || [];
              console.log(`Pack ${pack.id} (${pack.name}) has ${cases.length} cases`);
              
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
            });

          console.log('Final user packs loaded:', userPackData.length);
          setUserPacks(userPackData);
        }
      } catch (error) {
        console.error('Critical error in useUserPacks:', error);
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
