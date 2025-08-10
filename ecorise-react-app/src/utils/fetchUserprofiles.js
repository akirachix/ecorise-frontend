const usersApi = process.env.REACT_APP_BASE_URL;

export const fetchUsersInfo = async () => {
  try {
    const response = await fetch(`${usersApi}/users`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    throw new Error(error.message || "Error fetching users data");
  }
};

