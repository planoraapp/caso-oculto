
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { packs } from '../data/packs';
import PackCard from './PackCard';
import ComboModal from './ComboModal';
import PaymentStatusModal from './PaymentStatusModal';
import MercadoPagoCheckout from './MercadoPagoCheckout';
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { getUserPacks } from '../data/packs';

const Carousel3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);
  
  // Simular usuário logado para o exemplo
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"id": "demo-user"}');
  const ownedPackIds = getUserPacks(currentUser.id);
  
  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  } = usePaymentStatus(currentUser.id);

  const featuredPacks = packs.filter(p => 
    !p.isFree && !['combo', 'complete'].includes(p.category)
  ).slice(0, 6);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPacks.length) % featuredPacks.length);
  };

  const handlePackClick = (pack: any) => {
    if (pack.category === 'combo') {
      setIsComboModalOpen(true);
    } else {
      // Navegar para a página do pack
      window.location.href = `/pack/${pack.id}`;
    }
  };

  const handlePurchaseClick = async (pack: any) => {
    const session = await createPaymentSession(pack.id, 'individual');
    if (session) {
      setCheckoutPreferenceId(session.mercadopago_preference_id);
      
      // Simular aprovação após 3 segundos (remover em produção)
      setTimeout(() => {
        simulatePaymentConfirmation(session.id, true).then(() => {
          showPaymentStatus('approved', pack.name);
          setCheckoutPreferenceId(null);
        });
      }, 3000);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-center space-x-2 mb-8">
        {/* Botão anterior - agora preenchido e branco */}
        <button
          onClick={prevSlide}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Cards do carrossel - menos espaçados */}
        <div className="flex space-x-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {featuredPacks.slice(currentIndex, currentIndex + 3).map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-80 flex-shrink-0"
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

        {/* Botão próximo - agora preenchido e branco */}
        <button
          onClick={nextSlide}
          className="bg-white text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center space-x-2 mt-6">
        {featuredPacks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-case-red' : 'bg-gray-600'
            }`}
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

export default Carousel3D;
