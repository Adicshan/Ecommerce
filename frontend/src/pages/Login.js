// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid Credentials");

      // store user
      localStorage.setItem("user", JSON.stringify(data.user));
      // LOGIN SUCCESS



      setMsg(`Welcome ${data.user.name}!`);
      setTimeout(() => navigate("/account"), 800);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="auth-btn" type="submit">Login</button>

        <p className="auth-switch">
          New here? <Link to="/signup">Create Account</Link>
        </p>

        <p className="msg">{msg}</p>
      </form>
    </div>
  );
}
