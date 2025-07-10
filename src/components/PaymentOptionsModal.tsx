
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import StripeCheckout from './StripeCheckout';
import IndividualPackCard from './payment/IndividualPackCard';
import ComboPackCard from './payment/ComboPackCard';
import CompletePackCard from './payment/CompletePackCard';
import PaymentSecurity from './payment/PaymentSecurity';

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  packName: string;
  packId: string;
  userId: string;
  onPaymentCreated: (preferenceId: string) => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  packName,
  packId,
  userId,
  onPaymentCreated
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutSessionId, setCheckoutSessionId] = useState<string | null>(null);

  const handleIndividualPurchase = async () => {
    if (isLoading || !userId) return;
    setIsLoading(true);
    
    try {
      console.log('Starting individual purchase for pack:', packId);
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: {
          type: 'individual',
          packId,
          userId
        }
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw error;
      }

      console.log('Stripe session created:', data);
      setCheckoutSessionId(data.session_id);
      onPaymentCreated(data.session_id);
    } catch (error) {
      console.error('Erro ao processar pagamento individual:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompletePurchase = async () => {
    if (isLoading || !userId) return;
    setIsLoading(true);
    
    try {
      console.log('Starting complete access purchase');
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: {
          type: 'complete',
          userId
        }
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw error;
      }

      console.log('Stripe session created:', data);
      setCheckoutSessionId(data.session_id);
      onPaymentCreated(data.session_id);
    } catch (error) {
      console.error('Erro ao processar pagamento completo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenComboModal = () => {
    // This will be handled by parent component
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-case-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Opções de Pagamento
          </DialogTitle>
        </DialogHeader>

        {checkoutSessionId ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Finalize seu pagamento</h3>
            <StripeCheckout 
              preferenceId={checkoutSessionId}
              onPaymentResult={(result) => {
                console.log('Payment result:', result);
                if (result.status === 'approved') {
                  onClose();
                }
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Individual Pack Option */}
            <IndividualPackCard
              onPurchase={handleIndividualPurchase}
              isLoading={isLoading}
            />

            {/* Combo Pack Option */}
            <ComboPackCard
              onOpenComboModal={handleOpenComboModal}
              isLoading={isLoading}
            />

            {/* Complete Pack Option */}
            <CompletePackCard
              onPurchase={handleCompletePurchase}
              isLoading={isLoading}
            />

            {/* Payment Security */}
            <PaymentSecurity />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptionsModal;
