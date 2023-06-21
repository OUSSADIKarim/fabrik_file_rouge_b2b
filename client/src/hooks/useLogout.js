import { useQuery } from "@tanstack/react-query"
import { logout } from "../api/api"
import useLogState from "./useLogState"
import useAccessTokenState from "./useAccessTokenState"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const { setLogState } = useLogState()
  const { setAccessToken } = useAccessTokenState()
  const [setErrorMessage] = useState("")
  const navigate = useNavigate()

  return useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const data = await logout()
      return data
    },
    onSuccess: () => {
      setLogState(false)
      setAccessToken("")
      navigate("/")
    },
    onError: (err) => {
      setErrorMessage(err.response.data)
    },
    enabled: false,
  })
}
