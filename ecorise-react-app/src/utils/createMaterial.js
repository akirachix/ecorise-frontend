const materialsApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
export const createMaterial = async (materialData) => {
  try {
    const response = await fetch(`${ materialsApi}/material/`, {
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
