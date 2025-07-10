
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
  Loader2 
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

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
  discountAmount = 0
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getPaymentInfo = () => {
    switch (type) {
      case 'individual':
        return {
          title: 'Pack Individual',
          subtitle: packName || 'Pack selecionado',
          description: 'Acesso completo ao pack escolhido',
          icon: Package,
          features: ['Todos os casos do pack', 'Progresso salvo', 'Acesso vitalício']
        };
      case 'combo':
        return {
          title: 'Combo de 5 Packs',
          subtitle: `${selectedPackIds?.length || 0} packs selecionados`,
          description: 'Economia especial para múltiplos packs',
          icon: Star,
          features: ['5 packs de sua escolha', 'Desconto especial', 'Todos os recursos', 'Acesso vitalício']
        };
      case 'complete':
        return {
          title: 'Acesso Total',
          subtitle: 'Todos os packs disponíveis',
          description: 'Acesso completo a toda a plataforma',
          icon: Crown,
          features: ['Todos os packs', 'Futuros lançamentos', 'Prioridade no suporte', 'Acesso vitalício']
        };
      default:
        return {
          title: 'Compra',
          subtitle: '',
          description: '',
          icon: Package,
          features: []
        };
    }
  };

  const handleStripePayment = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer uma compra",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      console.log('Initiating Stripe payment:', { type, packId, selectedPackIds, userId: user.id });

      const { data, error } = await supabase.functions.invoke('create-stripe-session', {
        body: {
          type,
          packId,
          selectedPackIds,
          userId: user.id
        }
      });

      if (error) {
        console.error('Stripe session error:', error);
        throw new Error(error.message || 'Erro ao criar sessão de pagamento');
      }

      if (!data || !data.url) {
        throw new Error('URL de checkout não recebida');
      }

      console.log('Stripe session created, redirecting to:', data.url);
      
      // Redirecionar para o Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no Pagamento",
        description: error instanceof Error ? error.message : "Erro desconhecido ao processar pagamento",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const paymentInfo = getPaymentInfo();
  const IconComponent = paymentInfo.icon;
  const finalPrice = totalPrice - discountAmount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border-noir-medium max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-case-white flex items-center gap-2">
              <IconComponent className="h-6 w-6 text-case-red" />
              Finalizar Compra
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
          {totalPrice > 0 && (
            <Card className="bg-noir-medium border-noir-light">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-case-white/80">Subtotal:</span>
                    <span className="text-case-white">R$ {totalPrice.toFixed(2)}</span>
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
          )}

          {/* Opções de Pagamento */}
          <div className="space-y-4">
            <h3 className="text-case-white font-semibold">Escolha a forma de pagamento:</h3>
            
            <Button
              onClick={handleStripePayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 h-auto"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <CreditCard className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Processando...' : 'Pagar com Cartão (Stripe)'}
            </Button>

            <div className="text-center">
              <Badge variant="secondary" className="bg-green-600 text-white">
                Pagamento Seguro SSL
              </Badge>
            </div>
          </div>

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
