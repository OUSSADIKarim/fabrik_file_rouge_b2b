import axios from "axios"
const baseUri = import.meta.env.VITE_BASEURI

const publicApi = axios.create({
  baseURL: baseUri,
  withCredentials: true,
})
const privateApi = axios.create({
  baseURL: baseUri,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

export const csurf = async () => {
  const { data } = await publicApi.get("api/auth/csurf")
  return data.csurfProtection
}

export const signup = async (company, csurfToken) => {
  const { data } = await publicApi.post("api/companies", company, {
    headers: { "X-CSRF-Token": csurfToken },
  })
  return data
}
