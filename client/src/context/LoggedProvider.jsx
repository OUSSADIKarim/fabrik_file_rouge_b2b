import { createContext, useEffect, useState } from "react"
import { useRefreshToken } from "./../hooks/useRefreshToken"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(null)
  const { refetch } = useRefreshToken()
  useEffect(() => {
    const refreshTokenFunction = async () => {
      const refreshToken = await refetch()
      if (!refreshToken?.error) {
        setLogState(true)
      }
      if (refreshToken?.error) {
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
