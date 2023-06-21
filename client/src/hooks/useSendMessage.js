import { useMutation } from "@tanstack/react-query"
import { usePrivateApi } from "./usePrivateApi"
import { useCsurf } from "./useCsurf"

export const useSendMessage = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async (message) => {
      console.log(message.body)
      const messageContent = { message: message.body }
      const csurfToken = await getCsurf()
      const newMessage = await privateApi.post(
        `api/messages/${message.recieverId}`,
        messageContent,
        {
          headers: {
            "X-CSRF-Token": csurfToken.data,
          },
          withCredentials: true,
        }
      )

      return newMessage
    },
  })
}
