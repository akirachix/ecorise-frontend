import { useState, useEffect } from "react";
import { fetchPayment } from "../utils/fetchPayments";

export const usePayment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const result = await fetchPayment();
        console.log("Fetched payment result:", result);
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Payment fetch error:", err);
        setError(err?.message || "Failed to load payments");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getPayments();
  }, []);
  return { data, loading, error };
};
