const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup Data Received:", email);

  try {
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Email already registered. Use another email."
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.json({
      message: "Signup successful",
      user: { name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Password" });

    res.json({
      message: "Login success",
      user: { name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
