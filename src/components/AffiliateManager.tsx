
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Plus, Users, TrendingUp, DollarSign } from 'lucide-react';

interface Affiliate {
  id: string;
  user_id: string;
  codigo_cupom: string;
  comissao_percentual: number;
  visitas: number;
  compras_confirmadas: number;
  valor_total_gerado: number;
  criado_em: string;
  is_active: boolean;
  profiles?: {
    name: string;
    email: string;
  };
}

const AffiliateManager: React.FC = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    email: '',
    codigo_cupom: '',
    comissao_percentual: 10
  });
  const { toast } = useToast();

  useEffect(() => {
    loadAffiliates();
  }, []);

  const loadAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from('afiliados')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `)
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error) {
      console.error('Error loading affiliates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar afiliados",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createAffiliate = async () => {
    if (!newAffiliate.email || !newAffiliate.codigo_cupom) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
      // Buscar o usuário pelo email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newAffiliate.email)
        .single();

      if (userError || !userData) {
        toast({
          title: "Erro",
          description: "Usuário não encontrado com este email",
          variant: "destructive"
        });
        return;
      }

      // Criar afiliado
      const { error } = await supabase
        .from('afiliados')
        .insert({
          user_id: userData.id,
          codigo_cupom: newAffiliate.codigo_cupom.toUpperCase(),
          comissao_percentual: newAffiliate.comissao_percentual
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Afiliado criado com sucesso!"
      });

      setIsCreateModalOpen(false);
      setNewAffiliate({ email: '', codigo_cupom: '', comissao_percentual: 10 });
      loadAffiliates();
    } catch (error: any) {
      console.error('Error creating affiliate:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar afiliado",
        variant: "destructive"
      });
    }
  };

  const toggleAffiliateStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('afiliados')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Afiliado ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`
      });

      loadAffiliates();
    } catch (error) {
      console.error('Error updating affiliate status:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar status do afiliado",
        variant: "destructive"
      });
    }
  };

  const totalStats = affiliates.reduce((acc, affiliate) => ({
    totalVisits: acc.totalVisits + affiliate.visitas,
    totalPurchases: acc.totalPurchases + affiliate.compras_confirmadas,
    totalRevenue: acc.totalRevenue + affiliate.valor_total_gerado
  }), { totalVisits: 0, totalPurchases: 0, totalRevenue: 0 });

  if (loading) {
    return <div className="text-center p-8 text-case-white">Carregando afiliados...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-noir-dark border-noir-medium">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-case-red" />
              <div>
                <p className="text-sm text-case-white/60">Total de Afiliados</p>
                <p className="text-xl font-bold text-case-white">{affiliates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-noir-dark border-noir-medium">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-case-red" />
              <div>
                <p className="text-sm text-case-white/60">Total de Visitas</p>
                <p className="text-xl font-bold text-case-white">{totalStats.totalVisits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-noir-dark border-noir-medium">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-case-red" />
              <div>
                <p className="text-sm text-case-white/60">Receita Total</p>
                <p className="text-xl font-bold text-case-white">R$ {totalStats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Management */}
      <Card className="bg-noir-dark border-noir-medium">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-case-white">Gerenciar Afiliados</CardTitle>
              <CardDescription className="text-case-white/80">
                Gerencie afiliados e seus códigos de cupom
              </CardDescription>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-case-red hover:bg-red-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Afiliado
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-noir-dark border-noir-medium">
                <DialogHeader>
                  <DialogTitle className="text-case-white">Criar Novo Afiliado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-case-white">Email do Usuário</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAffiliate.email}
                      onChange={(e) => setNewAffiliate({ ...newAffiliate, email: e.target.value })}
                      className="bg-noir-medium border-noir-light text-case-white"
                      placeholder="usuario@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="codigo" className="text-case-white">Código do Cupom</Label>
                    <Input
                      id="codigo"
                      value={newAffiliate.codigo_cupom}
                      onChange={(e) => setNewAffiliate({ ...newAffiliate, codigo_cupom: e.target.value.toUpperCase() })}
                      className="bg-noir-medium border-noir-light text-case-white"
                      placeholder="CODIGO10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comissao" className="text-case-white">Comissão (%)</Label>
                    <Input
                      id="comissao"
                      type="number"
                      value={newAffiliate.comissao_percentual}
                      onChange={(e) => setNewAffiliate({ ...newAffiliate, comissao_percentual: Number(e.target.value) })}
                      className="bg-noir-medium border-noir-light text-case-white"
                      min="0"
                      max="100"
                    />
                  </div>
                  <Button onClick={createAffiliate} className="w-full bg-case-red hover:bg-red-600 text-white">
                    Criar Afiliado
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {affiliates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-case-white/60">Nenhum afiliado encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-noir-medium">
                    <TableHead className="text-case-white">Nome</TableHead>
                    <TableHead className="text-case-white">Email</TableHead>
                    <TableHead className="text-case-white">Código</TableHead>
                    <TableHead className="text-case-white">Comissão</TableHead>
                    <TableHead className="text-case-white">Visitas</TableHead>
                    <TableHead className="text-case-white">Compras</TableHead>
                    <TableHead className="text-case-white">Receita</TableHead>
                    <TableHead className="text-case-white">Status</TableHead>
                    <TableHead className="text-case-white">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliates.map((affiliate) => (
                    <TableRow key={affiliate.id} className="border-noir-medium">
                      <TableCell className="text-case-white">
                        {affiliate.profiles?.name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-case-white">
                        {affiliate.profiles?.email || 'N/A'}
                      </TableCell>
                      <TableCell className="text-case-white font-mono">
                        {affiliate.codigo_cupom}
                      </TableCell>
                      <TableCell className="text-case-white">
                        {affiliate.comissao_percentual}%
                      </TableCell>
                      <TableCell className="text-case-white">
                        {affiliate.visitas}
                      </TableCell>
                      <TableCell className="text-case-white">
                        {affiliate.compras_confirmadas}
                      </TableCell>
                      <TableCell className="text-case-white">
                        R$ {affiliate.valor_total_gerado.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={affiliate.is_active ? "default" : "secondary"}>
                          {affiliate.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAffiliateStatus(affiliate.id, affiliate.is_active)}
                          className="border-case-red text-case-red hover:bg-case-red hover:text-white"
                        >
                          {affiliate.is_active ? 'Desativar' : 'Ativar'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateManager;
