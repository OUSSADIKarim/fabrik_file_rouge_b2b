import { useMutation } from "@tanstack/react-query"
import { login } from "../api/api"
import { useCsurf } from "./useCsurf"

export const useLogin = (credentials) => {
  const { refetch: getCsurf } = useCsurf()
  return useMutation({
    mutationFn: async () => {
      const csurf = await getCsurf()
      const newCompany = await login(credentials, csurf.data)
      return newCompany
    },
  })
}
