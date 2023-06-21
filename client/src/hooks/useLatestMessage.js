import { useQuery } from "@tanstack/react-query"
import { useCsurf } from "./useCsurf"
import { usePrivateApi } from "./usePrivateApi"

export const useLatestMessage = (chatRoom) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useQuery({
    queryKey: ["latestMessage", chatRoom._id],
    queryFn: async () => {
      const csurf = await getCsurf()
      const message = await privateApi.get(
        `/api/messages/latest/${chatRoom._id}`,
        {
          headers: { "X-CSRF-Token": csurf.data },
        }
      )
      return message.data
    },
    enabled: false,
  })
}
