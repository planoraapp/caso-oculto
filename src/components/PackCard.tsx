
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface PackCardProps {
  pack: {
    id: string;
    name: string;
    description: string;
    price: number;
    coverUrl: string;
    isFree: boolean;
    category: string;
  };
  isPurchased: boolean;
  onPackClick: () => void;
  onPurchaseClick?: (pack: any) => void;
}

const PackCard: React.FC<PackCardProps> = ({ pack, isPurchased, onPackClick, onPurchaseClick }) => {
  const nameParts = pack.name.toUpperCase().split(' ');
  const title = nameParts.length > 1 
    ? `${nameParts.slice(0, -1).join(' ')}<br/>${nameParts.slice(-1)}` 
    : pack.name;

  // Todos os packs agora podem ser clicados para visualização
  return (
    <div className="relative group">
      <Link to={`/pack/${pack.id}`}>
        <div
          className="block relative w-full h-[250px] md:h-[300px] rounded-2xl shadow-2xl border-2 border-black/50 flex flex-col justify-end p-4 overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer bg-cover bg-center"
          style={{ backgroundImage: `url(${pack.coverUrl})` }}
          onClick={onPackClick}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
          <div className="relative z-10">
            <h1 
              className="font-anton text-4xl md:text-5xl leading-tight tracking-wider text-left text-white" 
              style={{ filter: 'drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.9))' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
          {!isPurchased && (
            <div className="absolute top-3 right-3 bg-case-red text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              R$ {pack.price.toFixed(2)}
            </div>
          )}
          {isPurchased && (
            <div className="absolute top-3 right-3 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              ✓ Adquirido
            </div>
          )}
        </div>
      </Link>
      
      {!isPurchased && onPurchaseClick && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPurchaseClick(pack);
            }}
            className="flex flex-col items-center"
          >
            <ShoppingCart className="h-12 w-12 text-white/80 mb-2"/>
            <span className="text-white font-bold">Comprar Pack</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PackCard;
