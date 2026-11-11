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
} from "../../../redux/LookupScreens/ComplianceItemsLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const ComplianceItemsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  customFetchFunction,
  blockedLogReport,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    customFetchFunction,
    blockedLogReport,
  };
  const pageNumber = useSelector((state) => state.complianceItemsLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.complianceItemsLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.complianceItemsLookupReducer.totalElements);
  const complianceData = useSelector((state) => state.complianceItemsLookupReducer.complianceData);
  const selectedSearchCriteria = useSelector(
    (state) => state.complianceItemsLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.complianceItemsLookupReducer.searchTerms);

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
    listingData: complianceData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Compliance Item Selection"}
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

export default ComplianceItemsLookup;
