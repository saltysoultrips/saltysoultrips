import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * LazySection component that only renders its children when they are near the viewport.
 * This helps reduce the initial bundle size and network requests by deferring the loading of heavy components.
 *
 * @param {React.ReactNode} children - The content to lazy load.
 * @param {string} minHeight - The minimum height of the placeholder to prevent layout shifts (e.g., "600px").
 * @param {string} rootMargin - Margin around the root to start loading before the element is visible (default: "200px").
 * @param {string} id - The ID of the section, useful for hash navigation checks.
 */
export default function LazySection({
  children,
  minHeight = "400px",
  rootMargin = "200px",
  id,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // If we are navigating directly to this section via hash, load it immediately
    if (id && location.hash === `#${id}`) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [rootMargin, id, location.hash]);

  return (
    <div ref={containerRef} style={{ minHeight }} className="w-full">
      {isVisible ? children : null}
    </div>
  );
}
