
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X, ShoppingCart, Users, Star, Zap } from 'lucide-react';

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName: string;
  onIndividualPurchase: () => void;
  onComboPurchase: () => void;
  onCompletePurchase: () => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  packName,
  onIndividualPurchase,
  onComboPurchase,
  onCompletePurchase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-case-white">
              Desbloquear: {packName}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-case-white hover:text-case-red"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            {/* Individual Pack */}
            <Card className="bg-gray-800 border-gray-700 hover:border-case-red/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-case-red text-white">INDIVIDUAL</Badge>
                </div>
                <CardTitle className="text-case-white">Pack Individual</CardTitle>
                <CardDescription className="text-case-white/80">
                  Acesso completo a este pack específico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-case-red">R$ 14,80</span>
                  <Button onClick={onIndividualPurchase} className="bg-case-red hover:bg-red-600 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Comprar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Combo Pack */}
            <Card className="bg-gray-800 border-yellow-500/50 hover:border-yellow-500 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-500 text-black">COMBO</Badge>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-sm">Mais Popular</span>
                  </div>
                </div>
                <CardTitle className="text-case-white">Combo 5 Packs</CardTitle>
                <CardDescription className="text-case-white/80">
                  Escolha 5 packs e economize 20%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-case-white/80">
                    <Users className="h-4 w-4 mr-2" />
                    <span>5 packs de sua escolha</span>
                  </div>
                  <div className="flex items-center text-case-white/80">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>100+ mistérios incluídos</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-case-white/60 line-through text-sm">R$ 74,00</span>
                    <span className="text-2xl font-bold text-yellow-500 ml-2">R$ 61,40</span>
                  </div>
                  <Button onClick={onComboPurchase} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Montar Combo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Complete Access */}
            <Card className="bg-gray-800 border-green-500/50 hover:border-green-500 transition-all">
              <CardHeader>
                <Badge className="bg-green-500 text-white w-fit">COMPLETO</Badge>
                <CardTitle className="text-case-white">Acesso Total</CardTitle>
                <CardDescription className="text-case-white/80">
                  Todos os packs + conteúdo exclusivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-case-white/80">
                    <Star className="h-4 w-4 mr-2" />
                    <span>Todos os packs disponíveis</span>
                  </div>
                  <div className="flex items-center text-case-white/80">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Conteúdo exclusivo</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">R$ 110,90</span>
                  <Button onClick={onCompletePurchase} className="bg-green-500 hover:bg-green-600 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Comprar Acesso Total
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Message */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-case-white/60 text-sm mb-2">
              Pagamento 100% seguro com:
            </p>
            <img 
              src="/lovable-uploads/8a513714-34eb-49ec-b837-6e3bb5e273e1.png" 
              alt="Mercado Pago" 
              className="mx-auto h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsModal;
