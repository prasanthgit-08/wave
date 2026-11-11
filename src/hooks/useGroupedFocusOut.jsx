import { useState, useEffect } from "react";

/**
 * Custom hook that groups a set of elements by a className and optionally checks IDs provided
 * and executes a callback when the focus leaves all elements in the group.
 *
 * @param {string} className - The class name to group elements.
 * @param {Array} [ids] - An optional array of element IDs to further refine the group.
 * @param {function} callback - The callback function to execute when focus leaves the group.
 * @returns {boolean} - A boolean indicating if any element in the group currently has focus.
 *
 * Usage:
 * - This hook groups elements by their `className`. If `IDs` are provided, it will ensure
 *   that only elements matching both the className and one of the `IDs` are considered.
 *
 * Example:
 *
 * const isFocusedInside = useGroupedFocusOut('group-class', ['input1', 'input2'], () => {
 *   console.log('Focus moved out of the group');
 * });
 *
 * If no `IDs` are provided, only `className` is used to group elements:
 *
 * const isFocusedInside = useGroupedFocusOut('group-class', null, () => { ... });
 */
const useGroupedFocusOut = (className, callback) => {
  const [isFocusedInside, setIsFocusedInside] = useState(false);
  useEffect(() => {
    // Function to check if the element is part of the group
    const isElementInGroup = (element) => {
      // Check if the element has the className
      if (!element || !element.classList.contains(className)) {
        return false;
      }

      return true;
    };

    const handleFocusIn = (e) => {
      // Check if the focused element is part of the group
      if (isElementInGroup(e.target)) {
        setIsFocusedInside(true); // Focus entered the group
      }
    };
    const handleFocusOut = () => {
      setTimeout(() => {
        const focusedElement = document.activeElement;
        if (!isElementInGroup(focusedElement) && isFocusedInside) {
          callback();
          setIsFocusedInside(false);
        }
      }, 30);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [className, isFocusedInside, callback]); // Ensure these dependencies are accurate

  return isFocusedInside;
};

export default useGroupedFocusOut;
