
import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PickupTable from "./index";

jest.mock("../shared-component/SideBar", () => ({
  __esModule: true,
  default: () => <div>SidebarMock</div>,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUseFetchPickups = jest.fn();
jest.mock("../hooks/useFetchPickupData", () => () => mockUseFetchPickups());

const samplePickups = [
  {
    _id: "p1",
    name: "Alice",
    phone: "123456789",
    material: "Plastic",
    location: "Loc1",
    createdAt: "2023-01-01T12:00:00Z",
    status: "Pending",
  },
  {
    _id: "p2",
    name: "Bob",
    phone: "987654321",
    material: "Glass",
    location: "Loc2",
    createdAt: "2023-02-01T12:00:00Z",
    status: "Confirmed",
  },
];

describe("PickupTable component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: [], loading: true, error: null });
    render(<PickupTable />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: [], loading: false, error: "Failed to load" });
    render(<PickupTable />);
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  test("renders no data message when pickups empty", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: [], loading: false, error: null });
    render(<PickupTable />);
    expect(screen.getByText(/no pickup requests found/i)).toBeInTheDocument();
  });

  test("renders pickups data in table", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: samplePickups, loading: false, error: null });
    render(<PickupTable />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    
    expect(screen.getAllByRole("row").length).toBeGreaterThanOrEqual(3);
  });

  test("search filters pickups by name", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: samplePickups, loading: false, error: null });
    render(<PickupTable />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  test("pagination changes rows per page", () => {
    const manyPickups = Array.from({ length: 12 }, (_, i) => ({
      _id: `p${i + 1}`,
      name: `Trader${i + 1}`,
      phone: "0000000000",
      material: "Material",
      location: "Loc",
      createdAt: "2023-01-01T00:00:00Z",
      status: "Pending",
    }));
    mockUseFetchPickups.mockReturnValue({ pickups: manyPickups, loading: false, error: null });
    render(<PickupTable />);

    expect(screen.getAllByRole("row").length).toBe(6); 

    fireEvent.change(screen.getByLabelText(/rows per page/i), { target: { value: "10" } });
    
    expect(screen.getAllByRole("row").length).toBe(11);

    fireEvent.change(screen.getByLabelText(/rows per page/i), { target: { value: "All" } });
    
    expect(screen.getAllByRole("row").length).toBe(13);
  });

  test("toggles status when status button clicked", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: samplePickups, loading: false, error: null });
    render(<PickupTable />);
    const statusButton = screen.getAllByRole("button", { name: "Pending" })[0];
    fireEvent.click(statusButton);
    expect(statusButton.textContent).toBe("Confirmed");
    fireEvent.click(statusButton);
    expect(statusButton.textContent).toBe("Pending");
  });

  test("selects and highlights row on clicking", () => {
    mockUseFetchPickups.mockReturnValue({ pickups: samplePickups, loading: false, error: null });
    render(<PickupTable />);
    const rowAlice = screen.getByText("Alice").closest("tr");
    fireEvent.click(rowAlice);
    expect(rowAlice).toHaveClass("selected-row");
    const rowBob = screen.getByText("Bob").closest("tr");
    fireEvent.click(rowBob);
    expect(rowBob).toHaveClass("selected-row");
    expect(rowAlice).not.toHaveClass("selected-row");
  });
});
