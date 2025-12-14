const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ==========================
// CREATE ORDER
// ==========================
router.post("/create", async (req, res) => {
  try {
    const { email, name, mobile, address, orders } = req.body;

    // 🔒 Basic validation
    if (!email || !name || !mobile || !address || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    // 🧮 Process order items safely
    const processedOrders = orders.map((item) => {
      if (
        !item.productId ||
        !item.name ||
        !item.price ||
        !item.quantity
      ) {
        throw new Error("Invalid order item data");
      }

      return {
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        totalPrice: Number(item.price) * Number(item.quantity),
      };
    });

    // 🧾 Calculate grand total
    const grandTotal = processedOrders.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    // 📦 Create order
    const newOrder = new Order({
      email,
      name,
      mobile,
      address,
      orders: processedOrders,
      totalAmount: grandTotal,
      status: "Pending",
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
    });

  } catch (err) {
    console.error("Order save error:", err);
    return res.status(500).json({
      message: "Server error while saving order",
    });
  }
});


// ==========================
// GET ALL ORDERS (ADMIN)
// ==========================
router.get("/", async (req, res) => {
  try {
    const allOrders = await Order.find()
      .sort({ createdAt: -1 });

    return res.status(200).json(allOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
