import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import LoadingSpinner from '../components/LoadingSpinner';
import HowToPlayModal from '../components/HowToPlayModal';
import SpecialOffersSection from '../components/packs/SpecialOffersSection';
import RegularPacksSection from '../components/packs/RegularPacksSection';
import SiteFooter from '../components/SiteFooter';
import { usePaymentManager } from '../hooks/usePaymentManager';
import { useModalManager } from '../hooks/useModalManager';
import { getAllPacks, getUserPacks } from '../utils/packUtils';
import { Pack } from '../data/types';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [ownedPackIds, setOwnedPackIds] = useState<string[]>([]);
  const [isLoadingPacks, setIsLoadingPacks] = useState(true);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  
  const {
    isLoading,
    isPaymentModalOpen,
    selectedPack,
    paymentStatus,
    openPaymentModal,
    closePaymentModal,
    handlePaymentCreated,
    handlePurchaseCombo,
    closePaymentStatus
  } = usePaymentManager(user?.id || '');

  const { isOpen: isHowToPlayOpen, openModal: openHowToPlay, closeModal: closeHowToPlay } = useModalManager();

  // Fetch packs from Supabase
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const packsData = await getAllPacks();
        setPacks(packsData);
      } catch (error) {
        console.error('Error fetching packs:', error);
      } finally {
        setIsLoadingPacks(false);
      }
    };

    fetchPacks();
  }, []);

  // Fetch user's owned packs
  useEffect(() => {
    const fetchUserPacks = async () => {
      if (!user?.id) return;
      
      try {
        const userPackIds = await getUserPacks(user.id);
        setOwnedPackIds(userPackIds);
      } catch (error) {
        console.error('Error fetching user packs:', error);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  const regularPacks = useMemo(() => 
    packs.filter(p => !['combo', 'complete'].includes(p.category)), 
    [packs]
  );

  const handlePackClick = useCallback((pack: any) => {
    // Navigation is handled by Link in PackCard
  }, []);

  const handlePurchaseClick = useCallback((pack: any) => {
    if (!user) return;
    openPaymentModal(pack);
  }, [user, openPaymentModal]);

  const handleComboClick = useCallback(() => {
    if (!user || isLoading) return;
    setIsComboModalOpen(true);
  }, [user, isLoading]);

  const handleCompleteClick = useCallback(() => {
    if (!user || isLoading) return;
    setIsCompleteModalOpen(true);
  }, [user, isLoading]);

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (isLoadingPacks) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="pt-20 px-4 pb-8 flex-1">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-case-white mb-4" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              Escolha seu Mistério
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-case-white/80 max-w-2xl mx-auto px-4" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
            >
              Desvende casos intrigantes e desafie sua mente com nossos packs exclusivos de mistérios.
            </motion.p>
            
            {/* How to Play Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => openHowToPlay('howToPlay')}
                variant="outline"
                className="bg-gray-800/50 border-gray-600 text-case-white hover:bg-gray-700 hover:border-case-red/50"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Como Jogar
              </Button>
            </motion.div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center mb-6 md:mb-8">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Special Offers Section */}
          <SpecialOffersSection
            user={user}
            isLoading={isLoading}
            onComboClick={handleComboClick}
            onCompletePurchase={handleCompleteClick}
          />

          {/* Regular Packs Section */}
          <RegularPacksSection
            packs={regularPacks}
            ownedPackIds={ownedPackIds}
            onPackClick={handlePackClick}
            onPurchaseClick={handlePurchaseClick}
          />
        </div>
      </div>

      {/* Modals */}
      <HowToPlayModal 
        isOpen={isHowToPlayOpen('howToPlay')} 
        onClose={() => closeHowToPlay('howToPlay')} 
      />

      {/* Combo Modal - Modal de seleção de packs */}
      {isComboModalOpen && (
        <ComboModal 
          packs={packs} 
          ownedPackIds={ownedPackIds} 
          onClose={() => setIsComboModalOpen(false)} 
          onPurchaseCombo={handlePurchaseCombo}
        />
      )}

      {/* Modal de pagamento para Acesso Total */}
      <PaymentOptionsModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        type="complete"
        user={user}
        packName="Acesso Total"
        onPaymentCreated={handlePaymentSuccess}
      />

      {/* Modal de pagamento para Pack Individual */}
      {selectedPack && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          type="individual"
          packName={selectedPack.name}
          packId={selectedPack.id}
          user={user}
          onPaymentCreated={handlePaymentSuccess}
        />
      )}

      <PaymentStatusModal 
        isOpen={paymentStatus.isOpen} 
        onClose={closePaymentStatus} 
        status={paymentStatus.status} 
        packName={paymentStatus.packName} 
      />

      <SiteFooter />
    </div>
  );
};

export default React.memo(Packs);
