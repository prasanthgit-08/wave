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
} from "../../../redux/LookupScreens/StateGroupsLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const StateGroupsLookup = ({ show, onHide, renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
  };
  const pageNumber = useSelector((state) => state.stateGroupsReducer.pageNumber);
  const totalPages = useSelector((state) => state.stateGroupsReducer.totalPages);
  const totalElements = useSelector((state) => state.stateGroupsReducer.totalElements);
  const stateGroupsData = useSelector((state) => state.stateGroupsReducer.stateGroupsData);
  const selectedSearchCriteria = useSelector((state) => state.stateGroupsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.stateGroupsReducer.searchTerms);

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
    listingData: stateGroupsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"State Groups Selection"}
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

export default StateGroupsLookup;
