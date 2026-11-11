import { useEffect, useRef, useState } from "react";
import useDebouncer from "../../../hooks/useDebouncer";
import { useQuery } from "@tanstack/react-query";

const useCommonAdvancedLookup = ({ show, fetchFunction }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showAdvancedSort, setShowAdvancedSort] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filterData, setFilterData] = useState({
    searchCriteria: "Beginning",
    searchTerms: "",
    sortType: false,
    sortValue: null,
    advanceSortingOrder: null,
  });

  const ref = useRef(false);
  const debouncedSearch = useDebouncer(() => {
    try {
      refetch();
    } finally {
      setTyping(false);
      ref.current = false;
    }
  }, 500);

  const {
    data,
    isFetching: loading,
    refetch,
  } = useQuery({
    queryKey: ["AdvancedLookupData", pageNumber, filterData.sortType],
    queryFn: () => fetchFunction({ lookup: true, pageNumber, isOEPP: "Lookup", size: 15, ...filterData }),
    enabled: false,
  });
  let res = data?.data || data;

  let listingData = [];
  let totalPages = 0;
  let totalElements = 0;
  if (Array.isArray(res)) {
    listingData = res?.slice(0, res?.length - 1);
    totalPages = res?.pop()?.totalPages || 0;
    totalElements = res?.pop()?.totalElements || 0;
  } else {
    listingData = res?.content || [];
    totalPages = res?.totalPages || 0;
    totalElements = res?.totalElements || 0;
  }

  const handleSubmit = () => {
    if (pageNumber !== 0) {
      setPageNumber(0);
    } else {
      refetch();
    }
  };

  useEffect(() => {
    if (!show) return;

    setTyping(true);
    setPageNumber(0);
    ref.current = true;
    debouncedSearch();
  }, [show, filterData.searchTerms, filterData.sortType]);

  useEffect(() => {
    if (!show) return;

    if (ref.current) {
      ref.current = false;
      return;
    }
    refetch();
  }, [pageNumber]);

  useEffect(() => {
    if (!show) {
      setFilterData({
        searchCriteria: "Beginning",
        searchTerms: "",
        sortType: false,
        sortValue: null,
        advanceSortingOrder: null,
      });
    }
  }, [show]);

  return {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
    typing,
    filterData,
    setFilterData,
    handleSubmit,
    showAdvancedSort,
    setShowAdvancedSort,
    showAdvancedSearch,
    setShowAdvancedSearch,
    refetch,
  };
};

export default useCommonAdvancedLookup;
