import { Employee } from "../models/Employee.js"

export const companyIdFromUserType = async (userId, userType) => {
  let companyId
  try {
    if (userType === "employee") {
      const user = await Employee.findById(userId)
      companyId = user.company
      return companyId
    }
    if (userType === "company") {
      companyId = userId
      return companyId
    }
  } catch (error) {
    throw error
  }
}
