import React from 'react';
import { FaHome, FaTruck, FaList, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './style.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [currentPage, setCurrentPage] = React.useState('Home');
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
              navigate("/payments");
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
            <FaCog className="icon" /> <span className="nav-text">Settings</span>
          </li>
          <li className="sidebar-item">
            <FaSignOutAlt className="icon" /><span className="nav-text">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;