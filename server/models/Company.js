import mongoose from "mongoose"
import {
  isEmail,
  isNIF,
  isNRC,
  isPhoneNumber,
  isStrongPassword,
  isURL,
} from "../utils/validators.js"
import { hashPassword } from "../utils/hashPassword.js"

const Schema = mongoose.Schema

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      uniqe: true,
    },

    companySize: {
      type: Number,
    },

    employeesNumber: {
      type: Number,
    },

    legalStatus: {
      type: String,
    },

    socialCapital: {
      type: Number,
    },

    headquarter: {
      type: String,
    },

    website: {
      type: String,
      validate: {
        validator: isURL,
        message: "invalid URL",
      },
    },

    description: {
      type: String,
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

    nrc: {
      type: String,
      validate: {
        validator: isNRC,
        message: "Invalid NRC",
      },
      required: true,
      unique: true,
    },

    nif: {
      type: String,
      validate: {
        validator: isNIF,
        message: "Invalid NIF",
      },
      required: true,
    },

    actif: {
      type: Boolean,
      default: false,
    },

    logoURL: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        validate: {
          validator: isURL,
          message: "invalid URL",
        },
        required: true,
      },
    },

    businessSectors: [
      {
        type: String,
        required: true,
      },
    ],

    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
  },

  { timestamps: true }
)

companySchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hashPassword(this.password)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

export const Company = mongoose.model("Company", companySchema)
