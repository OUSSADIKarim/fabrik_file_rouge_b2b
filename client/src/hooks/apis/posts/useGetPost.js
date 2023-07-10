import { useQuery } from "@tanstack/react-query"
import { useCsurf } from "../auth/useCsurf"
import { usePrivateApi } from "../usePrivateApi"

export const useGetPost = (postId) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()

  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const csurfToken = await getCsurf()
      const post = await privateApi.get(`/api/posts/${postId}`, {
        headers: { "X-CSRF-Token": csurfToken.data },
      })
      return post?.data
    },
  })
}
