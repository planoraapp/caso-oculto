
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import SiteFooter from '../components/SiteFooter';

const Login: React.FC = () => {
  const { signIn, signUp, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive'
      });
      return false;
    }

    if (!password.trim() || password.length < 6) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive'
      });
      return false;
    }

    if (!isLogin && !name.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira seu nome.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          throw error;
        }
        
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta!',
        });
      } else {
        const { error } = await signUp(email, password, name);
        
        if (error) {
          throw error;
        }
        
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Verifique seu email para confirmar a conta antes de fazer login.',
        });
        
        // Switch to login mode after successful signup
        setIsLogin(true);
        setPassword('');
        setName('');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      let errorMessage = 'Erro inesperado. Tente novamente.';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'Este email já está registrado. Faça login ou confirme seu email.';
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.message?.includes('Unable to validate email address')) {
        errorMessage = 'Email inválido.';
      } else if (error.message?.includes('confirme seu email')) {
        errorMessage = error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      console.log('Iniciando processo de login com Google...');
      
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('Erro no login com Google:', error);
        
        let errorMessage = 'Erro ao fazer login com Google. Tente novamente.';
        
        if (error.message?.includes('Provider not found')) {
          errorMessage = 'Login com Google não está configurado. Contate o suporte.';
        } else if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Credenciais inválidas. Tente novamente.';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast({
          title: 'Erro no Login',
          description: errorMessage,
          variant: 'destructive'
        });
      } else {
        console.log('Redirecionando para Google OAuth...');
        toast({
          title: 'Redirecionando...',
          description: 'Você será redirecionado para o Google.',
        });
      }
    } catch (error: any) {
      console.error('Erro inesperado no login com Google:', error);
      toast({
        title: 'Erro Inesperado',
        description: 'Ocorreu um erro inesperado. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex items-center justify-center py-12 px-4 flex-1">
        <Card className="w-full max-w-md bg-noir-dark border-noir-medium p-8">
          <div className="text-center mb-8">
            <h2 className="font-anton text-3xl text-case-white mb-2">
              {isLogin ? 'Acesse sua conta' : 'Criar conta'}
            </h2>
            <p className="text-case-white/80">
              {isLogin ? 'Entre para acessar seus mistérios' : 'Registre-se para começar a desvendar casos'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-case-white flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-noir-medium border-noir-light text-case-white mt-1"
                  required={!isLogin}
                  disabled={isSubmitting || isGoogleLoading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-case-white flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-noir-medium border-noir-light text-case-white mt-1"
                required
                disabled={isSubmitting || isGoogleLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-case-white flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="bg-noir-medium border-noir-light text-case-white mt-1"
                required
                minLength={6}
                disabled={isSubmitting || isGoogleLoading}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || isGoogleLoading}
              className="w-full bg-case-red hover:bg-red-600 text-white"
            >
              {isSubmitting ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>
          </form>

          {/* Divisor */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-case-white/60 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Botão Google */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isGoogleLoading}
            variant="outline"
            className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-400"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isGoogleLoading ? 'Redirecionando...' : 'Continuar com Google'}
          </Button>

          <div className="mt-6 space-y-4 text-center">
            {isLogin && (
              <Button
                variant="link"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-case-white/60 hover:text-case-white text-sm"
                disabled={isSubmitting || isGoogleLoading}
              >
                Esqueceu sua senha?
              </Button>
            )}
            
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-case-red hover:text-red-400"
              disabled={isSubmitting || isGoogleLoading}
            >
              {isLogin ? 'Não tem uma conta? Registe-se' : 'Já tem uma conta? Entre'}
            </Button>
          </div>
        </Card>

        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Login;
