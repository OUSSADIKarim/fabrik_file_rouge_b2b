import { User } from "../models/User.js"
import { ConfirmationToken } from "../models/confirmationToken.js"
import { RefreshToken } from "../models/refreshToken.js"
import {
  createAccessToken,
  createRefreshToken,
  verify,
} from "../utils/tokenCreation.js"

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

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json("incorrect credentials")
      return
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      res.status(400).json("incorrect credentials")
      return
    }
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)
    await RefreshToken.create({
      userId: user._id,
      refreshToken,
    })
    res.cookie(
      "refreshToken",
      { refreshToken },
      {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 24 * 1000 * 7, //7days
      }
    )
    res.status(200).json({
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        actif: user.actif,
      },
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

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
