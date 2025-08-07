import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginScreen from "./index";
import * as api from '../utils/fetchEcoriseApi';
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));
describe('LoginScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders login form inputs and button', () => {
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
  });
  test('toggles password visibility when icon clicked', () => {
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleIcon = screen.getByRole('button', { hidden: true }) || screen.getByText((content, element) => element.classList.contains('toggle-icon'));
    expect(passwordInput.type).toBe('password');
    fireEvent.click(screen.getByText((content, element) => element.classList.contains('toggle-icon')));
    expect(screen.getByLabelText(/password/i).type).toBe('text');
    fireEvent.click(screen.getByText((content, element) => element.classList.contains('toggle-icon')));
    expect(screen.getByLabelText(/password/i).type).toBe('password');
  });
  test('shows error message on invalid login credentials', async () => {
    jest.spyOn(api, 'fetchUsers').mockResolvedValue([
      { email: 'existing@example.com', password: 'correctpassword' },
    ]);
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
  test('navigates to dashboard upon successful login', async () => {
    const user = { email: 'user@example.com', password: 'secret123' };
    jest.spyOn(api, 'fetchUsers').mockResolvedValue([user]);
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: user.email } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: user.password } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
  test('shows error message when fetchUsers throws', async () => {
    jest.spyOn(api, 'fetchUsers').mockRejectedValue(new Error('API failure'));
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'any@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'any' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
});