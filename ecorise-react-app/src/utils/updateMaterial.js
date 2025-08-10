const materialsApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");

export const updateMaterial = async (materialId, updatedData) => {
  try {
    const response = await fetch(`${materialsApi}/material/${materialId}/`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update material: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message || "Error updating material");
  }
};
