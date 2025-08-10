import { useState, useEffect } from 'react';
import { fetchRewards } from '../utils/fetchRewards';

export const useRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRewards = async () => {
      try {
        const result = await fetchRewards();
        setRewards(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error('Rewards fetch error:', err);
        setError(err?.message || 'Failed to load rewards');
        setRewards([]);
      } finally {
        setLoading(false);
      }
    };
    getRewards();
  }, []);

  return { rewards, loading, error };
};
