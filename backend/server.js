const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));  // <-- NEW



const adminAuth = require("./routes/adminAuth");

app.use("/api/admin/auth", adminAuth);

app.use("/api/admin/products", require("./routes/adminProduct"));
app.use("/api/admin/products/delete", require("./routes/adminProduct"));
app.use("/api/admin/orders", require("./routes/adminOrder"));


app.use("/api/products", require("./routes/product"));


// MAIN ROUTES
app.use("/api/orders", require("./routes/orders"));  // <-- NEW


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
