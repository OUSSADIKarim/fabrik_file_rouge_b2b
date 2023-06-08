import { useContext } from "react"
import { AccessTokenContext } from "../context/AccessTokenProvider"

const useAccessTokenState = () => {
  return useContext(AccessTokenContext)
}

export default useAccessTokenState
