
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

const PackManager: React.FC = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 14.80,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
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

  if (loading) {
    return <div className="text-case-white text-center">Carregando packs...</div>;
  }

  return (
    <Card className="bg-noir-dark border-noir-medium">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-case-white">Gerenciar Packs</CardTitle>
          <Button onClick={handleCreate} className="bg-case-red hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Novo Pack
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-case-white">ID</TableHead>
              <TableHead className="text-case-white">Nome</TableHead>
              <TableHead className="text-case-white">Descrição</TableHead>
              <TableHead className="text-case-white">Preço</TableHead>
              <TableHead className="text-case-white">Dificuldade</TableHead>
              <TableHead className="text-case-white">Categoria</TableHead>
              <TableHead className="text-case-white">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packs.map((pack) => (
              <TableRow key={pack.id}>
                <TableCell className="text-case-white font-mono text-xs">{pack.id}</TableCell>
                <TableCell className="text-case-white">{pack.name}</TableCell>
                <TableCell className="text-case-white max-w-xs truncate">{pack.description}</TableCell>
                <TableCell className="text-case-white">R$ {pack.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={
                    pack.difficulty === 'easy' ? 'secondary' :
                    pack.difficulty === 'medium' ? 'default' : 'destructive'
                  }>
                    {pack.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-case-white">{pack.category}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(pack)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(pack.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-noir-dark border-noir-medium max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-case-white">
                {isCreating ? 'Criar Novo Pack' : 'Editar Pack'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id" className="text-case-white">ID</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    placeholder="ex: meu-pack"
                    className="bg-noir-medium border-noir-light text-case-white"
                    disabled={!isCreating}
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-case-white">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image" className="text-case-white">URL da Imagem</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="/lovable-uploads/image.png"
                  className="bg-noir-medium border-noir-light text-case-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price" className="text-case-white">Preço</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="text-case-white">Dificuldade</Label>
                  <Select value={formData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setFormData({...formData, difficulty: value})}>
                    <SelectTrigger className="bg-noir-medium border-noir-light text-case-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category" className="text-case-white">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="bg-noir-medium border-noir-light text-case-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-noir-light text-case-white hover:bg-noir-medium"
                >
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-case-red hover:bg-red-600">
                  {isCreating ? 'Criar' : 'Salvar'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PackManager;
