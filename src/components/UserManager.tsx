
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import UserCard from './user-manager/UserCard';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { RefreshCw, Zap, Wrench } from 'lucide-react';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface UserCompra {
  id: string;
  user_id: string;
  pack_id: string | null;
  selected_pack_ids: string[] | null;
  payment_type: string;
  status: string;
  created_at: string;
  valor_pago: number;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [packAccesses, setPackAccesses] = useState<UserPackAccess[]>([]);
  const [userCompras, setUserCompras] = useState<UserCompra[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newPackId, setNewPackId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadUsers(), loadPackAccesses(), loadUserCompras()]);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-list-users');
      
      if (error) throw error;
      
      if (data.error) throw new Error(data.error);
      
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários",
        variant: "destructive"
      });
    }
  };

  const loadPackAccesses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_pack_access')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setPackAccesses(data || []);
    } catch (error) {
      console.error('Error loading pack accesses:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar acessos aos packs",
        variant: "destructive"
      });
    }
  };

  const loadUserCompras = async () => {
    try {
      const { data, error } = await supabase
        .from('compras')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserCompras(data || []);
    } catch (error) {
      console.error('Error loading user compras:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar compras dos usuários",
        variant: "destructive"
      });
    }
  };

  const syncStripePayments = async () => {
    try {
      setSyncing(true);
      const { data, error } = await supabase.functions.invoke('sync-stripe-payments');
      
      if (error) throw error;
      
      toast({
        title: "Sincronização Concluída",
        description: `${data.results?.filter((r: any) => r.status === 'synced').length || 0} pagamentos sincronizados`,
      });
      
      // Recarregar dados após sincronização
      await loadAllData();
    } catch (error) {
      console.error('Error syncing payments:', error);
      toast({
        title: "Erro",
        description: "Erro ao sincronizar pagamentos",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const fixUserPacks = async (userEmail: string) => {
    try {
      setFixing(true);
      const { data, error } = await supabase.functions.invoke('fix-user-packs', {
        body: { userEmail }
      });
      
      if (error) throw error;
      
      toast({
        title: "Packs Corrigidos",
        description: `Packs corrigidos para ${userEmail}: ${data.packsGranted?.length || 0} packs liberados`,
      });
      
      // Recarregar dados
      await loadAllData();
    } catch (error) {
      console.error('Error fixing user packs:', error);
      toast({
        title: "Erro",
        description: "Erro ao corrigir packs do usuário",
        variant: "destructive"
      });
    } finally {
      setFixing(false);
    }
  };

  const getUserPacks = (userId: string) => {
    return packAccesses.filter(access => access.user_id === userId);
  };

  const getUserCompras = (userId: string) => {
    return userCompras.filter(compra => compra.user_id === userId);
  };

  const addPackToUser = async (userId: string, packId: string) => {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .insert([{
          user_id: userId,
          pack_id: packId,
          is_active: true
        }]);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Pack adicionado ao usuário!"
      });
      
      loadPackAccesses();
      setNewPackId('');
    } catch (error) {
      console.error('Error adding pack to user:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar pack ao usuário",
        variant: "destructive"
      });
    }
  };

  const removePackFromUser = async (accessId: string) => {
    try {
      const { error } = await supabase
        .from('user_pack_access')
        .update({ is_active: false })
        .eq('id', accessId);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Pack removido do usuário!"
      });
      
      loadPackAccesses();
    } catch (error) {
      console.error('Error removing pack from user:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover pack do usuário",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      
      toast({
        title: "Sucesso",
        description: "Usuário excluído!"
      });
      
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir usuário",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-case-white">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-case-white">Gerenciar Usuários</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => fixUserPacks('roquematheus@live.com')} 
            disabled={fixing}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {fixing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wrench className="h-4 w-4 mr-2" />
            )}
            Corrigir Packs Roque
          </Button>
          <Button 
            onClick={syncStripePayments} 
            disabled={syncing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {syncing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Sincronizar Stripe
          </Button>
          <Button onClick={loadAllData} className="bg-case-red hover:bg-red-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar Lista
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user) => {
          const userPacks = getUserPacks(user.id);
          const userComprasData = getUserCompras(user.id);
          const isEditing = editingUser === user.id;

          return (
            <UserCard
              key={user.id}
              user={user}
              userPacks={userPacks}
              userPayments={userComprasData}
              isEditing={isEditing}
              newPackId={newPackId}
              onToggleEdit={() => setEditingUser(isEditing ? null : user.id)}
              onDeleteUser={() => deleteUser(user.id)}
              onRemovePackFromUser={removePackFromUser}
              onNewPackIdChange={setNewPackId}
              onAddPackToUser={() => newPackId && addPackToUser(user.id, newPackId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserManager;
