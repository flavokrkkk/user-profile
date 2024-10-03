import { RefObject, useEffect } from "react";

export const useOutside = (
  elementRef: RefObject<HTMLDivElement> | null,
  isVisible: boolean,
  callback: () => void
) => {
  useEffect(() => {
    if (!isVisible) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef?.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, isVisible]);
};
