
import React, { useEffect, useState } from 'react';

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  onPaymentResult?: (result: any) => void;
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  preferenceId, 
  onPaymentResult 
}) => {
  const [isLoading, setIsLoading] = useState(true);

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
    checkoutFrame.id = 'checkout-container';
    checkoutFrame.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 20px;
      max-width: 480px;
      width: 95%;
      max-height: 85vh;
      overflow: hidden;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;

    // Add loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #009ee3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 20px; color: #666; font-family: Arial, sans-serif;">Carregando checkout...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 15px;
      right: 20px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #666;
      z-index: 10001;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;
    `;
    
    closeButton.onmouseover = () => {
      closeButton.style.background = 'rgba(255, 0, 0, 0.1)';
      closeButton.style.color = '#dc2626';
    };
    
    closeButton.onmouseout = () => {
      closeButton.style.background = 'rgba(255, 255, 255, 0.9)';
      closeButton.style.color = '#666';
    };
    
    closeButton.onclick = () => {
      document.body.removeChild(container);
      onPaymentResult?.({ status: 'cancelled' });
    };

    // Add Mercado Pago checkout via iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
    iframe.style.cssText = `
      width: 100%;
      height: 500px;
      border: none;
      border-radius: 8px;
    `;
    
    // Replace loading with iframe when it loads
    iframe.onload = () => {
      if (loadingDiv.parentNode) {
        checkoutFrame.removeChild(loadingDiv);
      }
      setIsLoading(false);
      
      // Listen for iframe navigation changes
      try {
        const iframeSrc = iframe.contentWindow?.location.href;
        if (iframeSrc?.includes('success') || iframeSrc?.includes('approved')) {
          onPaymentResult?.({ status: 'approved' });
          document.body.removeChild(container);
        } else if (iframeSrc?.includes('failure') || iframeSrc?.includes('rejected')) {
          onPaymentResult?.({ status: 'rejected' });
          document.body.removeChild(container);
        }
      } catch (e) {
        // Cross-origin restriction - normal behavior
        console.log('Checkout carregado com sucesso');
      }
    };

    // Setup initial structure
    checkoutFrame.appendChild(loadingDiv);
    checkoutFrame.appendChild(iframe);
    checkoutFrame.appendChild(closeButton);
    container.appendChild(checkoutFrame);
    document.body.appendChild(container);

    // Listen for payment completion via URL change detection
    const checkPaymentStatus = () => {
      const currentUrl = window.location.href;
      if (currentUrl.includes('payment=success') || currentUrl.includes('payment=approved')) {
        onPaymentResult?.({ status: 'approved' });
        document.body.removeChild(container);
      } else if (currentUrl.includes('payment=failure') || currentUrl.includes('payment=rejected')) {
        onPaymentResult?.({ status: 'rejected' });
        document.body.removeChild(container);
      }
    };

    const statusInterval = setInterval(checkPaymentStatus, 1000);

    // Cleanup function
    return () => {
      clearInterval(statusInterval);
      const existingContainer = document.getElementById('mercadopago-checkout-container');
      if (existingContainer) {
        document.body.removeChild(existingContainer);
      }
    };
  }, [preferenceId, onPaymentResult]);

  return null;
};

export default MercadoPagoCheckout;
