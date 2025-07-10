
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('MercadoPago Checkout initialized with preference:', preferenceId);
    
    if (!preferenceId) {
      setError('ID de preferência não fornecido');
      setIsLoading(false);
      return;
    }

    const loadCheckout = () => {
      try {
        // Remove existing scripts
        const existingScript = document.querySelector('script[data-preference-id]');
        if (existingScript) {
          existingScript.remove();
        }

        // Create and configure script
        const script = document.createElement('script');
        script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
        script.setAttribute('data-preference-id', preferenceId);
        script.async = true;
        
        script.onload = () => {
          console.log('MercadoPago script loaded successfully');
          setIsLoading(false);
          setError(null);
        };
        
        script.onerror = () => {
          console.error('Failed to load MercadoPago script');
          setError('Erro ao carregar o sistema de pagamento');
          setIsLoading(false);
        };

        // Find container and append script
        const container = document.getElementById('mercado-pago-checkout');
        if (container) {
          container.innerHTML = '';
          container.appendChild(script);
        } else {
          console.error('MercadoPago checkout container not found');
          setError('Container de pagamento não encontrado');
          setIsLoading(false);
        }

      } catch (error) {
        console.error('Error loading MercadoPago checkout:', error);
        setError('Erro ao inicializar pagamento');
        setIsLoading(false);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(loadCheckout, 100);

    // Listen for payment completion messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.mercadopago.com.br' || event.origin === 'https://www.mercadopago.com') {
        console.log('Payment message received:', event.data);
        if (onPaymentResult) {
          onPaymentResult(event.data);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Clean up script on unmount
      const script = document.querySelector('script[data-preference-id]');
      if (script) {
        script.remove();
      }
    };
  }, [preferenceId, onPaymentResult]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="bg-case-red text-white hover:bg-red-600"
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-case-red mr-3"></div>
        <span className="text-case-white">Carregando sistema de pagamento...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id="mercado-pago-checkout" className="w-full min-h-[200px]"></div>
    </div>
  );
};

export default MercadoPagoCheckout;
