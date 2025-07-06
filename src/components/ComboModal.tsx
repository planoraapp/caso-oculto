
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, X } from 'lucide-react';
import { Button } from './ui/button';
import MercadoPagoCheckoutModal from './MercadoPagoCheckoutModal';

interface ComboModalProps {
  packs: any[];
  ownedPackIds: string[];
  onClose: () => void;
}

const ComboModal: React.FC<ComboModalProps> = ({ packs, ownedPackIds, onClose }) => {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const availablePacks = packs.filter(p => 
    !p.isFree && 
    !ownedPackIds.includes(p.id) && 
    p.category !== 'combo' && 
    p.category !== 'complete'
  );

  const handleSelect = (packId: string) => {
    setSelectedPacks(prev => {
      if (prev.includes(packId)) {
        return prev.filter(id => id !== packId);
      }
      if (prev.length < 5) {
        return [...prev, packId];
      }
      return prev;
    });
  };

  const handleOpenCheckout = () => {
    if (selectedPacks.length === 5) {
      setIsCheckoutOpen(true);
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleBackFromCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isCheckoutOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div 
              className="bg-noir-dark rounded-lg p-8 max-w-lg w-full text-case-white border border-noir-medium"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-case-white">Monte o seu Combo</h2>
                <button onClick={onClose} className="text-case-white/60 hover:text-case-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <p className="text-case-white/80 mb-6">Selecione 5 packs para comprar com desconto.</p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-6">
                {availablePacks.map(pack => (
                  <div 
                    key={pack.id}
                    onClick={() => handleSelect(pack.id)}
                    className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors ${
                      selectedPacks.includes(pack.id) 
                        ? 'bg-case-red/20 border border-case-red' 
                        : 'bg-noir-medium hover:bg-noir-light'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                      selectedPacks.includes(pack.id) 
                        ? 'border-case-red bg-case-red' 
                        : 'border-case-white/40'
                    }`}>
                      {selectedPacks.includes(pack.id) && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-case-white">{pack.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-case-white">
                  {selectedPacks.length} / 5 selecionados
                </span>
                <span className="text-2xl font-bold text-case-red">R$ 61,40</span>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={onClose}
                  variant="outline" 
                  className="flex-1 border-noir-light text-case-white hover:bg-noir-medium"
                >
                  Cancelar
                </Button>
                <Button 
                  disabled={selectedPacks.length !== 5}
                  onClick={handleOpenCheckout}
                  className="flex-1 bg-case-red hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comprar Combo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MercadoPagoCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        onBack={handleBackFromCheckout}
        checkoutUrl="https://mpago.la/2uVnPJw"
      />
    </>
  );
};

export default ComboModal;
