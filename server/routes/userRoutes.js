import express from "express"
import { confirmUser } from "../controllers/userControllers.js"

export const userRouter = express.Router()

userRouter.get("/confirm/:confirmationToken", confirmUser)
