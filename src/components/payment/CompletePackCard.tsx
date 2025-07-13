
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ShoppingCart, Star, Zap, Crown } from 'lucide-react';

interface CompletePackCardProps {
  onPurchase: () => void;
  isLoading: boolean;
}

const CompletePackCard: React.FC<CompletePackCardProps> = ({
  onPurchase,
  isLoading
}) => {
  return (
    <Card className="bg-gray-800 border-green-500/50 hover:border-green-500 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-green-500 text-white w-fit">COMPLETO</Badge>
          <div className="flex items-center text-green-400">
            <Star className="h-4 w-4 mr-1" />
            <span className="text-sm">Mais Econômico</span>
          </div>
        </div>
        <CardTitle className="text-case-white flex items-center gap-2">
          <Crown className="h-5 w-5 text-green-500" />
          Acesso Total
        </CardTitle>
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
          <Button 
            onClick={onPurchase} 
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar Acesso Total
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletePackCard;
