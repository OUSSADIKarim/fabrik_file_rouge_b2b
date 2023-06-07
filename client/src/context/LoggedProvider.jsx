import { createContext, useState } from "react"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(false)
  return (
    <LogContext.Provider value={{ logState, setLogState }}>
      {children}
    </LogContext.Provider>
  )
}
