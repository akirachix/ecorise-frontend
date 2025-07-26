import { useState, useEffect } from 'react';
import { fetchReward } from '../utils/fetchRewards';

const API_URL = process.env.REACT_APP_REWARD_API_URL;

export function useRewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReward(API_URL)
      .then((data) => {
        setRewards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching rewards');
        setLoading(false);
      });
  }, []);

  return { rewards, loading, error };
}
