// ============================================================
// useApi — Custom React hook for polling an API endpoint
// Usage:
//   const { data, loading, error } = useApi(fetchFlights, [], 5000);
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(fetchFn, defaultValue = null, pollInterval = 0) {
  const [data,    setData]    = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const intervalRef           = useRef(null);

  const load = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    load(); // initial load

    if (pollInterval > 0) {
      intervalRef.current = setInterval(load, pollInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load, pollInterval]);

  return { data, loading, error, refetch: load };
}
