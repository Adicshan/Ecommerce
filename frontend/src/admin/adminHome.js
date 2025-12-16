import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminHome.css";

function AdminHome() {
  const [showSignup, setShowSignup] = useState(false);
  const [successLoginMsg, setSuccessLoginMsg] = useState("");
  const [successSignupMsg, setSuccessSignupMsg] = useState("");

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    digit: false,
    special: false,
  });

  const validatePassword = (password) => {
    return {
      length: password.length >= 8 && password.length <= 15,
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]/.test(password),
    };
  };

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    pin: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      const checks = validatePassword(value);
      setPasswordChecks(checks);
    }

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminLogin = async () => {
    try {
      await axios.post("https://ecommerce-83qh.onrender.com/api/admin/auth/login", {
        email: adminData.email,
        password: adminData.password,
      });

      setSuccessLoginMsg("Login Successful ✔");
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch {
      setSuccessLoginMsg("Login Failed ❌");
    }
  };

  const handleAdminSignup = async () => {
    const passValid =
      passwordChecks.length &&
      passwordChecks.uppercase &&
      passwordChecks.digit &&
      passwordChecks.special;

    if (!passValid) {
      setSuccessSignupMsg("Password does NOT meet required conditions ❌");
      return;
    }

    if (adminData.password !== adminData.confirmPassword) {
      setSuccessSignupMsg("Passwords do NOT match ❌");
      return;
    }

    if (!/^\d{4,6}$/.test(adminData.pin)) {
      setSuccessSignupMsg("PIN must be 4 or 6 digits ❌");
      return;
    }

    try {
      await axios.post("https://ecommerce-83qh.onrender.com/api/admin/auth/signup", {
        name: adminData.name,
        email: adminData.email,
        mobile: adminData.mobile,
        password: adminData.password,
        pin: adminData.pin,
      });

      setSuccessSignupMsg("Signup Successful ✔ Switching to Login...");
      setTimeout(() => {
        setShowSignup(false);
        setSuccessSignupMsg("");
      }, 2000);
    } catch {
      setSuccessSignupMsg("Signup Failed ❌");
    }
  };

  return (
    <div className="pageWrapper">
      <div className="cardStyle">

        

        {/* ======================= LOGIN UI ======================= */}
      {!showSignup && (
  <div className="container">

    <div className="row g-4">

      {/* LEFT SECTION - INFO MESSAGE */}
      <div className="col-md-6 col-12 d-flex flex-column justify-content-center">
        <div className="login-info">
          <p id="loginInfo">
            Secure access to your admin dashboard
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - LOGIN FORM */}
      <div id="adminLogin" className="col-md-6 col-12 d-flex flex-column justify-content-center">

        <h2 id="login-title" className="title text-center mb-4">Admin Login</h2>

        <div className="row g-3">

          {/* Email */}
          <div className="col-12">
            <label htmlFor="login-email" className="inputLabel">Admin Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter your admin email"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="col-12">
            <label htmlFor="login-password" className="inputLabel">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>
          {successLoginMsg && <div id="success-message">{successLoginMsg}</div>}

          {/* Login Button */}
          <div className="col-12 mt-2">
            <button
              id="login-btn"
              className="btn small-btn w-100"
              onClick={handleAdminLogin}
            >
              Login
            </button>
          </div>

          {/* Switch to Signup */}
          <div className="col-12 text-center mt-2">
            <p id="login-switch-text" className="switchText">
              Don’t have an account?
              <span className="link" style={{cursor:"pointer"}} onClick={() => setShowSignup(true)}>
                {" "}Create Admin Account
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
)}


        {/* ======================= SIGNUP UI ======================= */}
        {showSignup && (
  <div className="container">

    <div className="row g-4">

      {/* LEFT SECTION - Description */}
      <div  className="col-md-6 col-12 d-flex flex-column justify-content-center">
        <div className="signup-info">
        <p id="signupInfo">Your secure gateway to the admin dashboard starts here</p>
        </div>
      </div>

      {/* RIGHT SECTION - SIGNUP FORM */}
      <div id="adminSignUp" className="col-md-6 col-12 justify-content-center align-items-center">

        <h2 id="signup-title" className="title text-center mb-4">Admin Signup</h2>

        <div className="row g-3">

          {/* Name */}
          <div className="col-12">
            <label htmlFor="signup-name" className="inputLabel">Full Name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="col-12">
            <label htmlFor="signup-email" className="inputLabel">Admin Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>

          {/* Mobile */}
          <div className="col-12">
            <label htmlFor="signup-mobile" className="inputLabel">Mobile Number</label>
            <input
              id="signup-mobile"
              name="mobile"
              type="text"
              maxLength="10"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>

          {/* Password + Icon */}
          <div className="col-12">
            <label htmlFor="signup-password" className="inputLabel">Create Password</label>

            <div className="password-wrapper w-100">
              <input
                id="signup-password"
                name="password"
                type="password"
                className="underline-input w-100"
                onChange={handleChange}
              />

              <span id="password-icon" className="password-icon">
                {passwordChecks.length &&
                passwordChecks.uppercase &&
                passwordChecks.digit &&
                passwordChecks.special ? (
                  <span className="icon-green">✔</span>
                ) : (
                  <span className="icon-red">✖</span>
                )}
              </span>
            </div>

            {/* Missing Conditions */}
            {!(
              passwordChecks.length &&
              passwordChecks.uppercase &&
              passwordChecks.digit &&
              passwordChecks.special
            ) && (
              <ul id="password-rules" className="password-rules mt-1">
                {!passwordChecks.length && <li>8–15 characters required</li>}
                {!passwordChecks.uppercase && <li>At least 1 Capital letter</li>}
                {!passwordChecks.digit && <li>At least 1 Digit</li>}
                {!passwordChecks.special && <li>At least 1 Special character</li>}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="col-12">
            <label htmlFor="signup-confirm-password" className="inputLabel">Confirm Password</label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>

          {/* PIN */}
          <div className="col-12">
            <label htmlFor="signup-pin" className="inputLabel">4-Digit Security PIN</label>
            <input
              id="signup-pin"
              name="pin"
              type="password"
              maxLength="4"
              className="underline-input w-100"
              onChange={handleChange}
            />
          </div>
           {successSignupMsg && <div id="success-message">{successSignupMsg}</div>}
          {/* Signup Button */}
          <div className="col-12 mt-2">
            <button id="signup-btn" className="btn small-btn w-100" onClick={handleAdminSignup}>
              Sign Up
            </button>
          </div>

          {/* Switch to Login */}
          <div className="col-12 text-center mt-2">
            <p id="signup-switch-text" className="switchText">
              Already have an account?
              <span className="link" style={{cursor:"pointer"}} onClick={() => setShowSignup(false)}>
                {" "}Login
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default AdminHome;
