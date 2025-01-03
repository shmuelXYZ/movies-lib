import { useState, useEffect } from "react";
// custom hook to load data from local storege if there is
export const useLocalStorageState = <T,>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
