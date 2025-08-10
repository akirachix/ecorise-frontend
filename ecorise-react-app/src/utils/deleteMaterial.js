const materialsApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");

export const deleteMaterial = async (materialId) => {
  try {
    const response = await fetch(`${materialsApi}/material/${materialId}/`, {
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
