
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface StripeCheckoutProps {
  preferenceId: string;
  onPaymentResult: (result: { status: string }) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  preferenceId,
  onPaymentResult
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setIsLoading(true);
        
        const stripePublishableKey = 'pk_test_51RhgpgLtmJkjKIDBINSae6uoX4gPvVvAzHWSiwNOvcc0ZHvbJTN0XgjCXZiiT3BW5F58nxpelgCPBoFxvSV8MzKv00MbqmZdTA';
        const stripe = await loadStripe(stripePublishableKey);
        
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: preferenceId
        });

        if (result.error) {
          console.error('Stripe checkout error:', result.error);
          setError(result.error.message || 'Erro no checkout');
          onPaymentResult({ status: 'error' });
        }
      } catch (err) {
        console.error('Error initializing Stripe:', err);
        setError('Erro ao inicializar pagamento');
        onPaymentResult({ status: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    if (preferenceId) {
      initializeStripe();
    }
  }, [preferenceId, onPaymentResult]);

  if (error) {
    return (
      <div className="text-center p-6">
        <div className="text-red-500 mb-4">
          <p className="font-semibold">Erro no Pagamento</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-case-red text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-case-red mx-auto mb-4"></div>
        <p className="text-case-white">Redirecionando para o pagamento...</p>
      </div>
    );
  }

  return null;
};

export default StripeCheckout;
