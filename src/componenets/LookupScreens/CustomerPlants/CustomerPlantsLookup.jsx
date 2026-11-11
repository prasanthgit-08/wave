/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNoPlantsLookup,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setAdvanceSortingCriteria,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSearchedCustomerPlant,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  resetSearchSettingsPlants,
  setAdvancedSearchObject,
} from "../../../redux/LookupScreens/CustomerPlantsLookupSlice";
import AdvancedLookupScreen from "../Templates/AdvancedLookupScreen";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";

const CustomerPlantsLookup = ({
  customerId,
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  shuttle,
  yardCheckin,
  selectedCompanyName,
  isDPUCustomer,
  EditShuttle,
  companyName,
  EditMasterExpress,
  restrictedPlantLists,
  customServiceCallback,
  customerActivitySummary,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  normalfetchFunction,
  tripListingByCustomer,
  onRoadNotDeliveredReport,
  unitException,
  customerSalesReport,
  returnProcess,
  unitfk,
  common,
  reportType,
}) => {
  // ---------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customerId,
    customFetchFunction,
    shuttle,
    yardCheckin,
    selectedCompanyName,
    isDPUCustomer,
    EditShuttle,
    companyName,
    EditMasterExpress,
    restrictedPlantLists,
    customServiceCallback,
    customerActivitySummary,
    fetchFunction,
    renderCol1,
    renderCol2,
    renderCol3,
    normalfetchFunction,
    tripListingByCustomer,
    onRoadNotDeliveredReport,
    unitException,
    customerSalesReport,
    returnProcess,
    unitfk,
    common,
    reportType,
  };
  const pageNoPlantsLookup = useSelector((state) => state.customerPlantsLookupReducer.pageNoPlantsLookup);
  const totalPages = useSelector((state) => state.customerPlantsLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.customerPlantsLookupReducer.totalElements);
  const customerPlantData = useSelector((state) => state.customerPlantsLookupReducer.customerPlantData);
  const showAdvanceSearch = useSelector((state) => state.customerPlantsLookupReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.customerPlantsLookupReducer.showAdvanceSort);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantsLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrder = useSelector((state) => state.customerPlantsLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.customerPlantsLookupReducer.searchTerms);
  const advancedSearchObject = useSelector((state) => state.customerPlantsLookupReducer.advancedSearchObject);
  const advanceSortValue = useSelector((state) => state.customerPlantsLookupReducer.advanceSortedValue);
  const loading = useSelector((state) => state.customerPlantsLookupReducer.loading);

  const dispatch = useDispatch();

  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));
    if (value === true) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedCustomerPlant(null));
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
      dispatch(setPageNoPlantsLookup(0));
      dispatch(resetSearchSettingsPlants());
    }
    if (MaintenanceProgram) {
      dispatch(setShowAdvanceSort(false));
    }
  }, [show, MaintenanceProgram]);

  useEffect(() => {
    dispatch(setPageNoPlantsLookup(0));
    dispatch(resetSearchSettingsPlants());
  }, [show]);

  const paginationProps = {
    pageNumber: pageNoPlantsLookup,
    setPageNumber: setPageNoPlantsLookup,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: customerPlantData,
  };

  return (
    <AdvancedLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Customer Plant Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNoPlantsLookup}
          showAdvancedSearchFlag
          showAdvancedSearchState={showAdvanceSearch}
          handleAdvancedSearch={handleAdvancedSearch}
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
          firstFieldName={"Name"}
          secondFieldName={"Brand"}
          thirdFieldName={"Product Line"}
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          setPageNumber={setPageNoPlantsLookup}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedCustomerPlant({
                name: advancedSearchObject.firstField,
                brand: advancedSearchObject.secondField,
                productLine: advancedSearchObject.thirdField,
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
          secondFieldName={"Brand"}
          thirdFieldName={"Product Line"}
          firstFieldPayload={"name"}
          secondFieldPayload={"brand"}
          thirdFieldPayload={"productLine"}
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
        />
      }
    />
  );
};

export default CustomerPlantsLookup;
