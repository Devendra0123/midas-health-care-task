import { useState, useEffect } from "react";

/**
 * Custom hook to manage scroll visibility and behavior.
 * @param containerHeight - The height of the container to gradually hide components.
 * @returns {object} Scroll visibility state.
 */
const useScrollVisibility = (containerHeight: number) => {
  const [hidden, setHidden] = useState(false); // Whether the header is hidden
  const [fixed, setFixed] = useState(false); // Whether the header is fixed
  const [opacity, setOpacity] = useState(1); // Opacity of the header
  const [lastScrollY, setLastScrollY] = useState(0); // Last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user is scrolling down or up
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isScrollingDown) {
        // Gradually hide the header when scrolling down
        if (currentScrollY > containerHeight) {
          setHidden(true);
          setFixed(false);
          setOpacity(0); // Fully hidden
        } else {
          setOpacity(1 - currentScrollY / containerHeight); // Gradually decrease opacity
        }
      } else {
        // Show the header as fixed when scrolling up
        if (currentScrollY > containerHeight) {
          setHidden(false);
          setFixed(true);
          setOpacity(1); // Fully visible
        } else {
          setFixed(false);
          setOpacity(1 - currentScrollY / containerHeight); // Gradually restore opacity
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, containerHeight]);

  return { hidden, fixed, opacity };
};

export default useScrollVisibility;
