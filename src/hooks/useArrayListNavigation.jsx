/**
 * Custom React hook for navigating through an array list.
 *
 * arrayListLength - The length of the array list.
 * [currentIndex=0] - The current index within the array list (default: 0).
 * callback - The callback function to be invoked when navigating.
 * returns {Object} - Object containing current index, navigation functions, and disabled states.
 */
const useArrayListNavigation = (arrayListLength, currentIndex = 0, callback) => {
  /**
   * Function to navigate to the next item in the array list.
   */
  const goToNext = () => {
    if (currentIndex < arrayListLength - 1) {
      callback && callback(currentIndex + 1);
    }
  };

  /**
   * Function to navigate to the previous item in the array list.
   */
  const goToPrevious = () => {
    if (currentIndex > 0) {
      callback && callback(currentIndex - 1);
    }
  };

  // Determine if the next button should be disabled
  const isNextDisabled = currentIndex === arrayListLength - 1 || arrayListLength === 1;

  // Determine if the previous button should be disabled
  const isPreviousDisabled = currentIndex === 0 || arrayListLength === 1;

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    isNextDisabled,
    isPreviousDisabled,
  };
};

export default useArrayListNavigation;
