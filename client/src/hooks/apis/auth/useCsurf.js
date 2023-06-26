import { useQuery } from "@tanstack/react-query"
import { csurf } from "../../../api/api"

export const useCsurf = () => {
  return useQuery({
    queryKey: ["csurf"],
    queryFn: async () => {
      const csurfToken = await csurf()
      return csurfToken
    },
    enabled: false,
  })
}
