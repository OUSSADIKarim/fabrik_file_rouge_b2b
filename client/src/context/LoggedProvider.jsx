import { createContext, useEffect, useState } from "react"
import { useRefreshToken } from "../hooks/apis/auth/useRefreshToken"
import useAccessTokenState from "../hooks/contexts/useAccessTokenState"

export const LogContext = createContext({})

export const LogProvider = ({ children }) => {
  const [logState, setLogState] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.user || "{}"))
  const { accessToken } = useAccessTokenState()
  const { refetch } = useRefreshToken()

  useEffect(() => {
    if (accessToken) {
      refetch()
    }

    if (user?.companyId) {
      setLogState(true)
    }
  }, [])
  return (
    <LogContext.Provider value={{ logState, setLogState, user, setUser }}>
      {children}
    </LogContext.Provider>
  )
}
