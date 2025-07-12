
import React from 'react';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

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

// Mapeamento correto dos pack IDs para nomes
const packNames: { [key: string]: string } = {
  'pack-01': 'Mistérios Clássicos',
  'pack-02': 'Enigmas Modernos', // Pack descontinuado
  'pack-03': 'Sussurros do Além', // Pack descontinuado  
  'pack-04': 'Sombras da Noite',
  'pack-05': 'Crimes Imperfeitos',
  'pack-06': 'Lendas Urbanas',
  'pack-07': 'Paradoxos Mortais',
  'pack-08': 'Labirintos Mentais',
  'pack-09': 'Ironias do Destino',
  'pack-10': 'Viagem sem Volta',
  'pack-11': 'Fim de Jogo',
  'pack-12': 'Jogos Corporativos',
  'pack-13': 'Beco sem Saída',
  'pack-14': 'Crimes de Época',
  'pack-15': 'Dose Letal',
  'pack-16': 'Absurdamente Real',
  'pack-17': 'Dossiê Confidencial'
};

const UserPacksList: React.FC<UserPacksListProps> = ({ userPacks, onRemovePack }) => {
  return (
    <div>
      <h4 className="text-case-white font-semibold mb-2">Packs do Usuário:</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {userPacks.length > 0 ? (
          userPacks.map((access) => {
            const packName = packNames[access.pack_id] || access.pack_id;
            const isDiscontinued = access.pack_id === 'pack-02' || access.pack_id === 'pack-03';
            
            return (
              <Badge 
                key={access.id} 
                variant="secondary" 
                className={`flex items-center gap-1 ${
                  isDiscontinued 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-green-600 text-white'
                }`}
              >
                {packName}
                {isDiscontinued && ' (Descontinuado)'}
                <button
                  onClick={() => onRemovePack(access.id)}
                  className="ml-1 hover:text-red-300"
                  title="Remover acesso"
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
