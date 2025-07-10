
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Chave pública live da Stripe fornecida
const stripePromise = loadStripe('pk_live_51RhgpgLtmJkjKIDB5HIRkSFixyXL4Nsv884yLSWfiy02vbsYYuXw7eX29gkQnWISxycMvrNdObsLLVUERDyUptyH00xXh7fdHL');

interface StripeCheckoutProps {
  type: 'individual' | 'combo' | 'complete';
  packId?: string;
  selectedPackIds?: string[];
  userId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  type,
  packId,
  selectedPackIds,
  userId,
  onSuccess,
  onError
}) => {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      console.log('Creating Stripe session:', { type, packId, selectedPackIds, userId });

      const response = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          packId,
          selectedPackIds,
          userId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirecionar para o Stripe Checkout
      window.location.href = url;
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : 'Erro desconhecido');
      }
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      Pagar com Stripe
    </button>
  );
};

export default StripeCheckout;
