import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchSettingsUnitNumberLookup,
  setPageNumberUnitNumberLookup,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/UnitNumberLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import { useEffect } from "react";

const UnitNumbersLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  const dispatch = useDispatch();

  const lookupProps = {
    onHide,
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
  };
  const totalPages = useSelector((state) => state.unitNumberLookupReducer.totalPages);
  const pageNumber = useSelector((state) => state.unitNumberLookupReducer.pageNumberUnitNumberLookup);
  const totalElements = useSelector((state) => state.unitNumberLookupReducer.totalElements);
  const listingData = useSelector((state) => state.unitNumberLookupReducer.listingData);
  const selectedSearchCriteria = useSelector((state) => state.unitNumberLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.unitNumberLookupReducer.searchTerms);
  const loading = useSelector((state) => state.unitNumberLookupReducer.loading);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumberUnitNumberLookup,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: listingData,
    loading: loading,
  };

  useEffect(() => {
    if (show) {
      dispatch(setPageNumberUnitNumberLookup(0));
      dispatch(resetSearchSettingsUnitNumberLookup());
    }
  }, [show]);
  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Unit Number Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberUnitNumberLookup}
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

export default UnitNumbersLookup;
