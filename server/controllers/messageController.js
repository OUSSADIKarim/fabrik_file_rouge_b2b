import { Message } from "../models/Message.js"
import { companyIdFromUserType } from "../utils/companyIdfromUserType.js"
import { ChatRoom } from "./../models/ChatRoom.js"

export const createMassage = async (req, res, next) => {
  const { receiverId } = req.params
  const { message } = req.body
  let chatRoomId
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const chatRoom = await ChatRoom.findOne({
      members: { $in: [companyId, receiverId] },
    })
    if (!chatRoom) {
      const newchatRoom = await ChatRoom.createChatRoom(companyId, receiverId)
      chatRoomId = newchatRoom._id
    } else {
      chatRoomId = chatRoom._id
    }
    const newMessage = await Message.create({
      chatRoom: chatRoomId,
      sender: companyId,
      content: message,
    })
    await Notification.createMessageNotification(chatRoomId, companyId)
    res.status(200).json(newMessage)
  } catch (error) {
    next(error)
  }
}

export const getMessages = async (req, res, next) => {
  const { chatRoomId } = req.params
  try {
    const messages = await Message.find({ chatRoom: chatRoomId }).sort({
      createdAt: "desc",
    })
    res.status(200).json(messages)
  } catch (error) {
    next(error)
  }
}

export const deleteMessage = async (req, res, next) => {
  const { messageId } = req.params
  try {
    await Message.findByIdAndDelete(messageId)
    res.status(200).json("message deleted")
  } catch (error) {
    next(error)
  }
}
