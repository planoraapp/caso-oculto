
import { useState, useCallback } from 'react';
import { usePaymentStatus } from './usePaymentStatus';

export interface PaymentManagerState {
  isLoading: boolean;
  checkoutPreferenceId: string | null;
  isPaymentModalOpen: boolean;
  isComboModalOpen: boolean;
  selectedPack: any;
}

export const usePaymentManager = (userId: string) => {
  const [state, setState] = useState<PaymentManagerState>({
    isLoading: false,
    checkoutPreferenceId: null,
    isPaymentModalOpen: false,
    isComboModalOpen: false,
    selectedPack: null
  });

  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus
  } = usePaymentStatus(userId);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setCheckoutPreferenceId = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, checkoutPreferenceId: id }));
  }, []);

  const openPaymentModal = useCallback((pack?: any) => {
    setState(prev => ({ 
      ...prev, 
      isPaymentModalOpen: true,
      selectedPack: pack || null
    }));
  }, []);

  const closePaymentModal = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isPaymentModalOpen: false,
      selectedPack: null
    }));
  }, []);

  const openComboModal = useCallback(() => {
    setState(prev => ({ ...prev, isComboModalOpen: true }));
  }, []);

  const closeComboModal = useCallback(() => {
    setState(prev => ({ ...prev, isComboModalOpen: false }));
  }, []);

  const handlePaymentCreated = useCallback((preferenceId: string) => {
    setCheckoutPreferenceId(preferenceId);
    closePaymentModal();
  }, []);

  const handlePurchaseCombo = useCallback(async (selectedPackIds: string[]) => {
    if (state.isLoading || !userId) return;
    setLoading(true);
    
    try {
      console.log('Starting combo purchase for packs:', selectedPackIds);
      const session = await createPaymentSession(null, 'combo', selectedPackIds);
      setCheckoutPreferenceId(session.mercadopago_preference_id);
      closeComboModal();
    } catch (error) {
      console.error('Erro ao processar pagamento do combo:', error);
      showPaymentStatus('rejected', 'Combo 5 Packs');
    } finally {
      setLoading(false);
    }
  }, [state.isLoading, userId, createPaymentSession, showPaymentStatus]);

  const handleCompletePurchase = useCallback(async () => {
    if (state.isLoading || !userId) return;
    setLoading(true);
    
    try {
      console.log('Starting complete access purchase');
      const session = await createPaymentSession(null, 'complete');
      setCheckoutPreferenceId(session.mercadopago_preference_id);
    } catch (error) {
      console.error('Erro ao processar pagamento completo:', error);
      showPaymentStatus('rejected', 'Acesso Total');
    } finally {
      setLoading(false);
    }
  }, [state.isLoading, userId, createPaymentSession, showPaymentStatus]);

  return {
    // State
    ...state,
    paymentStatus,
    
    // Actions
    setLoading,
    setCheckoutPreferenceId,
    openPaymentModal,
    closePaymentModal,
    openComboModal,
    closeComboModal,
    handlePaymentCreated,
    handlePurchaseCombo,
    handleCompletePurchase,
    closePaymentStatus,
    
    // Services
    createPaymentSession,
    showPaymentStatus
  };
};
