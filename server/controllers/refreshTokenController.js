import { createAccessToken, verify } from "../utils/tokenCreation.js"
import { RefreshToken } from "../models/RefreshToken.js"
import dotenv from "dotenv"

dotenv.config()

export const generateRefreshToken = async (req, res, next) => {
  const refreshCookie = req.cookies["refreshToken"]
  if (!refreshCookie) {
    res.sendStatus(403)
    return
  }
  const refreshToken = refreshCookie.refreshToken
  if (!refreshToken) {
    res.sendStatus(403)
    return
  }
  const decodedRefreshToken = verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, result) => {
      if (error) {
        return { error }
      }
      return result
    }
  )
  try {
    if (!decodedRefreshToken || decodedRefreshToken?.error) {
      await RefreshToken.findOneAndDelete({ refreshToken })
      res.clearCookie("refreshToken")
      res.sendStatus(403)
      return
    }
    const refreshTokenDB = await RefreshToken.findOne({ refreshToken })
    if (!refreshTokenDB) {
      res.sendStatus(403)
      return
    }
    if (decodedRefreshToken.userId !== refreshTokenDB.userId.toString()) {
      res.sendStatus(403)
      return
    }
    if (decodedRefreshToken.userType === "company") {
      const newAccessToken = createAccessToken(
        decodedRefreshToken.userId,
        "company"
      )
      res.status(200).json({ accessToken: newAccessToken })
      return
    }
    const newAccessToken = createAccessToken(
      decodedRefreshToken.userId,
      "employee"
    )
    res.status(200).json({ accessToken: newAccessToken })
  } catch (error) {
    next(error)
  }
}
