import { createContext, useEffect, useState } from "react"
import { useRefreshToken } from "../hooks/apis/auth/useRefreshToken"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(null)
  const [user, setUser] = useState(localStorage.user)
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
    <LogContext.Provider value={{ logState, setLogState, user, setUser }}>
      {children}
    </LogContext.Provider>
  )
}
