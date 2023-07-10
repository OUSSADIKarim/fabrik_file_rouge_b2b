import { useMutation } from "@tanstack/react-query"
import { usePrivateApi } from "../usePrivateApi"
import { useCsurf } from "../auth/useCsurf"

export const useIncrementVotes = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()

  return useMutation({
    mutationFn: async (post) => {
      const csurfToken = await getCsurf()
      const data = await privateApi.put(
        `api/posts/${post}/incrementVote`,
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
