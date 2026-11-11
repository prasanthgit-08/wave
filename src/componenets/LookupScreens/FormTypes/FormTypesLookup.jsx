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
} from "../../../redux/LookupScreens/FormTypesLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const FormTypesLookup = ({
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
  const pageNumber = useSelector((state) => state.formTypesReducer.pageNumber);
  const totalPages = useSelector((state) => state.formTypesReducer.totalPages);
  const totalElements = useSelector((state) => state.formTypesReducer.totalElements);
  const formTypesData = useSelector((state) => state.formTypesReducer.formTypesData);
  const selectedSearchCriteria = useSelector((state) => state.formTypesReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.formTypesReducer.searchTerms);
  const loading = useSelector((state) => state.formTypesReducer.loading);

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
    listingData: formTypesData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Form Types Selection"}
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

export default FormTypesLookup;
