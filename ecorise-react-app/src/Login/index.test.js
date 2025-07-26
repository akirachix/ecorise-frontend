import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginScreen from "./LoginScreen";

describe("LoginScreen", () => {
  test("renders all login form fields and labels", () => {
    render(<LoginScreen />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("inputs update state on change", () => {
    render(<LoginScreen />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("shows alert with entered credentials on submit", () => {
    window.alert = jest.fn();
    render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Username: testuser\nEmail: test@example.com\nPassword: password123"
    );
  });

  test("forgot password and signup links are present", () => {
    render(<LoginScreen />);
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});