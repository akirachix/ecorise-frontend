import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MaterialPricing from "./index";
import useMaterialFetch from "../hooks/useFetchMaterialsInfo"; 

jest.mock("../hooks/useFetchMaterialsInfo"); 

const mockMaterials = [
  {
    material_id: 1,
    material_type: "Plastic",
    price_per_kg: 50,
    created_at: new Date().toISOString(),
  },
  {
    material_id: 2,
    material_type: "Metal",
    price_per_kg: 100,
    created_at: new Date().toISOString(),
  },
];

describe("MaterialPricing Component", () => {
  beforeEach(() => {
    useMaterialFetch.mockReturnValue({
      materials: mockMaterials,
      loading: false,
      error: null,
      editMaterial: jest.fn(() => Promise.resolve()),
      removeMaterial: jest.fn(() => Promise.resolve()),
      addMaterial: jest.fn(() => Promise.resolve()),
    });
  });

  test("renders materials in table", () => {
    render(<MaterialPricing />);
    expect(screen.getByText("Plastic")).toBeInTheDocument();
    expect(screen.getByText("Metal")).toBeInTheDocument();
  });

  test("filters materials by search term", () => {
    render(<MaterialPricing />);
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "metal" },
    });
    expect(screen.queryByText("Plastic")).not.toBeInTheDocument();
    expect(screen.getByText("Metal")).toBeInTheDocument();
  });

  test("shows add form and adds a material", async () => {
    render(<MaterialPricing />);
    fireEvent.click(screen.getByText("+ Add New Material"));
    fireEvent.change(screen.getByPlaceholderText("Material Type"), {
      target: { value: "Glass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price per Kg"), {
      target: { value: "200" },
    });
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() => {
      expect(useMaterialFetch().addMaterial).toHaveBeenCalledWith({
        material_type: "Glass",
        price_per_kg: "200",
      });
    });
  });

  test("handles empty input in add form", async () => {
    const addMaterialMock = useMaterialFetch().addMaterial;
    render(<MaterialPricing />);
    fireEvent.click(screen.getByText("+ Add New Material"));
    fireEvent.click(screen.getByText("Add"));
  
    await waitFor(() => {
      expect(addMaterialMock).not.toHaveBeenCalled();
    });
    
    expect(screen.getByText("Add New Material")).toBeInTheDocument();
  });

  test("enters and saves edit mode", async () => {
    render(<MaterialPricing />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.change(screen.getByLabelText("Edit Price per Kg"), {
      target: { value: "75" },
    });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(useMaterialFetch().editMaterial).toHaveBeenCalledWith(1, {
        material_type: "Plastic",
        price_per_kg: "75",
      });
    });
  });

  test("deletes a material after confirmation", async () => {
    window.confirm = jest.fn(() => true);
    render(<MaterialPricing />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    await waitFor(() => {
      expect(useMaterialFetch().removeMaterial).toHaveBeenCalledWith(1);
    });
  });
});