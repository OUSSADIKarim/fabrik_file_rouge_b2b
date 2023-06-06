import mongoose from "mongoose"

const Schema = mongoose.Schema

export const notificationSchema = new Schema(
  {
    NotificationType: {
      type: String,
      enum: ["message"],
      required: true,
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    notificationItem: {
      type: Schema.Types.ObjectId,
      refPath: "notificationModel",
      required: true,
    },

    notificationModel: {
      type: String,
      enum: ["ChatRoom"],
      required: true,
    },

    viewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

notificationSchema.statics.createMessageNotification = async (
  chatRoomId,
  companyId
) => {
  try {
    const messageNotification = await Notification.create({
      NotificationType: "message",
      company: companyId,
      notificationItem: chatRoomId,
      notificationModel: "ChatRoom",
      viewed: false,
    })
    return messageNotification
  } catch (error) {
    throw error
  }
}

export const Notification = mongoose.model("Notification", notificationSchema)
