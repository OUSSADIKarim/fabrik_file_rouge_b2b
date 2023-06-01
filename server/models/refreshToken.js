import mongoose from "mongoose"

const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
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

  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
})

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema)
