/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PlantToYardTransferCustomerListing } from "./PlantToYardTransferCustomerListing";
import {
  resetChanges,
  resetCustomerData,
  setCustomerAdvanceSortValue,
  setCustomerAdvancedSearchObject,
  setCustomerAdvancedSortOrder,
  setCustomerPageNumber,
  setCustomerSearchCriteria,
  setCustomerSearchTerm,
  setCustomerSortFieldName,
  setCustomerSortValue,
  setCustomerType,
  setShowCustomerAdvancedSearch,
  setShowCustomerAdvancedSort,
} from "../../../../redux/PlantToYardTransfersSlice";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";

function PlantToYardTransferCustomerMainPage() {
  const dispatch = useDispatch();

  const {
    customerPageNumber,
    customerTotalPages,
    customerTotalElements,
    customerData,
    customerSearchTerm,
    customerSearchCriteria,
    customerType,
    showCustomerAdvancedSearch,
    customerAdvancedSearchObject,
    showCustomerAdvancedSort,
    customerAdvanceSortValue,
    customerAdvancedSortOrder,
    customerSortFieldName,
    customerSortValue,
  } = useSelector((state) => state.plantToYardTransfersReducer);

  const CustomerPaginationProps = {
    pageNumber: customerPageNumber,
    setPageNumber: setCustomerPageNumber,
    totalPages: customerTotalPages,
    totalElements: customerTotalElements,
    listingData: customerData,
  };
  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          hasAdvancedSort
          secondRadioGroup
          setPageNumber={setCustomerPageNumber}
          globalSearchTerm={customerSearchTerm}
          setGlobalSearchTerm={setCustomerSearchTerm}
          firstRadioGroupValue={customerSearchCriteria}
          setFirstRadioGroupValue={setCustomerSearchCriteria}
          secondRadioGroupValue={customerType}
          setSecondRadioGroupValue={setCustomerType}
          showAdvancedSearch={showCustomerAdvancedSearch}
          handleAdvancedSearchOnClick={(value) => {
            value ? dispatch(setCustomerSearchTerm("")) : dispatch(setCustomerAdvancedSearchObject(null));
            dispatch(setShowCustomerAdvancedSearch(value));
          }}
          showAdvancedSort={showCustomerAdvancedSort}
          handleAdvancedSortOnClick={(value) => {
            value
              ? dispatch(setCustomerSortFieldName("")) && dispatch(setCustomerSortValue(false))
              : dispatch(setCustomerAdvanceSortValue(null)) && dispatch(setCustomerAdvancedSortOrder(null));
            dispatch(setShowCustomerAdvancedSort(value));
          }}
          handleCloseOnClick={() => {
            dispatch(resetCustomerData());
            dispatch(resetChanges());
          }}
          closeButtonRoute={"/plant-to-yard-transfer"}
          fullScreen
        />
      }
      TableListingComponent={<PlantToYardTransferCustomerListing />}
      PaginationComponent={
        <PaginationComponent
          {...CustomerPaginationProps}
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
      showAdvancedSearch={showCustomerAdvancedSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fiveFieldSearch
          advancedSearchObject={customerAdvancedSearchObject}
          setAdvancedSearchObject={setCustomerAdvancedSearchObject}
          firstFieldName={"Description"}
          secondFieldName={"Name"}
          thirdFieldName={"DBA"}
          fourthFieldName={"City"}
          fifthFieldName={"State"}
          customFifthField={(fifthField) => fifthField.toUpperCase()}
          maxLengthFifthField={2}
          widthFifthField={"40px"}
          setPageNumber={setCustomerPageNumber}
        />
      }
      showAdvancedSort={showCustomerAdvancedSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          fiveFieldSort
          firstFieldName={"Description"}
          secondFieldName={"Name"}
          thirdFieldName={"DBA"}
          fourthFieldName={"City"}
          fifthFieldName={"State"}
          firstFieldPayload={"description"}
          secondFieldPayload={"name"}
          thirdFieldPayload={"dba"}
          fourthFieldPayload={"city"}
          fifthFieldPayload={"stateCode"}
          advancedSortingOrder={customerAdvancedSortOrder}
          setAdvancedSortingOrder={setCustomerAdvancedSortOrder}
          advancedSortingCombination={customerAdvanceSortValue}
          setAdvancedSortingCombination={setCustomerAdvanceSortValue}
        />
      }
    />
  );
}

export default PlantToYardTransferCustomerMainPage;
