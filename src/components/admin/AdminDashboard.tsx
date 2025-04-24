import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import Sidebar from '../layout/Sidebar';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import ContactForm from './forms/ContactForm';
import ThemeForm from './forms/ThemeForm';
import SectionOrderForm from './forms/SectionOrderForm';

const AdminDashboard: React.FC = () => {
  const { isEditMode } = usePortfolio();
  const [activeSection, setActiveSection] = useState('personalInfo');

  // If not in edit mode, don't show the admin dashboard
  if (!isEditMode) {
    return null;
  }

  // Render the appropriate form based on the active section
  const renderForm = () => {
    switch (activeSection) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'skills':
        return <SkillsForm />;
      case 'contact':
        return <ContactForm />;
      case 'theme':
        return <ThemeForm />;
      case 'sectionOrder':
        return <SectionOrderForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="w-full lg:w-1/3 lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-6">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 animate-slide-up">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;