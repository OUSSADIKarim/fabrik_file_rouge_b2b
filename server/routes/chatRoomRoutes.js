import express from "express"
import { getAllChatRooms } from "../controllers/chatRoomComtroller.js"
import { verifyAccessToken } from "../middlewares/jwt.js"

export const chatRoomRouter = express.Router()

chatRoomRouter.get("/", verifyAccessToken, getAllChatRooms)
