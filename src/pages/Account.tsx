
import React from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getUserPurchases } from '../data/packs';
import { User, Calendar, CreditCard } from 'lucide-react';

interface AccountProps {
  user: any;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const userPurchases = getUserPurchases(user.id);
  const totalSpent = userPurchases.reduce((sum, purchase) => sum + purchase.price_paid, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-8">
          Minha Conta
        </h1>

        {/* User Details */}
        <Card className="bg-noir-dark border-noir-medium p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-case-red rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-case-white">{user.name || 'Detetive'}</h2>
              <p className="text-case-white/80">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-noir-medium p-4 rounded-lg">
              <h3 className="text-case-white font-semibold mb-2">Total de Compras</h3>
              <p className="text-2xl font-bold text-case-red">{userPurchases.length}</p>
            </div>
            <div className="bg-noir-medium p-4 rounded-lg">
              <h3 className="text-case-white font-semibold mb-2">Total Gasto</h3>
              <p className="text-2xl font-bold text-case-red">R$ {totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-noir-medium p-4 rounded-lg">
              <h3 className="text-case-white font-semibold mb-2">Membro desde</h3>
              <p className="text-case-white">Hoje</p>
            </div>
          </div>
        </Card>

        {/* Purchase History */}
        <Card className="bg-noir-dark border-noir-medium p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard className="h-6 w-6 text-case-red" />
            <h2 className="text-2xl font-bold text-case-white">Histórico de Compras</h2>
          </div>
          
          {userPurchases.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-noir-medium">
                    <TableHead className="text-case-white">Data</TableHead>
                    <TableHead className="text-case-white">Pack</TableHead>
                    <TableHead className="text-case-white text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPurchases.map((purchase) => (
                    <TableRow key={purchase.id} className="border-noir-medium">
                      <TableCell className="text-case-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(purchase.purchased_at).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-case-white font-medium">
                        {purchase.packName}
                      </TableCell>
                      <TableCell className="text-case-red font-bold text-right">
                        R$ {purchase.price_paid.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-case-white/60 mb-4">Ainda não efetuou nenhuma compra.</p>
              <Button 
                onClick={() => window.location.href = '/packs'} 
                className="bg-case-red hover:bg-red-600 text-white"
              >
                Ver Packs Disponíveis
              </Button>
            </div>
          )}
        </Card>

        {/* Logout Section */}
        <div className="mt-8 text-center">
          <Button 
            onClick={onLogout}
            variant="outline"
            className="border-case-red text-case-red hover:bg-case-red hover:text-white"
          >
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
