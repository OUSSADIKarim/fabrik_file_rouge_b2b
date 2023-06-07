import { createContext, useState } from "react"

export const AcessTokenContext = createContext({})

export const AcessTokenProvider = ({ children }) => {
  const [acessToken, setAcessToken] = useState("")
  console.log({ acessToken })
  return (
    <AcessTokenContext.Provider value={{ acessToken, setAcessToken }}>
      {children}
    </AcessTokenContext.Provider>
  )
}
