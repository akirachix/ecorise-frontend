const materialsApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
export const fetchMaterialsInfo = async () => {
  try {
    const response = await fetch(`${ materialsApi}/api/material/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching materials data");
  }
};



export const createMaterial = async (materialData) => {
  try {
    const response = await fetch(`${ materialsApi}/api/material/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(materialData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create material: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message || "Error creating material");
  }
};


export const updateMaterial = async (materialId, updatedData) => {
  try {
    const response = await fetch(`${materialsApi}/api/material/${materialId}/`, {
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


export const deleteMaterial = async (materialId) => {
  try {
    const response = await fetch(`${materialsApi}/api/material/${materialId}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete material: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    throw new Error(error.message || "Error deleting material");
  }
};
