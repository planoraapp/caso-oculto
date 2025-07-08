
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { packs, getUserPacks, Pack, Case } from '../data/packs';
import FloatingFlipCard from '../components/FloatingFlipCard';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import PackHeader from '../components/pack-view/PackHeader';
import CasesGrid from '../components/pack-view/CasesGrid';
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
      {/* Pack Header */}
      <PackHeader
        pack={pack}
        hasAccess={hasAccess}
        solvedCards={solvedCards}
        user={user}
        onPurchaseClick={() => setIsPaymentModalOpen(true)}
      />

      {/* Cases Grid */}
      <CasesGrid
        cases={pack.cases}
        hasAccess={hasAccess}
        solvedCards={solvedCards}
        user={user}
        onCardClick={handleCardClick}
      />

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
