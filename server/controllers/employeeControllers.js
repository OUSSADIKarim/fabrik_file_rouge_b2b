import { Employee } from "../models/Employee.js"
import { ConfirmationToken } from "../models/ConfirmationToken.js"
import { RefreshToken } from "../models/RefreshToken.js"
import bcrypt from "bcrypt"
import {
  createAccessToken,
  createRefreshToken,
  verify,
} from "../utils/tokenCreation.js"

export const confirmEmployee = async (req, res, next) => {
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
    await Employee.findByIdAndUpdate(decodedConfirmationToken.userId, {
      actif: true,
    })
    await confirmationTokenDB.deleteOne()
    res.status(200).json("Registration confirmed")
  } catch (error) {
    next(error)
  }
}

export const employeeLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const employee = await Employee.findOne({ email })
    if (!employee) {
      res.status(400).json("incorrect credentials")
      return
    }
    const passwordCompare = await bcrypt.compare(password, employee.password)
    if (!passwordCompare) {
      res.status(400).json("incorrect credentials")
      return
    }
    const accessToken = createAccessToken(employee._id, "employee")
    const refreshToken = createRefreshToken(employee._id, "employee")
    await RefreshToken.create({
      userId: employee._id,
      userModel: "Employee",
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
      employee: {
        employeeId: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        actif: employee.actif,
      },
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}
