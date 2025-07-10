
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          description: 'Verifique seu email para confirmar a conta.',
        });
        
        // Switch to login mode after successful signup
        setIsLogin(true);
        setPassword('');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      let errorMessage = 'Erro inesperado. Tente novamente.';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'Este email já está registrado. Faça login.';
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.message?.includes('Unable to validate email address')) {
        errorMessage = 'Email inválido.';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-900">
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-case-red hover:bg-red-600 text-white"
          >
            {isSubmitting ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-case-red hover:text-red-400"
            disabled={isSubmitting}
          >
            {isLogin ? 'Não tem uma conta? Registe-se' : 'Já tem uma conta? Entre'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
