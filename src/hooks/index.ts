import { useEffect, useRef } from "react";

export function useOutsideClck<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickedOutiside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickedOutiside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutiside);
    };
  }, [callback]);

  return ref;
}
