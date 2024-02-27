import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setInnerTheme] = useState(
    localStorage.getItem('theme') || 'system',
  );

  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'system');
    document.body.classList.add(theme);
  }, [theme]);

  const setTheme = (themeName: string) => {
    setInnerTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  return setTheme;
};
