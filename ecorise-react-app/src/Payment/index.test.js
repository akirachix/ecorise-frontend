import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentForm from '.';


jest.mock('../hooks/useStkPush', () => ({
  useStkPush: jest.fn(),
}));

import { useStkPush } from '../hooks/useStkPush';

describe('PaymentForm', () => {
  const mockInitiatePayment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (overrides = {}) => {
    useStkPush.mockReturnValue({
      initiatePayment: mockInitiatePayment,
      loading: false,
      error: null,
      data: null,
      ...overrides,
    });

    render(<PaymentForm />);
  };

  test('renders all input fields and the submit button', () => {
    setup();

    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Reference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Transaction Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pay Now/i })).toBeInTheDocument();
  });

  test('allows user to fill out the form and submits with correct data', () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0712345678' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Account Reference/i), { target: { value: 'ECORISE123' } });
    fireEvent.change(screen.getByLabelText(/Transaction Description/i), { target: { value: 'Payment for services' } });

    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));

    expect(mockInitiatePayment).toHaveBeenCalledWith({
      phoneNumber: '0712345678',
      amount: '500',
      accountReference: 'ECORISE123',
      transactionDesc: 'Payment for services',
    });
  });

  test('disables submit button and shows processing text when loading', () => {
    setup({ loading: true });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Processing.../i);
  });

  test('displays error message if error exists', () => {
    setup({ error: 'Payment failed' });

    expect(screen.getByText(/Payment failed/i)).toBeInTheDocument();
  });

  test('displays success message if data exists', () => {
    setup({ data: { transactionId: '123' } });

    expect(screen.getByText(/Payment initiated successfully!/i)).toBeInTheDocument();
  });
});
