const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

// -----------------------------------------
// GET ALL ORDERS WITH COMPLETE PRODUCT DATA
// -----------------------------------------
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    const allOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.orders.map(async (item) => {
            const product = await Product.findById(item.productId).lean();

            return {
              productId: item.productId,
              name: product?.name || "Unknown Product",
              image: product?.imageUrl || "",
              price: product?.price || 0,
              totalPrice: item.totalPrice || 0,
            };
          })
        );

        return {
          _id: order._id,
          name: order.name,
          email: order.email,
          mobile: order.mobile,
          address: order.address,
          items,
          createdAt: order.date,
        };
      })
    );

    res.json(allOrders);
  } catch (error) {
    console.error("Error loading orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
