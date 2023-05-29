export const erroHandler = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    success: false,
    status: error.status || 500,
    message: error.message || "Something went wrong",
  })
}
