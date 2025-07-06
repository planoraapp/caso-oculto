
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LogOut, Calendar, ShoppingBag, RotateCcw, Mail } from 'lucide-react';
import { getUserPurchases } from '../data/packs';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface AccountProps {
  user: any;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Add a sample purchase for demonstration
  const samplePurchases = [
    {
      id: 'sample_1',
      packId: 'pack1',
      packName: 'Sombras da Noite',
      price_paid: 14.80,
      purchased_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      transactionId: 'mp_sample_123',
      type: 'individual'
    }
  ];
  
  const purchases = [...getUserPurchases(user.id), ...samplePurchases];
  const totalPurchases = purchases.length;

  const handleRefundRequest = async (purchase: any) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-refund-notification', {
        body: {
          userEmail: user.email,
          packId: purchase.packId,
          reason: 'Solicitação de devolução via conta do usuário'
        }
      });

      if (error) throw error;

      toast({
        title: "Solicitação Enviada!",
        description: "Sua solicitação de devolução foi enviada ao administrador. O pack ficará indisponível após a aprovação.",
      });
    } catch (error) {
      console.error('Erro ao solicitar devolução:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar solicitação de devolução",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Dúvida sobre compra - CASO OCULTO');
    const body = encodeURIComponent(`Olá,\n\nTenho uma dúvida sobre minha compra.\n\nUsuário: ${user.email}\n\nDescreva sua dúvida aqui...\n\nObrigado!`);
    window.open(`mailto:conectawebapps@outlook.com?subject=${subject}&body=${body}`);
  };

  const canRequestRefund = (purchaseDate: string) => {
    const daysSincePurchase = Math.floor((Date.now() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
    return daysSincePurchase <= 7;
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-case-white mb-2">Minha Conta</h1>
          <p className="text-case-white/60">Gerencie suas informações e histórico de compras</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Perfil */}
          <div className="lg:col-span-1">
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-case-white/60">Email</p>
                  <p className="text-case-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-case-white/60">Nome</p>
                  <p className="text-case-white">{user.name || 'Não informado'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-case-white/60" />
                  <div>
                    <p className="text-sm text-case-white/60">Membro desde</p>
                    <p className="text-case-white">Janeiro 2024</p>
                  </div>
                </div>
                <Button 
                  onClick={onLogout}
                  variant="outline" 
                  className="w-full border-case-red text-case-red hover:bg-case-red hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Compras */}
          <div className="lg:col-span-2">
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-case-white">Histórico de Compras</CardTitle>
                    <CardDescription className="text-case-white/60">
                      Seus packs adquiridos recentemente
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="h-8 w-8 text-case-red" />
                    <div className="text-right">
                      <p className="text-2xl font-bold text-case-white">{totalPurchases}</p>
                      <p className="text-sm text-case-white/60">Total de Compras</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-case-white/30 mx-auto mb-4" />
                    <p className="text-case-white/60">Nenhuma compra realizada ainda</p>
                    <p className="text-sm text-case-white/40 mt-2">
                      Explore nossos packs de mistérios para começar sua jornada
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-noir-medium rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-case-white">{purchase.packName}</h4>
                          <p className="text-sm text-case-white/60">
                            {new Date(purchase.purchased_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              Pago
                            </Badge>
                            <p className="text-sm text-case-white/60 mt-1">
                              R$ {purchase.price_paid.toFixed(2)}
                            </p>
                          </div>
                          {canRequestRefund(purchase.purchased_at) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRefundRequest(purchase)}
                              disabled={isLoading}
                              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Devolver
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 pt-4 border-t border-noir-medium">
                      <Button
                        onClick={handleContactSupport}
                        variant="outline"
                        className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Dúvidas sobre compras? Entre em contato
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
