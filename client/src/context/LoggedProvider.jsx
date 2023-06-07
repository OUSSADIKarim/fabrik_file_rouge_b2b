import { createContext, useState } from "react"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logged, setLogged] = useState()
  return (
    <LogContext.Provider value={{ logged, setLogged }}>
      {children}
    </LogContext.Provider>
  )
}
