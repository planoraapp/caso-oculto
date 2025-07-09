
import { useState, useCallback, useMemo } from 'react';
import { Pack } from '../data/types';

export interface ComboSelection {
  selectedPackIds: string[];
  totalPrice: number;
  discount: number;
  finalPrice: number;
}

export const useComboManager = (packs: Pack[], ownedPackIds: string[]) => {
  const [selectedPackIds, setSelectedPackIds] = useState<string[]>([]);

  const availablePacks = useMemo(() => {
    return packs.filter(pack => 
      !['combo', 'complete'].includes(pack.category) && 
      !ownedPackIds.includes(pack.id)
    );
  }, [packs, ownedPackIds]);

  const comboSelection = useMemo((): ComboSelection => {
    const selectedPacks = availablePacks.filter(pack => 
      selectedPackIds.includes(pack.id)
    );
    
    const totalPrice = selectedPacks.reduce((sum, pack) => sum + pack.price, 0);
    
    // Calcular desconto baseado na quantidade
    let discount = 0;
    if (selectedPacks.length >= 5) {
      discount = totalPrice * 0.2; // 20% de desconto para 5+ packs
    } else if (selectedPacks.length >= 3) {
      discount = totalPrice * 0.15; // 15% de desconto para 3+ packs
    } else if (selectedPacks.length >= 2) {
      discount = totalPrice * 0.1; // 10% de desconto para 2+ packs
    }
    
    const finalPrice = totalPrice - discount;
    
    return {
      selectedPackIds,
      totalPrice,
      discount,
      finalPrice
    };
  }, [availablePacks, selectedPackIds]);

  const togglePackSelection = useCallback((packId: string) => {
    setSelectedPackIds(prev => {
      if (prev.includes(packId)) {
        return prev.filter(id => id !== packId);
      } else {
        return [...prev, packId];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPackIds([]);
  }, []);

  const selectAll = useCallback(() => {
    setSelectedPackIds(availablePacks.map(pack => pack.id));
  }, [availablePacks]);

  const isPackSelected = useCallback((packId: string) => {
    return selectedPackIds.includes(packId);
  }, [selectedPackIds]);

  const canPurchaseCombo = useMemo(() => {
    return selectedPackIds.length >= 2;
  }, [selectedPackIds.length]);

  return {
    availablePacks,
    comboSelection,
    togglePackSelection,
    clearSelection,
    selectAll,
    isPackSelected,
    canPurchaseCombo
  };
};
