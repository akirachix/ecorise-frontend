import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewPassword from "./NewPassword";


delete window.location;
window.location = { href: "" };


window.alert = jest.fn();

describe("NewPassword Component", () => {
  beforeEach(() => {
    
    window.alert.mockClear();
    window.location.href = "";
  });

  test("renders properly and submits", () => {
    render(<NewPassword />);

    
    const passwordInput = screen.getByPlaceholderText(/new password/i);
    const cpasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    expect(passwordInput).toBeInTheDocument();
    expect(cpasswordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    
    fireEvent.change(passwordInput, { target: { value: "myNewPass123" } });
    fireEvent.change(cpasswordInput, { target: { value: "myNewPass123" } });

    expect(passwordInput.value).toBe("myNewPass123");
    expect(cpasswordInput.value).toBe("myNewPass123");

    
    fireEvent.click(submitBtn);

    
    expect(window.alert).toHaveBeenCalledWith("Password reset successful!");
    expect(window.location.href).toBe("/login");
  });

 
});