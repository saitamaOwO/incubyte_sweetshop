import { getCookies } from "../utils/cookies.js"
import { verifyAccessToken, verifyRefreshToken, generateTokens } from "../utils/jwt.js"

export const verifyToken = (req, res, next) => {
  try {
    const cookies = getCookies(req.headers.cookie)
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1] || cookies.accessToken

    if (!token) {
      return res.status(401).json({ error: true, message: "No token provided" })
    }

    const decoded = verifyAccessToken(token)
    if (decoded) {
      req.user = decoded
      return next()
    }

    // Try refresh token
    const refreshToken = cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ error: true, message: "Please login" })
    }

    const refreshDecoded = verifyRefreshToken(refreshToken)
    if (!refreshDecoded) {
      return res.status(403).json({ error: true, message: "Login expired" })
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(refreshDecoded.userId, refreshDecoded.isAdmin)

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    req.user = refreshDecoded
    next()
  } catch (error) {
    res.status(500).json({ error: true, message: "Token verification failed" })
  }
}

export const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: true, message: "Admin access required" })
  }
  next()
}
