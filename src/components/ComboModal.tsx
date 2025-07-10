
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Pack } from '../data/types';

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

  const availablePacks = packs.filter(pack => 
    !['combo', 'complete'].includes(pack.category) && 
    !ownedPackIds.includes(pack.id)
  );

  const togglePack = (packId: string) => {
    setSelectedPacks(prev => 
      prev.includes(packId) 
        ? prev.filter(id => id !== packId)
        : prev.length < 5 
          ? [...prev, packId]
          : prev
    );
  };

  const handlePurchase = () => {
    if (selectedPacks.length === 5) {
      onPurchaseCombo(selectedPacks);
    }
  };

  const originalPrice = 5 * 14.80;
  const discountedPrice = originalPrice * 0.8;
  const savings = originalPrice - discountedPrice;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-noir-dark border border-noir-medium rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-case-white">Monte seu Combo</h2>
                <p className="text-case-white/80">Escolha 5 packs e economize 20%</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-case-white hover:bg-noir-medium"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 p-4 bg-noir-medium rounded-lg">
                <div className="text-case-white">
                  <span className="text-sm">Selecionados: </span>
                  <span className="font-bold">{selectedPacks.length}/5</span>
                </div>
                <div className="text-case-white">
                  <span className="text-sm line-through">R$ {originalPrice.toFixed(2)}</span>
                  <span className="text-xl font-bold text-case-red ml-2">R$ {discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-green-400 ml-2">Economize R$ {savings.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {availablePacks.map((pack) => {
                const isSelected = selectedPacks.includes(pack.id);
                const canSelect = selectedPacks.length < 5 || isSelected;

                return (
                  <Card
                    key={pack.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-case-red bg-case-red/10'
                        : canSelect
                        ? 'border-noir-medium hover:border-noir-light bg-noir-medium'
                        : 'border-noir-medium bg-noir-medium opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canSelect && togglePack(pack.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={pack.difficulty === 'easy' ? 'secondary' : pack.difficulty === 'medium' ? 'default' : 'destructive'}>
                          {pack.difficulty}
                        </Badge>
                        {isSelected && (
                          <div className="w-6 h-6 bg-case-red rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-case-white text-lg">{pack.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-case-white/80 text-sm">
                        {pack.description}
                      </CardDescription>
                      <div className="mt-2">
                        <span className="text-case-white font-semibold">R$ {pack.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-white bg-white text-black hover:bg-gray-100 hover:text-black"
              >
                Cancelar
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={selectedPacks.length !== 5}
                className="bg-case-red hover:bg-red-600 text-white disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar Combo (R$ {discountedPrice.toFixed(2)})
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ComboModal;
