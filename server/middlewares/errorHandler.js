export const erroHandler = (error, req, res, next) => {
  console.log({ error })
  return res.status(error.status || 500).json({
    success: false,
    status: error.status || 500,
    message: error.message || "Something went wrong",
  })
}
