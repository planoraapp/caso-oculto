
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Edit, Trash2, Users, Package, DollarSign } from 'lucide-react';
import UserPacksList from './UserPacksList';
import UserPaymentsList from './UserPaymentsList';
import AddPackForm from './AddPackForm';
import UserStatsCard from './UserStatsCard';

interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  is_active: boolean;
  granted_at: string;
}

interface UserCompra {
  id: string;
  user_id: string;
  pack_id: string | null;
  selected_pack_ids: string[] | null;
  payment_type: string;
  status: string;
  created_at: string;
  valor_pago: number;
}

interface UserCardProps {
  user: SupabaseUser;
  userPacks: UserPackAccess[];
  userPayments: UserCompra[];
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
  // Calculate user statistics
  const approvedPayments = userPayments.filter(p => p.status === 'approved');
  const pendingPayments = userPayments.filter(p => p.status === 'pending');
  const totalSpent = approvedPayments.reduce((sum, payment) => sum + (payment.valor_pago || 0), 0);

  return (
    <Card className="bg-noir-dark border-noir-medium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-case-red rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-case-white text-lg">{user.email}</CardTitle>
              <p className="text-case-white/60 text-sm">
                Cadastrado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onToggleEdit}
              className="border-case-red text-case-red hover:bg-case-red hover:text-white"
            >
              <Edit className="h-4 w-4" />
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

      <CardContent className="space-y-4">
        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UserStatsCard
            icon={<Package className="h-4 w-4" />}
            title="Packs Ativos"
            value={userPacks.length}
            color="text-blue-500"
          />
          <UserStatsCard
            icon={<DollarSign className="h-4 w-4" />}
            title="Compras Aprovadas"
            value={approvedPayments.length}
            subtitle={`${pendingPayments.length} pendentes`}
            color="text-green-500"
          />
          <UserStatsCard
            title="Total Gasto"
            value={`R$ ${totalSpent.toFixed(2)}`}
            color="text-purple-500"
          />
        </div>

        {/* User Packs */}
        <div>
          <h4 className="text-case-white font-semibold mb-2 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Packs Liberados ({userPacks.length})
          </h4>
          <UserPacksList 
            userPacks={userPacks} 
            onRemovePack={onRemovePackFromUser} 
          />
        </div>

        {/* Add Pack Form */}
        {isEditing && (
          <AddPackForm
            userPacks={userPacks}
            newPackId={newPackId}
            onNewPackIdChange={onNewPackIdChange}
            onAddPack={onAddPackToUser}
          />
        )}

        {/* User Payments */}
        <div>
          <h4 className="text-case-white font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Histórico de Compras ({userPayments.length})
          </h4>
          <UserPaymentsList userPayments={userPayments} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
