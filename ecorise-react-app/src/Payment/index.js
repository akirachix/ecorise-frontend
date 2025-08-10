
import React, { useState } from 'react';
import { useStkPush } from '../hooks/useStkPush';
import './style.css';
const PaymentForm = () => {
  
  const [form, setForm] = useState({
    phoneNumber: '',
    amount: '',
    accountReference: '',
    transactionDesc: ''
  });

  const { initiatePayment, loading, error, data } = useStkPush();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await initiatePayment(form);
  };

 return (
  
  <div className="payment-form-container">
    <form onSubmit={handleSubmit} className="payment-form">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Ecorise Payment Platform</h1>

      <label className="payment-label">
        Phone Number:
        <input
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label className="payment-label">
        Amount:
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
          min="1"
        />
      </label>

      <label className="payment-label">
        Account Reference:
        <input
          name="accountReference"
          type="text"
          value={form.accountReference}
          onChange={handleChange}
          required
        />
      </label>

      <label className="payment-label">
        Transaction Description:
        <textarea
          name="transactionDesc"
          value={form.transactionDesc}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" disabled={loading} className="payment-button">
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {error && <p className="error-message">{error}</p>}
      {data && <p className="success-message">Payment initiated successfully!</p>}
    </form>
    </div>

);

  
};

export default PaymentForm;

