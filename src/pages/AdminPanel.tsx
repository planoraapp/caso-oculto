
import React, { useState, useEffect } from 'react';
import { Users, Package, Tag, Gift, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import UserManager from '../components/UserManager';
import PackManager from '../components/PackManager';
import CouponManager from '../components/CouponManager';
import AffiliateManager from '../components/AffiliateManager';
import { supabase } from '../integrations/supabase/client';

interface AdminPanelProps {
  user: any;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPacks: 0,
    totalCoupons: 0,
    totalPayments: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load users count
      const { data: usersData } = await supabase.auth.admin.listUsers();
      
      // Load packs count
      const { count: packsCount } = await supabase
        .from('packs')
        .select('*', { count: 'exact', head: true });

      // Load coupons count
      const { count: couponsCount } = await supabase
        .from('discount_coupons')
        .select('*', { count: 'exact', head: true });

      // Load payment sessions count
      const { count: paymentsCount } = await supabase
        .from('payment_sessions')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersData?.users?.length || 0,
        totalPacks: packsCount || 0,
        totalCoupons: couponsCount || 0,
        totalPayments: paymentsCount || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Check if user is admin
  if (!user || user.email !== 'conectawebapps@outlook.com') {
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
          <p className="text-case-white/80">Gerencie usuários, packs, cupons e afiliados</p>
        </div>

        {/* Stats Cards */}
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
                Total de Cupons
              </CardTitle>
              <Tag className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{stats.totalCoupons}</div>
            </CardContent>
          </Card>

          <Card className="bg-noir-dark border-noir-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-case-white">
                Total de Pagamentos
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-case-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-case-white">{stats.totalPayments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-noir-dark">
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
