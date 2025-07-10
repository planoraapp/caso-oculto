
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { LogIn, LogOut, User, Library, Package, Settings, Menu, X } from 'lucide-react';
import NeonLogo from './NeonLogo';

interface NavigationProps {
  user: any;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout, isAdmin }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-noir-black/95 backdrop-blur-sm border-b border-noir-medium sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <NeonLogo />
            </Link>

            {/* Desktop Navigation */}
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
              <Link 
                to="/terms" 
                className={`text-case-white hover:text-case-red transition-colors ${
                  isActive('/terms') ? 'text-case-red' : ''
                }`}
              >
                Termos
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

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/account">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-case-white hover:text-case-red hover:bg-noir-medium"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Conta
                    </Button>
                  </Link>
                  
                  {isAdmin && (
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-case-white hover:text-case-red hover:bg-noir-medium"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMobileMenu}></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-noir-dark border-l border-noir-medium">
            <div className="flex justify-between items-center p-4 border-b border-noir-medium">
              <h3 className="text-case-white font-bold">Menu</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileMenu}
                className="text-case-white hover:text-case-red"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <Link 
                to="/packs" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive('/packs') ? 'bg-case-red text-white' : 'text-case-white hover:bg-noir-medium'
                }`}
              >
                <Package className="h-5 w-5" />
                Packs
              </Link>
              
              <Link 
                to="/terms" 
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive('/terms') ? 'bg-case-red text-white' : 'text-case-white hover:bg-noir-medium'
                }`}
              >
                <Settings className="h-5 w-5" />
                Termos e Políticas
              </Link>
              
              {user && (
                <Link 
                  to="/library" 
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive('/library') ? 'bg-case-red text-white' : 'text-case-white hover:bg-noir-medium'
                  }`}
                >
                  <Library className="h-5 w-5" />
                  Biblioteca
                </Link>
              )}
              
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive('/account') ? 'bg-case-red text-white' : 'text-case-white hover:bg-noir-medium'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    Configurações
                  </Link>
                  
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive('/admin') ? 'bg-case-red text-white' : 'text-case-white hover:bg-noir-medium'
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                      Admin
                    </Link>
                  )}
                  
                  <button 
                    onClick={() => { onLogout(); closeMobileMenu(); }}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors text-case-white hover:bg-noir-medium w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Sair
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors text-case-white hover:bg-noir-medium"
                >
                  <LogIn className="h-5 w-5" />
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
