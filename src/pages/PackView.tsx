
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ChevronLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { t } from '../data/translations';
import { getPackById, getUserPacks, getUserProgress, setCardSolved, MERCADOPAGO_LINKS } from '../data/packs';
import FloatingFlipCard from '../components/FloatingFlipCard';
import { GlareCard } from '../components/ui/glare-card';
import { cn } from '../lib/utils';
import SiteFooter from '../components/SiteFooter';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showRules, setShowRules] = useState(false);
  
  const pack = id ? getPackById(id) : null;
  const userPacks = getUserPacks(user.id);
  const hasAccess = pack && userPacks.includes(pack.id);

  if (!pack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium flex items-center justify-center">
        <div className="text-case-white text-xl">Pack não encontrado</div>
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

  const handleCardClick = (card: any, index: number) => {
    if (hasAccess || index < 2) {
      setSelectedCard(card);
    } else {
      document.getElementById('unlock-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSolved = () => {
    if (selectedCard) {
      const currentStatus = getUserProgress(user.id, selectedCard.id);
      setCardSolved(user.id, selectedCard.id, !currentStatus);
      setSelectedCard({...selectedCard});
    }
  };

  const getCardIcon = (index: number) => {
    const icons = ['🔍', '💀', '🗝️', '👁️', '🌙', '🔪', '💰', '🚗', '🏠', '📞', 
                   '⚡', '🔥', '💊', '🔫', '👻', '🎭', '⚰️', '🩸', '📝', '🔮'];
    return icons[index] || '❓';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/packs">
              <Button variant="outline" size="sm" className="border-case-red text-case-red hover:bg-case-red hover:text-white">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t('packView.backToPacksButton')}
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRules(!showRules)}
              className="border-case-red text-case-red hover:bg-case-red hover:text-white"
            >
              {showRules ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showRules ? 'Ocultar Regras' : 'Como Jogar'}
            </Button>
          </div>

          {/* Game Rules */}
          {showRules && (
            <Card className="bg-noir-dark border-noir-medium mb-8 p-6">
              <h2 className="font-anton text-2xl text-case-red mb-6">
                Como Jogar
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <p className="text-case-white">Leia o mistério apresentado com atenção e tente desvendar o que realmente aconteceu.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <p className="text-case-white">Pense fora da caixa - a solução geralmente envolve um detalhe inesperado ou uma perspectiva diferente.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <p className="text-case-white">Quando achar que descobriu, vire a carta para conferir a solução.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <p className="text-case-white">Marque como resolvido se conseguiu descobrir por conta própria!</p>
                </div>
              </div>
            </Card>
          )}

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
                {hasAccess && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-case-white font-medium">{t('packView.progress')}</span>
                      <span className="text-case-white text-sm">{Math.round(calculateProgress())}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2" />
                  </div>
                )}
                <p className="text-case-white/60">
                  {pack.cards.length} mistérios para desvendar
                </p>
                {!hasAccess && (
                  <p className="text-yellow-400 mt-2">
                    2 casos gratuitos • {pack.cards.length - 2} casos premium
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <h2 className="text-2xl lg:text-3xl font-anton text-case-white text-center mb-8">
            Casos do Pack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {pack.cards.map((card, index) => {
              const isSolved = getUserProgress(user.id, card.id);
              const isLocked = !hasAccess && index >= 2;
              const isFree = index < 2;
              
              return (
                <div key={card.id} className="relative">
                  <GlareCard 
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      isLocked && "opacity-50 saturate-50"
                    )}
                  >
                    <div 
                      className="w-full h-full flex flex-col justify-between p-6 relative"
                      onClick={() => handleCardClick(card, index)}
                    >
                      {/* Status Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(card.difficulty)}`}>
                          {getDifficultyText(card.difficulty)}
                        </span>
                        {hasAccess || isFree ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isSolved 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-white'
                          }`}>
                            {isSolved ? t('packView.solved') : t('packView.unsolved')}
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-600 text-white">
                            Premium
                          </span>
                        )}
                      </div>

                      {/* Case Number */}
                      <div className="mb-4">
                        <div className="bg-case-red text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                          {card.order}
                        </div>
                      </div>

                      {/* Case Icon and Title */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="text-4xl mb-3">
                          {getCardIcon(index)}
                        </div>
                        <h3 className="text-case-white text-lg font-bold mb-2">
                          Caso #{card.order}
                        </h3>
                        <p className="text-case-white/60 text-sm">
                          {isLocked ? 'Caso Bloqueado' : 'Clique para investigar'}
                        </p>
                      </div>

                      {/* Lock Icon for Premium Cases */}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                          <Lock className="h-8 w-8 text-case-red" />
                        </div>
                      )}

                      {/* Free Badge */}
                      {isFree && !hasAccess && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            Grátis
                          </span>
                        </div>
                      )}
                    </div>
                  </GlareCard>
                </div>
              );
            })}
          </div>

          {/* Unlock Section */}
          {!hasAccess && (
            <div id="unlock-section" className="mt-16 text-center bg-noir-dark p-8 rounded-lg border border-case-red/50">
              <Lock className="h-12 w-12 text-case-red mx-auto mb-4"/>
              <h2 className="text-3xl font-bold text-case-white mb-2">Desbloqueie o Pack Completo</h2>
              <p className="text-case-white/80 mb-6">
                Adquira este pack para ter acesso a todos os {pack.cards.length} casos e desvendar todos os mistérios!
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto">
                <a 
                  href={`https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${MERCADOPAGO_LINKS.individual}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-case-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Comprar Pack Individual - R$ 14,80
                </a>
                <a 
                  href={`https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${MERCADOPAGO_LINKS.combo}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-noir-medium hover:bg-gray-600 text-case-white px-6 py-3 rounded-lg font-bold transition-colors border border-case-red"
                >
                  Ver Combo 5 Packs - R$ 61,40
                </a>
                <a 
                  href={`https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${MERCADOPAGO_LINKS.complete}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-noir-medium hover:bg-gray-600 text-case-white px-6 py-3 rounded-lg font-bold transition-colors border border-case-red"
                >
                  Pack Completo - R$ 110,90
                </a>
              </div>
            </div>
          )}

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
      
      <SiteFooter />
    </div>
  );
};

export default PackView;
