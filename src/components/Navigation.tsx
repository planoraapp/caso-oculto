
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { t } from '../data/translations';
import { Button } from './ui/button';

interface NavigationProps {
  user: any;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinkClass = (path: string) => 
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive(path) 
        ? 'bg-case-red text-white font-medium' 
        : 'text-case-white hover:bg-gray-700/50 hover:text-case-red'
    }`;

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {user && (
              <>
                <Link to="/home" className={navLinkClass('/home')}>
                  {t('navigation.home')}
                </Link>
                <Link to="/packs" className={navLinkClass('/packs')}>
                  {t('navigation.packs')}
                </Link>
                <Link to="/library" className={navLinkClass('/library')}>
                  {t('navigation.library')}
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-case-white text-sm">
                  Olá, {user.name}
                </span>
                <Button 
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-case-red text-case-red hover:bg-case-red hover:text-white"
                >
                  {t('navigation.logout')}
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-case-red hover:bg-red-600 text-white"
                >
                  {t('navigation.login')}
                </Button>
              </Link>
            )}
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-case-white hover:text-case-red transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-2">
              {user && (
                <>
                  <Link 
                    to="/home" 
                    className={navLinkClass('/home')}
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.home')}
                  </Link>
                  <Link 
                    to="/packs" 
                    className={navLinkClass('/packs')}
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.packs')}
                  </Link>
                  <Link 
                    to="/library" 
                    className={navLinkClass('/library')}
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.library')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
