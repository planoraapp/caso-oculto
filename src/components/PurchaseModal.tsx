import React from 'react';
import { X, ShoppingCart, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName: string;
  onIndividualPurchase: () => void;
  onComboPurchase: () => void;
  onCompletePurchase: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  packName,
  onIndividualPurchase,
  onComboPurchase,
  onCompletePurchase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-case-white">
            Desbloquear Conteúdo
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="border-case-red text-case-red hover:bg-case-red hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pack Individual */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-case-red/50 hover:border-case-red transition-all duration-300">
            <CardHeader className="text-center">
              <Badge className="bg-case-red text-white w-fit mx-auto">INDIVIDUAL</Badge>
              <CardTitle className="text-case-white text-lg">{packName}</CardTitle>
              <CardDescription className="text-case-white/80">
                Apenas este pack
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-case-red">R$ 14,80</span>
              </div>
              <Button 
                onClick={onIndividualPurchase}
                className="w-full bg-case-red hover:bg-red-600 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar Pack
              </Button>
            </CardContent>
          </Card>

          {/* Combo 5 Packs */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/50 hover:border-yellow-500 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between">
                <Badge className="bg-yellow-500 text-black">COMBO</Badge>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="text-xs">Popular</span>
                </div>
              </div>
              <CardTitle className="text-case-white text-lg">5 Packs</CardTitle>
              <CardDescription className="text-case-white/80">
                Escolha 5 packs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-case-white/80 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span>5 packs de sua escolha</span>
                </div>
                <div className="text-center">
                  <span className="text-case-white/60 line-through text-sm">R$ 74,00</span>
                  <span className="text-xl font-bold text-yellow-500 block">R$ 61,40</span>
                </div>
              </div>
              <Button 
                onClick={onComboPurchase}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Montar Combo
              </Button>
            </CardContent>
          </Card>

          {/* Acesso Completo */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/50 hover:border-green-500 transition-all duration-300">
            <CardHeader className="text-center">
              <Badge className="bg-green-500 text-white w-fit mx-auto">COMPLETO</Badge>
              <CardTitle className="text-case-white text-lg">Todos os Packs</CardTitle>
              <CardDescription className="text-case-white/80">
                Acesso total
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-case-white/80 text-sm">
                  <Star className="h-4 w-4 mr-2" />
                  <span>15 packs inclusos</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-500">R$ 110,90</span>
                </div>
              </div>
              <Button 
                onClick={onCompletePurchase}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acesso Total
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
