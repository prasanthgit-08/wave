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
} from "../../../redux/LookupScreens/EmailSenderTypesLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const EmailSenderTypeLookup = ({ show, onHide, renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
  };
  const pageNumber = useSelector((state) => state.EmailSenderTypesLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.EmailSenderTypesLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.EmailSenderTypesLookupReducer.totalElements);
  const emailSenderTypeData = useSelector((state) => state.EmailSenderTypesLookupReducer.emailSenderTypeData);
  const selectedSearchCriteria = useSelector(
    (state) => state.EmailSenderTypesLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.EmailSenderTypesLookupReducer.searchTerms);

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
    listingData: emailSenderTypeData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Email Sender Type Selection"}
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

export default EmailSenderTypeLookup;
