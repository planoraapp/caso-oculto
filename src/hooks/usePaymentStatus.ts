
import { useState, useCallback } from 'react';

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

  const createPaymentSession = useCallback(async (
    packId: string | null, 
    paymentType: 'individual' | 'combo' | 'complete',
    selectedPackIds?: string[]
  ) => {
    // Simulate creating a payment session
    const sessionId = `session_${Date.now()}`;
    const preferenceId = `pref_${Date.now()}`;
    
    console.log('Creating payment session:', { packId, paymentType, selectedPackIds, userId });
    
    return {
      id: sessionId,
      mercadopago_preference_id: preferenceId,
      status: 'pending'
    };
  }, [userId]);

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
