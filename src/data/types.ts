export interface Case {
  id: string;
  order: number;
  mystery: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFree?: boolean;
  theme: 'mystery' | 'murder' | 'theft' | 'investigation' | 'thriller' | 'crime' | 'conspiracy' | 'danger' | 'power';
  name?: string;
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  category: string;
  cases?: Case[];
}

export interface Purchase {
  id: string;
  userId: string;
  packId: string;
  packName?: string;
  price?: number;
  price_paid: number;
  purchaseDate?: string;
  purchased_at: string;
  transactionId: string;
  type?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  description?: string;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
  max_uses?: number;
  current_uses: number;
  min_purchase_amount?: number;
}

// Tipos para sessões de pagamento
export interface PaymentSession {
  id: string;
  user_id: string;
  pack_id?: string;
  selected_pack_ids?: string[];
  payment_type: 'individual' | 'combo' | 'complete';
  mercadopago_preference_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// Tipos para acesso de usuário aos packs
export interface UserPackAccess {
  id: string;
  user_id: string;
  pack_id: string;
  granted_at: string;
  revoked_at?: string;
  is_active: boolean;
  granted_by?: string;
}
