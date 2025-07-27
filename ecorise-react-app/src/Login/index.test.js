import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginScreen from "./LoginScreen";
import { fetchUsers } from "../utils/fetchEcoriseApi";

import { renderHook } from '@testing-library/react-hooks';
import { BrowserRouter } from "react-router-dom";


jest.mock("../utils/fetchEcoriseApi");
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LoginScreen", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders login form", () => {
    renderComponent();
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByRole("button", { hidden: true }) || screen.getByText("", { selector: ".toggle-icon" });

    
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { hidden: true }) || screen.getByText("", { selector: ".toggle-icon" }));

  
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("shows error on invalid credentials", async () => {
    fetchUsers.mockResolvedValue([
      { email: "test@example.com", password: "correctpass" }
    ]);

    renderComponent();

  
    userEvent.type(screen.getByPlaceholderText(/email/i), "test@example.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "wrongpass");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("logs in user with correct credentials and navigates", async () => {
    const user = { email: "test@example.com", password: "correctpass" };
    fetchUsers.mockResolvedValue([user]);

    renderComponent();

    userEvent.type(screen.getByPlaceholderText(/email/i), user.email);
    userEvent.type(screen.getByPlaceholderText(/password/i), user.password);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      expect(storedUser).toEqual(user);

      
      expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("shows error if fetchUsers throws an error", async () => {
    fetchUsers.mockRejectedValue(new Error("API error"));

    renderComponent();

    userEvent.type(screen.getByPlaceholderText(/email/i), "test@example.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "anyPassword");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/error logging in/i)).toBeInTheDocument();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("clears error on input change", async () => {
    fetchUsers.mockResolvedValue([
      { email: "test@example.com", password: "correctpass" }
    ]);

    renderComponent();
    userEvent.type(screen.getByPlaceholderText(/email/i), "unknown@example.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "wrongpass");
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });

    userEvent.type(screen.getByPlaceholderText(/email/i), "a");
    
    expect(screen.getByText(/error in login in/i)).toBeInTheDocument();
  });
});
