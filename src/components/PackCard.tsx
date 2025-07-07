
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart, Lock } from 'lucide-react';

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

interface PackCardProps {
  pack: Pack;
  isPurchased?: boolean;
  onPackClick?: () => void;
  onPurchaseClick?: (pack: Pack) => void;
}

const PackCard: React.FC<PackCardProps> = ({ 
  pack,
  isPurchased = false,
  onPurchaseClick
}) => {
  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPurchaseClick) {
      onPurchaseClick(pack);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer relative"
    >
      <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-case-red/50">
        {/* Pack Image */}
        <Link to={`/pack/${pack.id}`} className="block h-full">
          <img
            src={pack.image}
            alt={pack.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Pack Name */}
          <div className="absolute bottom-16 left-6">
            <h3 className="font-anton text-2xl text-case-white drop-shadow-lg group-hover:text-case-red transition-colors">
              {pack.name}
            </h3>
          </div>
        </Link>
        
        {/* Purchase Button */}
        {!isPurchased && (
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              onClick={handlePurchaseClick}
              className="w-full bg-case-red hover:bg-red-600 text-white font-semibold"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              R$ {pack.price.toFixed(2).replace('.', ',')}
            </Button>
          </div>
        )}
        
        {/* Purchased Badge */}
        {isPurchased && (
          <div className="absolute top-4 right-4">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Adquirido
            </div>
          </div>
        )}
        
        {/* Lock Icon for non-purchased */}
        {!isPurchased && (
          <div className="absolute top-4 right-4">
            <Lock className="h-6 w-6 text-case-white/80" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PackCard;
