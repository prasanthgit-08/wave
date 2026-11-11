/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberPortOfEntryLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsPortOfEntry,
} from "../../../redux/LookupScreens/PortOfEntryLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const PortOfEntryLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  brokerType,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    brokerType,
    MaintenanceProgram,
    customFetchFunction,
  };
  const pageNumberPortOfEntryLookup = useSelector(
    (state) => state.portOfEntryLookup.pageNumberPortOfEntryLookup
  );
  const totalPages = useSelector((state) => state.portOfEntryLookup.totalPages);
  const totalElements = useSelector((state) => state.portOfEntryLookup.totalElements);
  const portOfEntryData = useSelector((state) => state.portOfEntryLookup.portOfEntryData);
  const selectedSearchCriteria = useSelector((state) => state.portOfEntryLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.portOfEntryLookup.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNumberPortOfEntryLookup(0));
    dispatch(resetSearchSettingsPortOfEntry());
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberPortOfEntryLookup,
    setPageNumber: setPageNumberPortOfEntryLookup,
    totalPages,
    totalElements,
    listingData: portOfEntryData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Port of Entry Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberPortOfEntryLookup}
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

export default PortOfEntryLookup;
