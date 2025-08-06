const REACT_BASE_URL = process.env.REACT_APP_BASE_URL;
export async function fetchFeedback() {
  if (!REACT_BASE_URL) {
    throw new Error('REACT_APP_BASE_URL is not defined');
  }
  const url = `${REACT_BASE_URL}/feedback`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}