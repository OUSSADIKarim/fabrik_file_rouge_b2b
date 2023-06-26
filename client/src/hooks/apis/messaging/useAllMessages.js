import { useInfiniteQuery } from "@tanstack/react-query"
import { useCsurf } from "../auth/useCsurf"
import { usePrivateApi } from "../usePrivateApi"

export const useAllMessages = (chatRoomId) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()

  return useInfiniteQuery({
    queryKey: ["allMessages"],
    queryFn: async ({ pageParam }) => {
      if (!pageParam) {
        pageParam = 0
      }
      const csurf = await getCsurf()
      if (!chatRoomId) {
        return []
      } else {
        const companies = await privateApi.get(
          `/api/messages/${chatRoomId}?page=${pageParam}`,
          {
            headers: { "X-CSRF-Token": csurf.data },
          }
        )
        return companies.data
      }
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length !== 0 ? pages?.length - 1 : false
    },
    initialData: () => {
      return { pageParams: [], pages: [] }
    },
  })
}
