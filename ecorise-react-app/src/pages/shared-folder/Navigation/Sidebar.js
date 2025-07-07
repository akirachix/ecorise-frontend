import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaTasks, FaMoneyCheckAlt, FaComments } from "react-icons/fa";
import "./Sidebar.css";

export default function App({ children }) {
  const navigate = useNavigate();
  const marketOptions = [
    { value: "gikomba", label: "Gikomba" },
    { value: "mtindwa", label: "Mtindwa" },
    { value: "muthurwa", label: "Muthurwa" },
    { value: "ngara", label: "Ngara" },
    { value: "toy", label: "Toy" },
  ];

  const handleMarketSelect = (event) => {
    const market = event.target.value;
    if (market) {
      navigate(`/pickup/${market}`);
    }
  };

  return (
    <div className="layout">
      <header className="ecorise-header">
        <h1>ECORISE</h1>
      </header>
      <div className="main-row">
        <nav className="side-nav">
          <div className="nav-link pickup-container">
            <span className="nav-icon"><FaCalendarAlt /></span>
            <select
              className="pickup-dropdown nav-link"
              onChange={handleMarketSelect}
              defaultValue=""
              aria-label="Select a market for pick-up schedule"
            >
              <option value="" disabled>
                Pick-up
              </option>
              {marketOptions.map((market) => (
                <option key={market.value} value={market.value}>
                  {market.label}
                </option>
              ))}
            </select>
          </div>
          <NavLink
            to="/traders"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            <span className="nav-icon"><FaTasks /></span>
            Trader management
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            <span className="nav-icon"><FaMoneyCheckAlt /></span>
            Payment & Logistics
          </NavLink>
          <NavLink
            to="/feedback"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            <span className="nav-icon"><FaComments /></span>
            Feedback
          </NavLink>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}