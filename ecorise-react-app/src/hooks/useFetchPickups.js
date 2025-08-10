
import { useState, useEffect } from "react";
import { fetchPickups } from "../utils/fetchPickups";
export const usePickups = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getPickups = async () => {
      try {
        const result = await fetchPickups();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err?.message || "Failed to load materials");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getPickups();
  }, []);
  return { data, loading, error };
};
