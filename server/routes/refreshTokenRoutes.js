import express from "express"
import { generateRefreshToken } from "../controllers/refreshTokenController.js"

export const refreshTokenRouter = express.Router()

refreshTokenRouter.get("/refreshToken", generateRefreshToken)
