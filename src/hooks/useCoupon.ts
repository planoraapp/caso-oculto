
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CouponValidation {
  id: string | null;
  code: string;
  discount_value: number;
  discount_type: string;
  is_valid: boolean;
  message: string;
}

// Cupons padrão do sistema com restrições
const DEFAULT_COUPONS = {
  'CASO10': { discount_value: 10, discount_type: 'percentage', allowed_types: ['individual', 'combo', 'complete'] },
  'VALEU': { discount_value: 99, discount_type: 'percentage', allowed_types: ['complete'] },
  'LOVABLE': { discount_value: 100, discount_type: 'percentage', allowed_types: ['complete'] }
};

export const useCoupon = () => {
  const [coupon, setCoupon] = useState<CouponValidation | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateCoupon = useCallback(async (couponCode: string, paymentType?: string) => {
    if (!couponCode.trim()) {
      setCoupon(null);
      return null;
    }

    setIsValidating(true);
    const upperCode = couponCode.trim().toUpperCase();
    
    try {
      // Primeiro, verificar cupons padrão
      if (DEFAULT_COUPONS[upperCode as keyof typeof DEFAULT_COUPONS]) {
        const defaultCoupon = DEFAULT_COUPONS[upperCode as keyof typeof DEFAULT_COUPONS];
        
        // Verificar se o cupom é válido para o tipo de pagamento
        let isValidForPaymentType = true;
        let message = 'Cupom válido!';
        
        if (paymentType && !defaultCoupon.allowed_types.includes(paymentType)) {
          isValidForPaymentType = false;
          if (upperCode === 'VALEU' || upperCode === 'LOVABLE') {
            message = 'Este cupom é válido apenas para Acesso Total.';
          } else {
            message = 'Cupom não válido para este tipo de compra.';
          }
        }
        
        const validation = {
          id: null,
          code: upperCode,
          discount_value: defaultCoupon.discount_value,
          discount_type: defaultCoupon.discount_type,
          is_valid: isValidForPaymentType,
          message: message
        };
        setCoupon(validation);
        return isValidForPaymentType ? validation : null;
      }

      // Verificar cupons no banco de dados
      const { data, error } = await supabase.rpc('validate_coupon', {
        coupon_code: upperCode
      });

      if (error) {
        console.error('Erro ao validar cupom:', error);
        setCoupon({
          id: null,
          code: upperCode,
          discount_value: 0,
          discount_type: '',
          is_valid: false,
          message: 'Erro ao validar cupom. Tente novamente.'
        });
        return null;
      }

      const validation = data?.[0];
      if (validation) {
        setCoupon(validation);
        return validation.is_valid ? validation : null;
      }

      // Cupom não encontrado
      setCoupon({
        id: null,
        code: upperCode,
        discount_value: 0,
        discount_type: '',
        is_valid: false,
        message: 'Cupom inválido ou expirado.'
      });
      return null;
    } catch (error) {
      console.error('Erro na validação do cupom:', error);
      setCoupon({
        id: null,
        code: upperCode,
        discount_value: 0,
        discount_type: '',
        is_valid: false,
        message: 'Erro inesperado. Tente novamente.'
      });
      return null;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const clearCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const calculateDiscount = useCallback((originalPrice: number) => {
    if (!coupon?.is_valid) return 0;
    
    if (coupon.discount_type === 'percentage') {
      return (originalPrice * coupon.discount_value) / 100;
    }
    
    return coupon.discount_value;
  }, [coupon]);

  return {
    coupon,
    isValidating,
    validateCoupon,
    clearCoupon,
    calculateDiscount
  };
};
