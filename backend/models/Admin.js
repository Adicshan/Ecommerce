const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  
  mobile: { type: String, required: true },

  password: { type: String, required: true },

  pin: { type: String, required: true },   // For account recovery or extra security
});

module.exports = mongoose.model("Admin", AdminSchema);
