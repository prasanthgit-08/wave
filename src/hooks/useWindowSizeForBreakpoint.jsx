import { useState, useEffect } from "react";

const useWindowSizeForBreakpoint = (breakpoint) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isBelowBreakpoint = windowWidth < breakpoint;

  return isBelowBreakpoint;
};

export default useWindowSizeForBreakpoint;
