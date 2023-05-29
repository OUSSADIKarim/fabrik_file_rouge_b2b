import bcrypt from "bcrypt"
import { createError } from "./createError.js"

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw createError(500, error)
  }
}
