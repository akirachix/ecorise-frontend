const baseUrl = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
console.log("REACT_APP_BASE_URL:", process.env.REACT_APP_BASE_URL);

export const fetchPickupInfo = async () => {
  if (!baseUrl) {
    throw new Error("API base URL is not defined. Check your .env file!");
  }
  try {
    const response = await fetch(`${baseUrl}/pickups/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching pickup data");
  }
};

export const fetchUsersInfo = async () => {
  if (!baseUrl) {
    throw new Error("API base URL is not defined. Check your .env file!");
  }
  try {
    const response = await fetch(`${baseUrl}/users/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching users data");
  }
};

export const fetchMaterialsInfo = async () => {
  if (!baseUrl) {
    throw new Error("API base URL is not defined. Check your .env file!");
  }
  try {
    const response = await fetch(`${baseUrl}/materials/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching materials data");
  }
};