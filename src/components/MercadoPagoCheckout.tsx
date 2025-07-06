
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

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
    let isMounted = true;
    
    const initializeCheckout = async () => {
      try {
        // Remover script anterior se existir
        const existingScript = document.querySelector(`script[data-preference-id="${preferenceId}"]`);
        if (existingScript) {
          existingScript.remove();
        }

        // Criar novo script do Mercado Pago
        const script = document.createElement('script');
        script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
        script.setAttribute('data-preference-id', preferenceId);
        script.setAttribute('data-source', 'button');
        
        // Adicionar listener para resultado do pagamento
        if (onPaymentResult) {
          (window as any).mpCallback = onPaymentResult;
        }

        // Handlers para o script
        script.onload = () => {
          if (isMounted) {
            setIsLoading(false);
            setError(null);
          }
        };

        script.onerror = () => {
          if (isMounted) {
            setIsLoading(false);
            setError('Erro ao carregar checkout do Mercado Pago');
          }
        };

        // Automatically trigger the payment when script loads
        script.onload = () => {
          if (isMounted) {
            setIsLoading(false);
            setError(null);
            // The script will automatically show the payment interface
          }
        };

        document.body.appendChild(script);
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
          setError('Erro inesperado ao inicializar pagamento');
        }
      }
    };

    initializeCheckout();

    return () => {
      isMounted = false;
      
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-preference-id="${preferenceId}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      
      // Remove callback
      if ((window as any).mpCallback) {
        delete (window as any).mpCallback;
      }
    };
  }, [preferenceId, onPaymentResult]);

  if (error) {
    return (
      <div className="mercadopago-checkout-container p-4 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-case-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mercadopago-checkout-container p-4 text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-case-white">
          Carregando checkout do Mercado Pago...
        </p>
      </div>
    );
  }

  return (
    <div className="mercadopago-checkout-container">
      <p className="text-case-white text-center mb-4">
        Redirecionando para o checkout do Mercado Pago...
      </p>
    </div>
  );
};

export default React.memo(MercadoPagoCheckout);
