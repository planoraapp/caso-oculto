
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2, Edit, X, CreditCard, Package } from 'lucide-react';
import { Badge } from '../ui/badge';
import UserStatsCard from './UserStatsCard';
import UserPacksList from './UserPacksList';
import UserPaymentsList from './UserPaymentsList';
import AddPackForm from './AddPackForm';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface PaymentSession {
  id: string;
  user_id: string;
  pack_id: string | null;
  selected_pack_ids: string[] | null;
  payment_type: string;
  status: string;
  created_at: string;
  stripe_session_id: string | null;
}

interface UserCardProps {
  user: SupabaseUser;
  userPacks: UserPackAccess[];
  userPayments: PaymentSession[];
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
  userPayments,
  isEditing,
  newPackId,
  onToggleEdit,
  onDeleteUser,
  onRemovePackFromUser,
  onNewPackIdChange,
  onAddPackToUser
}) => {
  const approvedPayments = userPayments.filter(p => p.status === 'approved');
  const pendingPayments = userPayments.filter(p => p.status === 'pending');

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
        <div className="space-y-6">
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-noir-medium p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-case-red" />
                <span className="text-case-white text-sm">Packs Ativos</span>
              </div>
              <div className="text-2xl font-bold text-case-white">{userPacks.length}</div>
            </div>
            <div className="bg-noir-medium p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-500" />
                <span className="text-case-white text-sm">Compras Aprovadas</span>
              </div>
              <div className="text-2xl font-bold text-case-white">{approvedPayments.length}</div>
            </div>
            <div className="bg-noir-medium p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-yellow-500" />
                <span className="text-case-white text-sm">Compras Pendentes</span>
              </div>
              <div className="text-2xl font-bold text-case-white">{pendingPayments.length}</div>
            </div>
          </div>

          {/* Packs do Usuário */}
          <UserPacksList
            userPacks={userPacks}
            onRemovePack={onRemovePackFromUser}
          />

          {/* Histórico de Pagamentos */}
          <UserPaymentsList userPayments={userPayments} />

          {/* Formulário para Adicionar Pack */}
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
