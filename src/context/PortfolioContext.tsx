import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData } from '../types';
import { defaultPortfolioData } from '../data/defaultData';
import { loadPortfolioData, savePortfolioData } from '../utils/dataUtils';

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: PortfolioData) => void;
  updateSection: <K extends keyof PortfolioData>(
    section: K,
    data: PortfolioData[K]
  ) => void;
  resetToDefault: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Load saved data on initial render
  useEffect(() => {
    const savedData = loadPortfolioData();
    if (savedData) {
      setPortfolioData(savedData);
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    savePortfolioData(portfolioData);
  }, [portfolioData]);

  const updatePortfolioData = (data: PortfolioData) => {
    setPortfolioData(data);
  };

  const updateSection = <K extends keyof PortfolioData>(
    section: K,
    data: PortfolioData[K]
  ) => {
    setPortfolioData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const resetToDefault = () => {
    setPortfolioData(defaultPortfolioData);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updatePortfolioData,
        updateSection,
        resetToDefault,
        isEditMode,
        toggleEditMode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};