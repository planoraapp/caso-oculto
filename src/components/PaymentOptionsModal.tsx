
import React, { useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import IndividualPackCard from './payment/IndividualPackCard';
import ComboPackCard from './payment/ComboPackCard';
import CompletePackCard from './payment/CompletePackCard';
import PaymentSecurity from './payment/PaymentSecurity';
import ComboModal from './ComboModal';
import { packs, getUserPacks } from '../data/packs';

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
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);

  const userPackIds = getUserPacks(userId);

  const createPayment = async (type: 'individual' | 'combo' | 'complete', selectedPackIds?: string[]) => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      console.log('Creating payment:', { type, packId, selectedPackIds, userId });
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          type,
          packId: type === 'individual' ? packId : null,
          selectedPackIds,
          userId
        }
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw error;
      }

      console.log('Payment created:', data.preference_id);
      onPaymentCreated(data.preference_id);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseCombo = async (selectedPackIds: string[]) => {
    setIsComboModalOpen(false);
    await createPayment('combo', selectedPackIds);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-case-white">
                Desbloquear: {packName}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-case-white hover:text-case-red"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <IndividualPackCard 
                onPurchase={() => createPayment('individual')}
                isLoading={isLoading}
              />
              
              <ComboPackCard 
                onOpenComboModal={() => setIsComboModalOpen(true)}
                isLoading={isLoading}
              />
              
              <CompletePackCard 
                onPurchase={() => createPayment('complete')}
                isLoading={isLoading}
              />
            </div>

            <PaymentSecurity />
          </div>
        </div>
      </div>

      {/* Combo Modal */}
      {isComboModalOpen && (
        <ComboModal
          packs={packs}
          ownedPackIds={userPackIds}
          onClose={() => setIsComboModalOpen(false)}
          onPurchaseCombo={handlePurchaseCombo}
        />
      )}
    </>
  );
};

export default PaymentOptionsModal;
