import React, { createContext, useState, useContext } from 'react';

type modeType = {
  background: string;
  text: string;
  headerBackground?: string;
  buttonBackground?: string;
};

type ThemeContextType = {
  isDarkMode: boolean;
  switchMode: () => void;
  mode: modeType;
};


const lightMode = {
  background: '#FFFFFF',
  text: '#000000',
  buttonBackground: '#DDDDDD',
};

const darkMode = {
  background: '#242424',
  text: '#FFFFFF',
  buttonBackground: '#444444',
};

const defaultContext: ThemeContextType = {
  isDarkMode: false,
  switchMode: () => {},
  mode: lightMode,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({ children }: any) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

  const switchMode = () => {
       setIsDarkMode(prev => !prev);
  }

const mode = isDarkMode ? darkMode : lightMode;

  return (
    <ThemeContext.Provider value={{ isDarkMode, switchMode, mode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;