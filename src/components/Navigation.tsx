
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import NeonLogo from './NeonLogo';
import { Menu, User, ShoppingBag, Library, Home } from 'lucide-react';

interface NavigationProps {
  user: any;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Packs', path: '/packs', icon: ShoppingBag, requireAuth: true },
    { name: 'Biblioteca', path: '/library', icon: Library, requireAuth: true },
  ];

  const filteredNavItems = navItems.filter(item => !item.requireAuth || user);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <NeonLogo onClick={handleLogoClick} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-case-red bg-case-red/10' 
                      : 'text-case-white/80 hover:text-case-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/account">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-case-white hover:text-case-red hover:bg-gray-800"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Conta
                  </Button>
                </Link>
                <Button 
                  onClick={onLogout}
                  size="sm"
                  className="bg-case-red hover:bg-red-600 text-white"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  size="sm"
                  className="bg-case-red hover:bg-red-600 text-white"
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6 text-case-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-noir-dark border-noir-medium">
                <div className="flex flex-col space-y-4 mt-8">
                  {filteredNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                          isActive 
                            ? 'text-case-red bg-case-red/10' 
                            : 'text-case-white/80 hover:text-case-white hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                  {user ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-case-white/80 hover:text-case-white hover:bg-gray-800"
                      >
                        <User className="h-5 w-5" />
                        <span>Minha Conta</span>
                      </Link>
                      <Button 
                        onClick={() => {
                          onLogout();
                          setIsOpen(false);
                        }}
                        className="bg-case-red hover:bg-red-600 text-white mx-3"
                      >
                        Sair
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button 
                        className="bg-case-red hover:bg-red-600 text-white mx-3 w-full"
                      >
                        Entrar
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navigation);
