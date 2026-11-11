import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  resetLookupData,
} from "../../../redux/LookupScreens/DriverTruckLookupSlice";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";

const DriverTruckLookup = ({ show, onHide, MaintenanceProgram, DOTInspection, handleLookupSelection }) => {
  const dispatch = useDispatch();
  const truckData = useSelector((state) => state.driverTruckLookupSlice.truckData);
  const searchTerm = useSelector((state) => state.driverTruckLookupSlice.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTruckLookupSlice.searchCriteria);
  const sortValue = useSelector((state) => state.driverTruckLookupSlice.sortType);
  const sortType = useSelector((state) => state.driverTruckLookupSlice.sortType);
  const pageNumber = useSelector((state) => state.driverTruckLookupSlice.pageNumber);
  const pageSize = useSelector((state) => state.driverTruckLookupSlice.pageSize);
  const type = useSelector((state) => state.driverTruckLookupSlice.type);
  const driverFK = useSelector((state) => state.driverTruckLookupSlice.driverFK);
  const totalPages = useSelector((state) => state.driverTruckLookupSlice.totalPages);
  const totalElements = useSelector((state) => state.driverTruckLookupSlice.totalElements);
  const truckLoading = useSelector((state) => state.driverTruckLookupSlice.truckLoading);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        dispatch(resetLookupData());
      }, 200);
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: truckData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Driver Truck"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          selectedSearchCriteria={searchCriteria}
          setSelectedSearchCriteria={setSearchCriteria}
          setPageNumber={setPageNumber}
          normalSearchFilter
          handleClose={onHide}
        />
      }
      TableListingComponent={
        <TableListing
          MaintenanceProgram={MaintenanceProgram}
          DOTInspection={DOTInspection}
          handleLookupSelection={handleLookupSelection}
        />
      }
      PaginationComponent={
        <PaginationComponent
          loading={truckLoading}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          {...paginationProps}
        />
      }
    />
  );
};

export default DriverTruckLookup;
