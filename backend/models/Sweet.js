import mongoose from "mongoose"

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a sweet name"],
      trim: true,
      minlength: 3,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Chocolate", "Candy", "Toffee", "Gummies", "Lollipops", "Caramels", "Pralines"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSold: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

sweetSchema.index({ name: "text", category: 1, price: 1 })

export default mongoose.model("Sweet", sweetSchema)
