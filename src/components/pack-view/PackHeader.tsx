
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Pack } from '../../data/types';
import ProgressBar from '../common/ProgressBar';
import { calculatePackProgress } from '../../utils/progress';

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
  const { progress, solvedCount, totalCount } = calculatePackProgress(pack.cases || [], solvedCards);

  if (!pack) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando pack...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${pack.image || '/placeholder-pack.jpg'})` }} 
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Pack Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-case-white mb-4">
              {pack.name}
            </h1>
            
            <p className="text-lg text-case-white/90 mb-6 max-w-xl">
              {pack.description}
            </p>

            {hasAccess && user && totalCount > 0 && (
              <ProgressBar
                progress={progress}
                solvedCount={solvedCount}
                totalCount={totalCount}
              />
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {!hasAccess && totalCount > 0 && (
              <p className="text-case-white/70 mt-4 text-sm">
                Desbloqueie este pack para ter acesso a todos os {totalCount} mistérios
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PackHeader;
