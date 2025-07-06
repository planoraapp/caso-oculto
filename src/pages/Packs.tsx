
import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { t } from '../data/translations';
import { packs, getUserPacks, purchasePack, Pack } from '../data/packs';
import { Link } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const userPacks = getUserPacks(user.id);

  const handlePackClick = (pack: Pack) => {
    if (userPacks.includes(pack.id)) {
      // User owns the pack, navigate to pack view
      return;
    } else {
      // Show purchase modal
      setSelectedPack(pack);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPack) return;
    
    setPurchasing(true);
    try {
      const success = purchasePack(user.id, selectedPack.id);
      if (success) {
        toast({
          title: t('purchase.success'),
          description: `Você comprou ${selectedPack.name}!`,
        });
        setSelectedPack(null);
        // Force re-render by updating the component
        window.location.reload();
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('purchase.error'),
        variant: 'destructive'
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
            {t('packs.title')}
          </h1>
          <p className="text-case-white/80 text-lg max-w-2xl mx-auto">
            Escolha entre os nossos packs de mistérios cuidadosamente selecionados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack) => {
            const isOwned = userPacks.includes(pack.id);
            
            return (
              <Card
                key={pack.id}
                className="pack-card-hover bg-noir-dark border-noir-medium overflow-hidden cursor-pointer group"
                onClick={() => handlePackClick(pack)}
              >
                <Link to={isOwned ? `/pack/${pack.id}` : '#'} className="block">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${pack.coverUrl})` }}
                  >
                    <div className="absolute inset-0 gradient-overlay" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-anton text-xl lg:text-2xl text-case-white drop-shadow-lg">
                        {pack.name}
                      </h3>
                    </div>
                    
                    {isOwned && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Adquirido
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <p className="text-case-white/80 mb-4 line-clamp-2">
                    {pack.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-case-white">
                      <span className="text-2xl font-bold text-case-red">
                        {pack.isFree ? t('packs.free') : `€${pack.price.toFixed(2)}`}
                      </span>
                      <p className="text-sm text-case-white/60">
                        {pack.cards.length} {t('packs.cards')}
                      </p>
                    </div>
                    
                    {isOwned ? (
                      <Link to={`/pack/${pack.id}`}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          {t('packs.playButton')}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="bg-case-red hover:bg-red-600 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPack(pack);
                        }}
                      >
                        {t('packs.buyButton')}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Purchase Modal */}
      <Dialog open={!!selectedPack} onOpenChange={() => setSelectedPack(null)}>
        <DialogContent className="bg-noir-dark border-noir-medium">
          <DialogHeader>
            <DialogTitle className="text-case-white font-anton text-xl">
              {t('purchase.title')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPack && (
            <div className="space-y-6">
              <div 
                className="h-32 bg-cover bg-center rounded-lg relative"
                style={{ backgroundImage: `url(${selectedPack.coverUrl})` }}
              >
                <div className="absolute inset-0 gradient-overlay rounded-lg" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-anton text-lg text-case-white">
                    {selectedPack.name}
                  </h3>
                </div>
              </div>
              
              <div className="text-case-white/80">
                <p className="mb-4">{selectedPack.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg">{t('purchase.price')}:</span>
                  <span className="text-2xl font-bold text-case-red">
                    €{selectedPack.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPack(null)}
                  className="flex-1 border-noir-light text-case-white hover:bg-noir-medium"
                >
                  {t('purchase.cancel')}
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="flex-1 bg-case-red hover:bg-red-600 text-white"
                >
                  {purchasing ? t('common.loading') : t('purchase.confirmPurchase')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Packs;
