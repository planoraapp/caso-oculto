
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Users, Package, AlertTriangle, Mail, Edit, Check, X, Percent, UserCheck } from 'lucide-react';
import CouponManager from '../components/CouponManager';
import AffiliateManager from '../components/AffiliateManager';
import PackManager from '../components/PackManager';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

interface RefundRequest {
  id: string;
  user_id: string;
  pack_id: string;
  request_date: string;
  status: string;
  reason: string | null;
  user_email?: string;
}

interface PackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  granted_at: string;
  is_active: boolean;
  user_email?: string;
}

const AdminPanel: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [packAccess, setPackAccess] = useState<PackAccess[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!user || user.email !== 'conectawebapps@outlook.com') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      // Load users (this would typically require admin API access)
      const { data: userData } = await supabase.auth.admin.listUsers();
      if (userData) {
        setUsers(userData.users.map(u => ({
          id: u.id,
          email: u.email || '',
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at || ''
        })));
      }

      // Load refund requests
      const { data: refundData } = await supabase
        .from('refund_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (refundData) {
        setRefundRequests(refundData);
      }

      // Load pack access
      const { data: accessData } = await supabase
        .from('user_pack_access')
        .select('*')
        .order('granted_at', { ascending: false });
      
      if (accessData) {
        setPackAccess(accessData);
      }

    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados administrativos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefundRequest = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('refund_requests')
        .update({
          status,
          processed_by: user.id,
          processed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Pedido de devolução ${status === 'approved' ? 'aprovado' : 'rejeitado'}`,
      });

      loadData();
    } catch (error) {
      console.error('Error processing refund:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar pedido de devolução",
        variant: "destructive"
      });
    }
  };

  const grantPackAccess = async (userId: string, packId: string) => {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .upsert({
          user_id: userId,
          pack_id: packId,
          is_active: true,
          granted_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Acesso ao pack concedido",
      });

      loadData();
    } catch (error) {
      console.error('Error granting pack access:', error);
      toast({
        title: "Erro",
        description: "Erro ao conceder acesso ao pack",
        variant: "destructive"
      });
    }
  };

  const revokePackAccess = async (accessId: string) => {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .update({
          is_active: false,
          revoked_at: new Date().toISOString()
        })
        .eq('id', accessId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Acesso ao pack revogado",
      });

      loadData();
    } catch (error) {
      console.error('Error revoking pack access:', error);
      toast({
        title: "Erro",
        description: "Erro ao revogar acesso ao pack",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-case-white text-xl">Carregando painel administrativo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-anton text-case-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-case-white/80">Gerencie usuários, packs, cupons e afiliados</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-noir-dark">
            <TabsTrigger value="overview" className="text-case-white">Visão Geral</TabsTrigger>
            <TabsTrigger value="packs" className="text-case-white">Packs</TabsTrigger>
            <TabsTrigger value="refunds" className="text-case-white">Devoluções</TabsTrigger>
            <TabsTrigger value="users" className="text-case-white">Usuários</TabsTrigger>
            <TabsTrigger value="coupons" className="text-case-white">Cupons</TabsTrigger>
            <TabsTrigger value="affiliates" className="text-case-white">Afiliados</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-noir-dark border-noir-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-case-white">
                    Total de Usuários
                  </CardTitle>
                  <Users className="h-4 w-4 text-case-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-case-white">{users.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-noir-dark border-noir-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-case-white">
                    Pedidos de Devolução
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-case-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-case-white">
                    {refundRequests.filter(r => r.status === 'pending').length}
                  </div>
                  <p className="text-xs text-case-white/60">Pendentes</p>
                </CardContent>
              </Card>

              <Card className="bg-noir-dark border-noir-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-case-white">
                    Acessos Ativos
                  </CardTitle>
                  <Package className="h-4 w-4 text-case-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-case-white">
                    {packAccess.filter(a => a.is_active).length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-noir-dark border-noir-medium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-case-white">
                    Sistema
                  </CardTitle>
                  <Package className="h-4 w-4 text-case-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-case-white">Ativo</div>
                  <p className="text-xs text-case-white/60">Funcionando</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packs">
            <PackManager />
          </TabsContent>

          <TabsContent value="refunds">
            {/* Refund Requests */}
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Pedidos de Devolução</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-case-white">Usuário</TableHead>
                      <TableHead className="text-case-white">Pack</TableHead>
                      <TableHead className="text-case-white">Data</TableHead>
                      <TableHead className="text-case-white">Status</TableHead>
                      <TableHead className="text-case-white">Motivo</TableHead>
                      <TableHead className="text-case-white">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-case-white">{request.user_email}</TableCell>
                        <TableCell className="text-case-white">{request.pack_id}</TableCell>
                        <TableCell className="text-case-white">
                          {new Date(request.request_date).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            request.status === 'pending' ? 'default' :
                            request.status === 'approved' ? 'destructive' : 'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-case-white">{request.reason || 'N/A'}</TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleRefundRequest(request.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRefundRequest(request.id, 'rejected')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            {/* Users Management */}
            <Card className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <CardTitle className="text-case-white">Gerenciar Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-case-white">Email</TableHead>
                      <TableHead className="text-case-white">Criado em</TableHead>
                      <TableHead className="text-case-white">Último login</TableHead>
                      <TableHead className="text-case-white">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => (
                      <TableRow key={userData.id}>
                        <TableCell className="text-case-white">{userData.email}</TableCell>
                        <TableCell className="text-case-white">
                          {new Date(userData.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-case-white">
                          {userData.last_sign_in_at ? 
                            new Date(userData.last_sign_in_at).toLocaleDateString('pt-BR') : 
                            'Nunca'
                          }
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => setSelectedUser(userData)}
                            className="bg-case-red hover:bg-red-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
