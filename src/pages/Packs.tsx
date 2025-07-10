
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import StripeCheckout from '../components/StripeCheckout';
import LoadingSpinner from '../components/LoadingSpinner';
import HowToPlayModal from '../components/HowToPlayModal';
import SpecialOffersSection from '../components/packs/SpecialOffersSection';
import RegularPacksSection from '../components/packs/RegularPacksSection';
import { packs, getUserPacks } from '../data/packs';
import { usePaymentManager } from '../hooks/usePaymentManager';
import { useModalManager } from '../hooks/useModalManager';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const ownedPackIds = getUserPacks(user?.id || '');
  
  const {
    isLoading,
    stripeSessionId,
    isPaymentModalOpen,
    isComboModalOpen,
    selectedPack,
    paymentStatus,
    openPaymentModal,
    closePaymentModal,
    openComboModal,
    closeComboModal,
    handlePaymentCreated,
    handlePurchaseCombo,
    handleCompletePurchase,
    closePaymentStatus
  } = usePaymentManager(user?.id || '');

  const { isOpen: isHowToPlayOpen, openModal: openHowToPlay, closeModal: closeHowToPlay } = useModalManager();

  const regularPacks = useMemo(() => packs.filter(p => !['combo', 'complete'].includes(p.category)), []);

  const handlePackClick = useCallback((pack: any) => {
    // Navigation is handled by Link in PackCard
  }, []);

  const handlePurchaseClick = useCallback((pack: any) => {
    if (!user) return;
    openPaymentModal(pack);
  }, [user, openPaymentModal]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-20 px-4 pb-8">
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
            onComboClick={openComboModal}
            onCompletePurchase={handleCompletePurchase}
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

      {isComboModalOpen && (
        <ComboModal 
          packs={packs} 
          ownedPackIds={ownedPackIds} 
          onClose={closeComboModal} 
          onPurchaseCombo={handlePurchaseCombo}
        />
      )}

      {selectedPack && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          type="individual"
          packName={selectedPack.name}
          packId={selectedPack.id}
          user={user}
          onPaymentCreated={handlePaymentCreated}
        />
      )}

      <PaymentStatusModal 
        isOpen={paymentStatus.isOpen} 
        onClose={closePaymentStatus} 
        status={paymentStatus.status} 
        packName={paymentStatus.packName} 
      />

      {stripeSessionId && (
        <StripeCheckout 
          type="individual"
          packId={selectedPack?.id}
          userId={user?.id || ''}
          sessionId={stripeSessionId}
          onSuccess={() => {
            console.log('Payment successful');
            // Reset checkout preference handled by payment manager
          }}
          onError={(error) => {
            console.error('Payment error:', error);
          }}
        />
      )}
    </div>
  );
};

export default React.memo(Packs);
