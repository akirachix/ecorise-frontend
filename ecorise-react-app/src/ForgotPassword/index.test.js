import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("ForgotPassword Component", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test("renders the component with image, heading, instructions, inputs, button and link", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

   
    const image = screen.getByAltText(/clothes/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/Images/clothe.png");

    
    expect(screen.getByRole("heading", { name: /Forgot password/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your phone number or email to reset your password/i)
    ).toBeInTheDocument();

    
    const phoneInput = screen.getByPlaceholderText(/Phone number/i);
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute("type", "text");

    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

   
    const sendButton = screen.getByRole("button", { name: /Send/i });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toHaveAttribute("type", "submit");

    
    const backLink = screen.getByRole("link", { name: /Back to login/i });
    expect(backLink).toHaveAttribute("href", "/login");
  });

  test("updates phone and email input values on change", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const phoneInput = screen.getByPlaceholderText(/Phone number/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });

    expect(phoneInput.value).toBe("1234567890");
    expect(emailInput.value).toBe("user@example.com");
  });

  test("navigates to /new-password on form submit", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const sendButton = screen.getByRole("button", { name: /Send/i });

    fireEvent.click(sendButton);

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/new-password");
  });
});
