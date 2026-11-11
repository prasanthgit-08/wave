import { useEffect } from "react";

/**
 * A custom hook to detect clicks on grouped elements identified by a common identifier.
 *
 * @param {string} commonIdentifier - The common CSS class name or id shared by grouped elements.
 * @param {Function} callback - The callback function to execute when a click is detected on any of the grouped elements.
 */
const useGroupedElementsClick = (commonIdentifier, callback) => {
  useEffect(() => {
    /**
     * Event handler function to handle click events on the document.
     *
     * @param {Event} event - The click event.
     */
    const handleClick = (event) => {
      const clickedElement = event.target;
      if (
        clickedElement.classList.contains(commonIdentifier) ||
        clickedElement.getAttribute("id") === commonIdentifier
      ) {
        // Execute the provided callback function
        callback(clickedElement);
      }
    };

    document.addEventListener("click", handleClick);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [commonIdentifier, callback]);
};

export default useGroupedElementsClick;
