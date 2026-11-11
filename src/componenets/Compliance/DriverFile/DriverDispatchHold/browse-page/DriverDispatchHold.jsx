import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDriverDispatchHold,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setIsValidEntry,
} from "../../../../../redux/DriverDispatchHoldSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { useParams } from "react-router-dom";

const DriverDispatchHold = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.driverDispatchHold.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDispatchHold.searchCriteria);
  const listingData = useSelector((state) => state.driverDispatchHold.listingData);
  const pageNumber = useSelector((state) => state.driverDispatchHold.pageNumber);
  const totalPages = useSelector((state) => state.driverDispatchHold.totalPages);
  const totalElements = useSelector((state) => state.driverDispatchHold.totalElements);
  const maintenancePgm = useSelector((state) => state.driverDispatchHold.maintenancePgm);
  const paginationLoader = useSelector((state) => state.driverDispatchHold.paginationLoader);

  const { driverId } = useParams();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={
            window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId
              ? `/driver-service-selection/${driverId}/form`
              : `/driver-maintenance-add/${driverId}`
          }
          handleCloseOnClick={() => {
            dispatch(resetDriverDispatchHold());
            dispatch(setIsValidEntry(false));
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={paginationLoader}
        />
      }
    />
  );
};
export default DriverDispatchHold;
