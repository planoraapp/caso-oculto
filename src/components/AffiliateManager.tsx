
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface Affiliate {
  id: string;
  code: string;
  affiliate_name: string;
  affiliate_email: string;
  commission_percentage: number;
  total_sales: number;
  total_commission: number;
  is_active: boolean;
}

const AffiliateManager: React.FC = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: '',
    affiliate_name: '',
    affiliate_email: '',
    commission_percentage: 10
  });

  useEffect(() => {
    loadAffiliates();
  }, []);

  const loadAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliate_codes')
        .select('*')
        .order('created_at', { ascending: false });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingAffiliate) {
        const { error } = await supabase
          .from('affiliate_codes')
          .update(formData)
          .eq('id', editingAffiliate.id);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Afiliado atualizado!" });
      } else {
        const { error } = await supabase
          .from('affiliate_codes')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Afiliado criado!" });
      }

      resetForm();
      loadAffiliates();
    } catch (error) {
      console.error('Error saving affiliate:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar afiliado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      affiliate_name: '',
      affiliate_email: '',
      commission_percentage: 10
    });
    setIsCreating(false);
    setEditingAffiliate(null);
  };

  const handleEdit = (affiliate: Affiliate) => {
    setFormData({
      code: affiliate.code,
      affiliate_name: affiliate.affiliate_name,
      affiliate_email: affiliate.affiliate_email,
      commission_percentage: affiliate.commission_percentage
    });
    setEditingAffiliate(affiliate);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este afiliado?')) return;

    try {
      const { error } = await supabase
        .from('affiliate_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Sucesso", description: "Afiliado excluído!" });
      loadAffiliates();
    } catch (error) {
      console.error('Error deleting affiliate:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir afiliado",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (affiliate: Affiliate) => {
    try {
      const { error } = await supabase
        .from('affiliate_codes')
        .update({ is_active: !affiliate.is_active })
        .eq('id', affiliate.id);

      if (error) throw error;
      toast({ 
        title: "Sucesso", 
        description: `Afiliado ${!affiliate.is_active ? 'ativado' : 'desativado'}!` 
      });
      loadAffiliates();
    } catch (error) {
      console.error('Error toggling affiliate status:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do afiliado",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-case-white">Gerenciar Afiliados</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-case-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Afiliado
        </Button>
      </div>

      {isCreating && (
        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white">
              {editingAffiliate ? 'Editar Afiliado' : 'Criar Novo Afiliado'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code" className="text-case-white">Código</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    required
                    className="bg-noir-medium border-noir-light text-case-white"
                    placeholder="AFILIADO123"
                  />
                </div>

                <div>
                  <Label htmlFor="affiliate_name" className="text-case-white">Nome do Afiliado</Label>
                  <Input
                    id="affiliate_name"
                    value={formData.affiliate_name}
                    onChange={(e) => setFormData({...formData, affiliate_name: e.target.value})}
                    required
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>

                <div>
                  <Label htmlFor="affiliate_email" className="text-case-white">Email</Label>
                  <Input
                    id="affiliate_email"
                    type="email"
                    value={formData.affiliate_email}
                    onChange={(e) => setFormData({...formData, affiliate_email: e.target.value})}
                    required
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>

                <div>
                  <Label htmlFor="commission" className="text-case-white">Comissão (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.commission_percentage}
                    onChange={(e) => setFormData({...formData, commission_percentage: parseFloat(e.target.value)})}
                    required
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="bg-case-red hover:bg-red-600">
                  {editingAffiliate ? 'Atualizar' : 'Criar'} Afiliado
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affiliates.map((affiliate) => (
          <Card key={affiliate.id} className="bg-noir-dark border-noir-medium">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-case-white text-lg">{affiliate.code}</CardTitle>
                <Badge variant={affiliate.is_active ? "default" : "secondary"}>
                  {affiliate.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-case-white font-semibold">{affiliate.affiliate_name}</p>
              <p className="text-case-white/60 text-sm">{affiliate.affiliate_email}</p>
              
              <div className="flex items-center gap-2 text-case-white">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">{affiliate.commission_percentage}% comissão</span>
              </div>

              <div className="text-case-white/60 text-xs space-y-1">
                <p>Vendas: {affiliate.total_sales}</p>
                <p>Comissão: R$ {affiliate.total_commission.toFixed(2)}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(affiliate)}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus(affiliate)}
                  className={affiliate.is_active 
                    ? "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  }
                >
                  {affiliate.is_active ? 'Desativar' : 'Ativar'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(affiliate.id)}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AffiliateManager;
