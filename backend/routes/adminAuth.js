const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");   // admin model

// -------------------- ADMIN SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password, pin } = req.body;
    console.log("password:", password);
    // 🔍 Check required fields
    if (!name || !email || !mobile || !password || !pin) {
      return res.status(400).json({ msg: "All fields are required" });
    }

  
    // 📧 Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists with email:", email);
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // 🔐 Hash password & pin
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);

    // ➕ Create new admin
    const admin = new Admin({
      name,
      email,
      mobile,
      password: hashedPassword,
      pin: hashedPin,
    });

    await admin.save();

    res.json({ msg: "Admin Signup Successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// -------------------- ADMIN LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const token = jwt.sign({ id: admin._id }, "SECRET123", {
      expiresIn: "1d",
    });

    res.json({
      msg: "Admin Login Successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
