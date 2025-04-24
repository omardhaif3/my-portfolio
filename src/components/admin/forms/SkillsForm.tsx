import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Skill } from '../../../types';

const SkillsForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { skills } = portfolioData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const emptySkill: Skill = {
    id: '',
    name: '',
    level: 3,
    category: ''
  };
  
  const [formData, setFormData] = useState<Skill>(emptySkill);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'level' ? parseInt(value, 10) : value 
    }));
  };
  
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(skills[index]);
  };
  
  const handleDelete = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    updateSection('skills', updatedSkills);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedSkills = [...skills];
    
    if (isEditing && editIndex !== null) {
      updatedSkills[editIndex] = formData;
    } else {
      updatedSkills.push({
        ...formData,
        id: uuidv4()
      });
    }
    
    updateSection('skills', updatedSkills);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData(emptySkill);
    setIsEditing(false);
    setEditIndex(null);
  };
  
  // Get unique categories from skills
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      
      <div className="space-y-6">
        {/* List of existing skills grouped by category */}
        {skills.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">My Skills</h3>
              
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {category}
                    </h4>
                    
                    <div className="space-y-2">
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill, index) => {
                          // Find the index in the original array
                          const originalIndex = skills.findIndex(s => s.id === skill.id);
                          
                          return (
                            <div 
                              key={skill.id}
                              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {skill.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {skill.level}/5
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
                                    style={{ width: `${(skill.level / 5) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 ml-4">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  icon={<Edit size={16} />}
                                  onClick={() => handleEdit(originalIndex)}
                                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  icon={<Trash2 size={16} />}
                                  onClick={() => handleDelete(originalIndex)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Form for adding/editing skills */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Edit Skill' : 'Add Skill'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Skill Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Photoshop"
                fullWidth
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Proficiency Level (1-5)
                </label>
                <input
                  type="range"
                  name="level"
                  min="1"
                  max="5"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-900"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="new">+ Add new category</option>
                  </select>
                </div>
              </div>
              
              {formData.category === 'new' && (
                <Input
                  label="New Category"
                  name="category"
                  value=""
                  onChange={handleChange}
                  placeholder="e.g., Frontend, Backend, Design"
                  fullWidth
                  required
                />
              )}
              
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
                  {isEditing ? 'Update' : 'Add Skill'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsForm;