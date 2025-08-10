import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from "./index";
import * as api from '../utils/signupUser'; 

jest.mock('../utils/signupUser'); 

describe("SignUp component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs empty initially", () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText("Username").value).toBe('');
    expect(screen.getByPlaceholderText("Email").value).toBe('');
    expect(screen.getByPlaceholderText("Phone Number").value).toBe('');
    expect(screen.getByPlaceholderText("Password").value).toBe('');
    expect(screen.getByPlaceholderText("Confirm Password").value).toBe('');
  });

  test("updates form inputs on change", () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: 'user1' } });
    expect(screen.getByPlaceholderText("Username").value).toBe('user1');
  });

  test("toggles password visibility", () => {
    render(<SignUp />);
    const toggleBtn = screen.getAllByRole('button', { name: /show password|hide password/i })[0];
    const passwordInput = screen.getByPlaceholderText("Password");

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('password');
  });

  test("successful form submission calls signupUser and resets form", async () => {
    api.signupUser.mockResolvedValueOnce(); 
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: 'user1@example.com' } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(api.signupUser).toHaveBeenCalledWith({
      name: 'user1',
      email: 'user1@example.com',
      phone_number: '1234567890',
      password: 'Password1!',
    }));

    const successMessage = await screen.findByText('Signed up successfully! Please log in.');
    expect(successMessage).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Username").value).toBe('');
  });

  test("failed signup displays error message", async () => {
    const errorMessage = "Signup failed due to server error";
    api.signupUser.mockRejectedValueOnce(new Error(errorMessage)); 

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: 'user1@example.com' } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(api.signupUser).toHaveBeenCalled());

    const errorAlert = await screen.findByText(errorMessage);
    expect(errorAlert).toBeInTheDocument();
  });
});
