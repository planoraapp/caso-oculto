
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  CreditCard, 
  Package, 
  Star, 
  Crown, 
  CheckCircle, 
  X,
  ArrowLeft 
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
import { useToast } from '../hooks/use-toast';

// Chave pública live da Stripe
const stripePromise = loadStripe('pk_live_51RhgpgLtmJkjKIDB5HIRkSFixyXL4Nsv884yLSWfiy02vbsYYuXw7eX29gkQnWISxycMvrNdObsLLVUERDyUptyH00xXh7fdHL');

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'individual' | 'combo' | 'complete';
  packId?: string;
  selectedPackIds?: string[];
  user: any;
  packName?: string;
  totalPrice?: number;
  discountAmount?: number;
  onPaymentCreated?: (sessionId: string) => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  type,
  packId,
  selectedPackIds,
  user,
  packName,
  totalPrice = 0,
  discountAmount = 0,
  onPaymentCreated
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { toast } = useToast();

  const getPaymentInfo = () => {
    switch (type) {
      case 'individual':
        return {
          title: 'Pack Individual',
          subtitle: packName || 'Pack selecionado',
          description: 'Acesso completo ao pack escolhido',
          icon: Package,
          features: ['Todos os casos do pack', 'Progresso salvo', 'Acesso vitalício'],
          price: 1480 // R$ 14,80 em centavos
        };
      case 'combo':
        return {
          title: 'Combo de 5 Packs',
          subtitle: `${selectedPackIds?.length || 0} packs selecionados`,
          description: 'Economia especial para múltiplos packs',
          icon: Star,
          features: ['5 packs de sua escolha', 'Desconto especial', 'Todos os recursos', 'Acesso vitalício'],
          price: 6140 // R$ 61,40 em centavos
        };
      case 'complete':
        return {
          title: 'Acesso Total',
          subtitle: 'Todos os packs disponíveis',
          description: 'Acesso completo a toda a plataforma',
          icon: Crown,
          features: ['Todos os packs', 'Futuros lançamentos', 'Prioridade no suporte', 'Acesso vitalício'],
          price: 11090 // R$ 110,90 em centavos
        };
      default:
        return {
          title: 'Compra',
          subtitle: '',
          description: '',
          icon: Package,
          features: [],
          price: 0
        };
    }
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Pagamento Aprovado!",
      description: "Seu acesso foi liberado com sucesso.",
    });
    
    if (onPaymentCreated) {
      onPaymentCreated('payment_completed');
    }
    
    // Fechar modal após um breve delay para mostrar o sucesso
    setTimeout(() => {
      onClose();
      setShowPaymentForm(false);
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // Manter o modal aberto para permitir nova tentativa
  };

  const paymentInfo = getPaymentInfo();
  const IconComponent = paymentInfo.icon;
  const finalPrice = totalPrice > 0 ? totalPrice - discountAmount : paymentInfo.price / 100;
  const amountInCents = totalPrice > 0 ? Math.round((totalPrice - discountAmount) * 100) : paymentInfo.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border-noir-medium max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-case-white flex items-center gap-2">
              {showPaymentForm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentForm(false)}
                  className="text-case-white hover:text-case-red mr-2 p-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <IconComponent className="h-6 w-6 text-case-red" />
              {showPaymentForm ? 'Finalizar Pagamento' : 'Finalizar Compra'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-case-white hover:text-case-red"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!showPaymentForm ? (
            <>
              {/* Resumo do Produto */}
              <Card className="bg-noir-medium border-noir-light">
                <CardHeader>
                  <CardTitle className="text-case-white flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-case-red" />
                    {paymentInfo.title}
                  </CardTitle>
                  <p className="text-case-white/80">{paymentInfo.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-case-white/60 mb-4">{paymentInfo.description}</p>
                  
                  {/* Recursos Inclusos */}
                  <div className="space-y-2">
                    <h4 className="text-case-white font-medium">Incluído:</h4>
                    {paymentInfo.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-case-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resumo de Preços */}
              <Card className="bg-noir-medium border-noir-light">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-case-white/80">Subtotal:</span>
                      <span className="text-case-white">R$ {finalPrice.toFixed(2)}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-green-500">Desconto:</span>
                        <span className="text-green-500">-R$ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-noir-light pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-case-white font-semibold">Total:</span>
                        <span className="text-case-white font-semibold text-lg">
                          R$ {finalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botão para ir ao pagamento */}
              <div className="space-y-4">
                <Button
                  onClick={() => setShowPaymentForm(true)}
                  disabled={!user}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pagar com Cartão
                </Button>

                <div className="text-center">
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Pagamento Seguro SSL
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            /* Formulário de Pagamento Integrado */
            <Elements stripe={stripePromise}>
              <div className="space-y-6">
                {/* Resumo do pedido */}
                <div className="bg-noir-medium border border-noir-light rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-case-white font-medium">{paymentInfo.title}</p>
                      <p className="text-case-white/60 text-sm">{paymentInfo.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-case-white font-semibold">R$ {finalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Formulário de Pagamento */}
                <StripePaymentForm
                  amount={amountInCents}
                  currency="brl"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  type={type}
                  packId={packId}
                  selectedPackIds={selectedPackIds}
                  userId={user?.id || ''}
                />
              </div>
            </Elements>
          )}

          {/* Informações de Segurança */}
          <div className="text-center text-case-white/60 text-xs space-y-1">
            <p>🔒 Seus dados estão protegidos com criptografia SSL de 256 bits</p>
            <p>Processamento seguro via Stripe</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptionsModal;
