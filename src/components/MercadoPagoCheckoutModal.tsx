
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface MercadoPagoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  checkoutUrl: string;
}

const MercadoPagoCheckoutModal: React.FC<MercadoPagoCheckoutModalProps> = ({
  isOpen,
  onClose,
  onBack,
  checkoutUrl
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-noir-dark rounded-lg w-full h-full max-w-4xl max-h-[90vh] border border-noir-medium overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-noir-medium bg-noir-dark">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="text-case-white/60 hover:text-case-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-bold text-case-white">Finalizar Compra - Combo 5 Packs</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-case-white/60 hover:text-case-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="relative flex-1 h-full">
            {isLoading && (
              <div className="absolute inset-0 bg-noir-dark flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-case-red mx-auto mb-4" />
                  <p className="text-case-white/80">Carregando checkout...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={checkoutUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              title="Mercado Pago Checkout"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-noir-medium bg-noir-dark">
            <div className="flex justify-between items-center">
              <span className="text-sm text-case-white/60">
                Pagamento seguro via Mercado Pago
              </span>
              <Button 
                onClick={onClose}
                variant="outline" 
                size="sm"
                className="border-noir-light text-case-white hover:bg-noir-medium"
              >
                Fechar
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MercadoPagoCheckoutModal;
