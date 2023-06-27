import { Post } from "../models/Post.js"
import { companyIdFromUserType } from "./../utils/companyIdfromUserType.js"

export const getAllPosts = async (req, res, next) => {
  const { page } = req.query
  const postsPerPage = 20
  try {
    const posts = await Post.find()
      .sort({
        createdAt: "desc",
      })
      .skip(page * postsPerPage)
      .limit(postsPerPage)
      .populate("company")
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  const { postId } = req.params
  try {
    const post = await Post.findById(postId).populate("company")
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  const { content, category } = req.body
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const newPost = await await Post.create({
      company: companyId,
      category,
      content,
    })
    res.status(200).json(newPost)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  const { postId } = req.params
  const { content, category } = req.body
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      content,
      category,
    })
    res.status(200).json(updatedPost)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  const { postId } = req.params
  try {
    await Post.findByIdAndDelete(postId)
    res.status(200).json("deleted")
  } catch (error) {
    next(error)
  }
}
