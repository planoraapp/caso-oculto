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
    selectedPackIds?: string[],
    couponCode?: string,
    totalAmount?: number
  ) => {
    console.log('Creating payment session:', { packId, paymentType, selectedPackIds, userId, couponCode, totalAmount });
    
    // Validar entrada antes de processar
    if (!validatePaymentType(paymentType, packId, selectedPackIds)) {
      throw new Error('Dados de pagamento inválidos');
    }

    try {
      const requestBody = {
        paymentType, // Padronizado para paymentType
        packId,
        selectedPackIds,
        userId,
        couponCode: couponCode || null,
        totalAmount: totalAmount || null
      };

      console.log('Sending request body to edge function:', requestBody);

      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: requestBody
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw new Error(error.message || 'Erro ao criar pagamento');
      }

      if (!data || (!data.sessionId && !data.url)) {
        console.error('Invalid response from create-stripe-session:', data);
        throw new Error('Resposta inválida do servidor');
      }

      console.log('Stripe session created:', data);
      return {
        id: data.sessionId || `session_${Date.now()}`,
        stripe_session_id: data.sessionId,
        status: 'pending' as const,
        init_point: data.url
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
