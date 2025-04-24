import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { sectionOrder } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sectionNames: { [key: string]: string } = {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact'
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionOrder.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionOrder[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionOrder]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Height of the fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed right-4 top-20 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation menu */}
      <nav
        className={`
          fixed lg:fixed right-0 top-16 lg:top-1/2 lg:-translate-y-1/2 z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 lg:p-2 rounded-l-lg shadow-lg">
          <ul className="space-y-2">
            {sectionOrder.map((sectionId) => (
              <li key={sectionId}>
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className={`
                    w-full text-left px-4 py-2 rounded-md transition-colors
                    ${activeSection === sectionId
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {sectionNames[sectionId]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;