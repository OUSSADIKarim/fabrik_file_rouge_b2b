import { useQuery } from "@tanstack/react-query"
import { useCsurf } from "../auth/useCsurf"
import { usePrivateApi } from "../usePrivateApi"

export const useChatRooms = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const csurf = await getCsurf()
      const companies = await privateApi.get("/api/chatRooms", {
        headers: { "X-CSRF-Token": csurf.data },
      })
      return companies.data
    },
    enabled: false,
  })
}
