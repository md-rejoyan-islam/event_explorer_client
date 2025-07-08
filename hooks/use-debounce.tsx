import { useCallback } from "react";

const useDebounce = (
  callback: (value: string) => void,
  delay: number
): ((...args: [string]) => () => void) => {
  const debounceFn = useCallback(
    (...args: [string]) => {
      const handler = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(handler);
    },
    [callback, delay]
  );

  return debounceFn;
};

export default useDebounce;
