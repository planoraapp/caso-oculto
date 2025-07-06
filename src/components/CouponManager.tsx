
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Plus, Edit, Trash2, Percent, DollarSign } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase_amount: number;
  max_uses: number | null;
  current_uses: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
}

const CouponManager: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
    min_purchase_amount: 0,
    max_uses: null as number | null,
    valid_until: ''
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('discount_coupons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons((data || []).map(coupon => ({
        ...coupon,
        discount_type: coupon.discount_type as 'percentage' | 'fixed'
      })));
    } catch (error) {
      console.error('Error loading coupons:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar cupons",
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
      const couponData = {
        ...formData,
        max_uses: formData.max_uses || null,
        valid_until: formData.valid_until || null
      };

      if (editingCoupon) {
        const { error } = await supabase
          .from('discount_coupons')
          .update(couponData)
          .eq('id', editingCoupon.id);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Cupom atualizado!" });
      } else {
        const { error } = await supabase
          .from('discount_coupons')
          .insert([couponData]);

        if (error) throw error;
        toast({ title: "Sucesso", description: "Cupom criado!" });
      }

      resetForm();
      loadCoupons();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar cupom",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      min_purchase_amount: 0,
      max_uses: null,
      valid_until: ''
    });
    setIsCreating(false);
    setEditingCoupon(null);
  };

  const handleEdit = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      min_purchase_amount: coupon.min_purchase_amount,
      max_uses: coupon.max_uses,
      valid_until: coupon.valid_until || ''
    });
    setEditingCoupon(coupon);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cupom?')) return;

    try {
      const { error } = await supabase
        .from('discount_coupons')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Sucesso", description: "Cupom excluído!" });
      loadCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir cupom",
        variant: "destructive"
      });
    }
  };

  const toggleStatus = async (coupon: Coupon) => {
    try {
      const { error } = await supabase
        .from('discount_coupons')
        .update({ is_active: !coupon.is_active })
        .eq('id', coupon.id);

      if (error) throw error;
      toast({ 
        title: "Sucesso", 
        description: `Cupom ${!coupon.is_active ? 'ativado' : 'desativado'}!` 
      });
      loadCoupons();
    } catch (error) {
      console.error('Error toggling coupon status:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do cupom",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-case-white">Gerenciar Cupons</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-case-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      {isCreating && (
        <Card className="bg-noir-dark border-noir-medium">
          <CardHeader>
            <CardTitle className="text-case-white">
              {editingCoupon ? 'Editar Cupom' : 'Criar Novo Cupom'}
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
                    placeholder="DESCONTO10"
                  />
                </div>

                <div>
                  <Label htmlFor="discount_type" className="text-case-white">Tipo de Desconto</Label>
                  <Select
                    value={formData.discount_type}
                    onValueChange={(value: 'percentage' | 'fixed') => 
                      setFormData({...formData, discount_type: value})}
                  >
                    <SelectTrigger className="bg-noir-medium border-noir-light text-case-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem</SelectItem>
                      <SelectItem value="fixed">Valor Fixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discount_value" className="text-case-white">
                    Valor do Desconto {formData.discount_type === 'percentage' ? '(%)' : '(R$)'}
                  </Label>
                  <Input
                    id="discount_value"
                    type="number"
                    step="0.01"
                    value={formData.discount_value}
                    onChange={(e) => setFormData({...formData, discount_value: parseFloat(e.target.value)})}
                    required
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>

                <div>
                  <Label htmlFor="min_purchase" className="text-case-white">Compra Mínima (R$)</Label>
                  <Input
                    id="min_purchase"
                    type="number"
                    step="0.01"
                    value={formData.min_purchase_amount}
                    onChange={(e) => setFormData({...formData, min_purchase_amount: parseFloat(e.target.value)})}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>

                <div>
                  <Label htmlFor="max_uses" className="text-case-white">Usos Máximos</Label>
                  <Input
                    id="max_uses"
                    type="number"
                    value={formData.max_uses || ''}
                    onChange={(e) => setFormData({...formData, max_uses: e.target.value ? parseInt(e.target.value) : null})}
                    className="bg-noir-medium border-noir-light text-case-white"
                    placeholder="Ilimitado"
                  />
                </div>

                <div>
                  <Label htmlFor="valid_until" className="text-case-white">Válido Até</Label>
                  <Input
                    id="valid_until"
                    type="datetime-local"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({...formData, valid_until: e.target.value})}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-case-white">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-noir-medium border-noir-light text-case-white"
                  placeholder="Descrição do cupom..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="bg-case-red hover:bg-red-600">
                  {editingCoupon ? 'Atualizar' : 'Criar'} Cupom
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
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="bg-noir-dark border-noir-medium">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-case-white text-lg">{coupon.code}</CardTitle>
                <Badge variant={coupon.is_active ? "default" : "secondary"}>
                  {coupon.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-case-white/80 text-sm">{coupon.description}</p>
              
              <div className="flex items-center gap-2 text-case-white">
                {coupon.discount_type === 'percentage' ? (
                  <Percent className="h-4 w-4" />
                ) : (
                  <DollarSign className="h-4 w-4" />
                )}
                <span className="font-semibold">
                  {coupon.discount_type === 'percentage' 
                    ? `${coupon.discount_value}%` 
                    : `R$ ${coupon.discount_value.toFixed(2)}`}
                </span>
              </div>

              {coupon.max_uses && (
                <p className="text-case-white/60 text-xs">
                  Usos: {coupon.current_uses}/{coupon.max_uses}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(coupon)}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus(coupon)}
                  className={coupon.is_active 
                    ? "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  }
                >
                  {coupon.is_active ? 'Desativar' : 'Ativar'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(coupon.id)}
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

export default CouponManager;
