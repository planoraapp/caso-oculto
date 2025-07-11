
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  type: 'individual' | 'combo' | 'complete';
  packId?: string;
  selectedPackIds?: string[];
  userId: string;
  couponCode?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  type,
  packId,
  selectedPackIds,
  userId,
  couponCode
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !userId) {
      return;
    }

    setIsProcessing(true);

    try {
      // Criar Payment Intent via nossa edge function
      const response = await fetch(`https://oxeccsmxqymvxycnaszo.supabase.co/functions/v1/create-stripe-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`,
        },
        body: JSON.stringify({
          type,
          packId,
          selectedPackIds,
          userId,
          couponCode: couponCode || null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar sessão de pagamento');
      }

      const { url } = await response.json();
      
      // Redirecionar para o Stripe Checkout
      window.location.href = url;
      
      onSuccess();

    } catch (error) {
      console.error('Erro no pagamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no pagamento';
      toast({
        title: "Erro no Pagamento",
        description: errorMessage,
        variant: "destructive"
      });
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-case-white text-sm font-medium">
            Dados do Cartão
          </label>
          <div className="bg-noir-medium border border-noir-light rounded-lg p-4">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="flex items-center gap-2 text-case-white/60 text-xs">
        <Lock className="h-4 w-4" />
        <span>Pagamento seguro processado via Stripe</span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || isProcessing || !userId}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Processando Pagamento...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            Pagar {currency === 'brl' ? 'R$' : '$'} {(amount / 100).toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
