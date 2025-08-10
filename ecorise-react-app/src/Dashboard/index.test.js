import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Dashboard from './index';


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});


import * as useUsers from '../hooks/useFetchUser';
import * as usePickups from '../hooks/useFetchPickups';
import * as useProducts from '../hooks/useFetchProducts';
import * as usePayment from '../hooks/useFetchPayments';

const renderDashboard = () =>
  render(
    <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
      <Dashboard />
    </BrowserRouter>
  );

describe('Dashboard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading when any hook is loading', () => {
    jest.spyOn(useUsers, 'useUsers').mockReturnValue({ data: [], loading: true, error: null });
    jest.spyOn(usePickups, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(useProducts, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(usePayment, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    renderDashboard();
    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  test('shows error message when useUsers returns error', () => {
    jest.spyOn(useUsers, 'useUsers').mockReturnValue({ data: [], loading: false, error: 'Fetch failed' });
    jest.spyOn(usePickups, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(useProducts, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(usePayment, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    renderDashboard();
    expect(screen.getByText(/error loading dashboard: fetch failed/i)).toBeInTheDocument();
  });

  test('renders statistics, cards, gauge, and market list with valid data', () => {
    const users = [{ id: 1 }, { id: 2 }];
    const pickups = [
      { pickup_id: 1, pickup_status: 'Pending', market_location: 'Market A', material: 101 },
      { pickup_id: 2, pickup_status: 'Completed', market_location: 'Market B', material: 102 },
      { pickup_id: 3, pickup_status: 'Pending', market_location: 'Market A', material: 101 },
    ];
    const products = [
      { product_id: 101, quantity: 10, listed_at: '2023-07-01', price: 100 },
      { product_id: 102, quantity: 5, listed_at: '2023-07-02', price: 150 },
    ];
    const payment = [
      { id: 1, amount: 200, points_award: 50, paid_at: '2023-07-01' },
      { id: 2, amount: 300, points_award: 100, paid_at: '2023-07-02' },
    ];

    jest.spyOn(useUsers, 'useUsers').mockReturnValue({ data: users, loading: false, error: null });
    jest.spyOn(usePickups, 'usePickups').mockReturnValue({ data: pickups, loading: false, error: null });
    jest.spyOn(useProducts, 'useProducts').mockReturnValue({ data: products, loading: false, error: null });
    jest.spyOn(usePayment, 'usePayment').mockReturnValue({ data: payment, loading: false, error: null });

    renderDashboard();

    expect(screen.getByText(/total traders/i).parentElement).toHaveTextContent(users.length.toString());
    expect(screen.getByText(/total collected materials/i).parentElement).toHaveTextContent(pickups.length.toString());

    const totalPoints = payment.reduce((sum, p) => sum + p.points_award, 0);
    expect(screen.getByText(/points awarded/i).parentElement).toHaveTextContent(totalPoints.toString());

    expect(screen.getByText(/available product reward/i).parentElement).toHaveTextContent(products.length.toString());

    const pendingCount = pickups.filter(p => p.pickup_status === 'Pending').length.toString();
    expect(screen.getByText(/pending pickup requests/i).parentElement).toHaveTextContent(pendingCount);

   
    const totalAmountPaid = payment.reduce((sum, p) => sum + p.amount, 0);
    expect(screen.getByText(/total amount paid/i).parentElement.textContent).toMatch(/Ksh/);


    fireEvent.click(screen.getByText(/total traders/i).closest('div.dashboard-stat-card'));
    expect(mockNavigate).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/available product reward/i).closest('div.dashboard-stat-card'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});