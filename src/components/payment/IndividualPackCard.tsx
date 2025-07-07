
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ShoppingCart } from 'lucide-react';

interface IndividualPackCardProps {
  onPurchase: () => void;
  isLoading: boolean;
}

const IndividualPackCard: React.FC<IndividualPackCardProps> = ({
  onPurchase,
  isLoading
}) => {
  return (
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
          <Button 
            onClick={onPurchase} 
            disabled={isLoading}
            className="bg-case-red hover:bg-red-600 text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar Agora
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndividualPackCard;
