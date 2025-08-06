import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { signupUser } from '../utils/fetchUserprofiles';

function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  useEffect(() => {
    if (confirmPasswordRef.current) {
      if (form.confirmPassword && form.password !== form.confirmPassword) {
        confirmPasswordRef.current.setCustomValidity("Passwords do not match");
      } else {
        confirmPasswordRef.current.setCustomValidity("");
      }
    }
  }, [form.password, form.confirmPassword]);

  const handleTogglePassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.username,
        email: form.email,
        phone_number: form.phone_number,
        password: form.password,
      };
      await signupUser(payload);
      setSuccess('Signed up successfully! Please log in.');
      setForm({
        username: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image-side">
        <img src="/Images/clothe.png" alt="Clothes" className="signup-image" />
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
            <label className="signup-label">Phone Number</label>
            <div className="signup-input-wrapper">
              <FaPhone className="signup-icon" />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                className="signup-input"
                value={form.phone_number}
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
                aria-label={showPassword.password ? "Show password" : "Hide password"}
              >
                {showPassword.password ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="signup-input-group">
            <label className="signup-label">Confirm Password</label>
            <div className="signup-input-wrapper">
              <FaLock className="signup-icon" />
              <input
                ref={confirmPasswordRef}
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
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
                aria-label={showPassword.confirmPassword ? "Show password" : "Hide password"}
              >
                {showPassword.confirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}

          <button className="signup-btn" type="submit">Sign Up</button>

          <div className="signup-footer">
            Already have an account? <a href="/login" className="signup-link">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
