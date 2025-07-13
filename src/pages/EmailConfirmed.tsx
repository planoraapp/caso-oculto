
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

const EmailConfirmed: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Verificar se já temos um usuário logado (caso o token seja válido)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('Usuário já está logado:', session.user.email);
          setIsConfirmed(true);
          setIsLoading(false);
          return;
        }

        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        console.log('Verificando confirmação de email:', { token_hash, type });
        
        if (!token_hash || (type !== 'email' && type !== 'signup')) {
          setError('Link de confirmação inválido ou expirado.');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'email' | 'signup'
        });

        if (error) {
          console.error('Erro na confirmação:', error);
          setError('Erro ao confirmar email. O link pode ter expirado.');
        } else if (data?.user) {
          console.log('Email confirmado com sucesso:', data.user.email);
          setIsConfirmed(true);
        } else {
          setError('Erro inesperado na confirmação.');
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        setError('Erro inesperado. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="bg-noir-dark border-noir-medium shadow-2xl">
          <CardHeader className="text-center pb-4">
            {/* Logo do site */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-case-white text-2xl font-bold">
              {isLoading ? 'Verificando...' : 
               isConfirmed ? 'Email Confirmado!' : 
               'Erro na Confirmação'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLoading && (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-case-white/80">
                  Confirmando seu email...
                </p>
              </div>
            )}

            {!isLoading && isConfirmed && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-case-white text-lg font-medium">
                    Sua conta foi confirmada com sucesso!
                  </p>
                  <p className="text-case-white/80">
                    Agora você pode acessar todos os recursos da plataforma.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && error && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <AlertCircle className="h-16 w-16 text-case-red" />
                </div>
                <div className="space-y-2">
                  <p className="text-case-white text-lg font-medium">
                    Ops! Algo deu errado
                  </p>
                  <p className="text-case-white/80">
                    {error}
                  </p>
                  <p className="text-case-white/60 text-sm">
                    Se você já fez login antes, pode tentar acessar diretamente a plataforma.
                  </p>
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/packs')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-all duration-300"
              >
                {isConfirmed ? 'Acessar Packs' : 'Ir para Packs'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="w-full border-case-white/20 text-case-white hover:bg-case-white/10 py-3"
              >
                Fazer Login
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full text-case-white/80 hover:text-case-white hover:bg-case-white/5 py-2"
              >
                Voltar para Home
              </Button>
            </div>

            {/* Informação adicional */}
            <div className="text-center pt-4 border-t border-noir-light">
              <p className="text-case-white/60 text-sm">
                Problemas com a confirmação?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Tente fazer login
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailConfirmed;
