import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Cleanup on value or delay change
  }, [value, delay]);

  return debouncedValue;
};
