import rateLimit from "express-rate-limit"

export const frontendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: true, message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: true, message: "Too many login attempts, please try again later" },
  skipSuccessfulRequests: true,
})

export const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: { error: true, message: "Too many requests, please try again later" },
})
