import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverServicesService from "../../../../../services/DriverServicesService";
import DriverSelectionContent from "./DriverSelectionContent";
import DriverSelectionFilter from "./DriverSelectionFilter";
import DriverSelectionfooter from "./DriverSelectionFooter";
import { setDriverData, setTotalElements, setTotalPages } from "../../../../../redux/DriverServiceSlice";
import { useState } from "react";
import LoadingIcon from "../../../../common/LoadingIcon";
import useDebouncer from "../../../../../hooks/useDebouncer";

function DriverSelectionmainPage() {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  const {
    searchCriteria,
    firstName,
    lastName,
    active,
    activeString,
    deleased,
    sortValue,
    pageNumber,
    sortType,
    driverType,
    dispatcherId,
  } = useSelector((state) => state.driverServicesSlice);

  const fetchDriver = () => {
    setLoader(true);
    DriverServicesService.getDriver(
      searchCriteria,
      pageNumber,
      firstName,
      lastName,
      active,
      activeString,
      deleased,
      sortValue,
      sortType,
      driverType,
      dispatcherId
    )
      .then((res) => {
        dispatch(setDriverData(res.data.content));
        dispatch(setTotalElements(res.data.totalElements));
        dispatch(setTotalPages(res.data.totalPages));
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      })
      .finally(() => setLoader(false));
  };
  const debounceFetch = useDebouncer(fetchDriver, 500);

  useEffect(() => {
    localStorage.removeItem("fromControlRoom");
  }, []);

  useEffect(() => {
    setLoader(true);
    debounceFetch();
  }, [
    searchCriteria,
    active,
    activeString,
    deleased,
    firstName,
    lastName,
    sortType,
    sortValue,
    pageNumber,
    driverType,
    dispatcherId,
  ]);

  return (
    <div className="customContainer">
      {loader && <LoadingIcon />}

      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DriverSelectionFilter />
        <DriverSelectionContent loader={loader} />
        <DriverSelectionfooter />
      </div>
    </div>
  );
}

export default DriverSelectionmainPage;
