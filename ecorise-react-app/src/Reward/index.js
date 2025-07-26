import React, { useState, useMemo, useEffect } from 'react';
import { useRewards } from '../hooks/useFectchRewards';
import './style.css';

const columns = [
  { label: 'Reward ID', key: 'reward_id' },
  { label: 'Reward', key: 'rewards' },
  { label: 'Date', key: 'rewards_at' },
  { label: 'User ID', key: 'user' },
  { label: 'Recycled Clothes', key: 'recycled_clothes' },
];

function Rewards() {
  const { rewards, loading, error } = useRewards();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const totalPages = Math.max(1, Math.ceil(rewards.length / rowsPerPage));

 
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  
  const pagedRewards = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rewards.slice(start, end);
  }, [rewards, currentPage, rowsPerPage]);

  if (loading) return <div className="rewards-loading">Loading rewards...</div>;
  if (error) return <div className="rewards-error">Error: {error}</div>;
  if (!rewards.length) return <div className="rewards-empty">No rewards available.</div>;

  return (
    <div className="main-content">
      <h1 className="rewards-title">Rewards List</h1>

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

      <div className="rewards-table-container">
        {}
        <div className="rewards-label-row" style={{ display: 'flex', fontWeight: 'bold' }}>
          {columns.map(({ label, key }) => (
            <div key={key} className="label-cell" style={{ flex: 1, padding: '0.5rem' }}>
              {label}
            </div>
          ))}
        </div>

        {}
        <div className="rewards-values-rows">
          {pagedRewards.map((reward) => (
            <div
              key={reward.reward_id}
              className="values-row"
              style={{ display: 'flex', borderBottom: '1px solid #ccc' }}
            >
              {columns.map(({ key }) => (
                <div key={`${reward.reward_id}-${key}`} className="value-cell" style={{ flex: 1, padding: '0.5rem' }}>
                  {key === 'rewards_at' ? new Date(reward[key]).toLocaleDateString() : reward[key]}
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

export default Rewards;
