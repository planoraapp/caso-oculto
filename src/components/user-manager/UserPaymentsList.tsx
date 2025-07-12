
import React from 'react';
import { Badge } from '../ui/badge';

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

interface UserPaymentsListProps {
  userPayments: UserCompra[];
}

const UserPaymentsList: React.FC<UserPaymentsListProps> = ({ userPayments }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'approved': { label: 'Aprovado', variant: 'default' as const },
      'pending': { label: 'Pendente', variant: 'secondary' as const },
      'rejected': { label: 'Rejeitado', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || 
                  { label: status, variant: 'secondary' as const };
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentTypeLabel = (type: string) => {
    const types = {
      'individual': 'Pack Individual',
      'combo': 'Combo 5 Packs',
      'complete': 'Acesso Total'
    };
    return types[type as keyof typeof types] || type;
  };

  if (userPayments.length === 0) {
    return (
      <div className="text-center text-case-white/60 py-4 bg-noir-medium rounded-lg">
        Nenhuma compra registrada
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {userPayments.slice(0, 5).map((payment) => (
        <div key={payment.id} className="bg-noir-medium p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-case-white font-medium">
                {getPaymentTypeLabel(payment.payment_type)}
              </span>
              {getStatusBadge(payment.status)}
            </div>
            <span className="text-case-white font-semibold">
              R$ {payment.valor_pago?.toFixed(2) || '0.00'}
            </span>
          </div>
          <div className="text-case-white/60 text-sm">
            {new Date(payment.created_at).toLocaleString('pt-BR')}
          </div>
          {payment.pack_id && (
            <div className="text-case-white/60 text-xs mt-1">
              Pack: {payment.pack_id}
            </div>
          )}
          {payment.selected_pack_ids && payment.selected_pack_ids.length > 0 && (
            <div className="text-case-white/60 text-xs mt-1">
              Packs: {payment.selected_pack_ids.join(', ')}
            </div>
          )}
        </div>
      ))}
      {userPayments.length > 5 && (
        <div className="text-center text-case-white/60 text-sm">
          ... e mais {userPayments.length - 5} compras
        </div>
      )}
    </div>
  );
};

export default UserPaymentsList;
