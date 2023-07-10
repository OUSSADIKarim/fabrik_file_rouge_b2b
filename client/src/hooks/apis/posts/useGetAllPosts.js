import { useInfiniteQuery } from "@tanstack/react-query"
import { usePrivateApi } from "../usePrivateApi"
import { useCsurf } from "../auth/useCsurf"

export const useGetAllPosts = (filters) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()

  return useInfiniteQuery({
    queryKey: ["allPosts"],
    queryFn: async ({ pageParam = 0 }) => {
      const csurf = await getCsurf()
      const posts = await privateApi.get(
        `/api/posts?page=${pageParam}&sortBy=${filters.sortBy}&category=${filters.category}`,
        {
          headers: { "X-CSRF-Token": csurf.data },
        }
      )
      return posts.data
    },

    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length !== 0 ? pages?.length : 0
    },

    initialData: () => {
      return {
        pageParams: [0],
        pages: [],
      }
    },
    enabled: false,
  })
}
