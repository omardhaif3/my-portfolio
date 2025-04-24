import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { SketchPicker } from 'react-color';
import { Moon, Sun } from 'lucide-react';

const ThemeForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { theme } = portfolioData;
  
  const [formData, setFormData] = useState({ ...theme });
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleColorChange = (color: any, colorType: string) => {
    setFormData(prev => ({ ...prev, [colorType]: color.hex }));
  };
  
  const handleToggleDarkMode = () => {
    setFormData(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('theme', formData);
  };
  
  const fontOptions = [
    {
      value: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      label: 'System Default'
    },
    { value: 'ui-sans-serif, system-ui, sans-serif', label: 'Sans Serif' },
    { value: 'ui-serif, Georgia, serif', label: 'Serif' },
    { value: 'ui-monospace, SFMono-Regular, Menlo, monospace', label: 'Monospace' },
    { value: 'Poppins, sans-serif', label: 'Poppins' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
    { value: 'Lato, sans-serif', label: 'Lato' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' }
  ];
  
  const colorPickerStyle = {
    position: 'absolute',
    zIndex: 10,
    top: '40px',
    right: 0
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Colors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Primary Color */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Color
                </label>
                <div className="relative">
                  <div
                    className="w-full h-10 rounded-md cursor-pointer flex items-center justify-center border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: formData.primaryColor }}
                    onClick={() => setActiveColorPicker(activeColorPicker === 'primaryColor' ? null : 'primaryColor')}
                  >
                    <span className={`text-sm ${getContrastYIQ(formData.primaryColor) === 'black' ? 'text-black' : 'text-white'}`}>
                      {formData.primaryColor}
                    </span>
                  </div>
                  {activeColorPicker === 'primaryColor' && (
                    <div style={colorPickerStyle as React.CSSProperties}>
                      <SketchPicker
                        color={formData.primaryColor}
                        onChange={(color) => handleColorChange(color, 'primaryColor')}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Secondary Color */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secondary Color
                </label>
                <div className="relative">
                  <div
                    className="w-full h-10 rounded-md cursor-pointer flex items-center justify-center border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: formData.secondaryColor }}
                    onClick={() => setActiveColorPicker(activeColorPicker === 'secondaryColor' ? null : 'secondaryColor')}
                  >
                    <span className={`text-sm ${getContrastYIQ(formData.secondaryColor) === 'black' ? 'text-black' : 'text-white'}`}>
                      {formData.secondaryColor}
                    </span>
                  </div>
                  {activeColorPicker === 'secondaryColor' && (
                    <div style={colorPickerStyle as React.CSSProperties}>
                      <SketchPicker
                        color={formData.secondaryColor}
                        onChange={(color) => handleColorChange(color, 'secondaryColor')}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Accent Color */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Accent Color
                </label>
                <div className="relative">
                  <div
                    className="w-full h-10 rounded-md cursor-pointer flex items-center justify-center border border-gray-300 dark:border-gray-700"
                    style={{ backgroundColor: formData.accentColor }}
                    onClick={() => setActiveColorPicker(activeColorPicker === 'accentColor' ? null : 'accentColor')}
                  >
                    <span className={`text-sm ${getContrastYIQ(formData.accentColor) === 'black' ? 'text-black' : 'text-white'}`}>
                      {formData.accentColor}
                    </span>
                  </div>
                  {activeColorPicker === 'accentColor' && (
                    <div style={colorPickerStyle as React.CSSProperties}>
                      <SketchPicker
                        color={formData.accentColor}
                        onChange={(color) => handleColorChange(color, 'accentColor')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Typography & Theme</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Font Family
                </label>
                <select
                  name="fontFamily"
                  value={formData.fontFamily}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Direction
                </label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={formData.direction === 'ltr' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, direction: 'ltr' }))}
                  >
                    Left to Right (LTR)
                  </Button>
                  <Button
                    type="button"
                    variant={formData.direction === 'rtl' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, direction: 'rtl' }))}
                  >
                    Right to Left (RTL)
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme Mode
                </label>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={!formData.darkMode ? 'primary' : 'outline'}
                    size="sm"
                    icon={<Sun size={16} />}
                    onClick={() => !formData.darkMode || handleToggleDarkMode()}
                  >
                    Light Mode
                  </Button>
                  <Button
                    type="button"
                    variant={formData.darkMode ? 'primary' : 'outline'}
                    size="sm"
                    icon={<Moon size={16} />}
                    onClick={() => formData.darkMode || handleToggleDarkMode()}
                  >
                    Dark Mode
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

const getContrastYIQ = (hexcolor: string) => {
  if (!hexcolor || !hexcolor.startsWith('#')) {
    return 'white';
  }

  hexcolor = hexcolor.slice(1);
  
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  return (yiq >= 128) ? 'black' : 'white';
};

export default ThemeForm;