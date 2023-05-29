import jwt from "jsonwebtoken"
import { RefreshToken } from "../models/refreshToken.js"

const { sign, verify } = jwt

export const createAccessToken = (userId) => {
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
  return accessToken
}

export const createRefreshToken = (userId) => {
  const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
  return refreshToken
}

export const createConfirmToken = (userId) => {
  const refreshToken = sign({ userId }, process.env.CONFIRM_TOKEN_SECRET, {
    expiresIn: "1d",
  })
  return refreshToken
}

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    res.sendStatus(401)
    return
  }
  const accessToken = authHeader.split(" ")[1]
  verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (error, decodedToken) => {
      if (error) {
        next(error)
        return
      }
      req.userId = decodedToken.userId
      next()
    }
  )
}
