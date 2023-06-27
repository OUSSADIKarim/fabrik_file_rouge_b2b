import { useMutation } from "@tanstack/react-query"
import { usePrivateApi } from "../usePrivateApi"
import { useCsurf } from "../auth/useCsurf"

export const useCreatePost = (setNewPost) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async (post) => {
      const csurfToken = await getCsurf()
      const newPost = await privateApi.post(`api/posts`, post, {
        headers: {
          "X-CSRF-Token": csurfToken.data,
        },
        withCredentials: true,
      })
      return newPost?.data
    },
    onSuccess: (data) => {
      setNewPost(data)
    },
  })
}
