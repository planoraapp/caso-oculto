
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface PackFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: string;
  image: string;
  category: string;
}

interface PackFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isCreating: boolean;
  formData: PackFormData;
  onFormDataChange: (data: PackFormData) => void;
  onSave: () => void;
  onCancel: () => void;
}

const PackFormDialog: React.FC<PackFormDialogProps> = ({
  isOpen,
  onOpenChange,
  isCreating,
  formData,
  onFormDataChange,
  onSave,
  onCancel
}) => {
  const updateFormData = (field: keyof PackFormData, value: string | number) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                onChange={(e) => updateFormData('id', e.target.value)}
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
                onChange={(e) => updateFormData('name', e.target.value)}
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-case-white">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              className="bg-noir-medium border-noir-light text-case-white"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-case-white">URL da Imagem</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => updateFormData('image', e.target.value)}
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
                onChange={(e) => updateFormData('price', parseFloat(e.target.value))}
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
            <div>
              <Label htmlFor="difficulty" className="text-case-white">Dificuldade</Label>
              <Select value={formData.difficulty} onValueChange={(value) => updateFormData('difficulty', value)}>
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
                onChange={(e) => updateFormData('category', e.target.value)}
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-noir-light text-case-white hover:bg-noir-medium"
            >
              Cancelar
            </Button>
            <Button onClick={onSave} className="bg-case-red hover:bg-red-600">
              {isCreating ? 'Criar' : 'Salvar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackFormDialog;
