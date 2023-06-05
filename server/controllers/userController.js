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
    res.clearCookie("refreshCookie")
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}
