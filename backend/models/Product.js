// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // Basic info
    name: { type: String, required: true, trim: true },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Formal", "Casual", "Sports", "Kids"],
    },

    description: { type: String, required: true },

    // Pricing
    price: { type: Number, required: true, min: 0 },

    // Shirt-specific attributes
    fabric: {
      type: String,
      required: true,
      trim: true,
    },

    fit: {
      type: String,
      required: true,
      enum: ["Slim", "Regular", "Oversized"],
    },

    dimensions: {
      type: String, // e.g. "Chest 40 | Length 28 | Sleeve 25"
      trim: true,
    },

    sizes: {
      type: [String], // ["S", "M", "L", "XL"]
      required: true,
    },

    // Image (Cloudinary)
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },

    // Admin info
    createdBy: { type: String }, // admin email or adminId
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
