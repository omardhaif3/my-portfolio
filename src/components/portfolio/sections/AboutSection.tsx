import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { User, MapPin, Mail, Phone } from 'lucide-react';
import SocialLinks from '../SocialLinks';

const AboutSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;

  return (
    <section id="about" className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 rounded-3xl -z-10 blur-3xl opacity-50"></div>
      
      <div className="relative">
        <h2 className="text-4xl font-bold mb-12 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
          <User className="mr-3 h-8 w-8" /> About Me
        </h2>
        
        <Card className="overflow-visible backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
              {/* Avatar column */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-48 h-48 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
                  />
                </div>
              </div>
              
              {/* Bio and contact info column */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {personalInfo.name}
                </h1>
                <h2 className="text-2xl text-primary-600 dark:text-primary-400 mb-6">
                  {personalInfo.title}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {personalInfo.bio}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {personalInfo.location && (
                    <div className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400">
                      <MapPin size={20} className="mr-2" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  
                  {personalInfo.email && (
                    <div className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400">
                      <Mail size={20} className="mr-2" />
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  )}
                  
                  {personalInfo.phone && (
                    <div className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-400">
                      <Phone size={20} className="mr-2" />
                      <a href={`tel:${personalInfo.phone}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {personalInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <SocialLinks links={personalInfo.socialLinks} size={24} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;