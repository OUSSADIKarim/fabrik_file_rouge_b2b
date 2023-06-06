import express from "express"
import { verifyAccessToken } from "../middlewares/jwt.js"
import {
  createMassage,
  deleteMessage,
  getMessages,
} from "../controllers/messageController.js"

export const messageRouter = express.Router()

messageRouter.get("/:chatRoomId", verifyAccessToken, getMessages)
messageRouter.post("/:chatRoomId", verifyAccessToken, createMassage)
messageRouter.delete("/:messageId", verifyAccessToken, deleteMessage)
