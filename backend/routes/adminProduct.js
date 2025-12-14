// routes/adminProducts.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary using env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer to store file in a temp folder before uploading
const upload = multer({
  dest: "uploads/", // temporary folder
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
});

// POST /api/admin/products
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      fabric,
      fit,
      dimensions,
      sizes,
      adminEmail,
    } = req.body;

    // ---------- VALIDATION ----------
    if (
      !name ||
      !category ||
      !price ||
      !fabric ||
      !fit ||
      !sizes ||
      !req.file
    ) {
      if (req.file?.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Parse sizes (comes as string from FormData)
    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
      if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
        throw new Error();
      }
    } catch {
      return res.status(400).json({ message: "Invalid sizes format" });
    }

    // ---------- CLOUDINARY UPLOAD ----------
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "shirt_products",
      resource_type: "image",
    });

    // Remove temp file
    fs.unlinkSync(req.file.path);

    // ---------- CREATE PRODUCT ----------
    const product = new Product({
      name: name.trim(),
      category,
      description,
      price: Number(price),
      fabric,
      fit,
      dimensions,
      sizes: parsedSizes,   // ["S","M","L"]
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      createdBy: adminEmail || "admin",
    });

    await product.save();

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("AdminProducts error:", err);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});





// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


const bcrypt = require("bcryptjs");

router.delete("/delete", async (req, res) => {
  const { productId, pin } = req.body;


  if (!productId || !pin) {
    return res.json({
      success: false,
      message: "Product ID and PIN required"
    });
  }

  try {
    // 1️⃣ Get admin (you may use email / role if multiple admins)
    const admin = await Admin.findOne(); // or findById if logged-in admin
  

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found"
      });
    }

    // 2️⃣ Compare entered PIN with hashed PIN
    const isPinValid = await bcrypt.compare(pin, admin.pin);

    if (!isPinValid) {
      return res.json({
        success: false,
        message: "Invalid PIN"
      });
    }

    // 3️⃣ Delete product
    await Product.findByIdAndDelete(productId);

    return res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});



module.exports = router;
