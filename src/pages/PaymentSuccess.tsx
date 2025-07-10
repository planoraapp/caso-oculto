
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('ID da sessão não encontrado');
        setLoading(false);
        return;
      }

      try {
        // Buscar dados da sessão de pagamento
        const { data: session, error: sessionError } = await supabase
          .from('payment_sessions')
          .select('*')
          .eq('stripe_session_id', sessionId)
          .single();

        if (sessionError || !session) {
          throw new Error('Sessão de pagamento não encontrada');
        }

        setPaymentData(session);
      } catch (err) {
        console.error('Error verifying payment:', err);
        setError(err instanceof Error ? err.message : 'Erro ao verificar pagamento');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const getPaymentTypeDisplay = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Pack Individual';
      case 'combo':
        return 'Combo de 5 Packs';
      case 'complete':
        return 'Acesso Total';
      default:
        return 'Compra';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-case-red mx-auto mb-4"></div>
          <p className="text-case-white">Verificando seu pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-noir-dark border-red-500 max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-red-500 flex items-center justify-center gap-2">
              <Package className="h-6 w-6" />
              Erro na Verificação
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-case-white">{error}</p>
            <Link to="/packs">
              <Button className="bg-case-red hover:bg-red-600 text-white">
                Voltar aos Packs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-noir-dark border-green-500">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-case-white">
                Pagamento Realizado com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-case-white/80 mb-4">
                  Seu pagamento foi processado e o acesso foi liberado automaticamente.
                </p>
                
                {paymentData && (
                  <div className="bg-noir-medium rounded-lg p-4 mb-6">
                    <h3 className="text-case-white font-semibold mb-2">Detalhes da Compra:</h3>
                    <p className="text-case-white/80">
                      <strong>Produto:</strong> {getPaymentTypeDisplay(paymentData.payment_type)}
                    </p>
                    <p className="text-case-white/80">
                      <strong>Status:</strong> <span className="text-green-500">Aprovado</span>
                    </p>
                    <p className="text-case-white/80 text-sm mt-2">
                      <strong>ID da Transação:</strong> {sessionId}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Link to="/library" className="block">
                    <Button className="w-full bg-case-red hover:bg-red-600 text-white">
                      <Package className="h-4 w-4 mr-2" />
                      Acessar Minha Biblioteca
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <Link to="/" className="block">
                    <Button variant="outline" className="w-full border-case-white text-case-white hover:bg-noir-medium">
                      <Home className="h-4 w-4 mr-2" />
                      Voltar ao Início
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="border-t border-noir-medium pt-6">
                <h4 className="text-case-white font-semibold mb-3">Próximos Passos:</h4>
                <ul className="text-case-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Acesse sua biblioteca para começar a jogar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Seu progresso será salvo automaticamente
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Em caso de dúvidas, entre em contato conosco
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
