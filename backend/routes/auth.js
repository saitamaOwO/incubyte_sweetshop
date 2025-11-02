import express from "express"
import { register, login, logout, getCurrentUser } from "../controllers/authController.js"
import { validateSignUp, validateSignIn } from "../middleware/validation.js"
import { verifyToken } from "../middleware/auth.js"
import { authLimiter } from "../middleware/rateLimit.js"

const router = express.Router()

router.post("/register", authLimiter, validateSignUp, register)
router.post("/login", authLimiter, validateSignIn, login)
router.post("/logout", logout)
router.get("/me", verifyToken, getCurrentUser)

export default router