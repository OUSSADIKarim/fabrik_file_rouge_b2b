import mongoose from "mongoose"
import {
  isEmail,
  isPhoneNumber,
  isStrongPassword,
} from "../utils/validators.js"
import { hashPassword } from "../utils/hashPassword.js"
import { RefreshToken } from "./RefreshToken.js"
import { ConfirmationToken } from "./ConfirmationToken.js"

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
  if (this.isNew) {
    try {
      const hashedPassword = await hashPassword(this.password)
      this.password = hashedPassword
      next()
    } catch (error) {
      next(error)
    }
  }
})

employeeSchema.pre(
  ["deleteMany", "deleteOne"],
  { document: true },
  async function (next) {
    try {
      await RefreshToken.deleteMany({ userId: this._id })
      await ConfirmationToken.deleteMany({ userId: this._id })
      next()
    } catch (error) {
      next(error)
    }
  }
)

export const Employee = mongoose.model("Employee", employeeSchema)
