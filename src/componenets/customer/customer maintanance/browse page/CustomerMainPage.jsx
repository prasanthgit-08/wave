/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../../../../redux/PaginationSlice";
import {
  resetSearch,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvancedSearchObject,
  setNormalSortFlag,
  setNormalSortValue,
  setSearchTerms,
  setSearchedCustomer,
  setSelectedCustomerStatus,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setShowAdvanceSearch,
  setShowAdvanceSort,
} from "../../../../redux/CustomerSearchFilterSlice";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { CustomerSearchFilter } from "./CustomerSearchFilter";
import { CustomerListing } from "./CustomerListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { setEditCustomerData, setViewDetail } from "../../../../redux/CustomerMaintenanceSlice";

const CustomerMainPage = () => {
  const customerData = useSelector((state) => state.customerSearchFilterReducer.customerData);
  const showAdvanceSearch = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSort);
  const advancedSearchObject = useSelector((state) => state.customerSearchFilterReducer.advancedSearchObject);
  const advanceSortingOrder = useSelector((state) => state.customerSearchFilterReducer.advanceSortingOrder);
  const advanceSortedValue = useSelector((state) => state.customerSearchFilterReducer.advanceSortedValue);
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);
  const globalSearchTerm = useSelector((state) => state.customerSearchFilterReducer.searchTerms);
  const selectedCustomerStatus = useSelector(
    (state) => state.customerSearchFilterReducer.selectedCustomerStatus
  );
  const selectedStatus = useSelector((state) => state.customerSearchFilterReducer.selectedStatus);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerSearchFilterReducer.selectedSearchCriteria
  );
  const loader = useSelector((state) => state.customerSearchFilterReducer.loader);

  const dispatch = useDispatch();

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedCustomer(null));
    }
    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvanceSort) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
    }
    dispatch(setShowAdvanceSort(!showAdvanceSort));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerData,
  };

  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          hasAdvancedSort
          secondRadioGroup
          thirdRadioGroup
          newButtonRoute={"/add-customer"}
          closeButtonRoute={"/"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setEditCustomerData(null));
          }}
          handleCloseOnClick={() => {
            dispatch(resetSearch());
            dispatch(setPageNumber(0));
          }}
          globalSearchTerm={globalSearchTerm}
          setGlobalSearchTerm={setSearchTerms}
          setPageNumber={setPageNumber}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          thirdRadioGroupValue={selectedCustomerStatus}
          setThirdRadioGroupValue={setSelectedCustomerStatus}
          customHandleThirdRadioGroupOnChange={(option) => {
            dispatch(setSelectedCustomerStatus(option));
            // Selecting Incomplete defaults All / Active / Inactive to All (Task 4015).
            if (option === "Incomplete") dispatch(setSelectedStatus("All"));
            dispatch(setPageNumber(0));
          }}
          showAdvancedSearch={showAdvanceSearch}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
        />
      }
      TableListingComponent={<CustomerListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
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
          fiveFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Description"}
          secondFieldName={"Name"}
          thirdFieldName={"DBA"}
          fourthFieldName={"City"}
          fifthFieldName={"State"}
          customFifthField={(fifthField) => fifthField?.toUpperCase()}
          maxLengthFifthField={2}
          widthFifthField={"40px"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedCustomer({
                description: advancedSearchObject.firstField,
                name: advancedSearchObject.secondField,
                dba: advancedSearchObject.thirdField,
                city: advancedSearchObject.fourthField,
                stateCode: advancedSearchObject.fifthField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvanceSort}
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
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortedValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
          zoomOut
        />
      }
    />
  );
};

export default CustomerMainPage;
