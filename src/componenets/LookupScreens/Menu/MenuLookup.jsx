/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setSelectedSearchCriteria,
  setSearchTerms,
  resetMenuSearchFilters,
  setPageNumber,
} from "../../../redux/LookupScreens/MenuLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const MenuLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // -------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
  };

  const pageNumber = useSelector((state) => state.menuLookup.pageNumber);
  const totalPages = useSelector((state) => state.menuLookup.totalPages);
  const totalElements = useSelector((state) => state.menuLookup.totalElements);
  const listingData = useSelector((state) => state.menuLookup.listingData);
  const selectedSearchCriteria = useSelector((state) => state.menuLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.menuLookup.searchTerms);

  useEffect(() => {
    if (show === true) {
      dispatch(resetMenuSearchFilters());
    }
  }, [show]);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Menu Selection"}
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

export default MenuLookup;
