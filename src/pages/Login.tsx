
import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { t } from '../data/translations';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email) {
      setError(t('auth.emailRequired'));
      setLoading(false);
      return;
    }
    if (!formData.password) {
      setError(t('auth.passwordRequired'));
      setLoading(false);
      return;
    }
    if (!isLogin && !formData.name) {
      setError(t('auth.nameRequired'));
      setLoading(false);
      return;
    }

    try {
      // Simulate authentication - in real app this would be API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isLogin) {
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === formData.email);
        
        if (!user || user.password !== formData.password) {
          setError(t('auth.loginError'));
          setLoading(false);
          return;
        }

        onLogin(user);
      } else {
        // Create new user
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.email === formData.email);
        
        if (existingUser) {
          setError('Usuário já existe');
          setLoading(false);
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          password: formData.password,
          name: formData.name
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        onLogin(newUser);
      }

      navigate('/home');
    } catch (err) {
      setError(isLogin ? t('auth.loginError') : t('auth.signupError'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-noir-dark border-noir-medium p-8">
        <div className="text-center mb-8">
          <h1 className="font-anton text-3xl text-case-red mb-2">
            {isLogin ? t('auth.login') : t('auth.signup')}
          </h1>
          <p className="text-case-white/60">
            {isLogin ? 'Entre na sua conta' : 'Crie uma nova conta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="text-case-white">
                {t('auth.name')}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 bg-noir-medium border-noir-light text-case-white focus:border-case-red"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-case-white">
              {t('auth.email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="mt-1 bg-noir-medium border-noir-light text-case-white focus:border-case-red"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-case-white">
              {t('auth.password')}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="mt-1 bg-noir-medium border-noir-light text-case-white focus:border-case-red"
              placeholder="Sua senha"
            />
          </div>

          {error && (
            <div className="text-case-red text-sm text-center bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-case-red hover:bg-red-600 text-white font-bold py-3 rounded-xl"
          >
            {loading ? t('common.loading') : (isLogin ? t('auth.loginButton') : t('auth.signupButton'))}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-case-red hover:underline text-sm"
          >
            {isLogin ? t('auth.switchToSignup') : t('auth.switchToLogin')}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
