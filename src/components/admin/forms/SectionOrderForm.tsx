import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Card, CardContent } from '../../ui/Card';
import Button from '../../ui/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  BarChart3, 
  Mail,
  GripVertical,
  Eye,
  EyeOff 
} from 'lucide-react';

interface SectionItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  visible: boolean;
}

const SectionOrderForm: React.FC = () => {
  const { portfolioData, updateSection } = usePortfolio();
  const { sectionOrder } = portfolioData;
  
  // Initialize sections with proper order and visibility
  const initialSections: SectionItem[] = [
    { id: 'about', title: 'About Me', icon: <User size={20} />, visible: sectionOrder.includes('about') },
    { id: 'experience', title: 'Experience', icon: <Briefcase size={20} />, visible: sectionOrder.includes('experience') },
    { id: 'education', title: 'Education', icon: <GraduationCap size={20} />, visible: sectionOrder.includes('education') },
    { id: 'projects', title: 'Projects', icon: <FolderKanban size={20} />, visible: sectionOrder.includes('projects') },
    { id: 'skills', title: 'Skills', icon: <BarChart3 size={20} />, visible: sectionOrder.includes('skills') },
    { id: 'contact', title: 'Contact', icon: <Mail size={20} />, visible: sectionOrder.includes('contact') }
  ].sort((a, b) => {
    // Sort based on the current section order
    const aIndex = sectionOrder.indexOf(a.id);
    const bIndex = sectionOrder.indexOf(b.id);
    
    // If a section is not in the order array, put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    
    return aIndex - bIndex;
  });
  
  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
  };
  
  const toggleVisibility = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index].visible = !updatedSections[index].visible;
    setSections(updatedSections);
  };
  
  const handleSave = () => {
    // Generate new section order based on visibility and order
    const newSectionOrder = sections
      .filter(section => section.visible)
      .map(section => section.id);
    
    updateSection('sectionOrder', newSectionOrder);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Section Order & Visibility</h2>
      
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop sections to reorder them, or toggle visibility to show/hide sections.
          </p>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md ${
                            !section.visible ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              {...provided.dragHandleProps}
                              className="text-gray-400 mr-3 cursor-grab"
                            >
                              <GripVertical size={20} />
                            </div>
                            
                            <div className="flex items-center">
                              <span className="mr-3 text-gray-700 dark:text-gray-300">
                                {section.icon}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {section.title}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon={section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                            onClick={() => toggleVisibility(index)}
                            className={section.visible ? 'text-green-600' : 'text-gray-400'}
                          >
                            {section.visible ? 'Visible' : 'Hidden'}
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionOrderForm;