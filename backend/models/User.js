const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  // NEW FIELDS (from order form)
  address: { type: String, default: "" },
  mobile: { type: String, default: "" },

  // ORDERS ARRAY
  orders: [
    {
      productId: { type: String, required: true },
      totalPrice: { type: Number, required: true },
      orderedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
