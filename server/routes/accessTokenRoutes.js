import express from "express"
import { generateRefreshToken } from "../controllers/refreshTokenController.js"

export const accessTokenRouter = express.Router()

accessTokenRouter.get("/refreshToken", generateRefreshToken)
