import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ShoppingCart, Star, Users, Zap } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
interface SpecialOffersSectionProps {
  user: any;
  isLoading: boolean;
  onComboClick: () => void;
  onCompletePurchase: () => void;
}
const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  user,
  isLoading,
  onComboClick,
  onCompletePurchase
}) => {
  const isMobile = useIsMobile();
  const handleComboClick = () => {
    if (!user || isLoading) return;
    onComboClick();
  };
  const handleCompleteClick = () => {
    if (!user || isLoading) return;
    onCompletePurchase();
  };
  return <motion.div className="mb-12 md:mb-16" initial={{
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
                  <span className="text-xl md:text-2xl font-bold text-case-red">R$ 59,20</span>
                </div>
                <Button onClick={handleComboClick} disabled={isLoading || !user} className="w-full bg-case-red hover:bg-red-600 text-white disabled:opacity-50 text-sm md:text-base">
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
                  <span className="text-xl md:text-2xl font-bold text-yellow-500">R$ 99,90</span>
                </div>
                <Button onClick={handleCompleteClick} disabled={isLoading || !user} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold disabled:opacity-50 text-sm md:text-base">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {!user ? 'Faça login para comprar' : 'Comprar Acesso Total'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mercado Pago Security Message */}
      
    </motion.div>;
};
export default SpecialOffersSection;