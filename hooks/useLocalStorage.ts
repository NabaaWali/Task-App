import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item) as T);
      }
    } catch {
      // Invalid JSON — keep the default initial value
    }
    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (e.g. storage full or unavailable)
    }
  }, [key, value, isInitialized]);

  return [value, setValue];
}
