import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { Briefcase, Calendar, MapPin, Check } from 'lucide-react';
import { formatDate } from '../../../utils/dataUtils';

const ExperienceSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { experience } = portfolioData;

  if (experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-950/30 dark:to-primary-950/30 rounded-3xl -z-10 blur-3xl opacity-50"></div>
      
      <h2 className="text-4xl font-bold mb-12 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-primary-600 dark:from-secondary-400 dark:to-primary-400">
        <Briefcase className="mr-3 h-8 w-8" /> Work Experience
      </h2>
      
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <Card 
            key={exp.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
          >
            <CardContent className="p-8">
              <div className="relative">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {exp.position}
                  </h3>
                  <h4 className="text-xl text-primary-600 dark:text-primary-400 mb-4">
                    {exp.company}
                  </h4>
                  
                  <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-6 gap-4">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    
                    {exp.location && (
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Key Achievements
                      </h5>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <li 
                            key={i} 
                            className="flex items-start group"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300 mr-3 mt-1">
                              <Check size={14} />
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default ExperienceSection;