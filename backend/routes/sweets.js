import express from "express"
import {
  getAllSweets,
  getSweetById,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetsController.js"
import { verifyToken, verifyAdmin } from "../middleware/auth.js"
import { validateSweet } from "../middleware/validation.js"
import { adminLimiter, frontendLimiter } from "../middleware/rateLimit.js"

const router = express.Router()

// Public routes
router.get("/", frontendLimiter, getAllSweets)
router.get("/search", frontendLimiter, searchSweets)
router.get("/:id", frontendLimiter, getSweetById)

// Protected routes
router.post("/:id/purchase", verifyToken, frontendLimiter, purchaseSweet)

// Admin routes
router.post("/", verifyToken, verifyAdmin, adminLimiter, validateSweet, createSweet)
router.put("/:id", verifyToken, verifyAdmin, adminLimiter, validateSweet, updateSweet)
router.delete("/:id", verifyToken, verifyAdmin, adminLimiter, deleteSweet)
router.post("/:id/restock", verifyToken, verifyAdmin, adminLimiter, restockSweet)

export default router