
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  cases: any[];
}

interface PackHeaderProps {
  pack: Pack;
  hasAccess: boolean;
  solvedCards: string[];
  user: any;
  onPurchaseClick: () => void;
}

const PackHeader: React.FC<PackHeaderProps> = ({
  pack,
  hasAccess,
  solvedCards,
  user,
  onPurchaseClick
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${pack.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center pt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/packs')}
            className="text-case-white hover:text-case-red"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Packs
          </Button>
        </div>

        {/* Pack Info Overlay */}
        <div className="pb-8">
          <h1 className="font-anton text-4xl md:text-5xl lg:text-6xl text-case-white mb-4">
            {pack.name}
          </h1>
          <p className="text-case-white/90 text-xl max-w-3xl mb-6">
            {pack.description}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-case-red text-white text-base px-4 py-2">
              {pack.category}
            </Badge>
            <Badge variant="outline" className="border-case-white text-case-white text-base px-4 py-2">
              {pack.cases.length} Casos
            </Badge>
            {user && (
              <Badge variant="outline" className="border-green-500 text-green-500 text-base px-4 py-2">
                {solvedCards.length} Resolvidos
              </Badge>
            )}
          </div>

          {/* Purchase Button */}
          {!hasAccess && user && (
            <div className="mb-6">
              <Button
                onClick={onPurchaseClick}
                className="bg-case-red hover:bg-red-600 text-white text-lg px-8 py-3"
              >
                Desbloquear Pack - R$ {pack.price.toFixed(2).replace('.', ',')}
              </Button>
            </div>
          )}
          
          {/* Progress Bar */}
          {user && hasAccess && (
            <div className="max-w-md">
              <div className="flex justify-between text-case-white/80 text-sm mb-2">
                <span>Progresso</span>
                <span>{Math.round((solvedCards.length / pack.cases.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-case-red h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(solvedCards.length / pack.cases.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackHeader;
