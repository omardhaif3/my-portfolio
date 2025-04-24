import React, { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { usePortfolio } from '../../context/PortfolioContext';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { portfolioData } = usePortfolio();
  const { primaryColor, darkMode, direction = 'ltr' } = portfolioData.theme;
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Dynamically set primary color CSS variable and direction
  React.useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.dir = direction;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [primaryColor, darkMode, direction]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      {isHomePage && <Navigation />}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;