import { useState, useEffect } from "react";
import {fetchPickups,fetchMarkets,fetchRewards,fetchProducts,fetchUsers,fetchPayment} from "../utils/fetchEcoriseApi";

export const useUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetchUsers();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err?.message || "Failed to load users");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return { data, loading, error };
};

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

export const useMarkets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMarkets = async () => {
      try {
        const result = await fetchMarkets();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err?.message || "Failed to load markets");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getMarkets();
  }, []);
  return { data, loading, error };
};

export const useRewards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRewards = async () => {
      try {
        const result = await fetchRewards();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        setError(err?.message || "Failed to load rewards");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getRewards();
  }, []);
  return { data, loading, error };
};

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
