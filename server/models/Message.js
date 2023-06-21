import mongoose from "mongoose"

const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Message = mongoose.model("Message", messageSchema)
