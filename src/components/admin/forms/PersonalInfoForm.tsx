import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Button from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { personalInfo } = portfolioData;
  
  const [formData, setFormData] = React.useState({ ...personalInfo });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };
  
  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };
  
  const removeSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('personalInfo', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Basic Details</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Professional Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
              
              <TextArea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                fullWidth
                rows={4}
              />
              
              <Input
                label="Avatar URL"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Social Links</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<Plus size={16} />}
                onClick={addSocialLink}
              >
                Add Link
              </Button>
            </div>
            
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex justify-between">
                  <h4 className="font-medium">Link #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  />
                </div>
                
                <Input
                  label="Platform"
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                  placeholder="github, linkedin, twitter, etc."
                  fullWidth
                />
                
                <Input
                  label="URL"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  placeholder="https://..."
                  fullWidth
                />
              </div>
            ))}
            
            {formData.socialLinks.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                No social links added yet. Click "Add Link" to add one.
              </p>
            )}
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

export default PersonalInfoForm;