import React, { useState, useEffect, useMemo } from "react";
import useFetchPickups from "../hooks/useFetchPickupData";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ROW_OPTIONS = [5, 10, 15, "All"];

function PickupPaginationBar({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  isAll,
  totalConfirmed,
  totalPending
}) {
  return (
    <div className="material-pagination-bar">
      <div>
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select
          id="rowsPerPage"
          className="material-pagination-select"
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(e.target.value === "All" ? "All" : Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {ROW_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {!isAll && totalPages > 1 && (
        <div className="material-pagination-controls">
          <button
            className="material-pagination-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            type="button"
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="material-pagination-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            type="button"
          >
            Next
          </button>
        </div>
      )}
      <div className="total-count" style={{ marginLeft: "auto", fontWeight: 500 }}>
        Confirmed: <span className="confirmed-count">{totalConfirmed}</span> | Pending: <span className="pending-count">{totalPending}</span>
      </div>
    </div>
  );
}

function PickupTable({ onMaterialClick }) {
  const { pickups: allPickups, loading, error } = useFetchPickups();
  const navigate = useNavigate();

  const [localPickups, setLocalPickups] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROW_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null); 
  const [paidPickups, setPaidPickups] = useState(new Set());

  useEffect(() => {
    setLocalPickups(allPickups);
  }, [allPickups]);

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
  const pageSize = rowsPerPage === "All" ? totalRows || 1 : rowsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const isAll = rowsPerPage === "All";

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedPickups = useMemo(() => {
    if (isAll) return filteredPickups;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredPickups.slice(startIndex, startIndex + pageSize);
  }, [filteredPickups, currentPage, pageSize, isAll]);

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
      navigate(`/payment`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!localPickups.length) return <div className="no-data">No pickup requests found.</div>;

  return (
    <div className="pickup-main-container">
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
        <PickupPaginationBar
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          isAll={isAll}
          totalConfirmed={totalConfirmed}
          totalPending={totalPending}
        />
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
              {paginatedPickups.map((pickup, idx) => {
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
        </section>
      </div>
    </div>
  );
}
export default PickupTable;