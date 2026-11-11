/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberUnitTypeGroupsLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsUnitTypeGroups,
} from "../../../redux/LookupScreens/UnitTypeGroupsSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const UnitTypeGroupsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  commonSp,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    commonSp,
  };

  const pageNumberUnitTypeGroupsLookup = useSelector(
    (state) => state.unitTypeGroupsReducer.pageNumberUnitTypeGroupsLookup
  );
  const totalPages = useSelector((state) => state.unitTypeGroupsReducer.totalPages);
  const totalElements = useSelector((state) => state.unitTypeGroupsReducer.totalElements);
  const unitTypeGroupsData = useSelector((state) => state.unitTypeGroupsReducer.unitTypeGroupsData);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.unitTypeGroupsReducer.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberUnitTypeGroupsLookup(0));
      dispatch(resetSearchSettingsUnitTypeGroups());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberUnitTypeGroupsLookup,
    setPageNumber: setPageNumberUnitTypeGroupsLookup,
    totalPages,
    totalElements,
    listingData: unitTypeGroupsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Unit Type Group Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberUnitTypeGroupsLookup}
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

export default UnitTypeGroupsLookup;
