import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Pack } from '../../data/types';
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
  const totalCards = pack.cases?.length || 0;
  const progress = totalCards > 0 ? solvedCount / totalCards * 100 : 0;
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
  if (!pack) {
    return <div className="min-h-[50vh] flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando pack...</div>
      </div>;
  }
  return <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${pack.image || '/placeholder-pack.jpg'})`
    }} />
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Gradient overlay for better text visibility at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Pack Info - Positioned at bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-2xl">
            
            
            <h1 className="text-3xl md:text-5xl font-bold text-case-white mb-4">
              {pack.name}
            </h1>
            
            <p className="text-lg text-case-white/90 mb-6 max-w-xl">
              {pack.description}
            </p>

            {/* Progress Bar (only show if user has access) */}
            {hasAccess && user && totalCards > 0 && <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-case-white">
                    {solvedCount} de {totalCards} casos resolvidos
                  </span>
                </div>
                <div className="w-full max-w-md bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{
                width: `${progress}%`
              }} />
                </div>
              </div>}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!hasAccess && <Button onClick={onPurchaseClick} size="lg" className="bg-case-red hover:bg-red-600 text-white px-8 py-3 text-lg">
                  <Lock className="h-5 w-5 mr-2" />
                  Desbloquear Pack
                </Button>}
              
              <Button onClick={onHowToPlayClick} variant="outline" size="lg" className="bg-white text-black border-white hover:bg-gray-100 px-8 py-3 text-lg">
                <HelpCircle className="h-5 w-5 mr-2" />
                Como Jogar
              </Button>
            </div>

            {!hasAccess && totalCards > 0 && <p className="text-case-white/70 mt-4 text-sm">
                Desbloqueie este pack para ter acesso a todos os {totalCards} mistérios
              </p>}
          </motion.div>
        </div>
      </div>
    </div>;
};
export default PackHeader;