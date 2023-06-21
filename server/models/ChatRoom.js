import mongoose from "mongoose"

const Schema = mongoose.Schema

const chatRoomSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },
    ],
  },
  { timestamps: true }
)

chatRoomSchema.statics.createChatRoom = async (companyId, receiverId) => {
  try {
    const newChatRoom = await ChatRoom.create({
      members: [companyId, receiverId],
    })
    return newChatRoom
  } catch (error) {
    throw error
  }
}

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema)
