import { useEffect, useRef, useState } from "react";
import OrderEntryServices from "../../../service/orderEntry/orderEntry.sevice";
import useDebouncer from "../../../hooks/useDebouncer";

const useLookupYard = ({ show, type, customerFK, customerPlantPK, outbound }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [yardData, setYardtData] = useState([]);
  const [filterData, setFilterData] = useState({
    searchTerms: "",
    sortType: false,
    sortValue: null,
    searchCriteria: "Beginning",
  });

  const fetcherMap = {
    orderEntry: () =>
      OrderEntryServices.getYardDetails({
        ...filterData,
        searchTerm: filterData.searchTerms?.trim(),
        pageNumber,
        isOEPP: "Lookup",
        size: 12,
        customerFK,
        customerPlantPK,
        outbound,
        reload: !outbound,
      }),
    maintenanceProgram: () => {},
    editMasterExpressShuttle: () => {},
    shuttle: () => {},
    // (EditShuttle || EditYardUnit) : ()=>{},
  };

  const fetchData = async (number = 0) => {
    try {
      if (!type || !fetcherMap[type]) return;
      setLoading(true);

      const res = await fetcherMap[type](number);

      if (res?.data?.length > 0) {
        setYardtData(res.data.slice(0, res.data?.length - 1));
        const paginationData = res.data.pop();
        setTotalPages(paginationData.totalPages);
        setTotalElements(paginationData.totalElements);
      } else {
        setYardtData(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const debounceFetch = useDebouncer(() => fetchData(pageNumber), 500);

  useEffect(() => {
    if (!show) return;

    setLoading(true);
    debounceFetch();
  }, [show, filterData.sortType, filterData.searchCriteria, pageNumber, filterData.searchTerms]);

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
    yardData,
  };
};

export default useLookupYard;
