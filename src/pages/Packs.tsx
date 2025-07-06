
import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { t } from '../data/translations';
import { packs, getUserPacks, INFINITEPAY_LINKS } from '../data/packs';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import PackCard from '../components/PackCard';
import ComboModal from '../components/ComboModal';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const userPacks = getUserPacks(user.id);

  const handlePackClick = (pack: any) => {
    if (userPacks.includes(pack.id)) {
      // User owns the pack, navigate to pack view
      return;
    }
    // For non-owned packs, the PackCard component handles the InfinitePay link
  };

  const individualPacks = packs.filter(p => 
    p.category !== 'combo' && 
    p.category !== 'complete' && 
    !p.isFree
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Ofertas Especiais */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
              Ofertas Especiais
            </h1>
            <p className="text-case-white/80 text-lg max-w-2xl mx-auto">
              Adquira múltiplos packs com desconto ou garanta acesso a todo o conteúdo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="bg-noir-dark border-noir-medium p-8 text-center">
              <ShoppingCart className="h-8 w-8 mb-4 text-case-red mx-auto"/>
              <h2 className="text-2xl font-bold mb-2 text-case-white">Combo 5 Packs</h2>
              <p className="text-case-white/80 flex-grow mb-6">
                Leve 5 packs à sua escolha e pague menos. Monte o seu combo de mistérios.
              </p>
              <p className="text-4xl font-bold mb-6 text-case-red">R$ 61,40</p>
              <Button 
                size="lg" 
                className="w-full bg-case-red hover:bg-red-600 text-white"
                onClick={() => setIsComboModalOpen(true)}
              >
                Montar meu Combo
              </Button>
            </Card>

            <Card className="bg-noir-dark border-noir-medium p-8 text-center">
              <Star className="h-8 w-8 mb-4 text-case-red mx-auto"/>
              <h2 className="text-2xl font-bold mb-2 text-case-white">Acesso Total</h2>
              <p className="text-case-white/80 flex-grow mb-6">
                Acesso completo a todos os packs existentes e futuros. A experiência definitiva.
              </p>
              <p className="text-4xl font-bold mb-6 text-case-red">R$ 110,90</p>
              <Button 
                size="lg" 
                className="w-full bg-case-red hover:bg-red-600 text-white"
                asChild
              >
                <a
                  href={INFINITEPAY_LINKS.complete}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar Acesso Total
                </a>
              </Button>
            </Card>
          </div>
        </div>

        {/* Packs Individuais */}
        <div className="text-center mb-12 pt-12 border-t border-noir-medium">
          <h2 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
            Nossos Packs Individuais
          </h2>
          <p className="text-case-white/80 text-lg max-w-2xl mx-auto">
            Cada pack por R$ 14,80 - Escolha seus mistérios favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {individualPacks.map((pack) => {
            const isOwned = userPacks.includes(pack.id);
            
            return (
              <div key={pack.id}>
                {isOwned ? (
                  <Link to={`/pack/${pack.id}`}>
                    <PackCard
                      pack={pack}
                      isPurchased={true}
                      onPackClick={() => handlePackClick(pack)}
                    />
                  </Link>
                ) : (
                  <PackCard
                    pack={pack}
                    isPurchased={false}
                    onPackClick={() => handlePackClick(pack)}
                  />
                )}
                
                {isOwned && (
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Adquirido
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pack Gratuito */}
        <div className="text-center mt-16 pt-12 border-t border-noir-medium">
          <h2 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
            Experimente de Graça!
          </h2>
          <p className="text-case-white/80 text-lg max-w-2xl mx-auto mb-8">
            Comece sua jornada de detetive com o nosso pack de amostra gratuito.
          </p>
          
          <div className="max-w-xs mx-auto">
            {packs.filter(p => p.isFree).map(pack => (
              <Link key={pack.id} to={`/pack/${pack.id}`}>
                <PackCard
                  pack={pack}
                  isPurchased={true}
                  onPackClick={() => {}}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Combo Selection Modal */}
      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={userPacks}
          onClose={() => setIsComboModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Packs;
