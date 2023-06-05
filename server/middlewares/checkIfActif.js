import { Company } from "../models/Company.js"
import { Employee } from "../models/Employee.js"

export const checkIfActif = async (req, res, next) => {
  let actif
  if (req.userType === "company") {
    try {
      const company = await Company.findById(req.userId)
      actif = company.actif
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const employee = await Employee.findById(req.userId)
      actif = employee.actif
    } catch (error) {
      next(error)
    }
  }
  if (!actif) {
    res.status(403).json("you must activate your account from your email")
    return
  }
  next()
}
