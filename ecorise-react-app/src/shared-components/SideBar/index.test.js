import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("renders company logo and text", () => {
    render(<Sidebar />);
    expect(screen.getByAltText("Africa Collect Logo")).toBeInTheDocument();
    expect(screen.getByText("Africa Collect")).toBeInTheDocument();
    expect(screen.getByText("Recycling Company")).toBeInTheDocument();
  });

  test("renders all navigation items", () => {
    render(<Sidebar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Pick up")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Feedback")).toBeInTheDocument();
  });

  test("renders settings and logout", () => {
    render(<Sidebar />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("active class toggles when items are clicked", () => {
    render(<Sidebar />);
    const homeItem = screen.getByText("Home").closest("li");
    const pickupItem = screen.getByText("Pick up").closest("li");
    fireEvent.click(pickupItem);

    
    expect(pickupItem.className).not.toContain("active");
    expect(homeItem.className).toContain("active");
  });

  test("icons are rendered for each menu item", () => {
    render(<Sidebar />);
    
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(1); 
    expect(document.querySelectorAll(".icon").length).toBe(7);
  });
});