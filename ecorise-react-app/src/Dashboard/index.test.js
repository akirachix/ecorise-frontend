
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';
import Dashboard from './index';
import * as hooks from '../hooks/useFetchDashboard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('./index', () => () => <div>DashboardMock</div>);

describe('App routing', () => {
  const renderWithRoute = (route) => render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

  test('renders Dashboard on /dashboard route', async () => {
    renderWithRoute('/dashboard');
    expect(await screen.findByText('DashboardMock')).toBeInTheDocument();
  });

  test('renders LoginScreen on /login route', async () => {
    renderWithRoute('/login');
    expect(await screen.findByText('LoginScreenMock')).toBeInTheDocument();
  });

  test('renders nothing on unknown route', () => {
    renderWithRoute('/unknown');
    expect(screen.queryByText('DashboardMock')).not.toBeInTheDocument();
    expect(screen.queryByText('LoginScreenMock')).not.toBeInTheDocument();
  });
});

const renderDashboard = () => render(
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

    renderDashboard();

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  test('shows error message when useUsers returns error', () => {
    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: [], loading: false, error: 'Fetch failed' });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: [], loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: [], loading: false, error: null });

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
    const rewards = [];

    jest.spyOn(hooks, 'useUsers').mockReturnValue({ data: users, loading: false, error: null });
    jest.spyOn(hooks, 'usePickups').mockReturnValue({ data: pickups, loading: false, error: null });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({ data: products, loading: false, error: null });
    jest.spyOn(hooks, 'usePayment').mockReturnValue({ data: payment, loading: false, error: null });
    jest.spyOn(hooks, 'useRewards').mockReturnValue({ data: rewards, loading: false, error: null });

    renderDashboard();

    expect(screen.getByText(/total traders/i).parentElement).toHaveTextContent(users.length.toString());
    expect(screen.getByText(/total collected materials/i).parentElement).toHaveTextContent(pickups.length.toString());

    const totalPoints = payment.reduce((sum, p) => sum + p.points_award, 0);
    expect(screen.getByText(/points awarded/i).parentElement).toHaveTextContent(totalPoints.toString());

    expect(screen.getByText(/available product reward/i).parentElement).toHaveTextContent(products.length.toString());

    const pendingCount = pickups.filter(p => p.pickup_status === 'Pending').length.toString();
    expect(screen.getByText(/pending pickup requests/i).parentElement).toHaveTextContent(pendingCount);

    const totalAmountPaid = payment.reduce((sum, p) => sum + p.amount, 0).toString();
    expect(screen.getByText(/total amount paid/i).parentElement).toHaveTextContent(totalAmountPaid);

    fireEvent.click(screen.getByText(/total traders/i).closest('div[role="button"]'));
    expect(mockNavigate).toHaveBeenCalledWith('/trader');

    fireEvent.click(screen.getByText(/available product reward/i).closest('div[role="button"]'));
    expect(mockNavigate).toHaveBeenCalledWith('/Reward');
  });
});
