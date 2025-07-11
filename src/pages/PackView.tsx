
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
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { getPackById, getAllPacks, getUserPacks } from '../utils/packUtils';

interface PackViewProps {
  user: any;
}

const PackView: React.FC<PackViewProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pack, setPack] = useState<Pack | null>(null);
  const [allPacks, setAllPacks] = useState<Pack[]>([]);
  const [selectedCard, setSelectedCard] = useState<Case | null>(null);
  const [solvedCards, setSolvedCards] = useState<string[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [userPackIds, setUserPackIds] = useState<string[]>([]);

  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus
  } = usePaymentStatus(user?.id || '');

  useEffect(() => {
    const fetchPack = async () => {
      if (!id) return;
      
      console.log(`Fetching pack with ID: ${id}`);
      
      try {
        const packData = await getPackById(id);
        
        if (!packData) {
          console.error(`Pack with ID ${id} not found`);
          navigate('/packs');
          return;
        }
        
        console.log(`Pack loaded: ${packData.name} with ${packData.cases?.length || 0} cases`);
        setPack(packData);
        
        // Load solved cards from localStorage
        const solved = JSON.parse(localStorage.getItem(`solved_${user?.id || 'anonymous'}_${id}`) || '[]');
        setSolvedCards(solved);
      } catch (error) {
        console.error('Error fetching pack:', error);
        navigate('/packs');
      }
    };

    fetchPack();
  }, [id, navigate, user]);

  useEffect(() => {
    const fetchAllPacks = async () => {
      try {
        const packsData = await getAllPacks();
        setAllPacks(packsData);
      } catch (error) {
        console.error('Error fetching all packs:', error);
      }
    };

    fetchAllPacks();
  }, []);

  useEffect(() => {
    const fetchUserPacks = async () => {
      if (!user?.id) return;
      
      try {
        const userPackIds = await getUserPacks(user.id);
        setUserPackIds(userPackIds);
      } catch (error) {
        console.error('Error fetching user packs:', error);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando pack...</div>
      </div>
    );
  }

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

  const handlePaymentCreated = (sessionId: string) => {
    // Refresh the page or update pack access after successful payment
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handlePurchaseCombo = async (selectedPackIds: string[]) => {
    if (!user) return;
    
    try {
      const session = await createPaymentSession(null, 'combo', selectedPackIds);
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
        onHowToPlayClick={() => setIsHowToPlayOpen(true)}
      />

      {/* Cases Grid */}
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
