import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/fetchProducts";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchProducts();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err?.message || "Failed to load products");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return { data, loading, error };
};
