import express from "express"
import { confirmEmployee } from "../controllers/employeeControllers.js"

export const employeeRouter = express.Router()

userRouter.get("/confirm/:confirmationToken", confirmEmployee)
