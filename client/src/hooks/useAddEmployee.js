import { useMutation } from "@tanstack/react-query"
import { useCsurf } from "./useCsurf"
import { usePrivateApi } from "./usePrivateApi"

export const useAddEmployee = (employee) => {
  const privateApi = usePrivateApi()
  const { refetch: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async () => {
      const csurf = await getCsurf()
      const newEmployee = await privateApi.post(
        "/api/companies/team/addTeamMember",
        employee,
        {
          headers: { "X-CSRF-Token": csurf.data },
        }
      )
      return newEmployee
    },
  })
}
