import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Button from '../../ui/Button';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Experience } from '../../../types';
import { formatDate } from '../../../utils/dataUtils';

const ExperienceForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { experience } = portfolioData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const emptyExperience: Experience = {
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: '',
    achievements: []
  };
  
  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [newAchievement, setNewAchievement] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: checked,
      endDate: checked ? '' : prev.endDate
    }));
  };
  
  const handleAddAchievement = () => {
    if (newAchievement.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement.trim()]
    }));
    
    setNewAchievement('');
  };
  
  const handleRemoveAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };
  
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(experience[index]);
  };
  
  const handleDelete = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    updateSection('experience', updatedExperience);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedExperience = [...experience];
    
    if (isEditing && editIndex !== null) {
      updatedExperience[editIndex] = formData;
    } else {
      updatedExperience.push({
        ...formData,
        id: uuidv4()
      });
    }
    
    updateSection('experience', updatedExperience);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData(emptyExperience);
    setNewAchievement('');
    setIsEditing(false);
    setEditIndex(null);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      
      <div className="space-y-6">
        {/* List of existing experience entries */}
        {experience.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Experience History</h3>
              
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div 
                    key={exp.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {exp.company}, {exp.location}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
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
        
        {/* Form for adding/editing experience */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Edit Experience' : 'Add Experience'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company or Organization Name"
                fullWidth
                required
              />
              
              <Input
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Your Job Title"
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                
                <div className="space-y-2">
                  <Input
                    label="End Date"
                    name="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.current}
                    fullWidth
                    required={!formData.current}
                  />
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="current"
                      name="current"
                      checked={formData.current}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="current" className="text-sm text-gray-700 dark:text-gray-300">
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
              
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                fullWidth
              />
              
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your role, responsibilities, etc."
                rows={3}
                fullWidth
              />
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Achievements
                </label>
                
                <div className="flex space-x-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add an achievement"
                    fullWidth
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddAchievement}
                    icon={<Plus size={16} />}
                  >
                    Add
                  </Button>
                </div>
                
                {formData.achievements.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {formData.achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {achievement}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          icon={<X size={16} />}
                          onClick={() => handleRemoveAchievement(index)}
                          className="text-red-500 hover:text-red-700"
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
                  {isEditing ? 'Update' : 'Add Experience'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceForm;