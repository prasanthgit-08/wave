/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageNo,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setAdvanceSortingCriteria,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSearchedCustomer,
  setAdvancedSearchObject,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  resetSearchSettings,
} from "../../../redux/LookupScreens/CustomerLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedLookupScreen from "../Templates/AdvancedLookupScreen";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";

const CustomerLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  shuttle,
  selectedCompanyName,
  MaintenanceProgram,
  customFetchFunction,
  DriverDispatch,
  usePlantsCustomer,
  customServiceCallback,
  delay,
  RerouteProgram,
  isMiscInvoice,
  restrictedCustomerId,
  restrictedCustomer,
  CompanyId,
  plantId,
  accountManagerId,
  customerActivitySummary,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  undispatchedListing,
  onRoadNotDeliveredReport,
  unitException,
  customerSalesReport,
  common,
}) => {
  // ---------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    shuttle,
    selectedCompanyName,
    MaintenanceProgram,
    customFetchFunction,
    DriverDispatch,
    usePlantsCustomer,
    customServiceCallback,
    delay,
    RerouteProgram,
    isMiscInvoice,
    restrictedCustomerId,
    restrictedCustomer,
    CompanyId,
    customerActivitySummary,
    plantId,
    accountManagerId,
    fetchFunction,
    renderCol1,
    renderCol2,
    renderCol3,
    undispatchedListing,
    onRoadNotDeliveredReport,
    unitException,
    customerSalesReport,
    common,
  };

  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const totalPages = useSelector((state) => state.customerLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.customerLookupReducer.totalElements);
  const customerData = useSelector((state) => state.customerLookupReducer.customerData);
  const showAdvanceSearch = useSelector((state) => state.customerLookupReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.customerLookupReducer.showAdvanceSort);
  const selectedSearchCriteria = useSelector((state) => state.customerLookupReducer.selectedSearchCriteria);
  const advanceSortingOrder = useSelector((state) => state.customerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.customerLookupReducer.searchTerms);
  const advanceSortedValue = useSelector((state) => state.customerLookupReducer.advanceSortedValue);
  const advancedSearchObject = useSelector((state) => state.customerLookupReducer.advancedSearchObject);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const loading = useSelector((state) => state.customerLookupReducer.loading);

  const dispatch = useDispatch();

  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));
    if (value === true) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedCustomer(null));
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
      dispatch(setPageNo(0));
      dispatch(resetSearchSettings());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNo,
    setPageNumber: setPageNo,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: customerData,
  };

  return (
    <AdvancedLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Customer Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNo}
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
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          threeFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Name"}
          secondFieldName={"City"}
          thirdFieldName={"State"}
          customThirdField={(thirdField) => thirdField.toUpperCase()}
          maxLengthThirdField={2}
          widthThirdField={"40px"}
          setPageNumber={setPageNo}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedCustomer({
                name: advancedSearchObject.firstField,
                city: advancedSearchObject.secondField,
                stateCode: advancedSearchObject.thirdField,
                description: "",
                dba: "",
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvanceSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          threeFieldSort
          firstFieldName={"Name"}
          secondFieldName={"City"}
          thirdFieldName={"State"}
          firstFieldPayload={"name"}
          secondFieldPayload={"city"}
          thirdFieldPayload={"stateCode"}
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortedValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
        />
      }
    />
  );
};

export default CustomerLookup;
