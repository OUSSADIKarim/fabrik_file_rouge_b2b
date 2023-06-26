import { Post } from "../models/Post.js"

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  const { postId } = req.params
  try {
    const post = await Post.findById(postId)
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  const { content, category } = req.body
  try {
    const companyId = await companyIdFromUserType(req.userId, req.userType)
    const newPost = await Post.create({ company: companyId, category, content })
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
