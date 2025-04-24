import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { MoonIcon, SunIcon, Palette, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { theme } = portfolioData;
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const toggleDarkMode = () => {
    updateSection('theme', {
      ...theme,
      darkMode: !theme.darkMode
    });
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Palette className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Portfolio Builder</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            icon={theme.darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            aria-label={theme.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          />
          
          {!isAdminRoute && isAuthenticated && (
            <Link to="/admin">
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings className="h-5 w-5" />}
              >
                Admin
              </Button>
            </Link>
          )}
          
          {!isAuthenticated && !isAdminRoute && (
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings className="h-5 w-5" />}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;