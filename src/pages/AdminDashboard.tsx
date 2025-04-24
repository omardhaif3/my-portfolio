import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import PersonalInfoForm from '../components/admin/forms/PersonalInfoForm';
import EducationForm from '../components/admin/forms/EducationForm';
import ExperienceForm from '../components/admin/forms/ExperienceForm';
import ProjectsForm from '../components/admin/forms/ProjectsForm';
import SkillsForm from '../components/admin/forms/SkillsForm';
import ContactForm from '../components/admin/forms/ContactForm';
import ThemeForm from '../components/admin/forms/ThemeForm';
import SectionOrderForm from '../components/admin/forms/SectionOrderForm';
import Button from '../components/ui/Button';
import { LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <div className="flex">
          {/* Fixed Sidebar */}
          <div className="w-64 fixed left-0 top-16 bottom-0 overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <div className="p-4">
              <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64 p-6">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 animate-slide-up">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;