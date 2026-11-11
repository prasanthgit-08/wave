/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setUserLookupPageNumber,
  setSelectedSearchCriteria,
  setSearchedUser,
  setAdvanceSortingCriteria,
  setSearchTerms,
  setShowAdvanceSearch,
  setAdvancedSearchObject,
  setShowAdvanceSort,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  resetSettingUser,
} from "../../../redux/LookupScreens/UserLookupSlice";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedLookupScreen from "../Templates/AdvancedLookupScreen";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";

const UserLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  CustomUserPermission,
  userType,
  EmailMaintenance,
  userStatus,
  selectedUserStatus,
  YardCheckin,
  companyName,
  currentUserId,
  EditYardUnit,
  UnitActivation,
  DriverEditFile,
  DispatchUserFilter,
  DriverDispatchUser,
  fetchFunction,
  tripListing,
  renderCol1,
  renderCol2,
  renderCol3,
  unitException,
}) => {
  //--------------------------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customServiceCallback,
    CustomUserPermission,
    userType,
    EmailMaintenance,
    userStatus,
    selectedUserStatus,
    YardCheckin,
    companyName,
    currentUserId,
    EditYardUnit,
    UnitActivation,
    DriverEditFile,
    DispatchUserFilter,
    DriverDispatchUser,
    fetchFunction,
    tripListing,
    renderCol1,
    renderCol2,
    renderCol3,
    unitException,
  };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userLookupReducer.loading);
  const totalPages = useSelector((state) => state.userLookupReducer.totalPages);
  const userLookupPageNumber = useSelector((state) => state.userLookupReducer.userLookupPageNumber);
  const usersData = useSelector((state) => state.userLookupReducer.usersData);
  const searchTerms = useSelector((state) => state.userLookupReducer.searchTerms);
  const showAdvanceSearch = useSelector((state) => state.userLookupReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.userLookupReducer.showAdvanceSort);
  const advanceSortingOrder = useSelector((state) => state.userLookupReducer.advanceSortingOrder);
  const totalElements = useSelector((state) => state.userLookupReducer.totalElements);
  const selectedSearchCriteria = useSelector((state) => state.userLookupReducer.selectedSearchCriteria);
  const advancedSearchObject = useSelector((state) => state.userLookupReducer.advancedSearchObject);
  const advanceSortedValue = useSelector((state) => state.userLookupReducer.advanceSortedValue);
  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));
    if (value === true) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedUser(null));
    }
  };

  const handleAdvancedSort = (value) => {
    dispatch(setShowAdvanceSort(value));

    if (value === true) {
      // show advanced sort
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // hide advanced sort
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
    }
  };

  useEffect(() => {
    if (show === true) {
      dispatch(setUserLookupPageNumber(0));
      dispatch(resetSettingUser());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: userLookupPageNumber,
    setPageNumber: setUserLookupPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: usersData,
  };

  return (
    <AdvancedLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"User Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setUserLookupPageNumber}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          showAdvancedSearchState={showAdvanceSearch}
          showAdvancedSortState={showAdvanceSort}
          handleAdvancedSearch={handleAdvancedSearch}
          handleAdvancedSort={handleAdvancedSort}
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
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          twoFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Name"}
          secondFieldName={"Login"}
          setPageNumber={setUserLookupPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedUser({
                name: advancedSearchObject.firstField,
                login: advancedSearchObject.secondField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvanceSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          twoFieldSort
          firstFieldName={"Name"}
          secondFieldName={"Login"}
          firstFieldPayload={"name"}
          secondFieldPayload={"login"}
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortedValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
        />
      }
    />
  );
};
export default UserLookup;
