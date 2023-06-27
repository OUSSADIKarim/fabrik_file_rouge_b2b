import axios from "axios"
const baseUri = import.meta.env.VITE_BASEURI

export const publicApi = axios.create({
  baseURL: baseUri,
  withCredentials: true,
})

export const privateApi = axios.create({
  baseURL: baseUri,
  withCredentials: true,
})

export const csurf = async () => {
  const { data } = await publicApi.get("api/auth/csurf")
  return data.csurfProtection
}

export const refreshToken = async () => {
  const { data } = await publicApi.get("api/auth/refreshToken")
  return data
}

export const signup = async (company, csurfToken) => {
  const { data } = await publicApi.post("api/companies", company, {
    headers: { "X-CSRF-Token": csurfToken },
  })
  return data
}

export const login = async (credentials, csurfToken) => {
  const { data } = await publicApi.post(
    `api/auth/login/${credentials.userType}`,
    credentials,
    { headers: { "X-CSRF-Token": csurfToken } }
  )
  return data
}

export const logout = async () => {
  const { data } = await publicApi.get(`api/auth/logout`)
  return data
}

export const getAllposts = async (pageParam) => {
  console.log({ pageParam })
  const { data } = await publicApi.get(`api/posts?page=${pageParam}`)
  return data
}

export const getPost = async (postId) => {
  const { data } = await publicApi.get(`api/posts/${postId}`)
  return data
}
