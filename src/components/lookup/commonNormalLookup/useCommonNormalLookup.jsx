import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import useDebouncer from "../../../hooks/useDebouncer";

const useCommonNormalLookup = ({ show, fetchFunction }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [typing, setTyping] = useState(false);
  const [filterData, setFilterData] = useState({
    searchTerms: "",
    sortType: false,
    sortValue: null,
    searchCriteria: "Beginning",
    unitTypeSearchCriteria: "All",
  });

  const ref = useRef(false); // it is used for to prevent multiple api calls when the pageNumber changes

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
    queryKey: [
      "NormalLookupData",
      fetchFunction.name,
      pageNumber,
      filterData.sortType,
      filterData.searchCriteria,
      filterData.unitTypeSearchCriteria,
    ],
    queryFn: () =>
      fetchFunction({
        lookup: true,
        isOEPP: "Lookup",
        pageNumber,
        size: 12,
        ...filterData,
      }),
    enabled: false,
    // keepPreviousData: true,
  });

  let listingData = [];
  let totalPages = 0;
  let totalElements = 0;
  let res = data?.data || data;

  if (Array.isArray(res)) {
    listingData = res?.slice(0, res?.length - 1);
    totalPages = res?.pop()?.totalPages || 0;
    totalElements = res?.pop()?.totalElements || 0;
  } else {
    listingData = res?.content || [];
    totalPages = res?.totalPages || 0;
    totalElements = res?.totalElements || 0;
  }

  useEffect(() => {
    if (!show) {
      setFilterData({
        searchTerms: "",
        sortType: false,
        sortValue: null,
        searchCriteria: "Beginning",
        unitTypeSearchCriteria: "All",
      });
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;

    setTyping(true);
    setPageNumber(0);
    ref.current = true;
    debouncedSearch();
  }, [
    show,
    filterData.searchTerms,
    filterData.sortType,
    filterData.searchCriteria,
    filterData.unitTypeSearchCriteria,
  ]);

  useEffect(() => {
    if (!show) return;

    if (ref.current) {
      ref.current = false;
      return;
    }
    refetch();
  }, [pageNumber]);

  return {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    loading,
    filterData,
    setFilterData,
    listingData,
    typing,
  };
};

export default useCommonNormalLookup;
