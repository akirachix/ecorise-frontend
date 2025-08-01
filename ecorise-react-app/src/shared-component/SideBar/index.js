import React from 'react';
import { FaHome, FaTruck, FaList, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './style.css';

const Sidebar = () => {
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
          <li className="sidebar-item">
            <Link to="/home"> {}
              <FaHome className="icon" /> <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/pickup"> {}
              <FaTruck className="icon" /> <span className="nav-text">Pick up</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/inventory"> {}
              <FaList className="icon" /> <span className="nav-text">Inventory</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/payment"> {}
              <FaCreditCard className="icon" /> <span className="nav-text">Payment</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/feedback"> {}
              <FaComments className="icon" /> <span className="nav-text">Feedback</span>
            </Link>
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