import { useState, useEffect } from "react";

/**
 * A custom React hook for paginating an array.
 * array - The array to paginate.
 * pageNumber - The current page number (default: 0).
 * pageSize - The number of items per page (default: 10).
 * - returns an object containing the paginated array, total number of elements,
 * total number of pages, and number of elements in the current page.
 */
const usePagination = (array, pageNumber = 0, pageSize = 10) => {
  const [paginatedArray, setPaginatedArray] = useState([]);
  const [totalElements, setTotalElements] = useState(array.length);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalElements / pageSize));
  const [numberOfElements, setNumberOfElements] = useState(0);

  useEffect(() => {
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedArray = array.slice(startIndex, endIndex);
    setNumberOfElements(slicedArray.length);
    setPaginatedArray(slicedArray);
  }, [array, pageNumber, pageSize]);

  useEffect(() => {
    setTotalElements(array.length);
    setTotalPages(Math.ceil(totalElements / pageSize));
  }, [array, totalElements, pageSize]);

  return {
    // The paginated array for the current page.
    paginatedArray,
    // The total number of elements in the original array.
    totalElements,
    // The total number of pages based on the page size
    totalPages,
    // The number of elements in the current page.
    numberOfElements,
  };
};

export default usePagination;
