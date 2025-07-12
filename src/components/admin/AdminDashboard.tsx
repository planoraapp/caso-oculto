import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCw, Users, Package, DollarSign, TrendingUp, Calendar, Activity } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';

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

interface AdminDashboardProps {
  stats: AdminStats;
  loading: boolean;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats, loading }) => {
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [topPacks, setTopPacks] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    loadRecentActivity();
    loadTopPacks();
  }, []);

  const loadRecentActivity = async () => {
    try {
      setLoadingActivity(true);
      
      // Get recent payment sessions and profiles separately, then join in code
      const { data: payments, error: paymentsError } = await supabase
        .from('payment_sessions')
        .select('id, user_id, payment_type, status, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError);
        setRecentActivity([]);
        return;
      }

      if (!payments || payments.length === 0) {
        setRecentActivity([]);
        return;
      }

      // Get user profiles for the payment user_ids
      const userIds = payments.map(p => p.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        setRecentActivity([]);
        return;
      }

      // Create a map of user_id to email for quick lookup
      const userEmailMap = new Map();
      profiles?.forEach(profile => {
        userEmailMap.set(profile.id, profile.email);
      });

      const activities: RecentActivity[] = [];

      payments.forEach(payment => {
        const email = userEmailMap.get(payment.user_id) || 'Usuário desconhecido';
        let description = '';
        
        switch (payment.payment_type) {
          case 'individual':
            description = `${email} comprou Pack Individual`;
            break;
          case 'combo':
            description = `${email} comprou Combo 5 Packs`;
            break;
          case 'complete':
            description = `${email} comprou Acesso Total`;
            break;
          default:
            description = `${email} fez uma compra`;
        }

        activities.push({
          id: payment.id,
          type: 'payment',
          description,
          timestamp: payment.created_at,
          status: payment.status
        });
      });

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error loading recent activity:', error);
      setRecentActivity([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  const loadTopPacks = async () => {
    try {
      // Get pack purchase statistics
      const { data: sessions } = await supabase
        .from('payment_sessions')
        .select('pack_id, selected_pack_ids, payment_type, status')
        .eq('status', 'approved');

      const packStats: { [key: string]: { name: string; count: number; revenue: number } } = {};

      sessions?.forEach(session => {
        if (session.payment_type === 'individual' && session.pack_id) {
          if (!packStats[session.pack_id]) {
            packStats[session.pack_id] = { name: session.pack_id, count: 0, revenue: 0 };
          }
          packStats[session.pack_id].count += 1;
          packStats[session.pack_id].revenue += 14.80; // Default pack price
        } else if (session.payment_type === 'combo' && session.selected_pack_ids) {
          session.selected_pack_ids.forEach((packId: string) => {
            if (!packStats[packId]) {
              packStats[packId] = { name: packId, count: 0, revenue: 0 };
            }
            packStats[packId].count += 1;
            packStats[packId].revenue += 2.96; // Combo price per pack (14.80/5)
          });
        }
      });

      const sortedPacks = Object.values(packStats)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setTopPacks(sortedPacks);
    } catch (error) {
      console.error('Error loading top packs:', error);
    }
  };

  const getActivityIcon = (type: string, status?: string) => {
    if (type === 'payment') {
      return status === 'approved' ? (
        <DollarSign className="h-4 w-4 text-green-500" />
      ) : (
        <Activity className="h-4 w-4 text-yellow-500" />
      );
    }
    return <Activity className="h-4 w-4 text-case-white" />;
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-case-white/60';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-case-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Receita do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              R$ {stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-case-white/60 text-sm">
              {stats.approvedPayments} pagamentos aprovados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">
              {stats.totalPayments > 0 
                ? ((stats.approvedPayments / stats.totalPayments) * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-case-white/60 text-sm">
              {stats.pendingPayments} pagamentos pendentes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Receita Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">
              R$ {stats.todayRevenue.toFixed(2)}
            </div>
            <p className="text-case-white/60 text-sm">
              Vendas de hoje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas transações e eventos do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <div className="flex items-center justify-center p-4">
                <RefreshCw className="h-6 w-6 animate-spin text-case-white" />
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-noir-medium rounded-lg">
                      {getActivityIcon(activity.type, activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-case-white text-sm">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-case-white/60 text-xs">
                            {new Date(activity.timestamp).toLocaleString('pt-BR')}
                          </p>
                          {activity.status && (
                            <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                              {activity.status === 'approved' ? 'Aprovado' : 
                               activity.status === 'pending' ? 'Pendente' : 
                               activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-case-white/60 py-4">
                    Nenhuma atividade recente
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Selling Packs */}
        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Packs Mais Vendidos
            </CardTitle>
            <CardDescription>
              Ranking dos packs por número de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPacks.length > 0 ? (
                topPacks.map((pack, index) => (
                  <div key={pack.name} className="flex items-center justify-between p-3 bg-noir-medium rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-case-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-case-white font-medium">{pack.name}</p>
                        <p className="text-case-white/60 text-sm">{pack.count} vendas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-medium">R$ {pack.revenue.toFixed(2)}</p>
                      <p className="text-case-white/60 text-xs">receita</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-case-white/60 py-4">
                  Nenhuma venda registrada
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
