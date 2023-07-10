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

    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

postSchema.methods.incrementVote = async function () {
  try {
    this.votes += 1
    await this.save()
    return this.votes
  } catch (error) {
    return error
  }
}
postSchema.methods.decrementVote = async function () {
  try {
    this.votes -= 1
    await this.save()
    return this.votes
  } catch (error) {
    return error
  }
}

export const Post = mongoose.model("Post", postSchema)
