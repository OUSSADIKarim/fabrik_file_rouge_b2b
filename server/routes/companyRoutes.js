/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

import express from "express"
import {
  createCompany,
  getComapanies,
  confirmCompany,
  addTeamMember,
  removeCompanyLogo,
  getComapany,
  deleteCompany,
  updateCompanyDetails,
  removeTeamMember,
  getTeamMembers,
  addCompanyLogo,
} from "../controllers/companyController.js"
import { verifyAccessToken } from "../middlewares/jwt.js"
import { checkIfActif } from "../middlewares/checkIfActif.js"

export const companyRouter = express.Router()

companyRouter.post("/", createCompany)
companyRouter.get("/", verifyAccessToken, getComapanies)
companyRouter.get("/:companyId", verifyAccessToken, getComapany)
companyRouter.get("/confirmCompany/:confirmationToken", confirmCompany)
companyRouter.delete("/", verifyAccessToken, deleteCompany)
companyRouter.put("/", verifyAccessToken, updateCompanyDetails)
companyRouter.post("/addLogo", verifyAccessToken, addCompanyLogo)
companyRouter.delete("/removeLogo", verifyAccessToken, removeCompanyLogo)
companyRouter.post(
  "/team/addTeamMember",
  verifyAccessToken,
  checkIfActif,
  addTeamMember
)
companyRouter.delete(
  "/team/removeTeamMember",
  verifyAccessToken,
  checkIfActif,
  removeTeamMember
)

companyRouter.get(
  "/team/teamMembers",
  verifyAccessToken,
  checkIfActif,
  getTeamMembers
)
