import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const clothesImg = "/Images/clothe.png";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/new-password");
  };

  return (
    <div className="container-forgot-password">
      <div className="img-section">
        <img src={clothesImg} alt="clothes" />
      </div>
      <div className="form-section">
        <h2>Forgot password</h2>
        <p>Enter your phone number or email to reset your password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
        <a className="back-login" href="/login">
          Back to login
        </a>
      </div>
    </div>
  );
}
