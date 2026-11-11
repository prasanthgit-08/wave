import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  resetSearchSettingsState,
  setSelectedSearchCriteria,
  setSearchTerms,
  setPageNumber,
} from "../../../redux/LookupScreens/DealyUnitCodeLookupSlice";
import { useDispatch } from "react-redux";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useSelector } from "react-redux";

const DelayUnitCodeLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  status,
  weather,
  BreakdownProgram,
  roadType,
  roadCondition,
  customServiceCallback,
  fetchFunction,
  renderCol1,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    status,
    weather,
    roadType,
    roadCondition,
    BreakdownProgram,
    customServiceCallback,
    fetchFunction,
    renderCol1,
  };
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.delayCodeUnitLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.delayCodeUnitLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.delayCodeUnitLookupReducer.totalElements);
  const formsData = useSelector((state) => state.delayCodeUnitLookupReducer.formsData);
  const selectedSearchCriteria = useSelector(
    (state) => state.delayCodeUnitLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.delayCodeUnitLookupReducer.searchTerms);

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

export default DelayUnitCodeLookup;
