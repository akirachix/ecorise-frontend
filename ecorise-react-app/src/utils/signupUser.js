const usersApi = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
export const signupUser = async (userData) => {
  try {
   
    const response = await fetch(`${usersApi}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Failed to signup: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error signing up user");
  }
};