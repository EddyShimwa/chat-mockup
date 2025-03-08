import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    try {
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
