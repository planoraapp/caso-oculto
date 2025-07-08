
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ComboModalProps {
  packs: Pack[];
  ownedPackIds: string[];
  onClose: () => void;
  onPurchaseCombo: (selectedPackIds: string[]) => void;
}

const ComboModal: React.FC<ComboModalProps> = ({
  packs,
  ownedPackIds,
  onClose,
  onPurchaseCombo
}) => {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);

  const availablePacks = useMemo(() => {
    return packs.filter(pack => 
      !['combo', 'complete'].includes(pack.category) && 
      !ownedPackIds.includes(pack.id)
    );
  }, [packs, ownedPackIds]);

  const togglePack = (packId: string) => {
    setSelectedPacks(prev => {
      if (prev.includes(packId)) {
        return prev.filter(id => id !== packId);
      } else if (prev.length < 5) {
        return [...prev, packId];
      }
      return prev;
    });
  };

  // Preço fixo do combo conforme definido
  const comboPrice = 61.40;
  const originalPrice = 74.00;
  const savings = originalPrice - comboPrice;

  const canPurchase = selectedPacks.length === 5;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div 
          className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-case-white mb-2">
                  Monte seu Combo 5 Packs
                </h2>
                <p className="text-case-white/80">
                  Escolha 5 packs e economize 20% • {selectedPacks.length}/5 selecionados
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-case-white hover:text-case-red"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Price Summary */}
            {selectedPacks.length > 0 && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-case-white/60 line-through">
                      R$ {originalPrice.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-2xl font-bold text-case-red">
                      R$ {comboPrice.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-green-400 text-sm">
                      Economia: R$ {savings.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  <Badge className="bg-case-red text-white">-20%</Badge>
                </div>
              </div>
            )}
          </div>

          {/* Packs Grid */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availablePacks.map((pack) => {
                const isSelected = selectedPacks.includes(pack.id);
                const isDisabled = !isSelected && selectedPacks.length >= 5;

                return (
                  <motion.div
                    key={pack.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                      isSelected 
                        ? 'ring-2 ring-case-red' 
                        : isDisabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:scale-105'
                    }`}
                    onClick={() => !isDisabled && togglePack(pack.id)}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  >
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-case-red rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}

                    {/* Pack Info */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-case-white text-sm font-semibold mb-1">
                        {pack.name}
                      </h3>
                      <p className="text-case-white/80 text-xs">
                        R$ {pack.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-case-white/80">
                  {canPurchase ? 'Pronto para comprar!' : `Selecione ${5 - selectedPacks.length} pack(s) para continuar`}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-600 text-case-white hover:bg-gray-800 bg-white text-black hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => canPurchase && onPurchaseCombo(selectedPacks)}
                  disabled={!canPurchase}
                  className="bg-white hover:bg-gray-100 text-black font-semibold disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Comprar Combo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ComboModal;
