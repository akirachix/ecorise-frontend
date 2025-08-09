
import React from 'react';
import { FaHome, FaTruck, FaList, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const activeRouteMap = {
    "/dashboard": "Home",
    "/pickup": "Pick-up",
    "/material": "Inventory",
    "/payment": "Payment",
    "/feedback": "Feedback",
  
  };

  
  const currentPage = activeRouteMap[location.pathname] || "";

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
            onClick={() => navigate("/dashboard")}
          >
            <FaHome className="icon" /> <span className="nav-text">Home</span>
          </li>
          <li
            className={`sidebar-item${currentPage === "Pick-up" ? " active" : ""}`}
            onClick={() => navigate("/pickup")}
          >
            <FaTruck className="icon" /> <span className="nav-text">Pick up</span>
          </li>
          <li
            className={`sidebar-item${currentPage === "Inventory" ? " active" : ""}`}
            onClick={() => navigate("/material")}
          >
            <FaList className="icon" /> <span className="nav-text">Inventory</span>
          </li>
          <li
            className={`sidebar-item${currentPage === "Payment" ? " active" : ""}`}
            onClick={() => navigate("/payment")}
          >
            <FaCreditCard className="icon" /> <span className="nav-text">Payment</span>
          </li>
          <li
            className={`sidebar-item${currentPage === "Feedback" ? " active" : ""}`}
            onClick={() => navigate("/feedback")}
          >
            <FaComments className="icon" /> <span className="nav-text">Feedback</span>
          </li>
        </ul>
      </nav>
      <div className="settings">
        <ul>
          <li className="sidebar-item">
            <Link to="/settings">
              <FaCog className="icon" /> <span className="nav-text">Settings</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/login">
              <FaSignOutAlt className="/login" /> <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
