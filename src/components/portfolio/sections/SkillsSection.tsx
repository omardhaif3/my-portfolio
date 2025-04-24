import React, { useMemo } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { BarChart3 } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { skills } = portfolioData;

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const categories: { [key: string]: typeof skills } = {};
    
    skills.forEach((skill) => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    
    // Sort skills by level within each category (highest first)
    Object.keys(categories).forEach((category) => {
      categories[category].sort((a, b) => b.level - a.level);
    });
    
    return categories;
  }, [skills]);

  if (skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/30 dark:to-accent-950/30 rounded-3xl -z-10 blur-3xl opacity-50"></div>
      
      <h2 className="text-4xl font-bold mb-12 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
        <BarChart3 className="mr-3 h-8 w-8" /> Skills
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <Card 
            key={category} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
          >
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category}
              </h3>
              
              <div className="space-y-6">
                {categorySkills.map((skill, index) => (
                  <div 
                    key={skill.id}
                    className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {skill.level}/5
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(skill.level / 5) * 100}%`,
                          opacity: 0.8 + (skill.level / 10)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;