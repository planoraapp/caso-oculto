
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { LogIn, LogOut, User, Library, Package, Settings } from 'lucide-react';
import NeonLogo from './NeonLogo';

interface NavigationProps {
  user: any;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-noir-black/95 backdrop-blur-sm border-b border-noir-medium sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <NeonLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-case-white hover:text-case-red transition-colors ${
                isActive('/') ? 'text-case-red' : ''
              }`}
            >
              Início
            </Link>
            <Link 
              to="/packs" 
              className={`text-case-white hover:text-case-red transition-colors ${
                isActive('/packs') ? 'text-case-red' : ''
              }`}
            >
              Packs
            </Link>
            
            {user && (
              <Link 
                to="/library" 
                className={`text-case-white hover:text-case-red transition-colors flex items-center gap-2 ${
                  isActive('/library') ? 'text-case-red' : ''
                }`}
              >
                <Library className="h-4 w-4" />
                Biblioteca
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/account">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-case-white hover:text-case-red hover:bg-noir-medium"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </Link>
                
                {user.email === 'conectawebapps@outlook.com' && (
                  <Link to="/admin">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-case-white hover:text-case-red hover:bg-noir-medium"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  className="text-case-white hover:text-case-red hover:bg-noir-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-case-white hover:text-case-red hover:bg-noir-medium"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
