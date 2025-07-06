
import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { packs } from '../data/packs';
import PackCard from './PackCard';
import ComboModal from './ComboModal';
import PaymentStatusModal from './PaymentStatusModal';
import MercadoPagoCheckout from './MercadoPagoCheckout';
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { getUserPacks } from '../data/packs';
import LoadingSpinner from './LoadingSpinner';

const Carousel3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"id": "demo-user"}');
  const ownedPackIds = getUserPacks(currentUser.id);
  
  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  } = usePaymentStatus(currentUser.id);

  const featuredPacks = useMemo(() => 
    packs.filter(p => !['combo', 'complete'].includes(p.category)).slice(0, 6),
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredPacks.length);
  }, [featuredPacks.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredPacks.length) % featuredPacks.length);
  }, [featuredPacks.length]);

  const handlePackClick = useCallback((pack: any) => {
    if (pack.category === 'combo') {
      setIsComboModalOpen(true);
    }
  }, []);

  const handlePurchaseClick = useCallback(async (pack: any) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const session = await createPaymentSession(pack.id, 'individual');
      if (session) {
        setCheckoutPreferenceId(session.mercadopago_preference_id);
        
        setTimeout(() => {
          simulatePaymentConfirmation(session.id, true).then(() => {
            showPaymentStatus('approved', pack.name);
            setCheckoutPreferenceId(null);
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    } finally {
      setIsLoading(false);
    }
  }, [createPaymentSession, simulatePaymentConfirmation, showPaymentStatus, isLoading]);

  const getVisiblePacks = useCallback(() => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % featuredPacks.length;
      visible.push({ pack: featuredPacks[index], position: i });
    }
    return visible;
  }, [currentIndex, featuredPacks]);

  const visiblePacks = getVisiblePacks();

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-12">
      {/* Desktop Navigation */}
      <div className="carousel-nav-desktop -left-20">
        <button
          onClick={prevSlide}
          disabled={isLoading}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pack anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="carousel-nav-desktop -right-20">
        <button
          onClick={nextSlide}
          disabled={isLoading}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Próximo pack"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Cards do carrossel com efeito 3D */}
      <div className="flex items-center justify-center mb-8" style={{ perspective: '1000px' }}>
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
                x: position === 0 ? -120 : position === 2 ? 120 : 0
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
              className="absolute w-80 flex-shrink-0"
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

      {/* Mobile Navigation */}
      <div className="carousel-nav-mobile">
        <button
          onClick={prevSlide}
          disabled={isLoading}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pack anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isLoading}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Próximo pack"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Indicadores */}
      <div className="flex justify-center space-x-2 mt-6">
        {featuredPacks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-case-red' : 'bg-gray-600'
            }`}
            aria-label={`Ir para pack ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal do Combo */}
      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={ownedPackIds}
          onClose={() => setIsComboModalOpen(false)}
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
          }}
        />
      )}
    </div>
  );
};

export default React.memo(Carousel3D);
