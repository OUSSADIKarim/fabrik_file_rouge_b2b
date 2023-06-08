import { useQuery } from "@tanstack/react-query"
import { useCsurf } from "./useCsurf"
import { usePrivateApi } from "./usePrivateApi"

export const useEmployeesList = () => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useQuery({
    queryKey: ["employeesList"],
    queryFn: async () => {
      const csurf = await getCsurf()
      const employees = await privateApi.get(
        "/api/companies/team/teamMembers",
        {
          headers: { "X-CSRF-Token": csurf.data },
        }
      )
      return employees.data
    },
  })
}
