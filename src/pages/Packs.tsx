
import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Users, Zap, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PackCard from '../components/PackCard';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import LoadingSpinner from '../components/LoadingSpinner';
import HowToPlayModal from '../components/HowToPlayModal';
import { packs } from '../data/packs';
import { getUserPacks } from '../data/packs';
import { usePaymentStatus } from '../hooks/usePaymentStatus';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ownedPackIds = getUserPacks(user?.id || '');
  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  } = usePaymentStatus(user?.id || '');

  const regularPacks = useMemo(() => packs.filter(p => !['combo', 'complete'].includes(p.category)), []);
  const specialPacks = useMemo(() => packs.filter(p => ['combo', 'complete'].includes(p.category)), []);

  const handlePackClick = useCallback((pack: any) => {
    if (ownedPackIds.includes(pack.id)) {
      // Navigation handled by Link in PackCard
    }
  }, [ownedPackIds]);

  const handlePurchaseClick = useCallback((pack: any) => {
    if (!user) return;
    setSelectedPack(pack);
    setIsPaymentModalOpen(true);
  }, [user]);

  const handlePaymentCreated = useCallback((preferenceId: string) => {
    setCheckoutPreferenceId(preferenceId);
    setIsPaymentModalOpen(false);
  }, []);

  const handleComboClick = useCallback(() => {
    if (!user) return;
    setIsComboModalOpen(true);
  }, [user]);

  const handlePurchaseCombo = useCallback(async (selectedPackIds: string[]) => {
    if (isLoading || !user) return;
    setIsLoading(true);
    
    try {
      console.log('Starting combo purchase for packs:', selectedPackIds);
      const session = await createPaymentSession(null, 'combo', selectedPackIds);
      setCheckoutPreferenceId(session.mercadopago_preference_id);
      setIsComboModalOpen(false);
    } catch (error) {
      console.error('Erro ao processar pagamento do combo:', error);
      showPaymentStatus('rejected', 'Combo 5 Packs');
    } finally {
      setIsLoading(false);
    }
  }, [createPaymentSession, showPaymentStatus, isLoading, user]);

  const handleCompletePurchase = useCallback(async () => {
    if (isLoading || !user) return;
    setIsLoading(true);
    
    try {
      console.log('Starting complete access purchase');
      const session = await createPaymentSession(null, 'complete');
      setCheckoutPreferenceId(session.mercadopago_preference_id);
    } catch (error) {
      console.error('Erro ao processar pagamento completo:', error);
      showPaymentStatus('rejected', 'Acesso Total');
    } finally {
      setIsLoading(false);
    }
  }, [createPaymentSession, showPaymentStatus, isLoading, user]);

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
                onClick={() => setIsHowToPlayModalOpen(true)}
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

          {/* Packs Especiais */}
          <motion.div 
            className="mb-12 md:mb-16" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-case-white mb-6 md:mb-8 text-center">Ofertas Especiais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Combo Pack */}
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-case-red/50 hover:border-case-red transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-case-red text-white">COMBO</Badge>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm">Mais Popular</span>
                    </div>
                  </div>
                  <CardTitle className="text-case-white text-lg md:text-xl">Combo 5 Packs</CardTitle>
                  <CardDescription className="text-case-white/80 text-sm md:text-base">
                    Escolha 5 packs e economize 20%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-case-white/80 text-sm md:text-base">
                      <Users className="h-4 w-4 mr-2" />
                      <span>5 packs de sua escolha</span>
                    </div>
                    <div className="flex items-center text-case-white/80 text-sm md:text-base">
                      <Zap className="h-4 w-4 mr-2" />
                      <span>100+ mistérios incluídos</span>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-case-white/60 line-through text-sm md:text-base">R$ 74,00</span>
                        <span className="text-xl md:text-2xl font-bold text-case-red">R$ 61,40</span>
                      </div>
                      <Button 
                        onClick={handleComboClick} 
                        disabled={isLoading || !user} 
                        className="w-full bg-case-red hover:bg-red-600 text-white disabled:opacity-50 text-sm md:text-base"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {!user ? 'Faça login para comprar' : 'Montar Combo'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pack Completo */}
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/50 hover:border-yellow-500 transition-all duration-300">
                <CardHeader>
                  <Badge className="bg-yellow-500 text-black w-fit">COMPLETO</Badge>
                  <CardTitle className="text-case-white text-lg md:text-xl">Acesso Total</CardTitle>
                  <CardDescription className="text-case-white/80 text-sm md:text-base">
                    Todos os packs + conteúdo exclusivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-case-white/80 text-sm md:text-base">
                      <Star className="h-4 w-4 mr-2" />
                      <span>Todos os packs disponíveis</span>
                    </div>
                    <div className="flex items-center text-case-white/80 text-sm md:text-base">
                      <Zap className="h-4 w-4 mr-2" />
                      <span>Conteúdo exclusivo</span>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-case-white/60 text-sm md:text-base">Valor total</span>
                        <span className="text-xl md:text-2xl font-bold text-yellow-500">R$ 110,90</span>
                      </div>
                      <Button 
                        onClick={handleCompletePurchase} 
                        disabled={isLoading || !user} 
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold disabled:opacity-50 text-sm md:text-base"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {!user ? 'Faça login para comprar' : 'Comprar Acesso Total'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mercado Pago Security Message - Mobile responsive layout */}
            <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-2 md:gap-4">
              <p className="text-case-white text-base font-medium text-center md:text-left">
                Sua compra é segura com a
              </p>
              <img 
                src="/lovable-uploads/c6a6bf1f-4108-4b06-80c7-3e109ecb7f5f.png" 
                alt="Mercado Pago" 
                className="h-12 object-contain"
              />
            </div>
          </motion.div>

          {/* Packs Regulares */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-case-white mb-6 md:mb-8 text-center">Packs Individuais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPacks.map((pack, index) => (
                <motion.div 
                  key={pack.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 * index }}
                >
                  <PackCard 
                    pack={pack} 
                    isPurchased={ownedPackIds.includes(pack.id)} 
                    onPackClick={() => handlePackClick(pack)} 
                    onPurchaseClick={handlePurchaseClick} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <HowToPlayModal 
        isOpen={isHowToPlayModalOpen} 
        onClose={() => setIsHowToPlayModalOpen(false)} 
      />

      {isComboModalOpen && (
        <ComboModal 
          packs={packs} 
          ownedPackIds={ownedPackIds} 
          onClose={() => setIsComboModalOpen(false)} 
          onPurchaseCombo={handlePurchaseCombo}
        />
      )}

      {selectedPack && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packName={selectedPack.name}
          packId={selectedPack.id}
          userId={user?.id || ''}
          onPaymentCreated={handlePaymentCreated}
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
    </div>
  );
};

export default React.memo(Packs);
