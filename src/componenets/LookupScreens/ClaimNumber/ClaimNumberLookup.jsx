import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import {
  setPageNumberClaimNumberLookup,
  resetSearchSettingsClaimNumberLookup,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/ClaimNumberLookupSlice";
import TableListing from "./TableListing";

const ClaimNumberLookup = ({
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
  const totalPages = useSelector((state) => state.claimNumberLookupReducer.totalPages);
  const pageNumber = useSelector((state) => state.claimNumberLookupReducer.pageNumberClaimNumberLookup);
  const totalElements = useSelector((state) => state.claimNumberLookupReducer.totalElements);
  const listingData = useSelector((state) => state.claimNumberLookupReducer.listingData);
  const loading = useSelector((state) => state.claimNumberLookupReducer.loading);

  const selectedSearchCriteria = useSelector(
    (state) => state.claimNumberLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.claimNumberLookupReducer.searchTerms);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumberClaimNumberLookup,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: listingData,
    loading: loading,
  };

  useEffect(() => {
    if (show) {
      dispatch(setPageNumberClaimNumberLookup(0));
      dispatch(resetSearchSettingsClaimNumberLookup());
    }
  }, [show]);
  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Claim Number Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberClaimNumberLookup}
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

export default ClaimNumberLookup;
