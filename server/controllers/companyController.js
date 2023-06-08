import { Company } from "../models/Company.js"
import { createError } from "../utils/createError.js"
import {
  cloudinaryLogoRemover,
  cloudinaryLogoUploader,
} from "../utils/cloudinary.js"
import {
  sendCompanyConfirmationEmail,
  sendTeamMemberConfirmationEmail,
} from "../utils/nodemailer.js"
import bcrypt from "bcrypt"
import { RefreshToken } from "../models/RefreshToken.js"
import { ConfirmationToken } from "../models/ConfirmationToken.js"
import { Employee } from "../models/Employee.js"
import { generateRandomPassword } from "./../utils/generateRandomPassword.js"
import { companyIdFromUserType } from "./../utils/companyIdfromUserType.js"
import {
  createAccessToken,
  createConfirmToken,
  createRefreshToken,
  verify,
} from "../utils/tokenCreation.js"

export const createCompany = async (req, res, next) => {
  const { name, email, password, nrc, nif } = req.body
  if (!name || !email || !password || !nrc || !nif) {
    return next(createError(400, "Missing required data"))
  }

  try {
    const newCompany = new Company({
      name,
      email,
      password,
      nrc,
      nif,
    })
    await newCompany.save()
    const confirmToken = createConfirmToken(newCompany._id, "company")
    await ConfirmationToken.create({
      userId: newCompany._id,
      userModel: "Company",
      confirmationToken: confirmToken,
    })
    await sendCompanyConfirmationEmail(newCompany.email, confirmToken)
    res.status(200).json(newCompany)
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
    const accessToken = createAccessToken(company._id, "company")
    const refreshToken = createRefreshToken(company._id, "company")
    await RefreshToken.create({
      userId: company._id,
      userModel: "Company",
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

export const getComapanies = async (req, res, next) => {
  try {
    const companies = await Company.find()
    res.status(200).json(companies)
  } catch (error) {
    next(error)
  }
}
export const getComapany = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const company = await Company.findById(companyId)
    res.status(200).json(company)
  } catch (error) {
    next(error)
  }
}

export const deleteCompany = async (req, res, next) => {
  if (req.userType !== "company") {
    res.sendStatus(403)
    return
  }
  const companyId = req.userId
  try {
    const company = await Company.findById(companyId)
    await company.deleteOne()
    res.status(200).json("deleted")
  } catch (error) {
    next(error)
  }
}

export const addCompanyLogo = async (req, res, next) => {
  const logo = req.file
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const logoUploade = await cloudinaryLogoUploader(logo)
    const company = await Company.findById(companyId)
    company.logoURL = {
      publicId: logoUploade.public_id,
      url: logoUploade.url,
    }
    await company.save()
    res.status(200).json(company)
  } catch (error) {
    next(error)
  }
}

export const removeCompanyLogo = async (req, res, next) => {
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const company = await Company.findById(companyId)
    const publicId = company.logoURL.publicId
    if (publicId === "") {
      res.status(400).json("no logo found")
      return
    }
    await cloudinaryLogoRemover(publicId)
    company.logoURL = {
      publicId: "",
      url: "",
    }
    company.save({ validateBeforeSave: false })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

export const updateCompanyDetails = async (req, res, next) => {
  const {
    name,
    companySize,
    employeesNumber,
    legalStatus,
    socialCapital,
    headquarter,
    website,
    description,
    phoneNumber,
    businessSectors,
  } = req.body

  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const company = await Company.findById(companyId)
    company.name = name
    company.companySize = companySize
    company.employeesNumber = employeesNumber
    company.legalStatus = legalStatus
    company.socialCapital = socialCapital
    company.headquarter = headquarter
    company.website = website
    company.description = description
    company.phoneNumber = phoneNumber
    company.businessSectors = []
    businessSectors.forEach((sector) => {
      company.businessSectors.push(sector)
    })
    await company.save({ validateModifiedOnly: true })
    res.status(200).json(company)
  } catch (error) {
    next(error)
  }
}

export const addTeamMember = async (req, res, next) => {
  if (req.userType !== "company") {
    res.sendStatus(403)
    return
  }
  const companyId = req.userId
  const { firstName, lastName, email, phoneNumber } = req.body
  const randomPassword = generateRandomPassword()
  try {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: randomPassword,
      company: companyId,
      role: "employee",
    })
    const company = await Company.findById(companyId)
    company.teamMembers.push(newEmployee._id)
    await company.save()
    const confirmToken = createConfirmToken(newEmployee._id, "employee")
    await ConfirmationToken.create({
      userId: newEmployee._id,
      userModel: "Employee",
      confirmationToken: confirmToken,
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

export const removeTeamMember = async (req, res, next) => {
  if (req.userType !== "company") {
    res.sendStatus(403)
    return
  }
  const companyId = req.userId
  const employeeId = req.query.employeeId
  try {
    await Employee.findByIdAndDelete(employeeId)
    const company = await Company.findById(companyId)
    const indexOfTeamMemebr = company.teamMembers.indexOf(
      `new ObjectId(${employeeId})`
    )
    company.teamMembers.splice(indexOfTeamMemebr, 1)
    await company.save()
    res.status(200).json(company)
  } catch (error) {
    next(error)
  }
}

export const getTeamMembers = async (req, res, next) => {
  if (req.userType !== "company") {
    res.sendStatus(403)
    return
  }
  const companyId = req.userId
  try {
    const teamMembers = await Employee.find({ company: companyId })
    res.status(200).json(teamMembers)
  } catch (error) {
    next(error)
  }
}
