import React from 'react';
import { FaHome, FaTruck, FaList, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const [currentPage, setCurrentPage] = useState("Home"); 
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/Images/company.png" alt="Africa Collect Logo" />
        <div className="logo-text">
          <h2 className="bold-text">Africa Collect</h2>
          <p className="regular-text">Recycling Company</p>
        </div>
      </div>
      <nav>
              <ul>
                <li
                  className={`sidebar-item${currentPage === "Home" ? " active" : ""}`}
                  onClick={() => {
                    setCurrentPage("Home");
                    navigate("/dashboard"); 
                  }}
                >
                  <FaHome className="icon" /> <span className="nav-text">Home</span>
                </li>
                <li
                  className={`sidebar-item${currentPage === "Pick-up" ? " active" : ""}`}
                  onClick={() => setCurrentPage("Pick-up")}
                >
                  <FaTruck className="icon" /> <span className="nav-text">Pick up</span>
                </li>
                <li
                  className={`sidebar-item${currentPage === "Inventory" ? " active" : ""}`}
                  onClick={() => setCurrentPage("Inventory")}
                >
                  <FaList className="icon" /> <span className="nav-text">Inventory</span>
                </li>
                <li
                  className={`sidebar-item${currentPage === "Payment" ? " active" : ""}`}
                  onClick={() => {
                    setCurrentPage("Payment");
                    navigate("/payment");
                  }}
                >
                  <FaCreditCard className="icon" /> <span className="nav-text">Payment</span>
                </li>
                <li
                  className={`sidebar-item${currentPage === "Feedback" ? " active" : ""}`}
                  onClick={() => setCurrentPage("Feedback")}
                >
                  <FaComments className="icon" /> <span className="nav-text">Feedback</span>
                </li>
              </ul>
            </nav>
      <div className="settings">
        <ul>
          <li className="sidebar-item">
            <Link to="/settings"> {}
              <FaCog className="icon" /> <span className="nav-text">Settings</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/logout"> {}
              <FaSignOutAlt className="icon" /> <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
