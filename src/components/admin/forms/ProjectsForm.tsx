import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Button from '../../ui/Button';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../../../types';

const ProjectsForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { projects } = portfolioData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const emptyProject: Project = {
    id: '',
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    featured: false
  };
  
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [newTech, setNewTech] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleAddTechnology = () => {
    if (newTech.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, newTech.trim()]
    }));
    
    setNewTech('');
  };
  
  const handleRemoveTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };
  
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(projects[index]);
  };
  
  const handleDelete = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    updateSection('projects', updatedProjects);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProjects = [...projects];
    
    if (isEditing && editIndex !== null) {
      updatedProjects[editIndex] = formData;
    } else {
      updatedProjects.push({
        ...formData,
        id: uuidv4()
      });
    }
    
    updateSection('projects', updatedProjects);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData(emptyProject);
    setNewTech('');
    setIsEditing(false);
    setEditIndex(null);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      
      <div className="space-y-6">
        {/* List of existing projects */}
        {projects.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">My Projects</h3>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          {project.featured && (
                            <span className="ml-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          {project.technologies.join(', ')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={<Edit size={16} />}
                          onClick={() => handleEdit(index)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 size={16} />}
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Form for adding/editing projects */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Edit Project' : 'Add Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Name of your project"
                fullWidth
                required
              />
              
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what the project does and your role in it"
                rows={3}
                fullWidth
                required
              />
              
              <Input
                label="Project Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                fullWidth
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Live Demo URL"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  placeholder="https://your-project.com"
                  fullWidth
                />
                
                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  fullWidth
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
                  Feature this project
                </label>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Technologies Used
                </label>
                
                <div className="flex space-x-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add a technology"
                    fullWidth
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddTechnology}
                    icon={<Plus size={16} />}
                  >
                    Add
                  </Button>
                </div>
                
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.technologies.map((tech, index) => (
                      <div 
                        key={index}
                        className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 mr-1">
                          {tech}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={<X size={12} />}
                          onClick={() => handleRemoveTechnology(index)}
                          className="text-red-500 hover:text-red-700 h-5 w-5 p-0"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  icon={isEditing ? undefined : <Plus size={16} />}
                >
                  {isEditing ? 'Update' : 'Add Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectsForm;