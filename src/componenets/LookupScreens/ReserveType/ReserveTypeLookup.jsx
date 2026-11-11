/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";

import NormalLookupScreen from "../Templates/NormalLookupScreen";
import {
  resetSearchSettingsState,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/ReserveTypeLookupSlice";

const ReserveTypeLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
  };
  const pageNumber = useSelector((state) => state.reserveTypeReducer.pageNumber);
  const totalPages = useSelector((state) => state.reserveTypeReducer.totalPages);
  const totalElements = useSelector((state) => state.reserveTypeReducer.totalElements);
  const reserveTypeData = useSelector((state) => state.reserveTypeReducer.reserveTypeData);
  const selectedSearchCriteria = useSelector((state) => state.reserveTypeReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.reserveTypeReducer.searchTerms);
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
    listingData: reserveTypeData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Reserve Types Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
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

export default ReserveTypeLookup;
