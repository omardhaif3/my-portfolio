import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import Button from '../ui/Button';
import { 
  User, Briefcase, GraduationCap, FolderKanban, 
  BarChart3, Mail, ArrowDownToLine, ArrowUpFromLine, 
  Trash2, Settings, PaintBucket 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { resetToDefault, exportPortfolioData, importPortfolioData } = usePortfolio();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: <User size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'skills', label: 'Skills', icon: <BarChart3 size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'theme', label: 'Theme', icon: <PaintBucket size={18} /> },
  ];

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importPortfolioData(file);
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full lg:w-64">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Portfolio Sections</h2>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          icon={<ArrowDownToLine size={16} />}
          onClick={() => exportPortfolioData()}
        >
          Export Data
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          fullWidth
          icon={<ArrowUpFromLine size={16} />}
          onClick={handleImportClick}
        >
          Import Data
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
        
        <Button
          variant="danger"
          size="sm"
          fullWidth
          icon={<Trash2 size={16} />}
          onClick={() => {
            if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
              resetToDefault();
            }
          }}
        >
          Reset All
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;