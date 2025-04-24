// Define TypeScript types for portfolio data structures

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
  formEnabled: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  contact: Contact;
  sectionOrder: string[];
  theme: ThemeSettings;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  darkMode: boolean;
  direction: 'ltr' | 'rtl';
}

export interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  visible: boolean;
}