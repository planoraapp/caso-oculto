
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  onPaymentResult?: (result: any) => void;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  preferenceId, 
  onPaymentResult 
}) => {
  // Simplified component that doesn't render the Mercado Pago button
  // Instead, it just shows a loading state and simulates payment processing
  
  return (
    <div className="mercadopago-checkout-container p-4 text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <p className="text-case-white">
        Processando pagamento...
      </p>
    </div>
  );
};

export default React.memo(MercadoPagoCheckout);
