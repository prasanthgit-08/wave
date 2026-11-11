import { useEffect, useRef } from "react";

/**
 * Custom React hook for debouncing a callback function.
 *
 * @param {Function} callback - The callback function to be debounced.
 * @param {number} delay - The delay (in milliseconds) before the callback is executed.
 * @returns {Function} - Debounced callback function.
 */
const useDebouncer = (callback, delay) => {
  const timeoutRef = useRef(null);

  // Cleanup function to clear the timeout on unmount or re-render
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  /**
   * Debounced callback function.
   * Clears the previous timeout and sets a new timeout for the given delay.
   * @param  {...any} args - Arguments to be passed to the callback function.
   */
  const debounceCallback = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Cancels the pending (not yet fired) callback, if any
  debounceCallback.cancel = () => clearTimeout(timeoutRef.current);

  return debounceCallback;
};

export default useDebouncer;
