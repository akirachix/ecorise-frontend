const pickupApi = process.env.REACT_APP_BASE_URL;

export const fetchPickupInfo = async () => {
  try {
    const response = await fetch(`${pickupApi}/pickups`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching pickup data");
  }
};