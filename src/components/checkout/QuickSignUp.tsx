
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';

interface QuickSignUpProps {
  onSuccess: () => void;
}

const QuickSignUp: React.FC<QuickSignUpProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
          // Tentar fazer login se o usuário já existe
          const loginResult = await signIn(email, password);
          if (loginResult.error) {
            if (loginResult.error.message.includes('confirme seu email')) {
              toast({
                title: "Email não confirmado",
                description: loginResult.error.message,
                variant: "destructive"
              });
            } else {
              toast({
                title: "Usuário já existe",
                description: "Este e-mail já está cadastrado. Verifique sua senha ou use a opção 'Esqueci minha senha'.",
                variant: "destructive"
              });
            }
          } else {
            toast({
              title: "Login realizado!",
              description: "Bem-vindo de volta!",
            });
            onSuccess();
          }
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu e-mail para confirmar a conta. Você pode fechar esta página e clicar no link de confirmação que chegará no seu email.",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-noir-medium border-noir-light mb-6">
      <CardHeader>
        <CardTitle className="text-case-white flex items-center gap-2">
          <User className="h-5 w-5 text-case-red" />
          Criar Conta para Continuar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-case-white">
              E-mail *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-case-white/60" />
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-noir-dark border-noir-light text-case-white"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-case-white">
              Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-case-white/60" />
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10 bg-noir-dark border-noir-light text-case-white"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-case-white">
              Confirmar Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-case-white/60" />
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10 bg-noir-dark border-noir-light text-case-white"
                placeholder="Repita sua senha"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email || !password || !confirmPassword}
            className="w-full bg-case-red hover:bg-red-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta e Continuar'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickSignUp;
