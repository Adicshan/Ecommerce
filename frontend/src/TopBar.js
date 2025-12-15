// src/components/TopBar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopBar.css";
import "bootstrap/dist/css/bootstrap.min.css";


const cartIcon = `${process.env.PUBLIC_URL}/images/shopping-cart.png`;
const homeIcon = `${process.env.PUBLIC_URL}/images/house.png`;

export default function TopBar({ cartCount }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

const handleHome = () => {
  navigate(user ? "/account" : "/");
};

  return (
     <div id="topBar" className="container-fluid mt-0">
      <div className="row">

  

    {/* LEFT: Brand */}
    <div className="col-6 d-flex justify-content-start">
      <span className="brand-title">Adicshan</span>
    </div>

    {/* RIGHT: Account + Cart */}
    <div className="col-6 d-flex justify-content-end align-items-center gap-3">
        <div className="homeIcon">
        <img
  src={homeIcon}
  alt="Home"
  className="homeImg"
  onClick={handleHome}
  role="button"
  style={{ cursor: "pointer" }}
/>

        </div>
      {/* Account */}
      {user ? (
        <div className="user-box d-flex align-items-center gap-2">
          <Link to="/account" className="account-link" style={{color:"black"}}>
            👤 {user.name}
          </Link>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="account-link" style={{color:"black"}}>
          Login / Sign Up
        </Link>
      )}

      {/* Cart */}
      <div className="cart-container position-relative">
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="cartIcon" />
        </Link>
        {cartCount > 0 && (
          <span className="cartCount">{cartCount}</span>
        )}
     

  </div>
</div>

      </div>
    </div>



      
  );
}
