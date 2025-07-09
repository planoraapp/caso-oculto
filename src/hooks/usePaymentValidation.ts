
import { useState, useCallback } from 'react';

export interface PaymentValidationError {
  field: string;
  message: string;
}

export const usePaymentValidation = () => {
  const [errors, setErrors] = useState<PaymentValidationError[]>([]);

  const validatePackId = useCallback((packId: string | null): boolean => {
    if (!packId || packId.trim() === '') {
      setErrors([{ field: 'packId', message: 'Pack ID é obrigatório' }]);
      return false;
    }
    return true;
  }, []);

  const validateSelectedPacks = useCallback((selectedPackIds: string[]): boolean => {
    if (!selectedPackIds || selectedPackIds.length === 0) {
      setErrors([{ field: 'selectedPacks', message: 'Pelo menos um pack deve ser selecionado' }]);
      return false;
    }
    return true;
  }, []);

  const validatePaymentType = useCallback((
    paymentType: 'individual' | 'combo' | 'complete',
    packId: string | null,
    selectedPackIds?: string[]
  ): boolean => {
    const newErrors: PaymentValidationError[] = [];

    switch (paymentType) {
      case 'individual':
        if (!packId) {
          newErrors.push({ field: 'packId', message: 'Pack ID é obrigatório para pagamento individual' });
        }
        break;
      case 'combo':
        if (!selectedPackIds || selectedPackIds.length === 0) {
          newErrors.push({ field: 'selectedPacks', message: 'Packs devem ser selecionados para combo' });
        } else if (selectedPackIds.length < 2) {
          newErrors.push({ field: 'selectedPacks', message: 'Combo deve ter pelo menos 2 packs' });
        }
        break;
      case 'complete':
        // Complete access não precisa de validação específica
        break;
      default:
        newErrors.push({ field: 'paymentType', message: 'Tipo de pagamento inválido' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    errors,
    validatePackId,
    validateSelectedPacks,
    validatePaymentType,
    clearErrors
  };
};
