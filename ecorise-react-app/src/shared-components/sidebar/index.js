import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaTruck, FaList, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from 'react-icons/fa';
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
          <li className="sidebar-item"><FaHome className="icon" /> <span className="nav-text">Home</span></li>
          <li className="sidebar-item"><FaTruck className="icon" /> <span className="nav-text">Pick up</span></li>
          <li className="sidebar-item"><FaList className="icon" /> <span className="nav-text">Inventory</span></li>
          <li className="sidebar-item"><FaCreditCard className="icon" /> <span className="nav-text">Payment</span></li>
          <li className="sidebar-item"><FaComments className="icon" /> <span className="nav-text">Feedback</span></li>
        </ul>
      </nav>
      <div className="settings">
        <ul>
          <li className="sidebar-item"><FaCog className="icon" /> <span className="nav-text">Settings</span></li>
          <li className="sidebar-item"><FaSignOutAlt className="icon" /> <span className="nav-text">Logout</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
