import { useQuery } from "@tanstack/react-query"
import { useCsurf } from "./useCsurf"
import { usePrivateApi } from "./usePrivateApi"

export const useCompanies = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const csurf = await getCsurf()
      const companies = await privateApi.get("/api/companies", {
        headers: { "X-CSRF-Token": csurf.data },
      })
      return companies.data
    },
    enabled: false,
  })
}
