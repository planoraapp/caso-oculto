
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Lock, Play, RotateCcw } from 'lucide-react';
import { packs, getUserPacks, Pack, Card } from '../data/packs';
import { t } from '../data/translations';
import FloatingFlipCard from '../components/FloatingFlipCard';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pack, setPack] = useState<Pack | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [solvedCards, setSolvedCards] = useState<string[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const foundPack = packs.find(p => p.id === id);
    if (foundPack) {
      setPack(foundPack);
      // Load solved cards from localStorage
      const solved = JSON.parse(localStorage.getItem(`solved_${user?.id || 'anonymous'}_${id}`) || '[]');
      setSolvedCards(solved);
    } else {
      navigate('/packs');
    }
  }, [id, navigate, user]);

  if (!pack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium flex items-center justify-center">
        <div className="text-case-white text-xl">Carregando pack...</div>
      </div>
    );
  }

  const userPackIds = user ? getUserPacks(user.id) : [];
  const hasAccess = pack.isFree || userPackIds.includes(pack.id) || (user && user.email === 'conectawebapps@outlook.com');

  const handleCardClick = (card: Card) => {
    // Allow access to free cards or if user has purchased the pack
    if (card.isFree || hasAccess) {
      setSelectedCard(card);
      setIsCardOpen(true);
    }
  };

  const handleToggleSolved = () => {
    if (!selectedCard || !user) return;

    const cardId = selectedCard.id;
    const newSolvedCards = solvedCards.includes(cardId)
      ? solvedCards.filter(id => id !== cardId)
      : [...solvedCards, cardId];

    setSolvedCards(newSolvedCards);
    localStorage.setItem(`solved_${user.id}_${pack.id}`, JSON.stringify(newSolvedCards));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAccessibleCards = () => {
    return pack.cards.filter(card => card.isFree || hasAccess);
  };

  const getLockedCards = () => {
    return pack.cards.filter(card => !card.isFree && !hasAccess);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/packs')}
            className="text-case-white hover:text-case-red hover:bg-noir-medium mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Packs
          </Button>
        </div>

        {/* Pack Info */}
        <div className="mb-12 text-center">
          <h1 className="font-anton text-3xl md:text-4xl lg:text-5xl text-case-white mb-4">
            {pack.name}
          </h1>
          <p className="text-case-white/80 text-lg max-w-2xl mx-auto mb-6">
            {pack.description}
          </p>
          <div className="flex justify-center items-center gap-4">
            <Badge className="bg-case-red text-white">
              {pack.category}
            </Badge>
            <Badge variant="outline" className="border-case-white text-case-white">
              {pack.cards.length} Casos
            </Badge>
            {user && (
              <Badge variant="outline" className="border-green-500 text-green-500">
                {solvedCards.length} Resolvidos
              </Badge>
            )}
          </div>
        </div>

        {/* Accessible Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-anton text-case-white mb-6">
            {hasAccess ? 'Todos os Casos' : 'Casos Gratuitos'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAccessibleCards().map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="bg-white rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-case-red"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {card.order}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(card.difficulty)}`}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.isFree && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Grátis
                      </Badge>
                    )}
                    {user && solvedCards.includes(card.id) && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        ✓ Resolvido
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-case-red font-bold text-lg mb-2">
                    Caso #{card.order}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-sm line-clamp-4">
                    {card.mystery}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs capitalize">
                    {t(`packView.difficulty.${card.difficulty}`)}
                  </span>
                  <div className="flex items-center text-case-red text-sm">
                    <Play className="h-4 w-4 mr-1" />
                    Resolver
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Cards (for non-purchased packs) */}
        {!hasAccess && getLockedCards().length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-anton text-case-white mb-6">
              Casos Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getLockedCards().map((card) => (
                <div
                  key={card.id}
                  className="bg-white/50 rounded-xl p-6 relative border-2 border-gray-300"
                >
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-12 w-12 text-case-red mx-auto mb-2" />
                      <p className="text-case-red font-bold">Caso Bloqueado</p>
                    </div>
                  </div>
                  
                  <div className="opacity-30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {card.order}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(card.difficulty)}`}></div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-case-red font-bold text-lg mb-2">
                        Caso #{card.order}
                      </h3>
                      <p className="text-gray-800 leading-relaxed text-sm">
                        Conteúdo premium bloqueado...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-case-white/80 mb-4">
                Desbloqueie todos os {pack.cards.length} casos deste pack
              </p>
              <Button className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 text-lg rounded-xl">
                Comprar Pack - R$ {pack.price.toFixed(2)}
              </Button>
            </div>
          </div>
        )}

        {/* Progress */}
        {user && hasAccess && (
          <div className="text-center">
            <div className="bg-noir-dark rounded-xl p-6 border border-noir-medium">
              <h3 className="text-case-white font-bold text-lg mb-4">
                Seu Progresso
              </h3>
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-case-red mb-1">
                    {solvedCards.length}
                  </div>
                  <div className="text-case-white/60 text-sm">Resolvidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-case-white mb-1">
                    {pack.cards.length - solvedCards.length}
                  </div>
                  <div className="text-case-white/60 text-sm">Restantes</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-noir-medium rounded-full h-2">
                  <div 
                    className="bg-case-red h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(solvedCards.length / pack.cards.length) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-case-white/60 text-sm mt-2">
                  {Math.round((solvedCards.length / pack.cards.length) * 100)}% Completo
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Card Modal */}
      <FloatingFlipCard
        card={selectedCard!}
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
        isSolved={selectedCard ? solvedCards.includes(selectedCard.id) : false}
        onToggleSolved={handleToggleSolved}
      />
    </div>
  );
};

export default PackView;
