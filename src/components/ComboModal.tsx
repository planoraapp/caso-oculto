
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';

interface ComboModalProps {
  packs: any[];
  ownedPackIds: string[];
  onClose: () => void;
  onPurchaseCombo: (selectedPackIds: string[]) => void;
}

const ComboModal: React.FC<ComboModalProps> = ({ packs, ownedPackIds, onClose, onPurchaseCombo }) => {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  
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

  const handlePurchaseCombo = () => {
    if (selectedPacks.length === 5) {
      onPurchaseCombo(selectedPacks);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-noir-dark rounded-lg p-8 max-w-2xl w-full text-case-white border border-noir-medium max-h-[80vh] overflow-y-auto"
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
          
          <p className="text-case-white/80 mb-6">
            Selecione exatamente 5 packs para comprar com desconto especial.
          </p>
          
          <div className="space-y-3 mb-6">
            {availablePacks.map(pack => (
              <div 
                key={pack.id}
                onClick={() => handleSelect(pack.id)}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                  selectedPacks.includes(pack.id) 
                    ? 'bg-case-red/20 border-2 border-case-red' 
                    : 'bg-noir-medium hover:bg-noir-light border-2 border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPacks.includes(pack.id) 
                    ? 'border-case-red bg-case-red' 
                    : 'border-case-white/40'
                }`}>
                  {selectedPacks.includes(pack.id) && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-case-white font-semibold">{pack.name}</h3>
                  <p className="text-case-white/60 text-sm">{pack.description}</p>
                </div>
                
                <div className="text-case-white/80 font-medium">
                  R$ {pack.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6 p-4 bg-noir-black/50 rounded-lg">
            <div>
              <span className="text-case-white/80">Selecionados: </span>
              <span className={`font-semibold ${selectedPacks.length === 5 ? 'text-green-400' : 'text-case-white'}`}>
                {selectedPacks.length} / 5
              </span>
            </div>
            <div className="text-right">
              <div className="text-case-white/60 line-through text-sm">R$ 74,00</div>
              <div className="text-2xl font-bold text-case-red">R$ 61,40</div>
            </div>
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
              onClick={handlePurchaseCombo}
              className="flex-1 bg-case-red hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedPacks.length === 5 ? 'Comprar Combo' : `Selecione ${5 - selectedPacks.length} pack(s)`}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComboModal;
