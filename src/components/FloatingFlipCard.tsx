
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, RotateCcw } from 'lucide-react';
import { t } from '../data/translations';
import { Card as CardType } from '../data/packs';

interface FloatingFlipCardProps {
  card: CardType;
  isOpen: boolean;
  onClose: () => void;
  isSolved: boolean;
  onToggleSolved: () => void;
}

const FloatingFlipCard: React.FC<FloatingFlipCardProps> = ({
  card,
  isOpen,
  onClose,
  isSolved,
  onToggleSolved
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-case-white';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${getDifficultyColor(card.difficulty)}`}>
              {t(`packView.difficulty.${card.difficulty}`)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSolved}
              className={`${
                isSolved 
                  ? 'bg-green-600 border-green-600 text-white hover:bg-green-700' 
                  : 'border-case-red text-case-red hover:bg-case-red hover:text-white'
              }`}
            >
              {isSolved ? t('packView.solved') : t('packView.unsolved')}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleFlip}
              className="border-case-red text-case-red hover:bg-case-red hover:text-white"
              title="Virar carta"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="border-case-red text-case-red hover:bg-case-red hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Card */}
        <div className="flip-card-container perspective-1000">
          <Card 
            className={`flip-card relative w-full h-96 cursor-pointer transition-all duration-600 bg-noir-dark border-2 border-noir-medium hover:border-case-red ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front side - Mystery */}
            <div 
              className="flip-card-front absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-case-red font-bold text-lg">
                    {t('cardViewer.mystery')}
                  </h3>
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {card.order}
                  </div>
                </div>
                <p className="text-case-white leading-relaxed text-base">
                  {card.mystery}
                </p>
              </div>
              <div className="text-center">
                <p className="text-case-white/60 text-sm">
                  {t('cardViewer.clickToFlip')}
                </p>
              </div>
            </div>

            {/* Back side - Solution */}
            <div 
              className="flip-card-back absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-case-red font-bold text-lg">
                    {t('cardViewer.solution')}
                  </h3>
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                </div>
                <p className="text-case-white leading-relaxed text-base">
                  {card.solution}
                </p>
              </div>
              <div className="text-center">
                <p className="text-case-white/60 text-sm">
                  {t('cardViewer.clickToFlip')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center">
          <p className="text-case-white/60 text-sm">
            Clique na carta ou no botão para virar • ESC para fechar
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingFlipCard;
