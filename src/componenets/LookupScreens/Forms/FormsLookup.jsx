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
} from "../../../redux/LookupScreens/FormsLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const FormsLookup = ({
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
  const pageNumber = useSelector((state) => state.formsReducer.pageNumber);
  const totalPages = useSelector((state) => state.formsReducer.totalPages);
  const totalElements = useSelector((state) => state.formsReducer.totalElements);
  const formsData = useSelector((state) => state.formsReducer.formsData);
  const selectedSearchCriteria = useSelector((state) => state.formsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.formsReducer.searchTerms);
  const loading = useSelector((state) => state.formsReducer.loading);

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
    listingData: formsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Form Selection"}
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
        <PaginationComponent {...paginationProps} loading={loading} firstPage lastPage singleArrowUp singleArrowDown />
      }
    />
  );
};

export default FormsLookup;
