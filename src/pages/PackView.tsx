
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { packs, getUserPacks, Pack, Case } from '../data/packs';
import { t } from '../data/translations';
import FloatingFlipCard from '../components/FloatingFlipCard';
import CaseCard from '../components/CaseCard';
import PurchaseModal from '../components/PurchaseModal';
import ComboModal from '../components/ComboModal';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pack, setPack] = useState<Pack | null>(null);
  const [selectedCard, setSelectedCard] = useState<Case | null>(null);
  const [solvedCards, setSolvedCards] = useState<string[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando pack...</div>
      </div>
    );
  }

  const userPackIds = user ? getUserPacks(user.id) : [];
  const hasAccess = userPackIds.includes(pack.id) || (user && user.email === 'conectawebapps@outlook.com');

  const handleCardClick = (card: Case) => {
    // Allow access to free cards or if user has purchased the pack
    if (card.isFree || hasAccess) {
      setSelectedCard(card);
      setIsCardOpen(true);
    } else {
      // Show purchase modal for locked cards
      setIsPurchaseModalOpen(true);
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

  const handleIndividualPurchase = () => {
    window.open('https://www.mercadopago.com.br/home', '_blank');
    setIsPurchaseModalOpen(false);
  };

  const handleComboPurchase = () => {
    setIsPurchaseModalOpen(false);
    setIsComboModalOpen(true);
  };

  const handleCompletePurchase = () => {
    window.open('https://www.mercadopago.com.br/home', '_blank');
    setIsPurchaseModalOpen(false);
  };

  const handlePurchaseCombo = (selectedPackIds: string[]) => {
    localStorage.setItem(`pendingCombo_${user?.id}`, JSON.stringify(selectedPackIds));
    window.open('https://www.mercadopago.com.br/home', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Pack Banner */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${pack.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center pt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/packs')}
              className="text-case-white hover:text-case-red"
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
                {pack.cases.length} Casos
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
                  <span>{Math.round((solvedCards.length / pack.cases.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-case-red h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(solvedCards.length / pack.cases.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Cases Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-anton text-case-white mb-6">
            Casos do Pack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pack.cases.map((caseData) => (
              <CaseCard
                key={caseData.id}
                case={caseData}
                isLocked={!caseData.isFree && !hasAccess}
                isSolved={user && solvedCards.includes(caseData.id)}
                onClick={() => handleCardClick(caseData)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        packName={pack.name}
        onIndividualPurchase={handleIndividualPurchase}
        onComboPurchase={handleComboPurchase}
        onCompletePurchase={handleCompletePurchase}
      />

      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={userPackIds}
          onClose={() => setIsComboModalOpen(false)}
          onPurchaseCombo={handlePurchaseCombo}
        />
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
