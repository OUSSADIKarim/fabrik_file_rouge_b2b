import express from "express"
import { userLogin, userLogout } from "../controllers/userControllers"
import { companyLogin } from "../controllers/companyController"

export const authRouter = express.Router()

authRouter.post("/login/user", userLogin)
authRouter.post("/login/company", companyLogin)
authRouter.post("/logout", userLogout)
