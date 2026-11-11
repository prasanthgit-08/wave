import { useEffect, useRef, useState } from "react";
import OrderEntryServices from "../../../service/orderEntry/orderEntry.sevice";
import useDebouncer from "../../../hooks/useDebouncer";

const useLookupCustomerPlants = ({ show, type, customerFK, isDPUCustomer, billingPlant = false }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plantData, setPlantData] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filterData, setFilterData] = useState({
    searchCriteria: "Beginning",
    searchTerms: "",
    sortType: false,
    sortValue: null,
    advanceSortingOrder: null,
    customerPlants: null,
  });

  const isManualTrigger = useRef(false);

  const fetcherMap = {
    orderEntry: () =>
      OrderEntryServices.getPlantDetails({
        ...filterData,
        pageNumber,
        isOEPP: "Lookup",
        size: 15,
        customerFK,
        isDPUCustomer,
        billingPlant,
      }),
    maintenanceProgram: () => {},
    shuttle: () => {},
    yardCheckin: () => {},
    editShuttle: () => {},
    restrictedPlantLists: () => {},
  };

  const fetchData = async (number = 0) => {
    try {
      if (!type || !fetcherMap[type]) return;
      setLoading(true);

      const res = await fetcherMap[type](number);

      if (res?.data?.length > 0) {
        setPlantData(res.data.slice(0, res.data?.length - 1));
        const paginationData = res.data.pop();
        setTotalPages(paginationData.totalPages);
        setTotalElements(paginationData.totalElements);
      } else {
        setPlantData(res.data.content);
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
    totalPages,
    setTotalPages,
    totalElements,
    setTotalElements,
    loading,
    filterData,
    setFilterData,
    plantData,
    showAdvancedSearch,
    setShowAdvancedSearch,
    fetchData,
    handleSubmit,
  };
};

export default useLookupCustomerPlants;
