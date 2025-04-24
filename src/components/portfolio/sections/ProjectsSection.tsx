import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import { FolderKanban, ExternalLink, Github } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { projects } = portfolioData;

  if (projects.length === 0) {
    return null;
  }

  // Filter featured projects first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="projects" className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-950/30 dark:to-primary-950/30 rounded-3xl -z-10 blur-3xl opacity-50"></div>
      
      <h2 className="text-4xl font-bold mb-12 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-accent-600 to-primary-600 dark:from-accent-400 dark:to-primary-400">
        <FolderKanban className="mr-3 h-8 w-8" /> Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedProjects.map((project, index) => (
          <Card 
            key={project.id} 
            className={`
              group overflow-hidden hover:shadow-xl transition-all duration-500 
              backdrop-blur-sm bg-white/80 dark:bg-gray-800/80
              ${project.featured ? 'ring-2 ring-primary-400 dark:ring-primary-600' : ''}
            `}
          >
            {project.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">
                {project.description}
              </p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex space-x-4">
                {project.projectUrl && (
                  <a 
                    href={project.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    <span>Live Demo</span>
                  </a>
                )}
                
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github size={18} className="mr-2" />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;