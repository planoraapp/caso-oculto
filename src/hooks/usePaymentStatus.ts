
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { purchasePack, MERCADOPAGO_LINKS } from '@/data/packs';

export const usePaymentStatus = (userId: string) => {
  const [paymentStatus, setPaymentStatus] = useState<{
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    packName?: string;
    isOpen: boolean;
  }>({
    status: 'pending',
    isOpen: false
  });
  
  const { toast } = useToast();

  const createPaymentSession = useCallback(async (
    packId: string,
    paymentType: 'individual' | 'combo' | 'complete',
    selectedPackIds?: string[]
  ) => {
    try {
      const preferenceIds = {
        individual: MERCADOPAGO_LINKS.individual,
        combo: MERCADOPAGO_LINKS.combo,
        complete: MERCADOPAGO_LINKS.complete
      };

      const { data, error } = await supabase
        .from('payment_sessions')
        .insert({
          user_id: userId,
          pack_id: packId,
          selected_pack_ids: selectedPackIds,
          payment_type: paymentType,
          mercadopago_preference_id: preferenceIds[paymentType],
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error creating payment session:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar sessão de pagamento",
        variant: "destructive"
      });
      return null;
    }
  }, [userId, toast]);

  const checkPaymentStatus = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  }, []);

  const showPaymentStatus = useCallback((
    status: 'pending' | 'approved' | 'rejected' | 'cancelled', 
    packName?: string
  ) => {
    setPaymentStatus({
      status,
      packName,
      isOpen: true
    });
  }, []);

  const closePaymentStatus = useCallback(() => {
    setPaymentStatus(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Simular confirmação de pagamento (em produção seria webhook do Mercado Pago)
  const simulatePaymentConfirmation = useCallback(async (sessionId: string, approved: boolean = true) => {
    try {
      const session = await checkPaymentStatus(sessionId);
      if (!session) return;

      const newStatus = approved ? 'approved' : 'rejected';
      
      const { error } = await supabase
        .rpc('update_payment_session_status', {
          session_id: sessionId,
          new_status: newStatus
        });

      if (error) throw error;

      if (approved) {
        // Adicionar pack(s) à biblioteca do usuário
        const transactionId = `mp_${sessionId}_${Date.now()}`;
        
        if (session.payment_type === 'combo' && session.selected_pack_ids) {
          session.selected_pack_ids.forEach(packId => {
            purchasePack(userId, packId, 12.28, transactionId);
          });
        } else if (session.pack_id) {
          const price = session.payment_type === 'individual' ? 14.80 : 
                       session.payment_type === 'complete' ? 110.90 : 61.40;
          purchasePack(userId, session.pack_id, price, transactionId);
        }

        toast({
          title: "Pagamento Confirmado!",
          description: "Pack adicionado à sua biblioteca",
        });
        
        // Recarregar dados sem recarregar a página inteira
        setTimeout(() => {
          window.dispatchEvent(new Event('storage'));
        }, 1000);
      }

      return newStatus;
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast({
        title: "Erro",
        description: "Erro ao confirmar pagamento",
        variant: "destructive"
      });
      return null;
    }
  }, [checkPaymentStatus, userId, toast]);

  return {
    paymentStatus,
    createPaymentSession,
    checkPaymentStatus,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  };
};
