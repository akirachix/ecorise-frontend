const baseurl = process.env.REACT_APP_BASE_URL
export async function fetchUsers() {
  if (!baseurl) {
    throw new Error('REACT_APP_BASE_URL is not defined');
  }
  const url = `${baseurl}/users`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}

