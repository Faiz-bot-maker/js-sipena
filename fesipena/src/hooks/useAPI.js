import { useState, useCallback } from 'react';
import api from '../services/api';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = useCallback(async (apiFunc, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...params);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callAPI };
};

export default useAPI;
