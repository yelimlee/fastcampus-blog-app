import { ReactNode, createContext, useState } from 'react';

// 1. context생성
const ThemeContext = createContext({
  theme: 'light',
  toggleMode: () => {},
});

interface ThemeProps {
  children: ReactNode;
}

// 2. provider 생성
export const ThemeContextProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light'
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
