import { useMutation } from "@tanstack/react-query"
import { signup } from "../api/api"
import { useCsurf } from "./useCsurf"

export const useRegister = (company) => {
  const { refetch: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async () => {
      const csurf = await getCsurf()
      const newCompany = await signup(company, csurf.data)
      return newCompany
    },
  })
}
