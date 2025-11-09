import Cookies from 'universal-cookie'
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

  // context for data //
  const cookie = new Cookies()
  const apiurl = import.meta.env.VITE_API_URL

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  // fetching data
  const getData = async () => {
    const response = await fetch(`${apiurl}/posts/data`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${cookie.get('token')}`
      }
    })
    const res = await response.json();
    if (res.success) {
      setUser(res.data.user);
      setPosts(res.data.posts);
    }
    return res;
  }

  useEffect(()=> {
    getData();
  }, [])

  const value = {
    theme,
    darkTheme,
    lightTheme,
    getData,
    user,
    setUser,
    posts,
    setPosts
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useContexts = () => useContext(AppContext);
