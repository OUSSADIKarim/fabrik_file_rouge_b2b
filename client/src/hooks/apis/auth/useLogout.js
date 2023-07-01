import { useQuery } from "@tanstack/react-query"
import { logout } from "../../../api/api"
import useLogState from "../../contexts/useLogState"
import useAccessTokenState from "../../contexts/useAccessTokenState"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const { setLogState } = useLogState()
  const { setAccessToken } = useAccessTokenState()
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
      localStorage.removeItem("user")
      navigate("/")
    },
    enabled: false,
  })
}
