import { Message } from "../models/Message.js"
import { Notification } from "../models/Notification.js"
import { companyIdFromUserType } from "../utils/companyIdfromUserType.js"
import { ChatRoom } from "./../models/ChatRoom.js"

export const createMassage = async (req, res, next) => {
  const { receiverId } = req.params
  const { message } = req.body
  let chatRoomId
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    console.log({ companyId, receiverId })
    const chatRoom = await ChatRoom.findOne({
      $or: [
        { members: [companyId, receiverId] },
        { members: [receiverId, companyId] },
      ],
    })
    console.log({ lol: chatRoom })
    if (!chatRoom) {
      const newchatRoom = await ChatRoom.createChatRoom(companyId, receiverId)
      chatRoomId = newchatRoom._id
    } else {
      chatRoomId = chatRoom._id
    }
    const newMessage = await Message.create({
      chatRoom: chatRoomId,
      sender: companyId,
      receiver: receiverId,
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

export const getLatestMessage = async (req, res, next) => {
  const { chatRoomId } = req.params
  try {
    const messages = await Message.find({ chatRoom: chatRoomId })
      .limit(1)
      .sort({ $natural: -1 })
      .populate("sender receiver")
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
