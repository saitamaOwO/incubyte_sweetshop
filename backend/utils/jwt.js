import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, TOKEN_EXPIRY_TIME } from "../config/constants.js"

export const generateTokens = (userId, isAdmin = false) => {
  const payload = { userId, isAdmin }

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRY_TIME.ACCESS_TOKEN,
  })

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRY_TIME.REFRESH_TOKEN,
  })

  return { accessToken, refreshToken }
}

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
  } catch (error) {
    return null
  }
}

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
  } catch (error) {
    return null
  }
}
