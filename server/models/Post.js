import mongoose from "mongoose"

const Schema = mongoose.Schema

export const postSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    category: {
      type: String,
      enum: ["Services and products", "Investement"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Post = mongoose.model("Notification", postSchema)
