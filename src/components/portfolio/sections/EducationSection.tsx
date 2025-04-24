import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '../../../utils/dataUtils';

const EducationSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { education } = portfolioData;

  if (education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <GraduationCap className="mr-2" /> Education
      </h2>
      
      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {edu.degree} in {edu.field}
                  </h3>
                  <h4 className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                    {edu.institution}
                  </h4>
                  
                  <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center mr-4 mb-2">
                      <Calendar size={16} className="mr-1" />
                      <span>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    
                    {edu.location && (
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;