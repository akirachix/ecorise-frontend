const REACT_BASE_URL = process.env.REACT_APP_FEEDBACK_API_BASE_URL;
export async function fetchFeedback() {
  if (!REACT_BASE_URL) {
    throw new Error('REACT_APP_FEEDBACK_API_BASE_URL is not defined');
  }
  const url = `${REACT_BASE_URL}/feedback`;
  console.log('Fetching from:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON but got:', text);
      throw new Error('Expected JSON but received invalid content type');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }
}