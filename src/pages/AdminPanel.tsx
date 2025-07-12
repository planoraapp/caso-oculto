
import React, { useState, useEffect } from 'react';
import { Users, Package, Tag, Gift, BarChart3, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import UserManager from '../components/UserManager';
import PackManager from '../components/PackManager';
import CouponManager from '../components/CouponManager';
import AffiliateManager from '../components/AffiliateManager';
import AdminDashboard from '../components/admin/AdminDashboard';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  user: any;
}

interface AdminStats {
  totalUsers: number;
  totalPacks: number;
  totalCoupons: number;
  totalPayments: number;
  approvedPayments: number;
  pendingPayments: number;
  totalRevenue: number;
  todayRevenue: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPacks: 0,
    totalCoupons: 0,
    totalPayments: 0,
    approvedPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    todayRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      loadStats();
      // Set up real-time subscription
      const channel = supabase
        .channel('admin-dashboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'payment_sessions' }, () => {
          loadStats();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'compras' }, () => {
          loadStats();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
          loadStats();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin]);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Load basic counts
      const [
        { count: usersCount },
        { count: packsCount },
        { count: couponsCount },
        { count: paymentsCount },
        { data: paymentSessions },
        { data: compras }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('packs').select('*', { count: 'exact', head: true }),
        supabase.from('discount_coupons').select('*', { count: 'exact', head: true }),
        supabase.from('payment_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('payment_sessions').select('*'),
        supabase.from('compras').select('*')
      ]);

      // Calculate advanced stats
      const approvedPayments = paymentSessions?.filter(p => p.status === 'approved').length || 0;
      const pendingPayments = paymentSessions?.filter(p => p.status === 'pending').length || 0;
      
      // Calculate revenue from compras table
      const totalRevenue = compras?.reduce((sum, compra) => {
        return compra.status === 'approved' ? sum + (compra.valor_pago || 0) : sum;
      }, 0) || 0;

      // Today's revenue
      const today = new Date().toISOString().split('T')[0];
      const todayRevenue = compras?.reduce((sum, compra) => {
        const compraDate = new Date(compra.created_at).toISOString().split('T')[0];
        return compra.status === 'approved' && compraDate === today 
          ? sum + (compra.valor_pago || 0) 
          : sum;
      }, 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalPacks: packsCount || 0,
        totalCoupons: couponsCount || 0,
        totalPayments: paymentsCount || 0,
        approvedPayments,
        pendingPayments,
        totalRevenue,
        todayRevenue
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-case-white mb-4">Acesso Negado</h1>
          <p className="text-case-white/80">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-case-white mb-2">Painel Administrativo</h1>
          <p className="text-case-white/80">Gerencie usuários, packs, cupons e monitore estatísticas em tempo real</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Total de Usuários
              </CardTitle>
              <Users className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Total de Packs
              </CardTitle>
              <Package className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{stats.totalPacks}</div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Pagamentos Aprovados
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{stats.approvedPayments}</div>
              <p className="text-xs text-case-white/60">
                {stats.pendingPayments} pendentes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">
                R$ {stats.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-green-500">
                +R$ {stats.todayRevenue.toFixed(2)} hoje
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 bg-noir-dark">
            <TabsTrigger value="dashboard" className="text-case-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="text-case-white">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="packs" className="text-case-white">
              <Package className="h-4 w-4 mr-2" />
              Packs
            </TabsTrigger>
            <TabsTrigger value="coupons" className="text-case-white">
              <Tag className="h-4 w-4 mr-2" />
              Cupons
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="text-case-white">
              <Gift className="h-4 w-4 mr-2" />
              Afiliados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard stats={stats} loading={loading} />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          <TabsContent value="packs">
            <PackManager />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponManager />
          </TabsContent>

          <TabsContent value="affiliates">
            <AffiliateManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
