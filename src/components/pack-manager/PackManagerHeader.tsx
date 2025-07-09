
import React from 'react';
import { CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface PackManagerHeaderProps {
  onCreateNew: () => void;
}

const PackManagerHeader: React.FC<PackManagerHeaderProps> = ({ onCreateNew }) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-case-white">Gerenciar Packs</CardTitle>
        <Button onClick={onCreateNew} className="bg-case-red hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo Pack
        </Button>
      </div>
    </CardHeader>
  );
};

export default PackManagerHeader;
