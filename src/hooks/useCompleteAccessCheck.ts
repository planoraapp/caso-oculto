
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export const useCompleteAccessCheck = (userId: string | undefined) => {
  const [hasCompleteAccess, setHasCompleteAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCompleteAccess = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Verificar se tem acesso_total no perfil
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('acesso_total')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Erro ao verificar acesso total:', error);
          setHasCompleteAccess(false);
        } else {
          setHasCompleteAccess(profile?.acesso_total || false);
        }
      } catch (error) {
        console.error('Erro ao verificar acesso total:', error);
        setHasCompleteAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkCompleteAccess();
  }, [userId]);

  return { hasCompleteAccess, isLoading };
};
