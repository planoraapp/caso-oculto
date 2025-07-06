
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Mock login
        const userData = {
          id: 'user_' + Date.now(),
          email,
          name: name || 'Detetive',
          isAdmin: email.startsWith('admin')
        };
        onLogin(userData);
        toast({
          title: 'Login realizado com sucesso!',
          description: `Bem-vindo, ${userData.name}!`,
        });
      } else {
        // Mock signup
        toast({
          title: 'Registo realizado com sucesso!',
          description: 'Por favor, verifique o seu e-mail para ativar a conta. (Funcionalidade simulada)',
        });
        setIsLogin(true);
        setName('');
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha na autenticação. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
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
              placeholder={isLogin ? "detetive@email.com" : "seu@email.com"}
              className="bg-noir-medium border-noir-light text-case-white mt-1"
              required
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
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-case-red hover:bg-red-600 text-white"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-case-red hover:text-red-400"
          >
            {isLogin ? 'Não tem uma conta? Registe-se' : 'Já tem uma conta? Entre'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
