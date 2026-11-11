import { useEffect } from "react";
import { removeLeadingWhitespace } from "../utils/utils";

const IGNORED_TYPES = ["checkbox", "radio", "file", "submit", "reset", "button"];

/**
 * Hook to globally remove leading whitespace from all input and textarea fields.
 * Works on input/change events and ignores types like checkbox, radio, file, etc.
 * Call this once in your top-level component (e.g., App or Layout).
 */
const useGlobalInputTrim = () => {
  useEffect(() => {
    const handleInputTrim = (e) => {
      const target = e.target;

      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") return;

      if (target.tagName === "INPUT" && IGNORED_TYPES.includes(target.type)) return;

      const originalValue = target.value;
      const trimmedValue = removeLeadingWhitespace(originalValue);

      if (originalValue !== trimmedValue) {
        target.value = trimmedValue;

        // Re-dispatch the same event to preserve Formik or native onChange
        const event = new Event(e.type, { bubbles: true });
        target.dispatchEvent(event);
      }
    };

    // Apply for both input and change
    document.addEventListener("input", handleInputTrim, true);
    document.addEventListener("change", handleInputTrim, true);

    return () => {
      document.removeEventListener("input", handleInputTrim, true);
      document.removeEventListener("change", handleInputTrim, true);
    };
  }, []);
};

export default useGlobalInputTrim;
