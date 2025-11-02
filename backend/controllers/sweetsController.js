import Sweet from "../models/Sweet.js"
import { asyncHandler } from "../middleware/errorHandler.js"

export const getAllSweets = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 12, search = "", category = "", sortBy = "createdAt" } = req.query

  const query = {}

  if (search) {
    query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
  }

  if (category) {
    query.category = category
  }

  const skip = (Number.parseInt(page) - 1) * Number.parseInt(pageSize)
  const sortOptions = {}
  sortOptions[sortBy] = -1

  const [total, sweets] = await Promise.all([
    Sweet.countDocuments(query),
    Sweet.find(query).sort(sortOptions).skip(skip).limit(Number.parseInt(pageSize)),
  ])

  const totalPages = Math.ceil(total / Number.parseInt(pageSize))

  res.json({
    error: false,
    data: sweets,
    pagination: {
      total,
      page: Number.parseInt(page),
      pageSize: Number.parseInt(pageSize),
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  })
})

export const getSweetById = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findById(req.params.id)

  if (!sweet) {
    return res.status(404).json({ error: true, message: "Sweet not found" })
  }

  res.json({ error: false, data: sweet })
})

export const searchSweets = asyncHandler(async (req, res) => {
  const { query, minPrice = 0, maxPrice = 999999, category = "" } = req.query

  const searchQuery = {
    price: { $gte: minPrice, $lte: maxPrice },
  }

  if (query) {
    searchQuery.$or = [{ name: { $regex: query, $options: "i" } }, { description: { $regex: query, $options: "i" } }]
  }

  if (category) {
    searchQuery.category = category
  }

  const sweets = await Sweet.find(searchQuery).limit(20)

  res.json({ error: false, data: sweets })
})

export const createSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.create(req.body)
  res.status(201).json({ error: false, message: "Sweet created", data: sweet })
})

export const updateSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!sweet) {
    return res.status(404).json({ error: true, message: "Sweet not found" })
  }

  res.json({ error: false, message: "Sweet updated", data: sweet })
})

export const deleteSweet = asyncHandler(async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id)

  if (!sweet) {
    return res.status(404).json({ error: true, message: "Sweet not found" })
  }

  res.json({ error: false, message: "Sweet deleted" })
})

export const purchaseSweet = asyncHandler(async (req, res) => {
  const { quantity } = req.body

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: true, message: "Invalid quantity" })
  }

  const sweet = await Sweet.findById(req.params.id)

  if (!sweet) {
    return res.status(404).json({ error: true, message: "Sweet not found" })
  }

  if (sweet.quantity < quantity) {
    return res.status(400).json({ error: true, message: "Insufficient stock" })
  }

  sweet.quantity -= quantity
  sweet.totalSold += quantity
  await sweet.save()

  res.json({
    error: false,
    message: "Purchase successful",
    data: sweet,
    totalPrice: sweet.price * quantity,
  })
})

export const restockSweet = asyncHandler(async (req, res) => {
  const { quantity } = req.body

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: true, message: "Invalid quantity" })
  }

  const sweet = await Sweet.findById(req.params.id)

  if (!sweet) {
    return res.status(404).json({ error: true, message: "Sweet not found" })
  }

  sweet.quantity += quantity
  await sweet.save()

  res.json({ error: false, message: "Restocked successfully", data: sweet })
})