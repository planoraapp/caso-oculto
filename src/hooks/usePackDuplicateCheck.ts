import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePackDuplicateCheck = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkForDuplicates = useCallback(async (
    userId: string,
    packIds: string[],
    paymentType: 'individual' | 'combo' | 'complete'
  ) => {
    setIsChecking(true);
    
    try {
      // Buscar packs que o usuário já possui
      const { data: existingAccess, error } = await supabase
        .from('user_pack_access')
        .select('pack_id')
        .eq('user_id', userId)
        .eq('is_active', true)
        .in('pack_id', packIds);

      if (error) {
        console.error('Erro ao verificar packs existentes:', error);
        return {
          hasDuplicates: false,
          duplicates: [],
          newPacks: packIds,
          message: 'Erro ao verificar packs existentes'
        };
      }

      const existingPackIds = existingAccess.map(access => access.pack_id);
      const duplicates = packIds.filter(packId => existingPackIds.includes(packId));
      const newPacks = packIds.filter(packId => !existingPackIds.includes(packId));

      const hasDuplicates = duplicates.length > 0;

      let message = '';
      if (hasDuplicates) {
        if (paymentType === 'complete') {
          message = `Você já possui ${duplicates.length} pack(s) incluído(s) no Acesso Total. Os packs serão mantidos e você terá acesso vitalício garantido.`;
        } else if (paymentType === 'combo') {
          message = `Você já possui ${duplicates.length} pack(s) selecionado(s). Apenas os ${newPacks.length} novos packs serão adicionados.`;
        } else {
          message = `Você já possui este pack. O acesso será renovado/mantido.`;
        }
      }

      return {
        hasDuplicates,
        duplicates,
        newPacks,
        message,
        existingPacksCount: existingPackIds.length,
        totalAvailablePacks: 15
      };

    } catch (error) {
      console.error('Erro ao verificar duplicatas:', error);
      return {
        hasDuplicates: false,
        duplicates: [],
        newPacks: packIds,
        message: 'Erro ao verificar duplicatas'
      };
    } finally {
      setIsChecking(false);
    }
  }, []);

  const getUserPacksInfo = useCallback(async (userId: string) => {
    try {
      const { data: userAccess, error } = await supabase
        .from('user_pack_access')
        .select('pack_id')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) {
        console.error('Erro ao buscar packs do usuário:', error);
        return {
          ownedPacks: [],
          ownedCount: 0,
          hasCompleteAccess: false
        };
      }

      const ownedPacks = userAccess.map(access => access.pack_id);
      
      // Verificar se tem acesso total
      const { data: profile } = await supabase
        .from('profiles')
        .select('acesso_total')
        .eq('id', userId)
        .single();

      return {
        ownedPacks,
        ownedCount: ownedPacks.length,
        hasCompleteAccess: profile?.acesso_total || false
      };

    } catch (error) {
      console.error('Erro ao buscar informações de packs:', error);
      return {
        ownedPacks: [],
        ownedCount: 0,
        hasCompleteAccess: false
      };
    }
  }, []);

  return {
    checkForDuplicates,
    getUserPacksInfo,
    isChecking
  };
};