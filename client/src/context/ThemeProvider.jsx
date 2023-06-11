import { createContext, useEffect, useState } from "react"

export const ThemContext = createContext({})

export const ThemProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.theme)
  useEffect(() => {
    window.onload = () => {
      if (!theme) {
        const prefersColorSchemeIsDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
        prefersColorSchemeIsDark ? setTheme("dark") : setTheme("light")
      }
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else if (theme === "light") {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }

    localStorage.theme = theme
  }, [theme])

  return (
    <ThemContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemContext.Provider>
  )
}
