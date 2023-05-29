import { Company } from "../models/Company.js"
import { createError } from "../utils/createError.js"
import { cloudinaryLogoUploader } from "../utils/cloudinary.js"
import {
  sendCompanyConfirmationEmail,
  sendTeamMemberConfirmationEmail,
} from "../utils/nodemailer.js"
import bcrypt from "bcrypt"
import {
  createAccessToken,
  createConfirmToken,
  createRefreshToken,
} from "../middlewares/jwt.js"
import { RefreshToken } from "../models/refreshToken.js"
import { ConfirmationToken } from "../models/confirmationToken.js"
import { verify } from "jsonwebtoken"
import { User } from "../models/User.js"
import { generateRandomPassword } from "./../utils/generateRandomPassword.js"

export const companyLogin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const company = await Company.findOne({ email })
    if (!company) {
      res.status(400).json("incorrect credentials")
      return
    }
    const passwordCompare = await bcrypt.compare(password, company.password)
    if (!passwordCompare) {
      res.status(400).json("incorrect credentials")
      return
    }
    const accessToken = createAccessToken(company._id)
    const refreshToken = createRefreshToken(company._id)
    await RefreshToken.create({
      userId: company._id,
      refreshToken,
    })
    res.cookie(
      "refreshToken",
      { refreshToken },
      {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 24 * 1000 * 7, //7days
      }
    )
    res.status(200).json({
      company: {
        companyId: company._id,
        name: company.name,
        companySize: company.companySize,
        employeesNumber: company.employeesNumber,
        legalStatus: company.legalStatus,
        socialCapital: company.socialCapital,
        headquarter: company.headquarter,
        website: company.headquarter,
        description: company.description,
        email: company.email,
        phoneNumber: company.phoneNumber,
        nrc: company.nrc,
        nif: company.nif,
        businessSectors: company.businessSectors,
        logoURL: company.logoURL,
        actif: company.actif,
      },
      accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export const createCompany = async (req, res, next) => {
  const logo = req.file
  const {
    name,
    companySize,
    employeesNumber,
    legalStatus,
    socialCapital,
    headquarter,
    website,
    description,
    email,
    phoneNumber,
    password,
    nrc,
    nif,
    businessSectors,
  } = req.body

  if (
    !name ||
    !companySize ||
    !employeesNumber ||
    !legalStatus ||
    !socialCapital ||
    !headquarter ||
    !website ||
    !description ||
    !email ||
    !phoneNumber ||
    !password ||
    !nrc ||
    !nif ||
    !logo ||
    !businessSectors
  ) {
    return next(createError(400, "Missing required data"))
  }

  try {
    const logoUploade = await cloudinaryLogoUploader(logo)
    const newCompany = new Company({
      name,
      companySize,
      employeesNumber,
      legalStatus,
      socialCapital,
      headquarter,
      website,
      description,
      email,
      phoneNumber,
      password,
      nrc,
      nif,
      logoURL: {
        publicId: logoUploade.public_id,
        url: logoUploade.url,
      },
    })

    JSON.parse(businessSectors).forEach((sector) => {
      newCompany.businessSectors.push(sector)
    })

    await newCompany.save()
    const confirmToken = createConfirmToken(newCompany._id)
    await ConfirmationToken.create({
      confirmationToken: confirmToken,
      userId: newCompany._id,
    })
    await sendCompanyConfirmationEmail(newCompany.email, confirmToken)
    res.status(200).json(newCompany)
  } catch (error) {
    next(error)
  }
}

export const getComapanies = async (req, res, next) => {
  try {
    const companies = await Company.find()
    res.status(200).json(companies)
  } catch (error) {
    next(error)
  }
}

export const confirmCompany = async (req, res, next) => {
  const confirmationToken = req.params.confirmationToken
  if (!confirmationToken) {
    res.sendStatus(403)
    return
  }
  try {
    const confirmationTokenDB = await ConfirmationToken.findOne({
      confirmationToken,
    })
    if (!confirmationTokenDB) {
      res.sendStatus(403)
      return
    }
    const decodedConfirmationToken = verify(
      confirmationToken,
      process.env.CONFIRM_TOKEN_SECRET
    )
    if (!decodedConfirmationToken) {
      res.sendStatus(403)
      return
    }
    await Company.findByIdAndUpdate(decodedConfirmationToken.userId, {
      actif: true,
    })
    await confirmationTokenDB.deleteOne()
    res.status(200).json("Registration confirmed")
  } catch (error) {
    next(error)
  }
}

export const addTeamMember = async (req, res, next) => {
  const companyId = req.userId
  const { firstName, lastName, email, phoneNumber } = req.body
  const randomPassword = generateRandomPassword()
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: randomPassword,
      company: companyId,
    })
    const company = await Company.findById(companyId)
    company.teamMembers.push(newUser._id)
    await company.save()
    const confirmToken = createConfirmToken(newUser._id)
    await ConfirmationToken.create({
      confirmationToken: confirmToken,
      userId: newUser._id,
    })
    await sendTeamMemberConfirmationEmail(
      email,
      confirmToken,
      company.name,
      randomPassword
    )
    res.status(200).json("team member added")
  } catch (error) {
    next(error)
  }
}
