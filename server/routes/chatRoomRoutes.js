import express from "express"
import {
  createChatRoom,
  getCompanyChatRooms,
} from "../controllers/chatRoomComtroller.js"
import { verifyAccessToken } from "../middlewares/jwt.js"

export const chatRoomRouter = express.Router()

chatRoomRouter.get("/", verifyAccessToken, getCompanyChatRooms)
chatRoomRouter.post("/", verifyAccessToken, createChatRoom)
