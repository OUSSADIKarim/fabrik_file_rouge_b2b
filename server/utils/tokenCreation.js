import jwt from "jsonwebtoken"

export const { sign, verify } = jwt

export const createAccessToken = (userId, userType, actif) => {
  const accessToken = sign(
    { userId, userType, actif },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  )
  return accessToken
}

export const createRefreshToken = (userId, userType, actif) => {
  const refreshToken = sign(
    { userId, userType, actif },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  )
  return refreshToken
}

export const createConfirmToken = (userId, userType, actif) => {
  const refreshToken = sign(
    { userId, userType, actif },
    process.env.CONFIRM_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  )
  return refreshToken
}
