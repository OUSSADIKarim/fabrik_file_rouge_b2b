import { verify } from "jsonwebtoken"
import { User } from "../models/User.js"
import { ConfirmationToken } from "../models/confirmationToken.js"

export const confirmUser = async (req, res, next) => {
  const confirmationToken = req.params.confirmationToken
  if (!confirmationToken) {
    res.sendStatus(403)
    return
  }
  try {
    const confirmationTokenDB = await ConfirmationToken.findOne({
      confirmationToken,
    })
    if (!confirmationTokenDB) {
      res.sendStatus(403)
      return
    }
    const decodedConfirmationToken = verify(
      confirmationToken,
      process.env.CONFIRM_TOKEN_SECRET
    )
    if (!decodedConfirmationToken) {
      res.sendStatus(403)
      return
    }
    await User.findByIdAndUpdate(decodedConfirmationToken.userId, {
      actif: true,
    })
    await confirmationTokenDB.deleteOne()
    res.status(200).json("Registration confirmed")
  } catch (error) {
    next(error)
  }
}
