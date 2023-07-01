import { createContext, useEffect, useState } from "react"
import { useRefreshToken } from "../hooks/apis/auth/useRefreshToken"
import useAccessTokenState from "../hooks/contexts/useAccessTokenState"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(null)
  const [user, setUser] = useState(localStorage.user)
  const { accessToken } = useAccessTokenState()
  const { data, refetch } = useRefreshToken()
  useEffect(() => {
    if (accessToken) {
      refetch()
    }
  }, [])
  return (
    <LogContext.Provider value={{ logState, setLogState, user, setUser }}>
      {children}
    </LogContext.Provider>
  )
}
