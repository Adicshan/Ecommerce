import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./Product";
import Cart from "./Cart";
import OrderForm from "./OrderForm";
import Account from "./pages/Account";


/* ADMIN PAGES */
import AdminHome from "./admin/adminHome";
import AdminDashboard from "./admin/adminDashboard";
import AdminAddProduct from "./admin/adminAddProduct";

function App() {
  // 1) cart state at top level
  const [cart, setCart] = useState([]);

  // 2) addToCart: always use setter (functional form recommended)
const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (item) =>
        item._id === product._id &&
        item.userEmail === product.userEmail
    );

    // 🔁 If product already exists for SAME user → increase quantity
    if (existingItem) {
      return prevCart.map((item) =>
        item._id === product._id &&
        item.userEmail === product.userEmail
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // 🆕 New product for this user
    return [...prevCart, { ...product, quantity: 1 }];
  });
};


  // 3) clear cart if you need
  const clearCart = () => setCart([]);

  return (
    <Router>
      <Routes>
        {/* User routes with TopBar (layout receives cart count) */}
        <Route element={<UserLayout cartCount={cart.length} />}>
          <Route path="/" element={<Home addToCart={addToCart} productList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} clearCart={clearCart} />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderForm cart={cart} clearCart={clearCart} />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<AdminAddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
