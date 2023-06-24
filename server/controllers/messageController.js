import { Message } from "../models/Message.js"
import { Notification } from "../models/Notification.js"
import { companyIdFromUserType } from "../utils/companyIdfromUserType.js"
import { ChatRoom } from "./../models/ChatRoom.js"

export const createMassage = async (req, res, next) => {
  const { receiverId } = req.params
  const { message } = req.body
  console.log({ receiverId, message })
  let chatRoomId
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const chatRoom = await ChatRoom.findOne({
      $or: [
        { members: [companyId, receiverId] },
        { members: [receiverId, companyId] },
      ],
    })
    if (!chatRoom) {
      console.log("not chat")
      const newchatRoom = await ChatRoom.createChatRoom(companyId, receiverId)
      chatRoomId = newchatRoom._id
    } else {
      chatRoomId = chatRoom._id
    }
    console.log({ chatRoom })
    const newMessage = await Message.create({
      chatRoom: chatRoomId,
      sender: companyId,
      receiver: receiverId,
      content: message,
    })
    console.log({ message })
    await Notification.createMessageNotification(chatRoomId, companyId)
    res.status(200).json(newMessage)
  } catch (error) {
    next(error)
  }
}

export const getMessages = async (req, res, next) => {
  const { chatRoomId } = req.params
  const { page } = req.query
  const messagesPerPage = 20
  console.log({ page })
  try {
    const messages = await Message.find({ chatRoom: chatRoomId })
      .sort({
        createdAt: "desc",
      })
      .skip(page * messagesPerPage)
      .limit(messagesPerPage)
    console.log({ f: messages.length })
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
