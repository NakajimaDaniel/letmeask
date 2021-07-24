import { createContext, ReactNode, useEffect, useState } from "react";

type themeContextType = {
  theme: string,
  setTheme: (theme: string) => void
}

type themeContextProviderProps = {
  children: ReactNode,
}

export const ThemeContext = createContext({} as themeContextType)

export function ThemeContextProvider(props: themeContextProviderProps) {

  const [theme, setTheme] = useState('light');

  const root = window.document.documentElement;

  const rawSetTheme = (rawTheme: string) => {

    const root = window.document.documentElement;

    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");

    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);

  };

  useEffect(() => {

    rawSetTheme(theme);

  }, [theme]);


  return (
    <ThemeContext.Provider value={{theme, setTheme}} >
      {props.children}
    </ThemeContext.Provider>
  )

}