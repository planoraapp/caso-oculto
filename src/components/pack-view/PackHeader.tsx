
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Pack } from '../../data/packs';

interface PackHeaderProps {
  pack: Pack;
  hasAccess: boolean;
  solvedCards: string[];
  user: any;
  onPurchaseClick: () => void;
  onHowToPlayClick: () => void;
}

const PackHeader: React.FC<PackHeaderProps> = ({
  pack,
  hasAccess,
  solvedCards,
  user,
  onPurchaseClick,
  onHowToPlayClick
}) => {
  const solvedCount = solvedCards.length;
  const totalCards = pack.cases.length;
  const progress = totalCards > 0 ? (solvedCount / totalCards) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return 'Médio';
    }
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${pack.image})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className={`${getDifficultyColor(pack.difficulty)} text-white mb-4`}>
            {getDifficultyText(pack.difficulty)}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-case-white mb-6">
            {pack.name}
          </h1>
          
          <p className="text-xl text-case-white/90 mb-8 max-w-2xl mx-auto">
            {pack.description}
          </p>

          {/* Progress Bar (only show if user has access) */}
          {hasAccess && user && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-case-white">
                  {solvedCount} de {totalCards} casos resolvidos
                </span>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!hasAccess && (
              <Button 
                onClick={onPurchaseClick}
                size="lg"
                className="bg-case-red hover:bg-red-600 text-white px-8 py-3 text-lg"
              >
                <Lock className="h-5 w-5 mr-2" />
                Desbloquear Pack
              </Button>
            )}
            
            <Button
              onClick={onHowToPlayClick}
              variant="outline"
              size="lg"
              className="bg-white text-black border-white hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Como Jogar
            </Button>
          </div>

          {!hasAccess && (
            <p className="text-case-white/70 mt-4 text-sm">
              Desbloqueie este pack para ter acesso a todos os {totalCards} mistérios
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PackHeader;
