import mongoose from "mongoose"

const Schema = mongoose.Schema

const confirmationTokenSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },

  confirmationToken: {
    type: String,
    unique: true,
  },
})

export const ConfirmationToken = mongoose.model(
  "ConfirmationToken",
  confirmationTokenSchema
)
