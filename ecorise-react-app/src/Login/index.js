import React, { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./style.css";

function LoginScreen() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-image" />
      <div className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          
          <label className="login-label" htmlFor="username">Username</label>
          <div className="input-icon-wrapper">
            <FaUser className="input-icon" />
            <input
              id="username"
              name="username"
              className="login-input"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          
          <label className="login-label" htmlFor="email">Email</label>
          <div className="input-icon-wrapper">
            <MdEmail className="input-icon" />
            <input
              id="email"
              name="email"
              className="login-input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          
          <label className="login-label" htmlFor="password">Password</label>
          <div className="input-icon-wrapper">
            <input
              id="password"
              name="password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <span
              className="input-icon toggle-icon"
              onClick={() => setShowPassword((s) => !s)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-links">
            <a href="#" className="forgot-password">Forgot password?</a>
            <div className="signup-question">
              Don't have an account? <a href="#" className="signup-link">Sign Up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;