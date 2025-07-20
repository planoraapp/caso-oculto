
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackCard from './PackCard';
import ComboModal from './ComboModal';
import PaymentStatusModal from './PaymentStatusModal';
import MercadoPagoCheckout from './MercadoPagoCheckout';
import LoadingSpinner from './LoadingSpinner';
import CarouselControls from './carousel/CarouselControls';
import CarouselIndicators from './carousel/CarouselIndicators';
import { usePaymentManager } from '../hooks/usePaymentManager';
import { getAllPacks, getUserPacks } from '../utils/packUtils';
import { useAuth } from '../hooks/useAuth';
import { Pack } from '../data/types';

const Carousel3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [ownedPackIds, setOwnedPackIds] = useState<string[]>([]);
  const [isLoadingPacks, setIsLoadingPacks] = useState(true);
  
  // Use useAuth hook instead of localStorage to get current user
  const { user } = useAuth();
  const currentUserId = user?.id || '';

  const {
    isLoading,
    checkoutPreferenceId,
    isComboModalOpen,
    paymentStatus,
    openComboModal,
    closeComboModal,
    handlePurchaseCombo,
    handleIndividualPurchase,
    closePaymentStatus,
    setCheckoutPreferenceId
  } = usePaymentManager(currentUserId);

  // Fetch packs from Supabase
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const packsData = await getAllPacks();
        // Filter for featured packs (exclude combo and complete categories)
        const featuredPacks = packsData.filter(pack => 
          !['combo', 'complete'].includes(pack.category)
        ).slice(0, 6); // Limit to first 6 packs for carousel
        
        setPacks(featuredPacks);
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
      if (!currentUserId) return;
      
      try {
        const userPackIds = await getUserPacks(currentUserId);
        setOwnedPackIds(userPackIds);
      } catch (error) {
        console.error('Error fetching user packs:', error);
      }
    };

    fetchUserPacks();
  }, [currentUserId]);

  const featuredPacks = useMemo(() => packs, [packs]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % featuredPacks.length);
  }, [featuredPacks.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + featuredPacks.length) % featuredPacks.length);
  }, [featuredPacks.length]);

  const handlePackClick = useCallback((pack: any) => {
    if (pack.category === 'combo') {
      openComboModal();
    }
  }, [openComboModal]);

  const handlePurchaseClick = useCallback(async (pack: any) => {
    if (isLoading) return;
    
    try {
      await handleIndividualPurchase(pack.id, pack.name);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  }, [handleIndividualPurchase, isLoading]);

  const handleComboPurchase = useCallback(async (selectedPackIds: string[]) => {
    try {
      await handlePurchaseCombo(selectedPackIds);
    } catch (error) {
      console.error('Erro no combo purchase:', error);
    }
  }, [handlePurchaseCombo]);

  const getVisiblePacks = useCallback(() => {
    if (featuredPacks.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % featuredPacks.length;
      visible.push({
        pack: featuredPacks[index],
        position: i
      });
    }
    return visible;
  }, [currentIndex, featuredPacks]);

  if (isLoadingPacks) {
    return (
      <div className="relative w-full max-w-6xl mx-auto mb-6 md:mb-8 flex justify-center items-center h-64 md:h-80">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (featuredPacks.length === 0) {
    return (
      <div className="relative w-full max-w-6xl mx-auto mb-6 md:mb-8 flex justify-center items-center h-64 md:h-80">
        <div className="text-case-white text-xl">Nenhum pack disponível</div>
      </div>
    );
  }

  const visiblePacks = getVisiblePacks();

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-6 md:mb-8">
      {/* Cards do carrossel com efeito 3D */}
      <div
        style={{ perspective: '1000px' }}
        className="flex items-center justify-center mb-8 md:mb-12 h-64 md:h-80 px-0 mx-0"
      >
        <AnimatePresence mode="wait">
          {visiblePacks.map(({ pack, position }, index) => (
            <motion.div
              key={`${pack.id}-${position}`}
              initial={{
                opacity: 0,
                rotateY: position === 0 ? -45 : position === 2 ? 45 : 0,
                scale: position === 1 ? 1.1 : 0.8,
                z: position === 1 ? 50 : 0
              }}
              animate={{
                opacity: position === 1 ? 1 : 0.6,
                rotateY: position === 0 ? -25 : position === 2 ? 25 : 0,
                scale: position === 1 ? 1.1 : 0.85,
                z: position === 1 ? 50 : 0,
                x: position === 0 ? -60 : position === 2 ? 60 : 0
              }}
              exit={{
                opacity: 0,
                rotateY: position === 0 ? -45 : position === 2 ? 45 : 0,
                scale: 0.8
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.1
              }}
              className="absolute w-48 md:w-80 flex-shrink-0"
              style={{
                transformStyle: 'preserve-3d',
                zIndex: position === 1 ? 10 : 5
              }}
            >
              <PackCard
                pack={pack}
                isPurchased={ownedPackIds.includes(pack.id)}
                onPackClick={() => handlePackClick(pack)}
                onPurchaseClick={handlePurchaseClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <CarouselControls
        onPrevious={prevSlide}
        onNext={nextSlide}
        isLoading={isLoading}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Indicators */}
      <CarouselIndicators
        totalItems={featuredPacks.length}
        currentIndex={currentIndex}
        onIndicatorClick={setCurrentIndex}
      />

      {/* Modal do Combo */}
      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={ownedPackIds}
          onClose={closeComboModal}
          onPurchaseCombo={handleComboPurchase}
          user={null}
        />
      )}

      {/* Modal de Status do Pagamento */}
      <PaymentStatusModal
        isOpen={paymentStatus.isOpen}
        onClose={closePaymentStatus}
        status={paymentStatus.status}
        packName={paymentStatus.packName}
      />

      {/* Checkout do Mercado Pago */}
      {checkoutPreferenceId && (
        <MercadoPagoCheckout
          preferenceId={checkoutPreferenceId}
          onPaymentResult={(result) => {
            console.log('Payment result:', result);
            setCheckoutPreferenceId(null);
          }}
        />
      )}
    </div>
  );
};

export default React.memo(Carousel3D);
