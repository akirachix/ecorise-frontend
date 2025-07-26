import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./index"; 
import { BrowserRouter } from "react-router-dom";


const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Dashboard component", () => {

  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders dashboard title", () => {
    renderWithRouter(<Dashboard />);
    const title = screen.getByText(/ECORISE/i);
    expect(title).toBeInTheDocument();
  });

  test("renders all statistics cards with correct labels and values", () => {
    renderWithRouter(<Dashboard />);
    
    expect(screen.getByText("Total traders")).toBeInTheDocument();
    expect(screen.getByText("Total collected materials ")).toBeInTheDocument();
    expect(screen.getByText("Total awarded points")).toBeInTheDocument();

    
    expect(screen.getByText("865")).toBeInTheDocument();
    expect(screen.getByText("1564 Kg")).toBeInTheDocument();
    expect(screen.getByText("342")).toBeInTheDocument();
  });

  test("clicking on a statistics card triggers navigation with correct route", () => {
    renderWithRouter(<Dashboard />);
    const statCard = screen.getByText("Total traders").closest("div[role='button']");
    expect(statCard).toBeInTheDocument();

    fireEvent.click(statCard);
    expect(mockedNavigate).toHaveBeenCalledWith("/trader");
  });

  test("renders circular progress bar with correct percentage text", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  test("renders all cards with correct labels and values", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("Available product reward")).toBeInTheDocument();
    expect(screen.getByText("Pending pickup requests")).toBeInTheDocument();
    expect(screen.getByText("Pending payments")).toBeInTheDocument();

    expect(screen.getByText("865")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("342")).toBeInTheDocument();
  });

  test("clicking on a card triggers navigation with correct route", () => {
    renderWithRouter(<Dashboard />);
    const card = screen.getByText("Pending payments").closest("div[role='button']");
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(mockedNavigate).toHaveBeenCalledWith("/Payments");
  });

  test("renders chart bars for each month in chartData", () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Feb")).toBeInTheDocument();
    expect(screen.getByText("Mar")).toBeInTheDocument();
    expect(screen.getByText("April")).toBeInTheDocument();
    expect(screen.getByText("May")).toBeInTheDocument();
  });

  test("renders market request percentages with correct names and percentages", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("Gikomba")).toBeInTheDocument();
    expect(screen.getByText("49%")).toBeInTheDocument();

    expect(screen.getByText("Mtindwa")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

});
