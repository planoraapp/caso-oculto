
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        console.log('Session details:', {
          access_token: session?.access_token ? 'present' : 'missing',
          refresh_token: session?.refresh_token ? 'present' : 'missing',
          user_id: session?.user?.id,
          provider: session?.user?.app_metadata?.provider
        });
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin status when user changes
        if (session?.user) {
          // Verificar se o usuário está confirmado (exceto para login com Google)
          if (!session.user.email_confirmed_at && !session.user.app_metadata?.provider?.includes('google')) {
            console.log('User email not confirmed, signing out');
            await supabase.auth.signOut();
            return;
          }
          
          setTimeout(async () => {
            try {
              const { data: roles } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .single();
              
              setIsAdmin(!!roles);
            } catch (error) {
              console.log('Not an admin user');
              setIsAdmin(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    // Usar o domínio atual para o redirect
    const currentDomain = window.location.origin;
    const redirectUrl = `${currentDomain}/email-confirmed`;
    
    console.log('SignUp redirect URL:', redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name || email
        }
      }
    });
    
    // Verificar se o usuário já existe
    if (error && error.message.includes('User already registered')) {
      return { 
        error: new Error('Este email já está registrado. Faça login ou confirme seu email se ainda não o fez.')
      };
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Verificar se o usuário confirmou o email (exceto para login com Google)
    if (data.user && !data.user.email_confirmed_at && !data.user.app_metadata?.provider?.includes('google')) {
      await supabase.auth.signOut();
      return { 
        error: new Error('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.')
      };
    }
    
    return { error };
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Iniciando login com Google...');
      console.log('URL atual:', window.location.origin);
      
      const redirectUrl = `${window.location.origin}/`;
      console.log('Redirect URL configurado:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      console.log('Resposta do Supabase OAuth:', { data, error });
      
      if (error) {
        console.error('Erro detalhado do Google OAuth:', error);
        
        // Tratar diferentes tipos de erro
        if (error.message.includes('Invalid login credentials')) {
          return { 
            error: new Error('Credenciais inválidas. Tente novamente.')
          };
        }
        
        if (error.message.includes('Email not confirmed')) {
          return { 
            error: new Error('Email não confirmado. Verifique sua caixa de entrada.')
          };
        }
        
        if (error.message.includes('Provider not found')) {
          return { 
            error: new Error('Provedor Google não configurado. Contate o administrador.')
          };
        }
        
        return { 
          error: new Error(`Erro no login com Google: ${error.message}`)
        };
      }
      
      console.log('Login com Google iniciado com sucesso');
      return { error: null };
      
    } catch (error: any) {
      console.error('Erro inesperado no login com Google:', error);
      return { 
        error: new Error('Erro inesperado durante o login. Tente novamente.')
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
