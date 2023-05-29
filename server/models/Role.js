import mongoose from "mongoose"

const Schema = mongoose.Schema

const rolesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  permisions: [
    {
      type: String,
    },
  ],

  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
})

export const Roles = mongoose.model("Role", rolesSchema)
