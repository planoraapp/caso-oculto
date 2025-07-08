
import React from 'react';

const PaymentSecurity: React.FC = () => {
  return (
    <div className="text-center mt-6 pt-6 border-t border-gray-700">
      <p className="text-case-white/60 text-sm mb-2">
        Pagamento 100% seguro com:
      </p>
      <img 
        src="/lovable-uploads/c2157e73-9a7d-4368-84fd-8a1c3931996a.png" 
        alt="Mercado Pago" 
        className="mx-auto h-12 object-contain"
      />
    </div>
  );
};

export default PaymentSecurity;
