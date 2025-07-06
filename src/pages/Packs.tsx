
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';  
import PackCard from '../components/PackCard';
import ComboModal from '../components/ComboModal';
import PaymentStatusModal from '../components/PaymentStatusModal';
import MercadoPagoCheckout from '../components/MercadoPagoCheckout';
import { packs } from '../data/packs';
import { getUserPacks } from '../data/packs';
import { usePaymentStatus } from '../hooks/usePaymentStatus';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [checkoutPreferenceId, setCheckoutPreferenceId] = useState<string | null>(null);
  
  const ownedPackIds = getUserPacks(user.id);
  const {
    paymentStatus,
    createPaymentSession,
    showPaymentStatus,
    closePaymentStatus,
    simulatePaymentConfirmation
  } = usePaymentStatus(user.id);

  const regularPacks = packs.filter(p => 
    !p.isFree && !['combo', 'complete'].includes(p.category)
  );
  
  const specialPacks = packs.filter(p => 
    ['combo', 'complete'].includes(p.category)
  );

  const handlePackClick = (pack: any) => {
    if (ownedPackIds.includes(pack.id) || pack.isFree) {
      window.location.href = `/pack/${pack.id}`;
    }
  };

  const handlePurchaseClick = async (pack: any) => {
    const paymentType = pack.category === 'complete' ? 'complete' : 'individual';
    const session = await createPaymentSession(pack.id, paymentType);
    
    if (session) {
      setCheckoutPreferenceId(session.mercadopago_preference_id);
      
      // Simular aprovação (remover em produção)
      setTimeout(() => {
        simulatePaymentConfirmation(session.id, true).then(() => {
          showPaymentStatus('approved', pack.name);
          setCheckoutPreferenceId(null);
        });
      }, 3000);
    }
  };

  const handleComboClick = () => {
    setIsComboModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-case-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Escolha seu Mistério
          </motion.h1>
          <motion.p 
            className="text-lg text-case-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Desvende casos intrigantes e desafie sua mente com nossos packs exclusivos de mistérios.
          </motion.p>
        </div>

        {/* Packs Especiais */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-case-white mb-8 text-center">Ofertas Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Combo Pack */}
            <Card className="bg-gradient-to-br from-case-red/20 to-case-red/5 border-case-red/50 hover:border-case-red transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-case-red text-white">COMBO</Badge>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-sm">Mais Popular</span>
                  </div>
                </div>
                <CardTitle className="text-case-white text-xl">Combo 5 Packs</CardTitle>
                <CardDescription className="text-case-white/80">
                  Escolha 5 packs e economize 20%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-case-white/80">
                    <Users className="h-4 w-4 mr-2" />
                    <span>5 packs de sua escolha</span>
                  </div>
                  <div className="flex items-center text-case-white/80">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>100+ mistérios incluídos</span>
                  </div>
                  <div className="pt-4 border-t border-noir-medium">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-case-white/60 line-through">R$ 74,00</span>
                      <span className="text-2xl font-bold text-case-red">R$ 61,40</span>
                    </div>
                    <Button 
                      onClick={handleComboClick}
                      className="w-full bg-case-red hover:bg-red-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Montar Combo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pack Completo */}
            <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/50 hover:border-yellow-500 transition-all duration-300">
              <CardHeader>
                <Badge className="bg-yellow-500 text-black w-fit">COMPLETO</Badge>
                <CardTitle className="text-case-white text-xl">Acesso Total</CardTitle>
                <CardDescription className="text-case-white/80">
                  Todos os packs + conteúdo exclusivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-case-white/80">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Todos os packs disponíveis</span>
                  </div>
                  <div className="flex items-center text-case-white/80">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Conteúdo exclusivo</span>
                  </div>
                  <div className="pt-4 border-t border-noir-medium">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-case-white/60">Valor total</span>
                      <span className="text-2xl font-bold text-yellow-500">R$ 110,90</span>
                    </div>
                    <Button 
                      onClick={() => handlePurchaseClick(specialPacks.find(p => p.category === 'complete')!)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    >
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-case-white mb-8 text-center">Packs Individuais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Modals */}
      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={ownedPackIds}
          onClose={() => setIsComboModalOpen(false)}
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
          }}
        />
      )}
    </div>
  );
};

export default Packs;
