import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../shared-components/sidebar";
import useFetchDashboardData from "../hooks/useFetchPickupData.js";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ROW_OPTIONS = [5, 10, 15, "All"];

function PickupTable({ onMaterialClick }) {
  const { pickups: allPickups, loading, error } = useFetchDashboardData();
  const navigate = useNavigate();

  const [localPickups, setLocalPickups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null); 
  const [paidPickups, setPaidPickups] = useState(new Set());

  useEffect(() => {
    if (!loading && allPickups.length) {
      setLocalPickups(allPickups);
      setCurrentPage(1);
    }
  }, [allPickups, loading]);

  const toggleStatus = (id) => {
    setLocalPickups((prev) =>
      prev.map((item) =>
        (item._id || item.request_id) === id
          ? { ...item, status: item.status === "Pending" ? "Confirmed" : "Pending" }
          : item
      )
    );
  };

  const filteredPickups = useMemo(() => {
    if (!searchTerm.trim()) return localPickups;
    const lowerSearch = searchTerm.toLowerCase();

    return localPickups.filter((item) => {
      const fieldsToSearch = [
        (item._id || item.request_id || "").toString(),
        item.name || "",
        item.phone || "",
        item.material || "",
        item.location || "",
        item.createdAt ? new Date(item.createdAt).toLocaleString() : "",
        item.status || "",
      ];

      return fieldsToSearch.some((field) => field.toLowerCase().includes(lowerSearch));
    });
  }, [localPickups, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const totalRows = filteredPickups.length;
  const effectiveRowsPerPage = rowsPerPage === "All" ? totalRows : rowsPerPage;
  const totalPages = Math.ceil(totalRows / effectiveRowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedPickups = useMemo(() => {
    if (rowsPerPage === "All") return filteredPickups;
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredPickups.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPickups, currentPage, rowsPerPage]);

  const totalConfirmed = filteredPickups.filter((p) => p.status === "Confirmed").length;
  const totalPending = filteredPickups.filter((p) => p.status === "Pending").length;

  const handlePaymentClick = (pickup) => {
    const pickupId = pickup._id || pickup.request_id;
    if (paidPickups.has(pickupId)) {
      alert("Payment has already been made for this request.");
      return;
    }

    if (pickup.status !== "Confirmed") {
      alert("Payment can only be made when status is Confirmed.");
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to make payment to ${pickup.name || "this trader"}?`);
    if (confirmed) {
     
      setPaidPickups((prev) => new Set(prev).add(pickupId));    
      navigate(`/payment/${pickupId}`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!localPickups.length) return <div className="no-data">No pickup requests found.</div>;

  return (
    <div className="pickup-main-container">
      <Sidebar />
      <div className="pickup-table-container">
        <header className="pickup-header">
          <div className="title">ECORISE</div>
          <div className="search-container">
            <label htmlFor="searchInput" className="search-label"></label>
            <input
              id="searchInput"
              className="search-input"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="pickup-request-bar">
          <p>PickUp Requests</p>
        </div>

        <section className="pickup-section">
          <table className="pickup-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Trader's Name</th>
                <th>Phone Number</th>
                <th>Material</th>
                <th>Location</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPickups.map((pickup) => {
                const rowId = pickup._id || pickup.request_id;
                const isSelected = selectedRowId === rowId;
                const isPaid = paidPickups.has(rowId);
                const canPay = pickup.status === "Confirmed" && !isPaid;

                return (
                  <tr
                    key={rowId}
                    className={`${pickup.status === "Pending" ? "pending-row" : "confirmed-row"} ${
                      isSelected ? "selected-row" : ""
                    }`}
                    onClick={() => setSelectedRowId(rowId)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{rowId}</td>
                    <td>{pickup.name || "Unknown"}</td>
                    <td>{pickup.phone || "Unknown"}</td>
                    <td>{pickup.material || "Unknown"}</td>
                    <td>{pickup.location || ""}</td>
                    <td>{pickup.createdAt ? new Date(pickup.createdAt).toLocaleString() : "N/A"}</td>
                    <td>
                      <button
                        className={`status-button ${pickup.status === "Pending" ? "pending" : "confirmed"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(rowId);
                        }}
                        type="button"
                      >
                        {pickup.status}
                      </button>
                    </td>

                    <td>
                      <button
                        className="payment-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePaymentClick(pickup);
                        }}
                        type="button"
                        disabled={!canPay}
                        title={
                          !canPay
                            ? isPaid
                              ? "Payment already made"
                              : "Payment allowed only if status is Confirmed"
                            : "Make Payment"
                        }
                      >
                        {isPaid ? "Paid" : "Pay"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination-controls">
            <div className="rows-per-page-selector">
              <label htmlFor="rowsPerPage" className="rows-label">
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) => {
                  const val = e.target.value === "All" ? "All" : Number(e.target.value);
                  setRowsPerPage(val);
                  setCurrentPage(1);
                }}
              >
                {ROW_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="page-navigation">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                type="button"
              >
                Previous
              </button>
              <span>
                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                type="button"
              >
                Next
              </button>
            </div>

            <div className="total-count">
              Confirmed: <span className="confirmed-count">{totalConfirmed}</span> | Pending:{" "}
              <span className="pending-count">{totalPending}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default PickupTable;