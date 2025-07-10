
import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface AccountProps {
  user: any;
  onLogout: () => void;
}

interface Purchase {
  id: string;
  pack_id: string;
  payment_type: string;
  status: string;
  created_at: string;
  selected_pack_ids?: string[];
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Load purchase history
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('payment_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (purchaseError) {
        console.error('Error loading purchases:', purchaseError);
      } else {
        setPurchases(purchaseData || []);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do usuário",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Pack Individual';
      case 'combo':
        return 'Combo 5 Packs';
      case 'complete':
        return 'Acesso Total';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-case-white">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-case-white mb-2">Minha Conta</h1>
          <p className="text-case-white/80">Gerencie suas informações e histórico de compras</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="bg-noir-dark border-noir-medium mb-6">
              <CardHeader>
                <CardTitle className="text-case-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-case-white/60" />
                  <div>
                    <p className="text-sm text-case-white/60">Email</p>
                    <p className="text-case-white">{user?.email || 'Não informado'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-case-white/60" />
                  <div>
                    <p className="text-sm text-case-white/60">Nome</p>
                    <p className="text-case-white">{profile?.name || user?.email || 'Não informado'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-case-white/60" />
                  <div>
                    <p className="text-sm text-case-white/60">Membro desde</p>
                    <p className="text-case-white">
                      {user?.created_at ? formatDate(user.created_at) : 'Não informado'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase History */}
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Histórico de Compras
                </CardTitle>
                <CardDescription className="text-case-white/60">
                  Suas compras realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <p className="text-case-white/60 text-center py-8">
                    Nenhuma compra realizada ainda.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-noir-medium rounded-lg">
                        <div>
                          <p className="text-case-white font-medium">
                            {getPaymentTypeLabel(purchase.payment_type)}
                          </p>
                          <p className="text-case-white/60 text-sm">
                            {formatDate(purchase.created_at)}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          Aprovado
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div>
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator className="bg-noir-medium" />
                <Button
                  onClick={onLogout}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
