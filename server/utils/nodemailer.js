import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { createError } from "./createError.js"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_OAUTH_CLIENTID,
    clientSecret: process.env.MAIL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.MAIL_OAUTH_REFRESH_TOKEN,
  },
})

export const sendCompanyConfirmationEmail = async (to, confirmToken) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject: "Confirm registration",
    text: `Thanks for your registration, click the button to confirm and to login`,
    html: `
      <p>
        Thanks for your join with us. Please click the button below to confirm and login.
      </p> 					
      <a href="${process.env.BASEURL}${process.env.PORT}/api/companies/confirm/${confirmToken}">
        Confirm registration
      </a>
      `,
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw createError(500, error)
  }
}

export const sendTeamMemberConfirmationEmail = async (
  to,
  confirmToken,
  companyName,
  randomPassword
) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject: "Confirm registration",
    text: `Your company ${companyName} has added you to our app, click on the confirmation button and use the credentials provided below to login`,
    html: `
      <p>
         Your company ${companyName} has added you to our app, click on the confirmation button and use the credentials provided below to login
      </p> 	
      <p>
        Email: ${to}
      </p> 	
      <p>
        Password: ${randomPassword}
      </p> 	
      				
      <a href="${process.env.BASEURL}${process.env.PORT}/api/users/confirm/${confirmToken}">
        Confirm registration
      </a>
      `,
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw createError(500, error)
  }
}
