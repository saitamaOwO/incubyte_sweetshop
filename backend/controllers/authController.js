import User from "../models/User.js"
import { generateTokens } from "../utils/jwt.js"
import { asyncHandler } from "../middleware/errorHandler.js"

export const register = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password, isAdmin } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] })
  if (existingUser) {
    return res.status(400).json({ error: true, message: "User already exists" })
  }

  // Create new user (only admin can create admin users)
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    isAdmin: isAdmin && req.user?.isAdmin ? true : false,
  })

  const { accessToken, refreshToken } = generateTokens(user._id, user.isAdmin)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    error: false,
    message: "User registered successfully",
    user: user.toJSON(),
    accessToken,
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body

  // Find user by email or phone
  const user = await User.findOne({
    $or: [{ email: email?.toLowerCase() }, { phoneNumber }],
  }).select("+password")

  if (!user) {
    return res.status(401).json({ error: true, message: "Invalid credentials" })
  }

  // Check password
  const isPasswordValid = await user.matchPassword(password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: true, message: "Invalid credentials" })
  }

  const { accessToken, refreshToken } = generateTokens(user._id, user.isAdmin)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.json({
    error: false,
    message: "Login successful",
    user: user.toJSON(),
    accessToken,
  })
})

export const logout = (req, res) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.json({ error: false, message: "Logged out successfully" })
}

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId)
  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" })
  }
  res.json({ error: false, user: user.toJSON() })
})
