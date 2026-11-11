import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  resetSearchSettingsState,
  setSelectedSearchCriteria,
  setSearchTerms,
  setPageNumber,
} from "../../../redux/LookupScreens/RoadConditionLookupSlice";
import { useDispatch } from "react-redux";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useSelector } from "react-redux";

const RoadConditionLookup = ({ show, onHide, renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
  };
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.roadConditionLookup.pageNumber);
  const totalPages = useSelector((state) => state.roadConditionLookup.totalPages);
  const totalElements = useSelector((state) => state.roadConditionLookup.totalElements);
  const formsData = useSelector((state) => state.roadConditionLookup.formsData);
  const selectedSearchCriteria = useSelector((state) => state.roadConditionLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.roadConditionLookup.searchTerms);

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
      lookupTitle={"Road Condition Selection"}
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

export default RoadConditionLookup;
