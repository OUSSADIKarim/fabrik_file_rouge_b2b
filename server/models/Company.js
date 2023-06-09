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
import { Employee } from "./Employee.js"
import { RefreshToken } from "./RefreshToken.js"
import { ConfirmationToken } from "./ConfirmationToken.js"
import { Roles } from "./Role.js"
import { cloudinaryLogoRemover } from "../utils/cloudinary.js"

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
      default: null,
    },

    employeesNumber: {
      type: Number,
      default: null,
    },

    legalStatus: {
      type: String,
      default: null,
    },

    socialCapital: {
      type: Number,
      default: null,
    },

    headquarter: {
      type: String,
      default: null,
    },

    website: {
      type: String,
      validate: {
        validator: isURL,
        message: "invalid URL",
      },
      default: null,
    },

    description: {
      type: String,
      default: null,
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
      default: null,
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
        default: null,
      },
      url: {
        type: String,
        validate: {
          validator: isURL,
          message: "invalid URL",
        },
        default: null,
      },
    },

    businessSectors: [
      {
        type: String,
        default: null,
      },
    ],

    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },

  { timestamps: true }
)

companySchema.pre("save", async function (next) {
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

companySchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    await cloudinaryLogoRemover(this.logoURL.publicId)
    const employees = await Employee.find({ company: this._id })
    employees.map(async (employee) => {
      try {
        await employee.deleteOne()
      } catch (error) {
        return error
      }
    })
    await Roles.deleteMany({ company: this._id })
    await RefreshToken.deleteMany({ userId: this._id })
    await ConfirmationToken.deleteMany({ userId: this._id })
    next()
  } catch (error) {
    next(error)
  }
})

export const Company = mongoose.model("Company", companySchema)
