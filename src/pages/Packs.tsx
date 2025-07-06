import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PackCard from '../components/PackCard';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import LoadingSpinner from '../components/LoadingSpinner';
import { packs } from '../data/packs';
import { getUserPacks } from '../data/packs';
import { usePaymentStatus } from '../hooks/usePaymentStatus';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({
  user
}) => {
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ownedPackIds = getUserPacks(user.id);
  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  } = usePaymentStatus(user.id);
  const regularPacks = useMemo(() => packs.filter(p => !['combo', 'complete'].includes(p.category)), []);
  const specialPacks = useMemo(() => packs.filter(p => ['combo', 'complete'].includes(p.category)), []);

  const handlePackClick = useCallback((pack: any) => {
    if (ownedPackIds.includes(pack.id)) {
      // Navigation handled by Link in PackCard
    }
  }, [ownedPackIds]);

  const handlePurchaseClick = useCallback(async (pack: any) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const paymentType = pack.category === 'complete' ? 'complete' : 'individual';
      const session = await createPaymentSession(pack.id, paymentType);
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

  const handlePurchaseCombo = useCallback(async (selectedPackIds: string[]) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const session = await createPaymentSession(null, 'combo', selectedPackIds);
      if (session) {
        setCheckoutPreferenceId(session.mercadopago_preference_id);
        setTimeout(() => {
          simulatePaymentConfirmation(session.id, true).then(() => {
            showPaymentStatus('approved', 'Combo 5 Packs');
            setCheckoutPreferenceId(null);
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao processar pagamento do combo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [createPaymentSession, simulatePaymentConfirmation, showPaymentStatus, isLoading]);

  const handleComboClick = useCallback(() => {
    setIsComboModalOpen(true);
  }, []);

  return <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-case-white mb-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }}>
              Escolha seu Mistério
            </motion.h1>
            <motion.p className="text-base md:text-lg text-case-white/80 max-w-2xl mx-auto px-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }}>
              Desvende casos intrigantes e desafie sua mente com nossos packs exclusivos de mistérios.
            </motion.p>
          </div>

          {/* Loading Indicator */}
          {isLoading && <div className="flex justify-center mb-6 md:mb-8">
              <LoadingSpinner size="lg" />
            </div>}

          {/* Packs Especiais */}
          <motion.div className="mb-12 md:mb-16" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
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
                      <Button onClick={handleComboClick} disabled={isLoading} className="w-full bg-case-red hover:bg-red-600 text-white disabled:opacity-50 text-sm md:text-base">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Montar Combo
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
                      <Button onClick={() => handlePurchaseClick(specialPacks.find(p => p.category === 'complete')!)} disabled={isLoading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold disabled:opacity-50 text-sm md:text-base">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Comprar Acesso Total
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Packs Regulares */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            <h2 className="text-xl md:text-2xl font-bold text-case-white mb-6 md:mb-8 text-center">Packs Individuais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPacks.map((pack, index) => <motion.div key={pack.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1 * index
            }}>
                  <PackCard pack={pack} isPurchased={ownedPackIds.includes(pack.id)} onPackClick={() => handlePackClick(pack)} onPurchaseClick={handlePurchaseClick} />
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      {isComboModalOpen && <ComboModal packs={packs} ownedPackIds={ownedPackIds} onClose={() => setIsComboModalOpen(false)} onPurchaseCombo={handlePurchaseCombo} />}

      {checkoutPreferenceId && <MercadoPagoCheckout preferenceId={checkoutPreferenceId} onPaymentResult={result => {
      console.log('Payment result:', result);
    }} />}
    </div>;
};

export default React.memo(Packs);
