import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('darkMode');
      return false;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkModeContext debe ser usado dentro de DarkModeProvider');
  }
  return context;
};