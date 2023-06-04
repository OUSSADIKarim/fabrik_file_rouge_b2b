import { v2 as cloudinary } from "cloudinary"
import { createError } from "./createError.js"
import dotenv from "dotenv"
import { generateFileURI } from "./generateFileURI.js"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const cloudinaryLogoUploader = async (logo) => {
  try {
    const logoURI = generateFileURI(logo)
    const result = await cloudinary.uploader.upload(logoURI, {
      folder: "company_logo",
      format: "webp",
      transformation: {
        width: 200,
        crop: "fit",
      },
    })

    return result
  } catch (error) {
    throw createError(500, error)
  }
}

export const cloudinaryLogoRemover = async (publicId) => {
  try {
    const result = cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    throw createError(500, error)
  }
}
