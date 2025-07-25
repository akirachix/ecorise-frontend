import React, { useState } from "react";
import "./style.css";

const clothesImg = "/Images/clothe.png";

const EyeIcon = ({ color = "#942222" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ color = "#942222" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.94 17.94A9.875 9.875 0 0112 19c-7 0-10-7-10-7a15.598 15.598 0 014.42-5.88M3 3l18 18" />
  </svg>
);

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successful!");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <div className="img-section">
        <img src={clothesImg} alt="clothes" />
      </div>
      <div className="form-section">
        <h2>Enter new password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password-input" className="input-label">
            New password
          </label>
          <div className="input-container">
            <input
              id="new-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-btn-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <label htmlFor="confirm-password-input" className="input-label">
            Confirm password
          </label>
          <div className="input-container">
            <input
              id="confirm-password-input"
              type={showCPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-btn-confirm"
              onClick={() => setShowCPassword(!showCPassword)}
              aria-label={showCPassword ? "Hide confirm password" : "Show confirm password"}
              tabIndex={-1}
            >
              {showCPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
