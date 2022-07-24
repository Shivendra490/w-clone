import { useEffect, useRef, useState } from "react";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};
const useElementOnScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
      const node = containerRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [containerRef]);

  return {isVisible, containerRef};
};

export default useElementOnScreen;
