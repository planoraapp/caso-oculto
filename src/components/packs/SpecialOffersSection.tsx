
import React from 'react';
import { motion } from 'framer-motion';
import ComboPackCard from '../payment/ComboPackCard';
import CompletePackCard from '../payment/CompletePackCard';
import CompleteAccessBlock from './CompleteAccessBlock';
import { useCompleteAccessCheck } from '../../hooks/useCompleteAccessCheck';

interface SpecialOffersSectionProps {
  user: any;
  isLoading: boolean;
  onComboClick: () => void;
  onCompletePurchase: () => void;
}

const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  user,
  isLoading,
  onComboClick,
  onCompletePurchase
}) => {
  const { hasCompleteAccess, isLoading: checkingAccess } = useCompleteAccessCheck(user?.id);

  return (
    <motion.section 
      className="mb-8 md:mb-16" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-case-white mb-2">
          Ofertas Especiais
        </h2>
        <p className="text-case-white/60 text-sm md:text-base">
          Economize comprando múltiplos packs ou tenha acesso total
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        {/* Combo 5 Packs */}
        <ComboPackCard 
          onPurchase={onComboClick} 
          isLoading={isLoading} 
        />

        {/* Acesso Total - Verificar se já possui */}
        {checkingAccess ? (
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        ) : hasCompleteAccess ? (
          <CompleteAccessBlock />
        ) : (
          <CompletePackCard 
            onPurchase={onCompletePurchase} 
            isLoading={isLoading} 
          />
        )}
      </div>
    </motion.section>
  );
};

export default SpecialOffersSection;
