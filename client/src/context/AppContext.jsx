import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Context for theme
  const getInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    let newTheme;
    const root = document.documentElement; // to access the html element
    if (theme === "dark") newTheme = "dark";
    else newTheme = "light";
    root.setAttribute('data-theme', newTheme) // change the data-theme
    localStorage.setItem("theme", theme);
  }, [theme]);

  const darkTheme = () => setTheme('dark')
  const lightTheme = () => setTheme('light')

  return (
    <AppContext.Provider value={{ theme, darkTheme, lightTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => useContext(AppContext);
