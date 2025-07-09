
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import UserCard from './user-manager/UserCard';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [packAccesses, setPackAccesses] = useState<UserPackAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newPackId, setNewPackId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
    loadPackAccesses();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      setUsers(data.users);
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
    } finally {
      setLoading(false);
    }
  };

  const getUserPacks = (userId: string) => {
    return packAccesses.filter(access => access.user_id === userId);
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
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;
      
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
        <Button onClick={loadUsers} className="bg-case-red hover:bg-red-600">
          Atualizar Lista
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user) => {
          const userPacks = getUserPacks(user.id);
          const isEditing = editingUser === user.id;

          return (
            <UserCard
              key={user.id}
              user={user}
              userPacks={userPacks}
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
