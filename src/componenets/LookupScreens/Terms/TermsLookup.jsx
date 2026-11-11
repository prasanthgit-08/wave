import React from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  resetSearchSettingsLookupTerms,
  setPageNumberTermsLookup,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/TermsLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";

const TermsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
  };

  const pageNumber = useSelector((state) => state.termsLookupReducer.pageNumberTermsLookup);
  const totalPages = useSelector((state) => state.termsLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.termsLookupReducer.totalElements);
  const listingData = useSelector((state) => state.termsLookupReducer.listingData);
  const selectedSearchCriteria = useSelector((state) => state.termsLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.termsLookupReducer.searchTerms);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumberTermsLookup,
    totalPages,
    totalElements,
    listingData: listingData,
  };

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberTermsLookup(0));
      dispatch(resetSearchSettingsLookupTerms());
    }
  }, [show]);
  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Terms"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberTermsLookup}
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

export default TermsLookup;
