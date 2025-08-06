
import { fetchUsers } from "../utils/fetchUsers";
import { useState, useEffect } from "react";

export const useUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetchUsers();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        setError(error?.message || "Failed to load users");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return { data, loading, error };
};
