import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, ShoppingBag, LogOut, Crown, Package, CreditCard, TrendingUp } from 'lucide-react';
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
  stripe_session_id?: string;
}
interface UserStats {
  totalPurchases: number;
  totalSpent: number;
  packCount: number;
  memberSince: string;
}
const Account: React.FC<AccountProps> = ({
  user,
  onLogout
}) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPurchases: 0,
    totalSpent: 0,
    packCount: 0,
    memberSince: ''
  });
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);
  const loadUserData = async () => {
    try {
      setLoading(true);

      // Load profile data
      const {
        data: profileData,
        error: profileError
      } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Load purchase history from payment_sessions
      const {
        data: purchaseData,
        error: purchaseError
      } = await supabase.from('payment_sessions').select('*').eq('user_id', user.id).eq('status', 'approved').order('created_at', {
        ascending: false
      });
      if (purchaseError) {
        console.error('Error loading purchases:', purchaseError);
      } else {
        setPurchases(purchaseData || []);

        // Calculate user stats
        const totalPurchases = purchaseData?.length || 0;
        let totalSpent = 0;
        let packCount = 0;

        // Buscar dados reais da tabela compras para calcular valores
        if (purchaseData && purchaseData.length > 0) {
          const sessionIds = purchaseData.map(p => p.stripe_session_id || p.mercadopago_preference_id).filter(Boolean);
          if (sessionIds.length > 0) {
            const {
              data: comprasData
            } = await supabase.from('compras').select('valor_pago, pack_id, selected_pack_ids').in('stripe_session_id', sessionIds);
            if (comprasData) {
              totalSpent = comprasData.reduce((sum, compra) => sum + (compra.valor_pago || 0), 0);
            }
          }

          // Contar packs únicos baseado em payment_sessions
          const uniquePackIds = new Set<string>();
          purchaseData.forEach(purchase => {
            if (purchase.pack_id) uniquePackIds.add(purchase.pack_id);
            if (purchase.selected_pack_ids && Array.isArray(purchase.selected_pack_ids)) {
              purchase.selected_pack_ids.forEach(id => uniquePackIds.add(id));
            }

            // Se for complete access, definir pack count como todos
            if (purchase.payment_type === 'complete') {
              packCount = 999;
            }
          });

          // Se não for complete access, usar contagem real
          if (packCount !== 999) {
            packCount = uniquePackIds.size;
          }
        }

        // If user has complete access, they have all packs
        if (profileData?.acesso_total) {
          packCount = 999;
        }
        setUserStats({
          totalPurchases,
          totalSpent,
          packCount,
          memberSince: formatDate(user.created_at || profileData?.created_at || '')
        });
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
    if (!dateString) return 'Não informado';
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
  const getPaymentValue = (type: string) => {
    switch (type) {
      case 'individual':
        return 'R$ 14,80';
      case 'combo':
        return 'R$ 61,40';
      case 'complete':
        return 'R$ 110,90';
      default:
        return 'N/A';
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-case-white">Carregando...</div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-case-white mb-2">Minha Conta</h1>
          <p className="text-case-white/80">Gerencie suas informações e histórico de compras</p>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Total de Compras
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{userStats.totalPurchases}</div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Total Gasto
              </CardTitle>
              <CreditCard className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">R$ {userStats.totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Packs Possuídos
              </CardTitle>
              <Package className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">
                {userStats.packCount === 999 ? 'Todos' : userStats.packCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Membro Desde
              </CardTitle>
              <Calendar className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-case-white">{userStats.memberSince}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="bg-noir-dark border-noir-medium mb-6">
              <CardHeader>
                <CardTitle className="text-case-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                  {profile?.acesso_total && <Badge className="bg-case-red text-white ml-2">
                      <Crown className="h-3 w-3 mr-1" />
                      Acesso Total
                    </Badge>}
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
                  <TrendingUp className="h-4 w-4 text-case-white/60" />
                  <div>
                    <p className="text-sm text-case-white/60">Status da Conta</p>
                    <p className="text-case-white">
                      {profile?.acesso_total ? 'Acesso Total Ativo' : 'Usuário Regular'}
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
                  Suas compras realizadas e aprovadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? <p className="text-case-white/60 text-center py-8">
                    Nenhuma compra realizada ainda.
                  </p> : <div className="space-y-4">
                    {purchases.map(purchase => <div key={purchase.id} className="flex items-center justify-between p-4 bg-noir-medium rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-case-white font-medium">
                              {getPaymentTypeLabel(purchase.payment_type)}
                            </p>
                            <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                              Aprovado
                            </Badge>
                          </div>
                          <p className="text-case-white/60 text-sm">
                            {formatDate(purchase.created_at)}
                          </p>
                          {purchase.stripe_session_id && <p className="text-case-white/40 text-xs mt-1">
                              ID: {purchase.stripe_session_id.substring(0, 20)}...
                            </p>}
                        </div>
                        <div className="text-right">
                          <p className="text-case-white font-semibold">
                            {getPaymentValue(purchase.payment_type)}
                          </p>
                        </div>
                      </div>)}
                  </div>}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div>
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Ações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => window.location.href = '/library'} className="w-full bg-case-red hover:bg-red-600 text-white">
                  <Package className="h-4 w-4 mr-2" />
                  Minha Biblioteca
                </Button>
                
                <Button onClick={() => window.location.href = '/packs'} variant="outline" className="w-full border-case-white/20 text-case-white hover:bg-case-white/10 text-indigo-50 bg-slate-950 hover:bg-slate-800">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Ver Todos os Packs
                </Button>
                
                <Separator className="bg-noir-medium" />
                
                <Button onClick={onLogout} variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>

            {profile?.acesso_total && <Card className="bg-gradient-to-br from-case-red/20 to-case-red/5 border-case-red/30 mt-4">
                <CardHeader>
                  <CardTitle className="text-case-white flex items-center gap-2">
                    <Crown className="h-5 w-5 text-case-red" />
                    Acesso Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-case-white/80 text-sm">
                    Você tem acesso vitalício a todos os packs disponíveis e futuros lançamentos!
                  </p>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
};
export default Account;