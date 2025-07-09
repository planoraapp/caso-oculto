
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';

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

interface PackTableProps {
  packs: Pack[];
  onEdit: (pack: Pack) => void;
  onDelete: (packId: string) => void;
}

const PackTable: React.FC<PackTableProps> = ({ packs, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
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
                    onClick={() => onEdit(pack)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(pack.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PackTable;
