import React, { useEffect, useRef } from "react";

/**
 * centerOnRef (optional): ref of the element to centre the spinner on. By default the spinner is
 * centred on the window, which lands off to one side on screens narrower than the window.
 */
const LoadingIcon = ({ centerOnRef }) => {
  const overlayRef = useRef(null);

  // same 80px spinner and offsets as .pos-center, measured from the element instead of the window
  const rect = centerOnRef?.current?.getBoundingClientRect();
  const centerStyle = rect
    ? { left: rect.left + rect.width / 2 - 40, top: rect.top + rect.height / 2 - 40 }
    : undefined;

  useEffect(() => {
    if (!overlayRef.current) return;

    const handleKeyDown = (e) => {
      // Prevent all key presses
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);
  return (
    <div className="loading-overlay fade modal-backdrop show">
      <div className="pos-center" style={centerStyle}>
        <div className="loader" />
      </div>
    </div>
  );
};

export default LoadingIcon;
