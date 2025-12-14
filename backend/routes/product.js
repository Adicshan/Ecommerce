// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get ALL products or filter by category
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    // 🎯 Category filter
    if (category) {
      filter.category = category;
    }

    // 🔍 Search filter (name, category, fabric, fit)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { fabric: { $regex: search, $options: "i" } },
        { fit: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);

  } catch (err) {
    console.error("Product search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
