import { RefreshToken } from "../models/RefreshToken.js"

export const userLogout = async (req, res, next) => {
  const refreshCookie = req.cookies["refreshToken"]
  if (!refreshCookie) {
    res.sendStatus(400)
    return
  }
  const refreshToken = refreshCookie.refreshToken
  if (!refreshToken) {
    res.sendStatus(400)
    return
  }
  try {
    await RefreshToken.findOneAndDelete({ refreshToken })
    res.clearCookie("refreshToken")
    res.clearCookie("_csrf")
    res.status(200).json("logged out")
  } catch (error) {
    next(error)
  }
}
