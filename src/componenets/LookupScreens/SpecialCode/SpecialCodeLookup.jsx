/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberSpecialCodeLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsSpecialCode,
} from "../../../redux/LookupScreens/SpecialCodeLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const SpecialCodeLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  UnitActivation,
  UndispatchedListing,
  yardInventory,
}) => {
  // -------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    UnitActivation,
    UndispatchedListing,
    yardInventory,
  };

  const pageNumberSpecialCodeLookup = useSelector(
    (state) => state.specialCodeLookup.pageNumberSpecialCodeLookup
  );
  const totalPages = useSelector((state) => state.specialCodeLookup.totalPages);
  const totalElements = useSelector((state) => state.specialCodeLookup.totalElements);
  const specialCodeData = useSelector((state) => state.specialCodeLookup.specialCodeData);
  const selectedSearchCriteria = useSelector((state) => state.specialCodeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.specialCodeLookup.searchTerms);
  const loading = useSelector((state) => state.specialCodeLookup.loading);

  useEffect(() => {
    if (show === true) {
      dispatch(resetSearchSettingsSpecialCode());
    }
  }, [show]);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber: pageNumberSpecialCodeLookup,
    setPageNumber: setPageNumberSpecialCodeLookup,
    totalPages,
    totalElements,
    listingData: specialCodeData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Special Code Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberSpecialCodeLookup}
          normalSearchFilter
          handleClose={onHide}
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loading}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default SpecialCodeLookup;
