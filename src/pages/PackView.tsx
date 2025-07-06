
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Lock, Play, RotateCcw, Shield } from 'lucide-react';
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
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

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
    } else {
      // Show purchase popup for locked cards
      setShowPurchasePopup(true);
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
      {/* Pack Banner */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${pack.coverUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-noir-black/70 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center pt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/packs')}
              className="text-case-white hover:text-case-red hover:bg-noir-medium/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Packs
            </Button>
          </div>

          {/* Pack Info Overlay */}
          <div className="pb-8">
            <h1 className="font-anton text-4xl md:text-5xl lg:text-6xl text-case-white mb-4">
              {pack.name}
            </h1>
            <p className="text-case-white/90 text-xl max-w-3xl mb-6">
              {pack.description}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-case-red text-white text-base px-4 py-2">
                {pack.category}
              </Badge>
              <Badge variant="outline" className="border-case-white text-case-white text-base px-4 py-2">
                {pack.cards.length} Casos
              </Badge>
              {user && (
                <Badge variant="outline" className="border-green-500 text-green-500 text-base px-4 py-2">
                  {solvedCards.length} Resolvidos
                </Badge>
              )}
            </div>
            
            {/* Progress Bar */}
            {user && hasAccess && (
              <div className="max-w-md">
                <div className="flex justify-between text-case-white/80 text-sm mb-2">
                  <span>Progresso</span>
                  <span>{Math.round((solvedCards.length / pack.cards.length) * 100)}%</span>
                </div>
                <div className="w-full bg-noir-medium rounded-full h-3">
                  <div 
                    className="bg-case-red h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(solvedCards.length / pack.cards.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
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
                  onClick={() => handleCardClick(card)}
                  className="bg-white/50 rounded-xl p-6 relative border-2 border-gray-300 cursor-pointer hover:border-case-red/50 transition-all"
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
            
            {/* Purchase Section */}
            <div className="text-center mt-12 bg-noir-dark rounded-xl p-8 border border-noir-medium">
              <h3 className="text-case-white font-bold text-2xl mb-4">
                Desbloquear Pack Completo
              </h3>
              <p className="text-case-white/80 mb-6 text-lg">
                Desbloqueie todos os {pack.cards.length} casos deste pack
              </p>
              
              {/* Security Message */}
              <div className="flex items-center justify-center mb-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <Shield className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">Sua compra está segura com</span>
                <img 
                  src="/lovable-uploads/2e7dff68-1480-4f1e-9fff-bb3eacae2f7b.png" 
                  alt="Mercado Pago" 
                  className="h-8 ml-2"
                />
              </div>
              
              <Button 
                onClick={() => window.open('https://www.mercadopago.com.br/home', '_blank')}
                className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 text-lg rounded-xl"
              >
                Comprar Pack - R$ {pack.price.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Purchase Popup */}
      {showPurchasePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <Lock className="h-16 w-16 text-case-red mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Conteúdo Premium
              </h3>
              <p className="text-gray-600">
                Este caso faz parte do conteúdo premium. Desbloqueie o pack completo para aceder a todos os mistérios!
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  setShowPurchasePopup(false);
                  window.open('https://www.mercadopago.com.br/home', '_blank');
                }}
                className="w-full bg-case-red hover:bg-red-600 text-white font-bold py-3"
              >
                Desbloquear Pack - R$ {pack.price.toFixed(2)}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowPurchasePopup(false)}
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

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
