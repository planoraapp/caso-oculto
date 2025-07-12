
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Check, X, Tag, Loader2 } from 'lucide-react';

interface CouponSectionProps {
  originalPrice: number;
  onCouponApplied: (discount: number, code: string) => void;
  onCouponRemoved: () => void;
}

// Cupons válidos pré-configurados
const VALID_COUPONS = {
  'CASO10': { discount: 10, type: 'percentage', description: '10% de desconto' },
  'VALEU': { discount: 99, type: 'percentage', description: '99% de desconto' },
  'LOVABLE': { discount: 100, type: 'percentage', description: '100% de desconto' }
};

const CouponSection: React.FC<CouponSectionProps> = ({
  originalPrice,
  onCouponApplied,
  onCouponRemoved
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateDiscount = (coupon: any, price: number) => {
    if (coupon.type === 'percentage') {
      return (price * coupon.discount) / 100;
    }
    return coupon.discount;
  };

  const validateAndApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setError(null);

    try {
      const upperCode = couponCode.trim().toUpperCase();
      
      // Verificar se o cupom está na lista de válidos
      const couponData = VALID_COUPONS[upperCode as keyof typeof VALID_COUPONS];
      
      if (!couponData) {
        setError('Cupom não encontrado ou inválido');
        return;
      }

      // Calcular desconto
      const discountAmount = calculateDiscount(couponData, originalPrice);
      
      // Aplicar cupom
      setAppliedCoupon(upperCode);
      onCouponApplied(discountAmount, upperCode);
      
      console.log('Coupon applied:', upperCode, 'Discount:', discountAmount);
      
    } catch (error) {
      console.error('Error validating coupon:', error);
      setError('Erro ao validar cupom. Tente novamente.');
    } finally {
      setIsValidating(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setError(null);
    onCouponRemoved();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndApplyCoupon();
    }
  };

  return (
    <Card className="bg-noir-medium border-noir-light">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-case-red" />
          <h3 className="text-case-white font-medium">Cupom de Desconto</h3>
        </div>

        {!appliedCoupon ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite seu cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                className="bg-noir-dark border-noir-light text-case-white"
                disabled={isValidating}
              />
              <Button
                onClick={validateAndApplyCoupon}
                disabled={!couponCode.trim() || isValidating}
                className="bg-case-red hover:bg-red-600 text-white"
              >
                {isValidating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Aplicar'
                )}
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <X className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Dicas de cupons válidos */}
            <div className="text-case-white/60 text-xs">
              <p>Cupons disponíveis: CASO10, VALEU, LOVABLE</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-600 text-white">
                  {appliedCoupon}
                </Badge>
                <span className="text-case-white/80 text-sm">
                  {VALID_COUPONS[appliedCoupon as keyof typeof VALID_COUPONS]?.description}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeCoupon}
                className="text-case-white/60 hover:text-case-red"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CouponSection;
