
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pack, Case } from '../data/types';
import FloatingFlipCard from '../components/FloatingFlipCard';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import HowToPlayModal from '../components/HowToPlayModal';
import PackHeader from '../components/pack-view/PackHeader';
import CasesGrid from '../components/pack-view/CasesGrid';
import LoadingState from '../components/common/LoadingState';
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { useUserPackAccess } from '../hooks/useUserPackAccess';
import { getPackById, getAllPacks } from '../utils/packUtils';
import { getSolvedCards, setSolvedCards } from '../utils/progress';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pack, setPack] = useState<Pack | null>(null);
  const [allPacks, setAllPacks] = useState<Pack[]>([]);
  const [selectedCard, setSelectedCard] = useState<Case | null>(null);
  const [solvedCards, setSolvedCardsState] = useState<string[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  const { userPackIds } = useUserPackAccess(user?.id);
  const { paymentStatus, createPaymentSession, showPaymentStatus, closePaymentStatus } = usePaymentStatus(user?.id || '');

  useEffect(() => {
    const fetchPack = async () => {
      if (!id) return;
      
      try {
        const packData = await getPackById(id);
        if (!packData) {
          navigate('/packs');
          return;
        }
        
        setPack(packData);
        const solved = getSolvedCards(user?.id || 'anonymous', id);
        setSolvedCardsState(solved);
      } catch (error) {
        console.error('Error fetching pack:', error);
        navigate('/packs');
      }
    };

    fetchPack();
  }, [id, navigate, user]);

  useEffect(() => {
    getAllPacks().then(setAllPacks).catch(console.error);
  }, []);

  if (!pack) {
    return <LoadingState message="Carregando pack..." />;
  }

  const hasAccess = userPackIds.includes(pack.id) || (user?.email === 'conectawebapps@outlook.com');

  const handleCardClick = (card: Case) => {
    if (card.isFree || hasAccess) {
      setSelectedCard(card);
      setIsCardOpen(true);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleToggleSolved = () => {
    if (!selectedCard || !user) return;

    const newSolvedCards = solvedCards.includes(selectedCard.id)
      ? solvedCards.filter(id => id !== selectedCard.id)
      : [...solvedCards, selectedCard.id];

    setSolvedCardsState(newSolvedCards);
    setSolvedCards(user.id, pack.id, newSolvedCards);
  };

  const handlePaymentCreated = () => {
    setTimeout(() => window.location.reload(), 2000);
  };

  const handlePurchaseCombo = async (selectedPackIds: string[]) => {
    if (!user) return;
    
    try {
      await createPaymentSession(null, 'combo', selectedPackIds);
      setIsComboModalOpen(false);
    } catch (error) {
      console.error('Erro ao processar pagamento do combo:', error);
      showPaymentStatus('rejected', 'Combo 5 Packs');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <PackHeader
        pack={pack}
        hasAccess={hasAccess}
        solvedCards={solvedCards}
        user={user}
        onPurchaseClick={() => setIsPaymentModalOpen(true)}
        onHowToPlayClick={() => setIsHowToPlayOpen(true)}
      />

      <CasesGrid
        cases={pack.cases || []}
        hasAccess={hasAccess}
        solvedCards={solvedCards}
        user={user}
        onCardClick={handleCardClick}
      />

      {/* Modals */}
      <HowToPlayModal 
        isOpen={isHowToPlayOpen} 
        onClose={() => setIsHowToPlayOpen(false)} 
      />

      {pack && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          type="individual"
          packName={pack.name}
          packId={pack.id}
          user={user}
          onPaymentCreated={handlePaymentCreated}
        />
      )}

      {isComboModalOpen && (
        <ComboModal
          packs={allPacks}
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
