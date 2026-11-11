/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberRegionsLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsRegions,
} from "../../../redux/LookupScreens/RegionsLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const RegionsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  UndispatchedListing,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    UndispatchedListing,
  };

  const pageNumberRegionsLookup = useSelector((state) => state.regionsReducer.pageNumberRegionsLookup);
  const totalPages = useSelector((state) => state.regionsReducer.totalPages);
  const totalElements = useSelector((state) => state.regionsReducer.totalElements);
  const regionsData = useSelector((state) => state.regionsReducer.regionsData);
  const selectedSearchCriteria = useSelector((state) => state.regionsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.regionsReducer.searchTerms);
  const loading = useSelector((state) => state.regionsReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberRegionsLookup(0));
      dispatch(resetSearchSettingsRegions());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberRegionsLookup,
    setPageNumber: setPageNumberRegionsLookup,
    totalPages,
    totalElements,
    listingData: regionsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Regions Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberRegionsLookup}
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

export default RegionsLookup;
