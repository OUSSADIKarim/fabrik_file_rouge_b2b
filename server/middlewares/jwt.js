import { createError } from "../utils/createError.js"
import { verify } from "../utils/tokenCreation.js"

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
        const err = createError(403, error.message)
        next(err)
        return
      }
      req.userId = decodedToken.userId
      req.userType = decodedToken.userType
      next()
    }
  )
}
