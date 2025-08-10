const materialsApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
export const fetchMaterialsInfo = async () => {
  try {
    const response = await fetch(`${ materialsApi}/material/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching materials data");
  }
};


