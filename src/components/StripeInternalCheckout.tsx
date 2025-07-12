import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

interface StripeInternalCheckoutProps {
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

const StripeInternalCheckout: React.FC<StripeInternalCheckoutProps> = ({
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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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
      // Criar Payment Intent no backend
      const requestBody = {
        paymentType: type,
        packId,
        selectedPackIds,
        userId,
        couponCode: couponCode || null,
        totalAmount: amount / 100
      };

      console.log('=== CRIANDO PAYMENT INTENT ===');
      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: requestBody
      });

      if (error) {
        console.error('Erro ao criar payment intent:', error);
        throw new Error(error.message || 'Erro ao processar pagamento');
      }

      const { client_secret } = data;
      console.log('Payment intent criado:', client_secret);

      if (!client_secret) {
        throw new Error('Client secret não retornado');
      }

      // Confirmar pagamento com Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Elemento de cartão não encontrado');
      }

      console.log('=== CONFIRMANDO PAGAMENTO ===');
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardElement,
          }
        }
      );

      if (stripeError) {
        console.error('Erro do Stripe:', stripeError);
        throw new Error(stripeError.message || 'Erro no processamento do pagamento');
      }

      if (paymentIntent?.status === 'succeeded') {
        console.log('=== PAGAMENTO APROVADO ===');
        console.log('Payment Intent:', paymentIntent);
        
        setPaymentSuccess(true);
        
        toast({
          title: "Pagamento Aprovado!",
          description: "Seu acesso foi liberado com sucesso.",
        });

        // Processar no backend
        await supabase.functions.invoke('process-payment-success', {
          body: {
            paymentIntentId: paymentIntent.id,
            userId,
            paymentType: type,
            packId,
            selectedPackIds,
            couponCode
          }
        });

        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        throw new Error('Pagamento não foi processado corretamente');
      }

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

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="text-xl font-semibold text-case-white">Pagamento Aprovado!</h3>
        <p className="text-case-white/80 text-center">
          Seu acesso foi liberado com sucesso. Redirecionando...
        </p>
      </div>
    );
  }

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

export default StripeInternalCheckout;