import { useEffect, useRef, useState } from "react";
import OrderEntryServices from "../../../service/orderEntry/orderEntry.sevice";
import Customer from "../../../pages/units/orderEntry/tabs/customer";
import CustomerServices from "../../../service/customers/customer.services";
import useDebouncer from "../../../hooks/useDebouncer";

const useLookupCustomer = ({ show, type }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [showAdvancedSort, setShowAdvancedSort] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filterData, setFilterData] = useState({
    searchCriteria: "Beginning",
    searchTerms: "",
    sortType: false,
    sortValue: null,
    advanceSortingOrder: null,
    customers: null,
  });

  const isManualTrigger = useRef(false);

  // fetch api on the basis of props type
  const fetcherMap = {
    orderEntry: (number) =>
      CustomerServices.getAllCustomersOEDetails({ number: number, creditHold: false, ...filterData }),
    restrictedCustomer: (number) =>
      CustomerServices.getAllCustomersDetails({
        number: number,
        type: "Lookup",
        restrictedCustomer: true,
        ...filterData,
      }),
    shuttle: () => {},
    delay: () => {},
    maintenanceProgram: () => {},
    isMiscInvoice: () => {},
    rerouteProgram: () => {},
  };

  const fetchData = async (number = 0) => {
    try {
      if (!type || !fetcherMap[type]) return;
      setLoading(true);

      const res = await fetcherMap[type](number);

      if (res?.data?.length > 0) {
        setCustomersData(res.data.slice(0, res.data?.length - 1));
        const paginationData = res.data.pop();
        setTotalPages(paginationData.totalPages);
        setTotalElements(paginationData.totalElements);
      } else {
        setCustomersData(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      }
    } catch (error) {
      // return ;
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = useDebouncer(() => fetchData(pageNumber), 500);

  const handleSubmit = () => {
    if (pageNumber !== 0) {
      // to avoid calling api on pageNumber change, there is an other useEffect api call depending on pageNumber
      setPageNumber(0);
    } else {
      isManualTrigger.current = true;
      fetchData(pageNumber);
    }
  };

  useEffect(() => {
    if (!show) return;
    if (isManualTrigger.current) {
      // to avoid calling api on pageNumber change (removing duplicate api calls)
      isManualTrigger.current = false;
      return;
    }
    setLoading(true);
    debounceFetch();
  }, [show, filterData.sortType, pageNumber, filterData.searchTerms]);

  useEffect(() => {
    // reset filterData when component unmount
    return () => {
      setFilterData({
        searchCriteria: "Beginning",
        searchTerms: "",
        sortType: false,
        sortValue: null,
        advanceSortingOrder: null,
        customers: null,
      });
      setPageNumber(0);
      isManualTrigger.current = false;
    };
  }, [show]);

  return {
    pageNumber,
    setPageNumber,
    filterData,
    setFilterData,
    totalPages,
    setTotalPages,
    totalElements,
    setTotalElements,
    loading,
    customersData,
    showAdvancedSort,
    setShowAdvancedSort,
    showAdvancedSearch,
    setShowAdvancedSearch,
    handleSubmit,
    fetchData,
  };
};

export default useLookupCustomer;
