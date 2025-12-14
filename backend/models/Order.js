const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number, // price per unit at order time
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
});


const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  orders: [OrderItemSchema], // array of products
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
