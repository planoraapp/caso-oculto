
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2, Edit, X } from 'lucide-react';
import UserStatsCard from './UserStatsCard';
import UserPacksList from './UserPacksList';
import AddPackForm from './AddPackForm';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface UserCardProps {
  user: SupabaseUser;
  userPacks: UserPackAccess[];
  isEditing: boolean;
  newPackId: string;
  onToggleEdit: () => void;
  onDeleteUser: () => void;
  onRemovePackFromUser: (accessId: string) => void;
  onNewPackIdChange: (packId: string) => void;
  onAddPackToUser: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  userPacks,
  isEditing,
  newPackId,
  onToggleEdit,
  onDeleteUser,
  onRemovePackFromUser,
  onNewPackIdChange,
  onAddPackToUser
}) => {
  return (
    <Card className="bg-noir-dark border-noir-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <UserStatsCard
            email={user.email || 'Email não disponível'}
            createdAt={user.created_at}
            lastSignInAt={user.last_sign_in_at}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onToggleEdit}
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDeleteUser}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UserPacksList
            userPacks={userPacks}
            onRemovePack={onRemovePackFromUser}
          />

          {isEditing && (
            <AddPackForm
              userPacks={userPacks}
              newPackId={newPackId}
              onNewPackIdChange={onNewPackIdChange}
              onAddPack={onAddPackToUser}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
