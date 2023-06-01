import express from "express"
import { employeeLogin } from "../controllers/employeeControllers.js"
import { companyLogin } from "../controllers/companyController.js"
import { userLogout } from "../controllers/userController.js"
import { generateRefreshToken } from "../controllers/refreshTokenController.js"

export const authRouter = express.Router()

authRouter.post("/login/user", employeeLogin)
authRouter.post("/login/company", companyLogin)
authRouter.post("/logout", userLogout)
authRouter.get("/refreshToken", generateRefreshToken)
