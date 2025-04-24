import { PortfolioData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Dhaif Allah Omar',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with a focus on creating beautiful, functional web applications.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'San Francisco, CA',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'twitter', url: 'https://twitter.com/' }
    ]
  },
  education: [
    {
      id: uuidv4(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      description: 'Focused on software engineering and artificial intelligence.',
      location: 'Berkeley, CA'
    }
  ],
  experience: [
    {
      id: uuidv4(),
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2020-06',
      endDate: '',
      current: true,
      description: 'Leading frontend development for enterprise applications.',
      location: 'San Francisco, CA',
      achievements: [
        'Redesigned company website increasing user engagement by 40%',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 5 junior developers'
      ]
    },
    {
      id: uuidv4(),
      company: 'Digital Solutions LLC',
      position: 'Junior Developer',
      startDate: '2018-06',
      endDate: '2020-06',
      current: false,
      description: 'Worked on various web development projects for clients.',
      location: 'Oakland, CA',
      achievements: [
        'Developed responsive websites for 10+ clients',
        'Implemented SEO best practices increasing client traffic by 25%'
      ]
    }
  ],
  projects: [
    {
      id: uuidv4(),
      title: 'E-commerce Platform',
      description: 'A fully featured e-commerce platform with payment processing and inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      projectUrl: 'https://project-demo.com',
      githubUrl: 'https://github.com/username/project',
      featured: true
    },
    {
      id: uuidv4(),
      title: 'Task Management App',
      description: 'A Kanban-style task management application for teams.',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      projectUrl: 'https://task-app-demo.com',
      githubUrl: 'https://github.com/username/task-app',
      featured: true
    }
  ],
  skills: [
    { id: uuidv4(), name: 'JavaScript', level: 5, category: 'Frontend' },
    { id: uuidv4(), name: 'React', level: 5, category: 'Frontend' },
    { id: uuidv4(), name: 'Node.js', level: 4, category: 'Backend' },
    { id: uuidv4(), name: 'TypeScript', level: 4, category: 'Frontend' },
    { id: uuidv4(), name: 'HTML/CSS', level: 5, category: 'Frontend' },
    { id: uuidv4(), name: 'MongoDB', level: 3, category: 'Database' },
    { id: uuidv4(), name: 'SQL', level: 3, category: 'Database' },
    { id: uuidv4(), name: 'Git', level: 4, category: 'Tools' }
  ],
  contact: {
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    address: 'San Francisco, CA',
    formEnabled: true
  },
  sectionOrder: ['about', 'experience', 'education', 'projects', 'skills', 'contact'],
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#0EA5E9',
    accentColor: '#8B5CF6',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    darkMode: false,
    direction: 'ltr'
  }
};