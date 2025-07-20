import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ShoppingCart, Users, Star, Zap } from 'lucide-react';
interface ComboPackCardProps {
  onOpenComboModal: () => void;
  isLoading: boolean;
}
const ComboPackCard: React.FC<ComboPackCardProps> = ({
  onOpenComboModal,
  isLoading
}) => {
  return <Card className="bg-gray-800 border-yellow-500/50 hover:border-yellow-500 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-yellow-500 text-black">COMBO</Badge>
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 mr-1" />
            <span className="text-sm">Mais Popular</span>
          </div>
        </div>
        <CardTitle className="text-case-white">Combo 5 Packs</CardTitle>
        <CardDescription className="text-case-white/80">Escolha 100 mistérios e economize 20%</CardDescription>
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
          <Button onClick={onOpenComboModal} disabled={isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Montar Combo
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default ComboPackCard;