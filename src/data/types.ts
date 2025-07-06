
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
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  category: string;
  cases: Case[];
}

export interface Purchase {
  id: string;
  userId: string;
  packId: string;
  price: number;
  purchaseDate: string;
  transactionId: string;
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
