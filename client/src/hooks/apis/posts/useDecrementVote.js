import { useMutation } from "@tanstack/react-query"
import { usePrivateApi } from "../usePrivateApi"
import { useCsurf } from "../auth/useCsurf"

export const useDecrementVotes = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()

  return useMutation({
    mutationFn: async (post) => {
      const csurfToken = await getCsurf()
      const data = await privateApi.put(
        `api/posts/${post}/decrementVote`,
        {},
        {
          headers: {
            "X-CSRF-Token": csurfToken.data,
          },
          withCredentials: true,
        }
      )
      return data.data
    },
  })
}
