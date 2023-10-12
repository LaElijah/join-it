import { useEffect, useState } from "react";

export default function useVisibility(element: any, rootMargin: any) {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const current = element?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );

    current && observer?.observe(current);

    return () => current && observer.observe(current);
  }, []);

  return isVisible;
}
