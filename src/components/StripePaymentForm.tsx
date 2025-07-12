
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

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
      const requestBody = {
        paymentType: type, // Padronizado para paymentType
        packId,
        selectedPackIds,
        userId,
        couponCode: couponCode || null,
        totalAmount: amount / 100 // Converter de centavos para reais
      };

      console.log('=== STRIPE PAYMENT DEBUG ===');
      console.log('Request body being sent:', JSON.stringify(requestBody, null, 2));
      console.log('Amount in cents:', amount);
      console.log('Amount converted to reais:', amount / 100);
      console.log('User ID:', userId);
      console.log('Coupon Code:', couponCode);

      // Usar a edge function do Supabase corretamente
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: requestBody
      });

      console.log('=== EDGE FUNCTION RESPONSE ===');
      console.log('Data:', data);
      console.log('Error:', error);

      if (error) {
        console.error('Error from edge function:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new Error(error.message || 'Erro ao criar sessão de pagamento');
      }

      console.log('Session created successfully:', data);

      if (!data?.url) {
        throw new Error('URL de checkout não foi retornada');
      }

      // Redirecionar para o Stripe Checkout
      window.location.href = data.url;
      
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
