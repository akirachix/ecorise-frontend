import React, { useState } from "react";
import "./style.css";

const clothesImg = "/Images/clothe.png";

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
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className=" toggle-btn-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className="input-container">
            <input
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
              {showCPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
