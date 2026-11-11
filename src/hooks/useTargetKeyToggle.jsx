import { useState, useEffect } from "react";

/**
 * A custom React Hook to toggle state each time a specific key is pressed.
 *
 * @param {string} targetKey - The name of the key to respond to, matching the key names defined in the KeyboardEvent API.
 * @returns {boolean} keyToggled - The toggle state of the specified key. Returns `true` when the target key is pressed, and `false` when it is released.
 *
 * @example
 * function MyComponent() {
 *   const f2Toggled = useTargetKeyToggle('F2');
 *
 *   return (
 *     <div>
 *       {f2Toggled ? 'The F2 key is currently pressed!' : 'Press the F2 key to toggle'}
 *     </div>
 *   );
 * }
 */
const useTargetKeyToggle = (targetKey) => {
  const [keyToggled, setKeyToggled] = useState(false);

  useEffect(() => {
    const toggleHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyToggled((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", toggleHandler);

    return () => {
      window.removeEventListener("keydown", toggleHandler);
    };
  }, [targetKey]);

  return keyToggled;
};

export default useTargetKeyToggle;
