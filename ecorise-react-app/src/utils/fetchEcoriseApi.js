const baseurl = process.env.REACT_APP_BASE_URL?.replace(/\/$/, "");
console.log("API baseurl:", baseurl);
async function apiFetch(endpoint, property) {
  const url = `${baseurl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  console.log("Fetching:", url);
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Expected JSON but got:", text);
    throw new Error("Non-JSON response");
  }
  const result = await response.json();
  return property ? result?.[property] : result;
}

export const fetchUsers = () => apiFetch("/api/users/");           
export const fetchMaterials = () => apiFetch("/api/material/");      
export const fetchMarkets = () => apiFetch("/api/pickups/");         
export const fetchRewards = () => apiFetch("/api/reward/");  
export const fetchProducts = () => apiFetch("/api/product/");   
export const fetchPickups = () => apiFetch("/api/pickups/")
export const fetchPayment = () => apiFetch("/api/payment/")

