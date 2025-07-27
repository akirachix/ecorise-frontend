import React, { useState, useMemo, useEffect } from 'react';
import { useFeedback } from '../hooks/useFetchFeedback';
import './style.css';
const columns = [
  { label: 'Feedback ID', key: 'feedback_id' },
  { label: 'User Type', key: 'user_type' },
  { label: 'Created At', key: 'created_at' },
  { label: 'Feedback', key: 'feedback' },
  { label: 'User', key: 'user' },
];
function Feedback() {
  const { feedback, loading, error } = useFeedback();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.max(1, Math.ceil(feedback.length / rowsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  const pagedFeedback = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return feedback.slice(start, end);
  }, [feedback, currentPage, rowsPerPage]);
  if (loading) return <div className="feedback-loading">Loading feedback...</div>;
  if (error) return <div className="feedback-error">Error: {error}</div>;
  if (!feedback.length) return <div className="feedback-empty">No feedback available.</div>;
  return (
    <div className="main-content">
      <h1 className="feedback-title">Feedback </h1>
      {}
      <div className="pagination-controls" style={{ marginBottom: '1rem' }}>
        <label htmlFor="rows-per-page" style={{ marginRight: 8 }}>
          Rows per page:
        </label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="feedback-table-container">
        {}
        <div className="feedback-label-row" style={{ display: 'flex', fontWeight: 'bold' }}>
          {columns.map(({ label, key }) => (
            <div key={key} className="label-cell" style={{ flex: 1, padding: '0.5rem' }}>
              {label}
            </div>
          ))}
        </div>
        {}
        <div className="feedback-values-rows">
          {pagedFeedback.map((feedbackItem) => (
            <div
              key={feedbackItem.feedback_id}
              className="values-row"
              style={{ display: 'flex', borderBottom: '1px solid #ccc' }}
            >
              {columns.map(({ key }) => (
                <div key={`${feedbackItem.feedback_id}-${key}`} className="value-cell" style={{ flex: 1, padding: '0.5rem' }}>
                  {key === 'feedback_at' ? new Date(feedbackItem[key]).toLocaleDateString() : feedbackItem[key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {}
      <div
        className="pagination-controls"
        style={{ marginTop: '1rem', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
      >
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="pagination-button"
          style={{ padding: '0.5rem 1rem', marginRight: '1rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="pagination-button"
          style={{ padding: '0.5rem 1rem', marginLeft: '1rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Feedback;