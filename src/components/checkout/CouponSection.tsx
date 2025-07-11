
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Loader2, Tag, CheckCircle, XCircle } from 'lucide-react';
import { useCoupon } from '../../hooks/useCoupon';

interface CouponSectionProps {
  originalPrice: number;
  onCouponApplied: (discount: number, couponCode: string) => void;
  onCouponRemoved: () => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  originalPrice,
  onCouponApplied,
  onCouponRemoved
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponField, setShowCouponField] = useState(false);
  const { coupon, isValidating, validateCoupon, clearCoupon, calculateDiscount } = useCoupon();

  useEffect(() => {
    if (coupon?.is_valid) {
      const discount = calculateDiscount(originalPrice);
      onCouponApplied(discount, coupon.code);
    } else if (coupon && !coupon.is_valid) {
      onCouponRemoved();
    }
  }, [coupon, originalPrice, calculateDiscount, onCouponApplied, onCouponRemoved]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    await validateCoupon(couponCode);
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    clearCoupon();
    onCouponRemoved();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyCoupon();
    }
  };

  return (
    <Card className="bg-noir-medium border-noir-light">
      <CardContent className="pt-6">
        {!showCouponField ? (
          <Button
            variant="ghost"
            onClick={() => setShowCouponField(true)}
            className="w-full text-case-white hover:bg-noir-light border border-dashed border-case-white/30"
          >
            <Tag className="h-4 w-4 mr-2" />
            Tem um cupom de desconto?
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coupon-code" className="text-case-white">
                Código do Cupom
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-case-white/60" />
                  <Input
                    id="coupon-code"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    className="pl-10 bg-noir-dark border-noir-light text-case-white uppercase"
                    placeholder="Ex: CASO10"
                    maxLength={20}
                  />
                </div>
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isValidating || !couponCode.trim()}
                  className="bg-case-red hover:bg-red-600 text-white px-6"
                >
                  {isValidating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Aplicar'
                  )}
                </Button>
              </div>
            </div>

            {/* Status do cupom */}
            {coupon && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                coupon.is_valid 
                  ? 'bg-green-600/20 border border-green-500/30' 
                  : 'bg-red-600/20 border border-red-500/30'
              }`}>
                {coupon.is_valid ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm ${
                  coupon.is_valid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coupon.message}
                </span>
                {coupon.is_valid && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveCoupon}
                    className="ml-auto text-case-white/60 hover:text-case-white p-1"
                  >
                    Remover
                  </Button>
                )}
              </div>
            )}

            {/* Mostrar desconto aplicado */}
            {coupon?.is_valid && (
              <div className="bg-green-600/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-case-white/80">Desconto aplicado:</span>
                  <span className="text-green-400 font-semibold">
                    -{coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `R$ ${coupon.discount_value.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-case-white/80">Economia:</span>
                  <span className="text-green-400 font-semibold">
                    R$ {calculateDiscount(originalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponSection;
