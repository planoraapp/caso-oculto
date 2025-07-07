
import React from 'react';

const PaymentSecurity: React.FC = () => {
  return (
    <div className="text-center mt-6 pt-6 border-t border-gray-700">
      <p className="text-case-white/60 text-sm mb-2">
        Pagamento 100% seguro com:
      </p>
      <img 
        src="/lovable-uploads/8a513714-34eb-49ec-b837-6e3bb5e273e1.png" 
        alt="Mercado Pago" 
        className="mx-auto h-12 object-contain"
      />
    </div>
  );
};

export default PaymentSecurity;
