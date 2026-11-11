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
} from "../../../redux/LookupScreens/CustomerGroupsLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const CustomerGroupsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  CustomerFilter,
  customFetchFunction,
  customerId,
  commonSp,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    CustomerFilter,
    customFetchFunction,
    customerId,
    commonSp,
  };
  const pageNumber = useSelector((state) => state.customerGroupLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerGroupLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.customerGroupLookupReducer.totalElements);
  const customerGroupData = useSelector((state) => state.customerGroupLookupReducer.customerGroupData);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerGroupLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.customerGroupLookupReducer.searchTerms);
  const loading = useSelector((state) => state.customerGroupLookupReducer.loading);

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
    listingData: customerGroupData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Customer Group Selection"}
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
        <PaginationComponent
          {...paginationProps}
          loading={loading}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default CustomerGroupsLookup;
