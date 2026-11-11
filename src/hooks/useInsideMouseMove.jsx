/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

/**
 *
 * @param {*} ref - Ref of your parent div.
 * @param {*} className - CSS selector for checking whether the mouse moves inside the selector.
 * @param {*} callback - Callback which is triggered when the mouse moves inside the element with the given class name.
 */
const useInsideMouseMove = (ref, className, callback) => {
  useEffect(() => {
    const handleMouseMove = (evt) => {
      if (ref.current && (ref.current.contains(evt.target) || evt.target.closest(className))) {
        callback();
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
};

export default useInsideMouseMove;
