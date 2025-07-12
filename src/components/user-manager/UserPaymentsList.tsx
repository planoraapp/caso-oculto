
import React from 'react';
import { Badge } from '../ui/badge';
import { CreditCard, Calendar, Package } from 'lucide-react';

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

interface UserPaymentsListProps {
  userPayments: PaymentSession[];
}

const UserPaymentsList: React.FC<UserPaymentsListProps> = ({ userPayments }) => {
  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Pack Individual';
      case 'combo': return 'Combo 5 Packs';
      case 'complete': return 'Acesso Total';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600';
      case 'pending': return 'bg-yellow-600';
      case 'rejected': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  if (userPayments.length === 0) {
    return (
      <div>
        <h4 className="text-case-white font-semibold mb-2 flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Histórico de Pagamentos:
        </h4>
        <span className="text-case-white/60">Nenhum pagamento registrado</span>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-case-white font-semibold mb-3 flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        Histórico de Pagamentos ({userPayments.length}):
      </h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {userPayments.map((payment) => (
          <div 
            key={payment.id} 
            className="bg-noir-medium p-3 rounded-lg border border-noir-light"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="h-3 w-3 text-case-white/60" />
                <span className="text-case-white text-sm font-medium">
                  {getPaymentTypeLabel(payment.payment_type)}
                </span>
              </div>
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(payment.status)} text-white text-xs`}
              >
                {getStatusLabel(payment.status)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-case-white/60">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(payment.created_at).toLocaleDateString('pt-BR')}
              </div>
              {payment.stripe_session_id && (
                <div className="text-xs font-mono">
                  Stripe: {payment.stripe_session_id.substring(0, 20)}...
                </div>
              )}
            </div>

            {payment.payment_type === 'combo' && payment.selected_pack_ids && (
              <div className="mt-2 text-xs text-case-white/60">
                Packs: {payment.selected_pack_ids.join(', ')}
              </div>
            )}
            
            {payment.payment_type === 'individual' && payment.pack_id && (
              <div className="mt-2 text-xs text-case-white/60">
                Pack: {payment.pack_id}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPaymentsList;
