
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  onPaymentResult?: (result: any) => void;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  preferenceId, 
  onPaymentResult 
}) => {
  useEffect(() => {
    if (!preferenceId) return;

    // Create checkout container
    const container = document.createElement('div');
    container.id = 'mercadopago-checkout-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const checkoutFrame = document.createElement('div');
    checkoutFrame.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 20px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    `;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    `;
    closeButton.onclick = () => {
      document.body.removeChild(container);
    };

    checkoutFrame.appendChild(closeButton);
    
    // Create Mercado Pago script
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
    script.setAttribute('data-preference-id', preferenceId);
    script.onload = () => {
      console.log('Mercado Pago checkout loaded');
    };
    
    checkoutFrame.appendChild(script);
    container.appendChild(checkoutFrame);
    document.body.appendChild(container);

    // Cleanup function
    return () => {
      const existingContainer = document.getElementById('mercadopago-checkout-container');
      if (existingContainer) {
        document.body.removeChild(existingContainer);
      }
    };
  }, [preferenceId]);

  return null;
};

export default MercadoPagoCheckout;
