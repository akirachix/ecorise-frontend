
import { useState } from 'react';
import { stkPush } from '../utils/paymentApi';

export function useStkPush() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const initiatePayment = async (paymentDetails) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await stkPush(paymentDetails);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error, data };
}
