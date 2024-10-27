// src/custom_hooks/useDebounce.js
import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that clears the timeout if the effect re-runs
    // This prevents updating the debounced value too frequently
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value so it can be used in components
  return debouncedValue;
}

export default useDebounce;
