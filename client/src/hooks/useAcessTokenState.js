import { useContext } from "react"
import { AcessTokenContext } from "../context/AccessTokenProvider"

const useAccessTokenState = () => {
  return useContext(AcessTokenContext)
}

export default useAccessTokenState
