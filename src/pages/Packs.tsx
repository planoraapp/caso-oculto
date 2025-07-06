
import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { t } from '../data/translations';
import { packs, getUserPacks, purchasePack, Pack } from '../data/packs';
import { Link } from 'react-router-dom';
import { toast } from '../hooks/use-toast';
import { Lock, CreditCard } from 'lucide-react';

interface PacksProps {
  user: any;
}

const Packs: React.FC<PacksProps> = ({ user }) => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
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

  const handleInputChange = (field: string, value: string) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePurchase = async () => {
    if (!selectedPack) return;
    
    // Basic validation
    if (!checkoutData.cardNumber || !checkoutData.expiryDate || !checkoutData.cvv || !checkoutData.cardName) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos do cartão.',
        variant: 'destructive'
      });
      return;
    }
    
    setPurchasing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = purchasePack(user.id, selectedPack.id, selectedPack.price);
      if (success) {
        toast({
          title: 'Compra realizada com sucesso!',
          description: `Você comprou ${selectedPack.name} por R$ ${selectedPack.price.toFixed(2)}`,
        });
        setSelectedPack(null);
        setCheckoutData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardName: ''
        });
        // Force re-render by updating the component
        window.location.reload();
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Erro no processamento do pagamento. Tente novamente.',
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
                        {pack.isFree ? t('packs.free') : `R$ ${pack.price.toFixed(2)}`}
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

      {/* Enhanced Purchase Modal */}
      <Dialog open={!!selectedPack} onOpenChange={() => setSelectedPack(null)}>
        <DialogContent className="bg-noir-dark border-noir-medium max-w-md">
          <DialogHeader>
            <DialogTitle className="text-case-white font-anton text-xl">
              Finalizar Compra
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
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg">Total:</span>
                  <span className="text-2xl font-bold text-case-red">
                    R$ {selectedPack.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-case-white mb-4">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Dados do Cartão</span>
                </div>
                
                <div>
                  <Label htmlFor="cardName" className="text-case-white">Nome no Cartão</Label>
                  <Input
                    id="cardName"
                    placeholder="João Silva"
                    value={checkoutData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber" className="text-case-white">Número do Cartão</Label>
                  <Input
                    id="cardNumber"
                    placeholder="**** **** **** 1234"
                    value={checkoutData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-case-white">Validade</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/AA"
                      value={checkoutData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="bg-noir-medium border-noir-light text-case-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-case-white">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={checkoutData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="bg-noir-medium border-noir-light text-case-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPack(null)}
                  className="flex-1 border-noir-light text-case-white hover:bg-noir-medium"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="flex-1 bg-case-red hover:bg-red-600 text-white"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {purchasing ? 'Processando...' : `Pagar R$ ${selectedPack.price.toFixed(2)}`}
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
