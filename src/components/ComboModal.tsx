import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Pack } from '../data/types';
import PaymentOptionsModal from './PaymentOptionsModal';

interface ComboModalProps {
  packs: Pack[];
  ownedPackIds: string[];
  onClose: () => void;
  onPurchaseCombo: (selectedPackIds: string[]) => void;
  user: any;
}
const ComboModal: React.FC<ComboModalProps> = ({
  packs,
  ownedPackIds,
  onClose,
  onPurchaseCombo,
  user
}) => {
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSelectionCollapsed, setIsSelectionCollapsed] = useState(false);
  const availablePacks = packs.filter(pack => !['combo', 'complete'].includes(pack.category) && !ownedPackIds.includes(pack.id));
  const togglePack = (packId: string) => {
    setSelectedPacks(prev => {
      const newSelection = prev.includes(packId) ? prev.filter(id => id !== packId) : prev.length < 5 ? [...prev, packId] : prev;

      // Recolher automaticamente quando 5 packs forem selecionados
      if (newSelection.length === 5 && !prev.includes(packId)) {
        setIsSelectionCollapsed(true);
      }
      return newSelection;
    });
  };
  const handlePurchase = () => {
    if (selectedPacks.length === 5) {
      setIsPaymentModalOpen(true);
    }
  };
  const handlePaymentSuccess = () => {
    onClose();
    // Refresh the page after successful payment to update pack access
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // Valor correto: R$ 61,40 (5 packs × R$ 14,80 = R$ 74,00 com 20% de desconto)
  const originalPrice = 5 * 14.80; // R$ 74,00
  const discountedPrice = 61.40; // Valor fixo correto
  const savings = originalPrice - discountedPrice;
  return <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="bg-noir-dark border border-noir-medium rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-case-white">Monte seu Combo</h2>
                <p className="text-case-white/80">Escolha 5 packs e economize 20%</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-case-white hover:bg-noir-medium">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Resumo do Combo */}
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
                {selectedPacks.length === 5 && <Button variant="ghost" size="sm" onClick={() => setIsSelectionCollapsed(!isSelectionCollapsed)} className="text-case-white hover:bg-noir-light ml-auto">
                    {isSelectionCollapsed ? <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Mostrar Seleção
                      </> : <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Ocultar Seleção
                      </>}
                  </Button>}
              </div>
            </div>

            {/* Grid de Packs - Recolhível */}
            <AnimatePresence>
              {!isSelectionCollapsed && <motion.div initial={{
              opacity: 1,
              height: 'auto'
            }} animate={{
              opacity: 1,
              height: 'auto'
            }} exit={{
              opacity: 0,
              height: 0
            }} transition={{
              duration: 0.3
            }} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availablePacks.map(pack => {
                  const isSelected = selectedPacks.includes(pack.id);
                  const canSelect = selectedPacks.length < 5 || isSelected;
                  return <Card key={pack.id} className={`cursor-pointer transition-all duration-200 ${isSelected ? 'border-case-red bg-case-red/10' : canSelect ? 'border-noir-medium hover:border-noir-light bg-noir-medium' : 'border-noir-medium bg-noir-medium opacity-50 cursor-not-allowed'}`} onClick={() => canSelect && togglePack(pack.id)}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              
                              {isSelected && <div className="w-6 h-6 bg-case-red rounded-full flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>}
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
                        </Card>;
                })}
                  </div>
                </motion.div>}
            </AnimatePresence>

            {/* Packs Selecionados - Sempre visível quando há seleção */}
            {selectedPacks.length > 0 && isSelectionCollapsed && <div className="mb-6">
                <h3 className="text-case-white font-medium mb-3">Packs Selecionados:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPacks.map(packId => {
                const pack = availablePacks.find(p => p.id === packId);
                return pack ? <Badge key={packId} variant="outline" className="text-case-white border-case-red">
                        {pack.name}
                        <button onClick={() => togglePack(packId)} className="ml-2 hover:text-case-red">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge> : null;
              })}
                </div>
              </div>}

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={onClose} className="border-white bg-white text-black hover:bg-gray-100 hover:text-black">
                Cancelar
              </Button>
              <Button onClick={handlePurchase} disabled={selectedPacks.length !== 5} className="bg-case-red hover:bg-red-600 text-white disabled:opacity-50">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar Combo (R$ {discountedPrice.toFixed(2)})
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Modal de Pagamento para Combo */}
        {isPaymentModalOpen && (
          <PaymentOptionsModal 
            isOpen={isPaymentModalOpen} 
            onClose={() => setIsPaymentModalOpen(false)} 
            type="combo" 
            selectedPackIds={selectedPacks} 
            user={user}
            packName="Combo 5 Packs" 
            totalPrice={discountedPrice} 
            onPaymentCreated={handlePaymentSuccess} 
          />
        )}
      </div>
    </AnimatePresence>;
};
export default ComboModal;