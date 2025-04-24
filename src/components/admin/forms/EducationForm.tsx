import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Button from '../../ui/Button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Education } from '../../../types';
import { formatDate } from '../../../utils/dataUtils';

const EducationForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { education } = portfolioData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const emptyEducation: Education = {
    id: '',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  };
  
  const [formData, setFormData] = useState<Education>(emptyEducation);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(education[index]);
  };
  
  const handleDelete = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    updateSection('education', updatedEducation);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEducation = [...education];
    
    if (isEditing && editIndex !== null) {
      updatedEducation[editIndex] = formData;
    } else {
      updatedEducation.push({
        ...formData,
        id: uuidv4()
      });
    }
    
    updateSection('education', updatedEducation);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData(emptyEducation);
    setIsEditing(false);
    setEditIndex(null);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      
      <div className="space-y-6">
        {/* List of existing education entries */}
        {education.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Education History</h3>
              
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div 
                    key={edu.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {edu.institution}, {edu.location}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
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
        
        {/* Form for adding/editing education */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Edit Education' : 'Add Education'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University or School Name"
                fullWidth
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor of Science"
                  fullWidth
                  required
                />
                
                <Input
                  label="Field of Study"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  fullWidth
                  required
                />
              </div>
              
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
                
                <Input
                  label="End Date (or Expected)"
                  name="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={handleChange}
                  fullWidth
                />
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
                placeholder="Describe your studies, achievements, etc."
                rows={3}
                fullWidth
              />
              
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
                  {isEditing ? 'Update' : 'Add Education'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationForm;