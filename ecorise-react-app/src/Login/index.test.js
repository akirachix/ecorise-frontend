import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from './index';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


const mockUseUsers = jest.fn(() => ({
  data: [
    { email: 'user@example.com', password: 'password123' }
  ],
  loading: false,
  error: null,
}));

jest.mock('../hooks/useFetchUsers', () => ({
  useUsers: () => mockUseUsers(),
}));

describe('LoginScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseUsers.mockImplementation(() => ({
      data: [
        { email: 'user@example.com', password: 'password123' }
      ],
      loading: false,
      error: null,
    }));
  });

  test('renders email and password inputs and login button', () => {
    render(
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <LoginScreen />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('toggles password visibility when toggle icon clicked', () => {
    render(
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <LoginScreen />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput.type).toBe('password');

    fireEvent.click(
      screen.getByText((content, element) => element.classList?.contains('toggle-icon'))
    );
    expect(screen.getByLabelText(/password/i).type).toBe('text');

    fireEvent.click(
      screen.getByText((content, element) => element.classList?.contains('toggle-icon'))
    );
    expect(screen.getByLabelText(/password/i).type).toBe('password');
  });

  test('shows error message on invalid login credentials', async () => {
    render(
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <LoginScreen />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('navigates to /dashboard on successful login', async () => {
    render(
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <LoginScreen />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });


  test('shows hook error message if error present', () => {
   
    mockUseUsers.mockImplementationOnce(() => ({
      data: [],
      loading: false,
      error: 'Error occurred',
    }));

    render(
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition:true}}>
        <LoginScreen />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/error loading/i)).toBeInTheDocument();
  });
});