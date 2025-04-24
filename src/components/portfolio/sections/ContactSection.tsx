import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';

const ContactSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { contact } = portfolioData;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Your message has been sent! I will get back to you soon.'
    });
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-950/30 dark:to-accent-950/30 rounded-3xl -z-10 blur-3xl opacity-50"></div>
      
      <h2 className="text-4xl font-bold mb-12 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-accent-600 dark:from-secondary-400 dark:to-accent-400">
        <Mail className="mr-3 h-8 w-8" /> Contact Me
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Card */}
        <Card className="overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              {contact.email && (
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                    <a 
                      href={`tel:${contact.phone}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {contact.address && (
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {contact.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Form Card */}
        {contact.formEnabled && (
          <Card className="overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
                
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                
                <TextArea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  fullWidth
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  icon={<Send size={18} />}
                  isLoading={formStatus.submitted && !formStatus.success}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
                
                {formStatus.submitted && formStatus.success && (
                  <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg animate-fade-in">
                    {formStatus.message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ContactSection;