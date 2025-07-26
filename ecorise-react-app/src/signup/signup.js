import React, { useState } from 'react';
import './signup.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleTogglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    alert('Signed Up Successfully!');
  };

  return (
    <div className="signup-container">
      <div className="signup-image-side">
        <img
          src="/Images/clothe.png"
          alt="Clothes"
          className="signup-image"
        />
      </div>
      <div className="signup-form-side">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-title">Sign Up</h2>

          <div className="signup-input-group">
            <label className="signup-label">Username</label>
            <div className="signup-input-wrapper">
              <FaUser className="signup-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="signup-input"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Email</label>
            <div className="signup-input-wrapper">
              <FaEnvelope className="signup-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="signup-input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Password</label>
            <div className="signup-input-wrapper">
              <FaLock className="signup-icon" />
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="signup-input"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="signup-eye-icon"
                onClick={() => handleTogglePassword('password')}
                tabIndex={0}
                role="button"
                aria-label={showPassword.password ? "Hide password" : "Show password"}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Confirm Password</label>
            <div className="signup-input-wrapper">
              <FaLock className="signup-icon" />
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Password"
                className="signup-input"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="signup-eye-icon"
                onClick={() => handleTogglePassword('confirmPassword')}
                tabIndex={0}
                role="button"
                aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <div className="signup-error">{error}</div>}

          <button className="signup-btn" type="submit">
            Sign Up
          </button>

          <div className="signup-footer">
            Already have an account?{' '}
            <a href="/login" className="signup-link">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;