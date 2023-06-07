import { useContext } from "react"
import { LogContext } from "./../context/LoggedProvider"

const useLog = () => {
  return useContext(LogContext)
}

export default useLog
