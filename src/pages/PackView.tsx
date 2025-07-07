
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { packs, getUserPacks, Pack, Case } from '../data/packs';
import { t } from '../data/translations';
import FloatingFlipCard from '../components/FloatingFlipCard';
import CaseCard from '../components/CaseCard';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import { usePaymentStatus } from '../hooks/usePaymentStatus';

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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);

  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus
  } = usePaymentStatus(user?.id || '');

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
      setIsPaymentModalOpen(true);
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

  const handlePaymentCreated = (preferenceId: string) => {
    setCheckoutPreferenceId(preferenceId);
  };

  const handlePurchaseCombo = async (selectedPackIds: string[]) => {
    if (!user) return;
    
    try {
      const session = await createPaymentSession(null, 'combo', selectedPackIds);
      setCheckoutPreferenceId(session.mercadopago_preference_id);
      setIsComboModalOpen(false);
    } catch (error) {
      console.error('Erro ao processar pagamento do combo:', error);
      showPaymentStatus('rejected', 'Combo 5 Packs');
    }
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

            {/* Purchase Button */}
            {!hasAccess && user && (
              <div className="mb-6">
                <Button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="bg-case-red hover:bg-red-600 text-white text-lg px-8 py-3"
                >
                  Desbloquear Pack - R$ {pack.price.toFixed(2).replace('.', ',')}
                </Button>
              </div>
            )}
            
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
      {pack && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packName={pack.name}
          packId={pack.id}
          userId={user?.id || ''}
          onPaymentCreated={handlePaymentCreated}
        />
      )}

      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={userPackIds}
          onClose={() => setIsComboModalOpen(false)}
          onPurchaseCombo={handlePurchaseCombo}
        />
      )}

      <PaymentStatusModal
        isOpen={paymentStatus.isOpen}
        onClose={closePaymentStatus}
        status={paymentStatus.status}
        packName={paymentStatus.packName}
      />

      {checkoutPreferenceId && (
        <MercadoPagoCheckout
          preferenceId={checkoutPreferenceId}
          onPaymentResult={(result) => {
            console.log('Payment result:', result);
            setCheckoutPreferenceId(null);
          }}
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
