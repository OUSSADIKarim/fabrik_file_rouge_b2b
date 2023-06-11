import { createContext, useEffect, useState } from "react"
import { useRefreshToken } from "./../hooks/useRefreshToken"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(false)
  const { refetch } = useRefreshToken()
  useEffect(() => {
    const refreshTokenFunction = async () => {
      try {
        const refreshToken = await refetch()
        if (!refreshToken?.error) {
          setLogState(true)
        }
      } catch (error) {
        setLogState(false)
      }
    }
    refreshTokenFunction()
  }, [refetch])
  return (
    <LogContext.Provider value={{ logState, setLogState }}>
      {children}
    </LogContext.Provider>
  )
}
