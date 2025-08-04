import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './index';
import * as hooks from '../hooks/useFetchDashboard';
import { BrowserRouter } from 'react-router-dom';
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

const renderDashboard = () =>
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

describe('Dashboard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading when any hook is loading', () => {
    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: [], loading: true, error: null });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: [], loading: false, error: null });
  });

  test('shows error message when useUsers returns error', () => {
    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: [], loading: false, error: 'Fetch failed' });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: [], loading: false, error: null });
  });

  test('renders statistics, cards, gauge, and market list with valid data', () => {
    const users = [{ id: 1 }, { id: 2 }];
    const pickups = [
      { pickup_id: 1, pickup_status: 'Pending', market_location: 'Market A', material: 101 },
      { pickup_id: 2, pickup_status: 'Completed', market_location: 'Market B', material: 102 },
      { pickup_id: 3, pickup_status: 'Pending', market_location: 'Market A', material: 101 }
    ];
    const products = [
      { product_id: 101, quantity: 10, listed_at: '2023-07-01', price: 100 },
      { product_id: 102, quantity: 5, listed_at: '2023-07-02', price: 150 }
    ];
    const payment = [
      { id: 1, amount: 200, points_award: 50, paid_at: '2023-07-01' },
      { id: 2, amount: 300, points_award: 100, paid_at: '2023-07-02' }
    ];
    const rewards = [];

    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: users, loading: false, error: null });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: pickups, loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: products, loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: payment, loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: rewards, loading: false, error: null });

    renderDashboard();

    fireEvent.click(screen.getByText(/total traders/i).closest('div[role="button"]'));
    expect(mockNavigate).toHaveBeenCalledWith('/trader');

    fireEvent.click(screen.getByText(/available product reward/i).closest('div[role="button"]'));
    expect(mockNavigate).toHaveBeenCalledWith('/Reward');
  });

  test('handles zero pickups correctly and shows 0% gauge', () => {
    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: [], loading: false, error: null });

    renderDashboard();
  });
});
