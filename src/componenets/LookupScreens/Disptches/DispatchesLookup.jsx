/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumber,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsState,
} from "../../../redux/LookupScreens/DispatchesLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const DispatchesLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  FormTypeObjectKey,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    FormTypeObjectKey,
  };
  const pageNumber = useSelector((state) => state.dispatchesLookupSlice.pageNumber);
  const totalPages = useSelector((state) => state.dispatchesLookupSlice.totalPages);
  const totalElements = useSelector((state) => state.dispatchesLookupSlice.totalElements);
  const dispatchesData = useSelector((state) => state.dispatchesLookupSlice.dispatchesData);
  const selectedSearchCriteria = useSelector((state) => state.dispatchesLookupSlice.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.dispatchesLookupSlice.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumber(0));
      dispatch(resetSearchSettingsState());
    }
  }, [show]);

  const paginationProps = {
    pageNumber,
    setPageNumber: (page) => dispatch(setPageNumber(page)), // Wrap in dispatch
    totalPages,
    totalElements,
    listingData: dispatchesData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Dispatch Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
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

export default DispatchesLookup;
