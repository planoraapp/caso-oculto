
import React from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Plus } from 'lucide-react';
import { packs } from '../../data/packs';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface AddPackFormProps {
  userPacks: UserPackAccess[];
  newPackId: string;
  onNewPackIdChange: (packId: string) => void;
  onAddPack: () => void;
}

const AddPackForm: React.FC<AddPackFormProps> = ({
  userPacks,
  newPackId,
  onNewPackIdChange,
  onAddPack
}) => {
  const availablePacks = packs
    .filter(pack => !['combo', 'complete'].includes(pack.category))
    .filter(pack => !userPacks.some(access => access.pack_id === pack.id));

  return (
    <div className="p-4 bg-noir-medium rounded-lg">
      <Label className="text-case-white mb-2">Adicionar Pack:</Label>
      <div className="flex gap-2">
        <select
          value={newPackId}
          onChange={(e) => onNewPackIdChange(e.target.value)}
          className="flex-1 bg-noir-dark border border-noir-light text-case-white rounded px-3 py-2"
        >
          <option value="">Selecione um pack</option>
          {availablePacks.map(pack => (
            <option key={pack.id} value={pack.id}>
              {pack.name}
            </option>
          ))}
        </select>
        <Button
          onClick={onAddPack}
          disabled={!newPackId}
          className="bg-case-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddPackForm;
