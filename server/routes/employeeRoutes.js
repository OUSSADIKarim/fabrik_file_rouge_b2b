import express from "express"
import { confirmEmployee } from "../controllers/employeeControllers.js"

export const employeeRouter = express.Router()

employeeRouter.get("/confirm/:confirmationToken", confirmEmployee)
