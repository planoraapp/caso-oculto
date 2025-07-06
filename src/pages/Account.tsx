
import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LogOut, Calendar, ShoppingBag } from 'lucide-react';
import { getUserPurchases } from '../data/packs';

interface AccountProps {
  user: any;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const purchases = getUserPurchases(user.id);
  const totalPurchases = purchases.length;

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

          {/* Estatísticas e Histórico */}
          <div className="lg:col-span-2 space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-noir-dark border-noir-medium">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="h-8 w-8 text-case-red" />
                    <div>
                      <p className="text-2xl font-bold text-case-white">{totalPurchases}</p>
                      <p className="text-sm text-case-white/60">Total de Compras</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Histórico de Compras */}
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Histórico de Compras</CardTitle>
                <CardDescription className="text-case-white/60">
                  Seus packs adquiridos recentemente
                </CardDescription>
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
                        <div className="text-right">
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Pago
                          </Badge>
                          <p className="text-sm text-case-white/60 mt-1">
                            R$ {purchase.price_paid.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
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
