import { validateEmail, validatePhoneNumber, validatePrice, validateQuantity } from "../utils/validation.js"

export const validateSignUp = (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body

  if (!name || name.length < 3) {
    return res.status(400).json({ error: true, message: "Name must be at least 3 characters" })
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: true, message: "Invalid email address" })
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Phone number must be 10-15 digits" })
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: true, message: "Password must be at least 6 characters" })
  }

  next()
}

export const validateSignIn = (req, res, next) => {
  const { email, phoneNumber, password } = req.body

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: true, message: "Email or phone number is required" })
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({ error: true, message: "Invalid email address" })
  }

  if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number" })
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: true, message: "Invalid password" })
  }

  next()
}

export const validateSweet = (req, res, next) => {
  const { name, category, price, quantity, imageUrl } = req.body

  if (!name || name.length < 3) {
    return res.status(400).json({ error: true, message: "Sweet name must be at least 3 characters" })
  }

  if (!category) {
    return res.status(400).json({ error: true, message: "Category is required" })
  }

  if (!validatePrice(price)) {
    return res.status(400).json({ error: true, message: "Price must be a positive number" })
  }

  if (!validateQuantity(quantity)) {
    return res.status(400).json({ error: true, message: "Quantity must be a non-negative integer" })
  }

  if (!imageUrl) {
    return res.status(400).json({ error: true, message: "Image URL is required" })
  }

  next()
}