import mongoose from "mongoose"
import {
  isEmail,
  isPhoneNumber,
  isStrongPassword,
} from "../utils/validators.js"
import { hashPassword } from "../utils/hashPassword.js"

const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "user",
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: "Invalid email",
      },
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: Number,
      validate: {
        validator: isPhoneNumber,
        message: "Invalid phone number",
      },
      required: true,
      unique: true,
    },

    password: {
      type: String,
      validate: {
        validator: isStrongPassword,
        message:
          "The password must be strong with at least 8 characters, a lowercase letter, an uppercase letter, a number and a symbol",
      },
      required: true,
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    companyRole: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },

    actif: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
)

employeeSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hashPassword(this.password)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

export const Employee = mongoose.model("Employee", employeeSchema)
