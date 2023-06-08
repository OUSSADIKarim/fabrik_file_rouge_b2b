import { useQuery } from "@tanstack/react-query"
import { refreshToken } from "../api/api"
import useAccessTokenState from "./useAccessTokenState"

export const useRefreshToken = () => {
  const { setAccessToken } = useAccessTokenState()
  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const data = await refreshToken()
      setAccessToken(data)
      return data.accessToken
    },
    enabled: false,
  })
}
