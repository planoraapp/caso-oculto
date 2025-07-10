
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  onPaymentResult?: (result: any) => void;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  preferenceId, 
  onPaymentResult 
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMercadoPagoScript = () => {
      // Remove existing script if any
      const existingScript = document.querySelector('script[src*="mercadopago"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error('Erro ao carregar script do Mercado Pago');
        setIsLoading(false);
      };

      document.head.appendChild(script);
    };

    if (preferenceId) {
      loadMercadoPagoScript();
    }

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="mercadopago"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [preferenceId]);

  useEffect(() => {
    if (isScriptLoaded && preferenceId) {
      const script = document.createElement('script');
      script.setAttribute('data-preference-id', preferenceId);
      script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
      
      const form = document.getElementById('mercado-pago-form');
      if (form) {
        form.innerHTML = '';
        form.appendChild(script);
      }

      // Listen for payment completion
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://www.mercadopago.com.br' || event.origin === 'https://www.mercadopago.com') {
          if (event.data.type === 'payment_result' && onPaymentResult) {
            onPaymentResult(event.data);
          }
        }
      });
    }
  }, [isScriptLoaded, preferenceId, onPaymentResult]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-case-red"></div>
        <span className="ml-2 text-case-white">Carregando pagamento...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id="mercado-pago-form" className="w-full"></div>
      {!isScriptLoaded && (
        <Button 
          disabled 
          className="w-full bg-gray-600 text-white cursor-not-allowed"
        >
          Carregando Mercado Pago...
        </Button>
      )}
    </div>
  );
};

export default MercadoPagoCheckout;
