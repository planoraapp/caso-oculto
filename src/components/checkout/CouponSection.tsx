import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Tag, X, Check } from 'lucide-react';
import { useCoupon } from '../../hooks/useCoupon';
interface CouponSectionProps {
  originalPrice: number;
  paymentType?: string;
  onCouponApplied: (discount: number, code: string) => void;
  onCouponRemoved: () => void;
}
const CouponSection: React.FC<CouponSectionProps> = ({
  originalPrice,
  paymentType,
  onCouponApplied,
  onCouponRemoved
}) => {
  const [couponInput, setCouponInput] = useState('');
  const {
    coupon,
    isValidating,
    validateCoupon,
    clearCoupon,
    calculateDiscount
  } = useCoupon();
  useEffect(() => {
    if (coupon?.is_valid) {
      const discount = calculateDiscount(originalPrice);
      onCouponApplied(discount, coupon.code);
    } else if (coupon && !coupon.is_valid) {
      onCouponRemoved();
    }
  }, [coupon, originalPrice, calculateDiscount, onCouponApplied, onCouponRemoved]);
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    await validateCoupon(couponInput, paymentType);
  };
  const handleRemoveCoupon = () => {
    setCouponInput('');
    clearCoupon();
    onCouponRemoved();
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };
  return <Card className="bg-noir-medium border-noir-light">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-case-red" />
            <h4 className="text-case-white font-medium">Cupom de Desconto</h4>
          </div>

          {!coupon?.is_valid ? <div className="flex gap-2">
              <Input placeholder="Digite seu cupom" value={couponInput} onChange={e => setCouponInput(e.target.value.toUpperCase())} onKeyPress={handleKeyPress} className="bg-noir-dark border-noir-light text-case-white" disabled={isValidating} />
              <Button onClick={handleApplyCoupon} disabled={!couponInput.trim() || isValidating} className="bg-case-red hover:bg-red-600 text-white">
                {isValidating ? 'Validando...' : 'Aplicar'}
              </Button>
            </div> : <div className="flex items-center justify-between bg-green-600/20 border border-green-600/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">
                  {coupon.code} aplicado - {coupon.discount_value}% de desconto
                </span>
              </div>
              <Button onClick={handleRemoveCoupon} variant="ghost" size="sm" className="text-case-white hover:text-case-red">
                <X className="h-4 w-4" />
              </Button>
            </div>}

          {coupon && !coupon.is_valid && <div className="text-red-400 text-sm">
              {coupon.message}
            </div>}

          <div className="text-case-white/60 text-xs">
            <p>• CASO10: 10% de desconto em qualquer compra</p>
            <p>• VALEU: Válidos apenas para Acesso Total</p>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default CouponSection;