import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  resetSearchSettingsState,
  setSelectedSearchCriteria,
  setSearchTerms,
  setPageNumber,
} from "../../../redux/LookupScreens/RoadTypeCodeLookupSlice";
import { useDispatch } from "react-redux";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useSelector } from "react-redux";

const RoadTypeCodeLookup = ({ show, onHide, renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
  };
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.roadTypeLookup.pageNumber);
  const totalPages = useSelector((state) => state.roadTypeLookup.totalPages);
  const totalElements = useSelector((state) => state.roadTypeLookup.totalElements);
  const formsData = useSelector((state) => state.roadTypeLookup.formsData);
  const selectedSearchCriteria = useSelector((state) => state.roadTypeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.roadTypeLookup.searchTerms);

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
      lookupTitle={"Delay Unit Code Selection"}
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

export default RoadTypeCodeLookup;
