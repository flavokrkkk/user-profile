import { useEffect } from "react";

export const useAutoDismiss = (
  bool: boolean,
  callback: () => void,
  timeout: number = 5000
) => {
  useEffect(() => {
    if (!bool) return;
    const id = setTimeout(callback, timeout);
    return () => {
      clearTimeout(id);
    };
  }, [bool]);
};
