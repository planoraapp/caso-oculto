
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, X } from 'lucide-react';
import { Button } from './ui/button';

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  packName?: string;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  isOpen,
  onClose,
  status,
  packName
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          title: 'Pagamento Aprovado!',
          message: `Seu pack "${packName}" foi adicionado à sua biblioteca com sucesso.`,
          color: 'text-green-500'
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'Pagamento Rejeitado',
          message: 'Houve um problema com seu pagamento. Tente novamente.',
          color: 'text-red-500'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          title: 'Pagamento Cancelado',
          message: 'O pagamento foi cancelado.',
          color: 'text-yellow-500'
        };
      default:
        return {
          icon: Clock,
          title: 'Processando Pagamento',
          message: 'Aguarde enquanto processamos seu pagamento...',
          color: 'text-blue-500'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-noir-dark rounded-lg p-8 max-w-md w-full text-case-white border border-noir-medium"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Status do Pagamento</h2>
            <button onClick={onClose} className="text-case-white/60 hover:text-case-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="text-center">
            <Icon className={`h-16 w-16 mx-auto mb-4 ${config.color}`} />
            <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
            <p className="text-case-white/80 mb-6">{config.message}</p>
            
            <Button 
              onClick={onClose}
              className="bg-case-red hover:bg-red-600 text-white"
            >
              Fechar
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentStatusModal;
