import { useMutation } from "@tanstack/react-query"
import { usePrivateApi } from "./usePrivateApi"
import { useCsurf } from "./useCsurf"

export const useSendMessage = (message) => {
  const privateApi = usePrivateApi()
  const { refresh: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async () => {
      const csurfToken = await getCsurf()
      const newMessage = await privateApi.post(
        `/messages/${message.chatRoomId}`,
        message,
        {
          headers: { "X-CSRF-Token": csurfToken },
        }
      )
      return newMessage
    },
  })
}
