import express from "express"
import { verifyAccessToken } from "../middlewares/jwt.js"
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} from "../controllers/postController.js"

export const postRouter = express.Router()

postRouter.get("/", verifyAccessToken, getAllPosts)
postRouter.get("/:postId", verifyAccessToken, getPost)
postRouter.post("/", verifyAccessToken, createPost)
postRouter.put("/:postId", verifyAccessToken, updatePost)
postRouter.delete("/:postId", verifyAccessToken, deletePost)
