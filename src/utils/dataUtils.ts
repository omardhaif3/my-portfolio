import { PortfolioData } from '../types';

// Save portfolio data to localStorage
export const savePortfolioData = (data: PortfolioData): void => {
  localStorage.setItem('portfolioData', JSON.stringify(data));
};

// Load portfolio data from localStorage
export const loadPortfolioData = (): PortfolioData | null => {
  const savedData = localStorage.getItem('portfolioData');
  return savedData ? JSON.parse(savedData) : null;
};

// Export portfolio data as JSON file
export const exportPortfolioData = (data: PortfolioData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportFileDefaultName = 'portfolio-data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Import portfolio data from JSON file
export const importPortfolioData = (file: File): Promise<PortfolioData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const data = JSON.parse(result) as PortfolioData;
          resolve(data);
        } else {
          reject(new Error('Failed to read file'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

// Helper function to format dates
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

// Get contrast color (black or white) based on background color
export const getContrastColor = (hexColor: string): string => {
  // Default to white if no color provided
  if (!hexColor || !hexColor.startsWith('#')) {
    return 'white';
  }

  // Remove the # from the hex color
  hexColor = hexColor.slice(1);
  
  // Convert to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate YIQ value (brightness)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Return 'black' for light colors, 'white' for dark colors
  return (yiq >= 128) ? 'black' : 'white';
};