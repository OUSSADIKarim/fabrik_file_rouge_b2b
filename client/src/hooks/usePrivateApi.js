import { useEffect } from "react"
import { privateApi } from "../api/api"
import useAccessTokenState from "./useAccessTokenState"
import { useRefreshToken } from "./useRefreshToken"

export const usePrivateApi = () => {
  const { refetch: getNewAccessToken } = useRefreshToken()
  const { accessToken } = useAccessTokenState()
  useEffect(() => {
    const requestInterceptor = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseInterceptor = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await getNewAccessToken()
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken.data}`
          return privateApi(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      privateApi.interceptors.request.eject(requestInterceptor)
      privateApi.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken, getNewAccessToken])

  return privateApi
}
