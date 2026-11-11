/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
/**
 *
 * @param {*} ref - Ref of your parent div
 * @param {*} className - CSS selector for checking whether the click happens outside the selector
 * @param {*} callback - Callback which can be used to change your maintained state in your component, pass a function defnition as callback
 */
const useOutsideClick = (ref, className, callback) => {
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (
        ref.current &&
        !ref.current.contains(evt.target) &&
        !evt.target.closest(className)
        /**
         *  event.target.closest('.className') is using the 'closest' method
         *  to find the nearest ancestor element of the event.target that matches the provided selector '.className'
         */
      ) {
        // Do what you want to handle in the callback
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useOutsideClick;
