import React from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  resetSearchSettingsLookupCheckPayTo,
  setPageNumberCheckPayToLookup,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/CheckPayToLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";

const CheckPayToLookup = ({
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

  const pageNumber = useSelector((state) => state.checkPayToLookupReducer.pageNumberCheckPayToLookup);
  const totalPages = useSelector((state) => state.checkPayToLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.checkPayToLookupReducer.totalElements);
  const listingData = useSelector((state) => state.checkPayToLookupReducer.listingData);
  const selectedSearchCriteria = useSelector((state) => state.checkPayToLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.checkPayToLookupReducer.searchTerms);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumberCheckPayToLookup,
    totalPages,
    totalElements,
    listingData: listingData,
  };

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberCheckPayToLookup(0));
      dispatch(resetSearchSettingsLookupCheckPayTo());
    }
  }, [show]);
  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Check Pay To"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberCheckPayToLookup}
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

export default CheckPayToLookup;
