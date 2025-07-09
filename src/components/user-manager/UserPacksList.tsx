
import React from 'react';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { packs } from '../../data/packs';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface UserPacksListProps {
  userPacks: UserPackAccess[];
  onRemovePack: (accessId: string) => void;
}

const UserPacksList: React.FC<UserPacksListProps> = ({ userPacks, onRemovePack }) => {
  return (
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
                  onClick={() => onRemovePack(access.id)}
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
  );
};

export default UserPacksList;
