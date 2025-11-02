export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err)

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ error: true, message: messages.join(", ") })
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: true, message: "Invalid ID format" })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(400).json({ error: true, message: `${field} already exists` })
  }

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error",
  })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}