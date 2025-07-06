
import React, { useEffect } from 'react';

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  onPaymentResult?: (result: any) => void;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  preferenceId, 
  onPaymentResult 
}) => {
  useEffect(() => {
    console.log('Initializing MercadoPago checkout with preference ID:', preferenceId);
    
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

    // Log quando o script é carregado
    script.onload = () => {
      console.log('MercadoPago script loaded successfully');
    };

    script.onerror = () => {
      console.error('Error loading MercadoPago script');
    };

    document.body.appendChild(script);

    return () => {
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

  return (
    <div className="mercadopago-checkout-container">
      <p className="text-case-white text-center mb-4">
        Redirecionando para o checkout do Mercado Pago...
      </p>
    </div>
  );
};

export default MercadoPagoCheckout;
