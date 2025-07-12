
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
  'sussurros-do-alem': 'Sussurros do Além',
  'sombras-da-noite': 'Sombras da Noite',
  'crimes-imperfeitos': 'Crimes Imperfeitos',
  'lendas-urbanas': 'Lendas Urbanas',
  'paradoxos-mortais': 'Paradoxos Mortais',
  'labirintos-mentais': 'Labirintos Mentais',
  'jogos-corporativos': 'Jogos Corporativos',
  'ironias-do-destino': 'Ironias do Destino',
  'beco-sem-saida': 'Beco sem Saída',
  'crimes-de-epoca': 'Crimes de Época',
  'viagem-sem-volta': 'Viagem sem Volta',
  'dossie-confidencial': 'Dossiê Confidencial',
  'dose-letal': 'Dose Letal',
  'fim-de-jogo': 'Fim de Jogo',
  'absurdamente-real': 'Absurdamente Real'
};

const UserPacksList: React.FC<UserPacksListProps> = ({ userPacks, onRemovePack }) => {
  return (
    <div>
      <h4 className="text-case-white font-semibold mb-2">Packs do Usuário:</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {userPacks.length > 0 ? (
          userPacks.map((access) => {
            const packName = packNames[access.pack_id] || access.pack_id;
            const isDiscontinued = false; // Não há mais packs descontinuados com os novos IDs
            
            return (
              <Badge 
                key={access.id} 
                variant="secondary" 
                className="flex items-center gap-1 bg-green-600 text-white"
              >
                {packName}
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
