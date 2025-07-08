
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { packs } from '../data/packs';
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
            <Card key={user.id} className="bg-noir-dark border-noir-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-case-white">{user.email || 'Email não disponível'}</CardTitle>
                    <p className="text-case-white/60 text-sm">
                      Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </p>
                    {user.last_sign_in_at && (
                      <p className="text-case-white/60 text-sm">
                        Último login: {new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingUser(isEditing ? null : user.id)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteUser(user.id)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* User Packs */}
                  <div>
                    <h4 className="text-case-white font-semibold mb-2">Packs do Usuário:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {userPacks.length > 0 ? (
                        userPacks.map((access) => {
                          const pack = packs.find(p => p.id === access.pack_id);
                          return (
                            <Badge 
                              key={access.id} 
                              variant="secondary" 
                              className="bg-green-600 text-white flex items-center gap-1"
                            >
                              {pack?.name || access.pack_id}
                              <button
                                onClick={() => removePackFromUser(access.id)}
                                className="ml-1 hover:text-red-300"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })
                      ) : (
                        <span className="text-case-white/60">Nenhum pack</span>
                      )}
                    </div>
                  </div>

                  {/* Add Pack Form */}
                  {isEditing && (
                    <div className="p-4 bg-noir-medium rounded-lg">
                      <Label className="text-case-white mb-2">Adicionar Pack:</Label>
                      <div className="flex gap-2">
                        <select
                          value={newPackId}
                          onChange={(e) => setNewPackId(e.target.value)}
                          className="flex-1 bg-noir-dark border border-noir-light text-case-white rounded px-3 py-2"
                        >
                          <option value="">Selecione um pack</option>
                          {packs
                            .filter(pack => !['combo', 'complete'].includes(pack.category))
                            .filter(pack => !userPacks.some(access => access.pack_id === pack.id))
                            .map(pack => (
                              <option key={pack.id} value={pack.id}>
                                {pack.name}
                              </option>
                            ))}
                        </select>
                        <Button
                          onClick={() => newPackId && addPackToUser(user.id, newPackId)}
                          disabled={!newPackId}
                          className="bg-case-red hover:bg-red-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserManager;
