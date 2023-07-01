import { useQuery } from "@tanstack/react-query"
import { refreshToken } from "../../../api/api"
import useAccessTokenState from "../../contexts/useAccessTokenState"

export const useRefreshToken = () => {
  const { setAccessToken } = useAccessTokenState()

  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const data = await refreshToken()
      return data?.accessToken
    },
    onSuccess: (data) => {
      setAccessToken(data)
    },
    enabled: false,
  })
}
