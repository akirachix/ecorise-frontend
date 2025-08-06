const usersApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");

export const fetchUsersInfo = async () => {
  try {
    const response = await fetch(`${usersApi}/api/users/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching users data");
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${usersApi}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.detail || errorData.error || `Failed to signup: ${response.status} ${response.statusText}`;
      throw new Error(errorMsg);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message || "Error signing up user");
  }
};