import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  resetLookupData,
} from "../../../redux/LookupScreens/DriverTrailerLookupSlice";

const DriverTrailerLookup = ({ show, onHide, MaintenanceProgram, DOTInspection, handleLookupSelection }) => {
  const dispatch = useDispatch();
  const trailerData = useSelector((state) => state.driverTrailerLookupSlice.trailerData);
  const searchTerm = useSelector((state) => state.driverTrailerLookupSlice.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrailerLookupSlice.searchCriteria);
  const sortValue = useSelector((state) => state.driverTrailerLookupSlice.sortType);
  const sortType = useSelector((state) => state.driverTrailerLookupSlice.sortType);
  const pageNumber = useSelector((state) => state.driverTrailerLookupSlice.pageNumber);
  const pageSize = useSelector((state) => state.driverTrailerLookupSlice.pageSize);
  const type = useSelector((state) => state.driverTrailerLookupSlice.type);
  const driverFK = useSelector((state) => state.driverTrailerLookupSlice.driverFK);
  const totalPages = useSelector((state) => state.driverTrailerLookupSlice.totalPages);
  const totalElements = useSelector((state) => state.driverTrailerLookupSlice.totalElements);
  const trailerLoading = useSelector((state) => state.driverTrailerLookupSlice.trailerLoading);

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
    listingData: trailerData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Driver Trailer"}
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
          loading={trailerLoading}
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

export default DriverTrailerLookup;
