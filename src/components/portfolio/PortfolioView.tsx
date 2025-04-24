import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

const PortfolioView: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { sectionOrder } = portfolioData;

  // Mapping of section IDs to their components
  const sectionComponents: { [key: string]: React.ReactNode } = {
    about: <AboutSection />,
    education: <EducationSection />,
    experience: <ExperienceSection />,
    projects: <ProjectsSection />,
    skills: <SkillsSection />,
    contact: <ContactSection />
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Render sections based on the order specified in portfolioData */}
        {sectionOrder.map((sectionId, index) => (
          <div 
            key={sectionId} 
            className={`
              mb-24 last:mb-0 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]
              ${index === 0 ? '' : 'scroll-mt-16'}
            `}
            style={{ animationDelay: `${index * 0.2}s` }}
            id={sectionId}
          >
            {sectionComponents[sectionId]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioView;