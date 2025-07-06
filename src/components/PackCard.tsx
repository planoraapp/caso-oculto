
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
  isPurchased: boolean;
  onPackClick: () => void;
  onPurchaseClick: (pack: Pack) => void;
}

const PackCard: React.FC<PackCardProps> = ({ 
  pack, 
  isPurchased, 
  onPackClick, 
  onPurchaseClick 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil':
        return 'bg-green-500';
      case 'intermediário':
        return 'bg-yellow-500';
      case 'difícil':
        return 'bg-orange-500';
      case 'avançado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-case-red/50">
        {/* Image Header */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={pack.image}
            alt={pack.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Difficulty Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getDifficultyColor(pack.difficulty)} text-white border-0`}>
              {pack.difficulty}
            </Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-black/50 text-white border-white/20">
              R$ {pack.price.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-case-white group-hover:text-case-red transition-colors">
              {pack.name}
            </h3>
            <div className="flex items-center text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm ml-1">4.8</span>
            </div>
          </div>

          <p className="text-case-white/80 text-sm mb-4 line-clamp-2">
            {pack.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-case-white/60 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>2-4h</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{pack.cases?.length || 4} casos</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-2">
            {isPurchased ? (
              <Link to={`/pack/${pack.id}`} className="block">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={onPackClick}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Jogar Agora
                </Button>
              </Link>
            ) : (
              <>
                <Link to={`/pack/${pack.id}`} className="block">
                  <Button 
                    variant="outline"
                    className="w-full border-case-white/20 text-case-white hover:bg-case-white/10 mb-2"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Visualizar Pack
                  </Button>
                </Link>
                <Button 
                  onClick={() => onPurchaseClick(pack)}
                  className="w-full bg-case-red hover:bg-red-600 text-white"
                >
                  Comprar Pack
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackCard;
