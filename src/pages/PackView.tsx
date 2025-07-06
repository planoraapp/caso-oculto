
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ChevronLeft } from 'lucide-react';
import { t } from '../data/translations';
import { getPackById, getUserPacks, getUserProgress, setCardSolved } from '../data/packs';
import FloatingFlipCard from '../components/FloatingFlipCard';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  
  const pack = id ? getPackById(id) : null;
  const userPacks = getUserPacks(user.id);
  const hasAccess = pack && userPacks.includes(pack.id);

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-case-white text-xl">Pack não encontrado</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-case-white text-xl mb-4">Você não possui este pack</div>
          <Link to="/packs">
            <Button className="bg-case-red hover:bg-red-600 text-white">
              Voltar aos Packs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    return t(`packView.difficulty.${difficulty}`);
  };

  const calculateProgress = () => {
    if (pack.cards.length === 0) return 0;
    const solvedCards = pack.cards.filter(card => getUserProgress(user.id, card.id));
    return (solvedCards.length / pack.cards.length) * 100;
  };

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
  };

  const handleToggleSolved = () => {
    if (selectedCard) {
      const currentStatus = getUserProgress(user.id, selectedCard.id);
      setCardSolved(user.id, selectedCard.id, !currentStatus);
      // Force re-render
      setSelectedCard({...selectedCard});
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/packs">
            <Button variant="outline" size="sm" className="mr-4 border-case-red text-case-red hover:bg-case-red hover:text-white">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t('packView.backToPacksButton')}
            </Button>
          </Link>
        </div>

        {/* Pack Info */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 mb-6">
            <div 
              className="w-full lg:w-48 h-48 lg:h-60 bg-cover bg-center rounded-lg mb-6 lg:mb-0 border-2 border-noir-medium"
              style={{ backgroundImage: `url(${pack.coverUrl})` }}
            >
              <div className="w-full h-full gradient-overlay rounded-lg flex items-end p-4">
                <h1 className="font-anton text-2xl lg:text-3xl text-case-white">
                  {pack.name}
                </h1>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-case-white/80 text-lg mb-4">{pack.description}</p>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-case-white font-medium">{t('packView.progress')}</span>
                  <span className="text-case-white text-sm">{Math.round(calculateProgress())}%</span>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
              <p className="text-case-white/60">
                {pack.cards.length} mistérios para desvendar
              </p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pack.cards.map((card) => {
            const isSolved = getUserProgress(user.id, card.id);
            
            return (
              <Card
                key={card.id}
                className="bg-noir-dark border-noir-medium p-6 cursor-pointer hover:border-case-red transition-all duration-200 relative"
                onClick={() => handleCardClick(card)}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(card.difficulty)}`}>
                    {getDifficultyText(card.difficulty)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isSolved 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {isSolved ? t('packView.solved') : t('packView.unsolved')}
                  </span>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {card.order}
                  </div>
                </div>

                {/* Mystery Preview */}
                <div className="mt-8">
                  <p className="text-case-white line-clamp-4 leading-relaxed">
                    {card.mystery}
                  </p>
                </div>

                {/* Click hint */}
                <div className="mt-4 text-center">
                  <p className="text-case-white/40 text-sm">
                    Clique para ver a carta completa
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {pack.cards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-case-white/60 text-lg">
              Este pack ainda não possui cartas disponíveis.
            </p>
          </div>
        )}
      </div>

      {/* Floating Card Modal */}
      {selectedCard && (
        <FloatingFlipCard
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          isSolved={getUserProgress(user.id, selectedCard.id)}
          onToggleSolved={handleToggleSolved}
        />
      )}
    </div>
  );
};

export default PackView;
