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
} from "../../../redux/LookupScreens/StateLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const StateLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupCity,
  OECustomerDeliveryCity,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    OECustomerPickupCity,
    OECustomerDeliveryCity,
  };
  const pageNumber = useSelector((state) => state.stateReducer.pageNumber);
  const totalPages = useSelector((state) => state.stateReducer.totalPages);
  const totalElements = useSelector((state) => state.stateReducer.totalElements);
  const stateData = useSelector((state) => state.stateReducer.stateData);
  const selectedSearchCriteria = useSelector((state) => state.stateReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.stateReducer.searchTerms);

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
    listingData: stateData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"State Selection"}
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

export default StateLookup;
