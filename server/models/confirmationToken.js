import mongoose from "mongoose"

const Schema = mongoose.Schema

const confirmationTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    refPath: "userModel",
    required: true,
  },

  userModel: {
    type: String,
    enum: ["Company", "Employee"],
    required: true,
  },

  confirmationToken: {
    type: String,
    unique: true,
    required: true,
  },
})

export const ConfirmationToken = mongoose.model(
  "ConfirmationToken",
  confirmationTokenSchema
)
