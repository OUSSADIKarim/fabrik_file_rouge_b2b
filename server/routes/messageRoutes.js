import express from "express"
import { verifyAccessToken } from "../middlewares/jwt.js"
import {
  createMassage,
  deleteMessage,
  getLatestMessage,
  getMessages,
} from "../controllers/messageController.js"

export const messageRouter = express.Router()

messageRouter.get("/:chatRoomId", verifyAccessToken, getMessages)
messageRouter.get("/latest/:chatRoomId", verifyAccessToken, getLatestMessage)
messageRouter.post("/:receiverId", verifyAccessToken, createMassage)
messageRouter.delete("/:messageId", verifyAccessToken, deleteMessage)
