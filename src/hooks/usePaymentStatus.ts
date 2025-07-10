
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePaymentValidation } from './usePaymentValidation';

export interface PaymentStatus {
  isOpen: boolean;
  status: 'approved' | 'rejected' | 'pending' | null;
  packName: string;
}

export const usePaymentStatus = (userId: string) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    isOpen: false,
    status: null,
    packName: ''
  });

  const { validatePaymentType, clearErrors } = usePaymentValidation();

  const createPaymentSession = useCallback(async (
    packId: string | null, 
    paymentType: 'individual' | 'combo' | 'complete',
    selectedPackIds?: string[]
  ) => {
    console.log('Creating payment session:', { packId, paymentType, selectedPackIds, userId });
    
    // Validar entrada antes de processar
    if (!validatePaymentType(paymentType, packId, selectedPackIds)) {
      throw new Error('Dados de pagamento inválidos');
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: {
          type: paymentType,
          packId,
          selectedPackIds,
          userId
        }
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw new Error(error.message || 'Erro ao criar pagamento');
      }

      if (!data || !data.session_id) {
        console.error('Invalid response from create-stripe-session:', data);
        throw new Error('Resposta inválida do servidor');
      }

      console.log('Stripe session created:', data);
      return {
        id: `session_${Date.now()}`,
        stripe_session_id: data.session_id,
        status: 'pending' as const,
        init_point: data.init_point
      };
    } catch (error) {
      console.error('Error in createPaymentSession:', error);
      throw error;
    } finally {
      clearErrors();
    }
  }, [userId, validatePaymentType, clearErrors]);

  const simulatePaymentConfirmation = useCallback(async (sessionId: string, success: boolean) => {
    console.log('Simulating payment confirmation:', { sessionId, success });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success };
  }, []);

  const showPaymentStatus = useCallback((status: 'approved' | 'rejected' | 'pending', packName: string) => {
    setPaymentStatus({
      isOpen: true,
      status,
      packName
    });
  }, []);

  const closePaymentStatus = useCallback(() => {
    setPaymentStatus({
      isOpen: false,
      status: null,
      packName: ''
    });
  }, []);

  return {
    paymentStatus,
    createPaymentSession,
    simulatePaymentConfirmation,
    showPaymentStatus,
    closePaymentStatus
  };
};
