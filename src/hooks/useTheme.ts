import { useState, useCallback } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode
  };
};