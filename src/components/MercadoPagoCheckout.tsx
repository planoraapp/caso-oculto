
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

    document.body.appendChild(script);

    return () => {
      // Cleanup
      const scriptToRemove = document.querySelector(`script[data-preference-id="${preferenceId}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [preferenceId, onPaymentResult]);

  return null; // O botão é renderizado automaticamente pelo script do MP
};

export default MercadoPagoCheckout;
