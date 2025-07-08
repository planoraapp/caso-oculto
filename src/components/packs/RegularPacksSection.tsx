
import React from 'react';
import { motion } from 'framer-motion';
import PackCard from '../PackCard';

interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  image: string;
  category: string;
  cases?: any[];
}

interface RegularPacksSectionProps {
  packs: Pack[];
  ownedPackIds: string[];
  onPackClick: (pack: Pack) => void;
  onPurchaseClick: (pack: Pack) => void;
}

const RegularPacksSection: React.FC<RegularPacksSectionProps> = ({
  packs,
  ownedPackIds,
  onPackClick,
  onPurchaseClick
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-case-white mb-6 md:mb-8 text-center">Packs Individuais</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packs.map((pack, index) => (
          <motion.div 
            key={pack.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 * index }}
          >
            <PackCard 
              pack={pack} 
              isPurchased={ownedPackIds.includes(pack.id)} 
              onPackClick={() => onPackClick(pack)} 
              onPurchaseClick={onPurchaseClick} 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RegularPacksSection;
