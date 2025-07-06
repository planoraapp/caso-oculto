
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  pack
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <Link to={`/pack/${pack.id}`} className="block">
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-case-red/50">
          {/* Pack Image */}
          <img
            src={pack.image}
            alt={pack.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Pack Name */}
          <div className="absolute bottom-6 left-6">
            <h3 className="font-anton text-2xl text-case-white drop-shadow-lg group-hover:text-case-red transition-colors">
              {pack.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackCard;
