import jwt from "jsonwebtoken"

export const { sign, verify } = jwt

export const createAccessToken = (userId, userType) => {
  const accessToken = sign(
    { userId, userType },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  )
  return accessToken
}

export const createRefreshToken = (userId, userType) => {
  const refreshToken = sign(
    { userId, userType },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  )
  return refreshToken
}

export const createConfirmToken = (userId, userType) => {
  const refreshToken = sign(
    { userId, userType },
    process.env.CONFIRM_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  )
  return refreshToken
}
