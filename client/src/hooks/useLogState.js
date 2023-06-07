import { useContext } from "react"
import { LogContext } from "../context/LoggedProvider"

const useLogState = () => {
  return useContext(LogContext)
}

export default useLogState
