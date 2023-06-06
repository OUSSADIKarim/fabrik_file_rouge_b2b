import { ChatRoom } from "./../models/ChatRoom.js"

export const getAllChatRooms = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const chatRooms = await ChatRoom.find({
      members: { $in: [companyId] },
    }).populate("members")
    res.status(200).json(chatRooms)
  } catch (error) {
    next(error)
  }
}

export const getChatRoom = async (req, res, next) => {
  const { chatRoomId } = req.params
  try {
    const chatRoom = await ChatRoom.findById(chatRoomId)
    res.status(200).json(chatRoom)
  } catch (error) {
    next(error)
  }
}
