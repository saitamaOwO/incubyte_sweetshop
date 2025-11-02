import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import authRoutes from "./routes/auth.js"
import sweetsRoutes from "./routes/sweets.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { frontendLimiter } from "./middleware/rateLimit.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(frontendLimiter)

connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/sweets", sweetsRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" })
})

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route not found" })
})

app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app