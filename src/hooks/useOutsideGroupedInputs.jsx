import { useEffect, useRef } from "react";

/**
 * A hook to detect when the user clicks or focuses outside a group of input fields.
 *
 * @param {string} selector - Common class or id (use .className or #id format).
 * @param {Function} callback - Callback function to call when click/focus is outside the inputs.
 */
const useOutsideGroupedInputs = (selector, callback) => {
  const isInsideRef = useRef(false);

  useEffect(() => {
    const handleFocusIn = (event) => {
      if (event.target.closest(selector)) {
        isInsideRef.current = true;
      } else {
        isInsideRef.current = false;
        callback();
      }
    };

    const handleMouseDown = (event) => {
      if (!event.target.closest(selector)) {
        isInsideRef.current = false;
        callback();
      } else {
        isInsideRef.current = true;
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selector, callback]);
};

export default useOutsideGroupedInputs;
