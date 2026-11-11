import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchSettingsState,
  setPageNumber,
  setSelectedSearchCriteria,
  setSearchTerm,
} from "../../../redux/LookupScreens/ReservesLookupSlice";
const ReservesLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  Driver,
  DriverReserve = false,
  lease,
  irp,
  eld,
  driverFK,
  isEquipmentFlag,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    Driver,
    DriverReserve,
    lease,
    irp,
    eld,
    driverFK,
    isEquipmentFlag,
    onHide,
  };

  const pageNumber = useSelector((state) => state.reservesLookup.pageNumber);
  const totalPages = useSelector((state) => state.reservesLookup.totalPages);
  const totalElements = useSelector((state) => state.reservesLookup.totalElements);
  const reservesData = useSelector((state) => state.reservesLookup.reservesData);
  const selectedSearchCriteria = useSelector((state) => state.reservesLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.reservesLookup.searchTerm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumber(0));
      dispatch(resetSearchSettingsState());
    }
  }, [show]);
  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: reservesData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Reserves Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
          normalSearchFilter
          handleClose={onHide}
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
      }
    />
  );
};
export default ReservesLookup;
