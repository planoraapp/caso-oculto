
import { supabase } from '../integrations/supabase/client';

export interface PaymentSession {
  id: string;
  user_id: string;
  payment_type: 'individual' | 'combo' | 'complete';
  pack_id?: string;
  selected_pack_ids?: string[];
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  stripe_session_id?: string;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  payment_type: 'individual' | 'combo' | 'complete';
  pack_id?: string;
  selected_pack_ids?: string[];
  valor_original: number;
  valor_pago: number;
  status: 'pending' | 'approved' | 'rejected';
  stripe_session_id: string;
  cupom_codigo?: string;
  created_at: string;
}

export class PaymentService {
  static async createStripeSession(params: {
    paymentType: 'individual' | 'combo' | 'complete';
    packId?: string;
    selectedPackIds?: string[];
    userId: string;
    couponCode?: string;
    totalAmount?: number;
  }) {
    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: params
      });

      if (error) {
        console.error('Error creating payment:', error);
        throw new Error(error.message || 'Erro ao criar pagamento');
      }

      return data;
    } catch (error) {
      console.error('Error in createStripeSession:', error);
      throw error;
    }
  }

  static async getUserPurchases(userId: string): Promise<Purchase[]> {
    try {
      const { data, error } = await supabase
        .from('compras')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user purchases:', error);
        throw error;
      }

      // Type cast the payment_type and status to ensure they match our interface
      return (data || []).map(purchase => ({
        ...purchase,
        payment_type: purchase.payment_type as 'individual' | 'combo' | 'complete',
        status: purchase.status as 'pending' | 'approved' | 'rejected'
      }));
    } catch (error) {
      console.error('Error in getUserPurchases:', error);
      return [];
    }
  }

  static async getAllPurchases(): Promise<Purchase[]> {
    try {
      const { data, error } = await supabase
        .from('compras')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all purchases:', error);
        throw error;
      }

      // Type cast the payment_type and status to ensure they match our interface
      return (data || []).map(purchase => ({
        ...purchase,
        payment_type: purchase.payment_type as 'individual' | 'combo' | 'complete',
        status: purchase.status as 'pending' | 'approved' | 'rejected'
      }));
    } catch (error) {
      console.error('Error in getAllPurchases:', error);
      return [];
    }
  }

  static async updatePurchaseStatus(purchaseId: string, status: 'approved' | 'rejected'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('compras')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', purchaseId);

      if (error) {
        console.error('Error updating purchase status:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in updatePurchaseStatus:', error);
      return false;
    }
  }
}
