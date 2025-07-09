
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import PackManagerHeader from './pack-manager/PackManagerHeader';
import PackTable from './pack-manager/PackTable';
import PackFormDialog from './pack-manager/PackFormDialog';

interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  image: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

interface PackFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  image: string;
  category: string;
}

const PackManager: React.FC = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<PackFormData>({
    id: '',
    name: '',
    description: '',
    price: 14.80,
    difficulty: 'medium',
    image: '',
    category: 'mystery'
  });

  useEffect(() => {
    loadPacks();
  }, []);

  const loadPacks = async () => {
    try {
      const { data, error } = await supabase
        .from('packs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPacks(data || []);
    } catch (error) {
      console.error('Error loading packs:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar packs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 14.80,
      difficulty: 'medium',
      image: '',
      category: 'mystery'
    });
    setEditingPack(null);
    setIsCreating(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (pack: Pack) => {
    setFormData({
      id: pack.id,
      name: pack.name,
      description: pack.description,
      price: pack.price,
      difficulty: pack.difficulty,
      image: pack.image || '',
      category: pack.category
    });
    setEditingPack(pack);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('packs')
          .insert([{
            id: formData.id,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            difficulty: formData.difficulty,
            image: formData.image || null,
            category: formData.category
          }]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('packs')
          .update({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            difficulty: formData.difficulty,
            image: formData.image || null,
            category: formData.category,
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: `Pack ${isCreating ? 'criado' : 'atualizado'} com sucesso`,
      });

      setIsDialogOpen(false);
      resetForm();
      loadPacks();
    } catch (error) {
      console.error('Error saving pack:', error);
      toast({
        title: "Erro",
        description: `Erro ao ${isCreating ? 'criar' : 'atualizar'} pack`,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (packId: string) => {
    if (!confirm('Tem certeza que deseja excluir este pack?')) return;

    try {
      const { error } = await supabase
        .from('packs')
        .delete()
        .eq('id', packId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Pack excluído com sucesso",
      });

      loadPacks();
    } catch (error) {
      console.error('Error deleting pack:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir pack",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  if (loading) {
    return <div className="text-case-white text-center">Carregando packs...</div>;
  }

  return (
    <Card className="bg-noir-dark border-noir-medium">
      <PackManagerHeader onCreateNew={handleCreate} />
      <CardContent>
        <PackTable 
          packs={packs} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
        <PackFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          isCreating={isCreating}
          formData={formData}
          onFormDataChange={setFormData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </CardContent>
    </Card>
  );
};

export default PackManager;
