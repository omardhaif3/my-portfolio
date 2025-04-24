import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const ContactForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { contact } = portfolioData;
  
  const [formData, setFormData] = React.useState({ ...contact });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('contact', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
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
            
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="City, Country"
              fullWidth
            />
            
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="formEnabled"
                name="formEnabled"
                checked={formData.formEnabled}
                onChange={handleCheckboxChange}
                className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="formEnabled" className="text-sm text-gray-700 dark:text-gray-300">
                Enable contact form on portfolio
              </label>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ContactForm;