import React, { useState } from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { FullScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import { CustomerRatesListing } from "./CustomerRatesListing";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setSearchCustomer,
  setSearchCustomerGroup,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchTerms,
  setSearchUnitTypeGroup,
  setShowAdvanceSearch,
  setSearchCriteria,
  setSortValue,
  setSortFlag,
  setSelectId,
  setViewDetail,
  setEditFormData,
  resetMinimumTab,
  resetLengthTab,
  resetSurchargesTab,
  resetGeneralTab,
  resetTiersMileageTab,
  resetTiersFlatrateTab,
  setIsSelectedDuplicate,
} from "../../../../redux/CustomerRatesSlice";
function CustomerRatesMainPage() {
  const dispatch = useDispatch();
  // List API pending: drives the listing loader and disables the pagination buttons.
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.customerRatesReducer.pageNumber);
  const searchTerms = useSelector((state) => state.customerRatesReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerRatesReducer.searchCriteria);
  const showAdvanceSearch = useSelector((state) => state.customerRatesReducer.showAdvanceSearch);
  const searchCustomer = useSelector((state) => state.customerRatesReducer.searchCustomer);
  const searchUnitTypeGroup = useSelector((state) => state.customerRatesReducer.searchUnitTypeGroup);

  const totalPages = useSelector((state) => state.customerRatesReducer.totalPages);
  const customerRatesListData = useSelector((state) => state.customerRatesReducer.customerRatesListData);
  const totalElements = useSelector((state) => state.customerRatesReducer.totalElements);
  const advancedSearchObject = useSelector((state) => state.customerRatesReducer.advancedSearchObject);
  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchByPayload(null));
      dispatch(setSearchCustomer(""));
      dispatch(setSearchPlant(""));
      dispatch(setSearchPlantGroup(""));
      dispatch(setSearchCustomerGroup(""));
      dispatch(setSearchUnitTypeGroup(""));
    }

    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerRatesListData,
    recordsPerPage: FullScreen_RecordsPerPage,
  };
  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          fullScreen
          newButtonRoute={"/customer-rates-customer-new"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setEditFormData(null));
            dispatch(resetGeneralTab());
            dispatch(resetTiersMileageTab());
            dispatch(resetTiersFlatrateTab());
            dispatch(resetMinimumTab());
            dispatch(resetLengthTab());
            dispatch(resetSurchargesTab());
            dispatch(setIsSelectedDuplicate(false));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(setSearchTerms(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setSortValue(null));
            dispatch(setSortFlag(false));
            dispatch(setShowAdvanceSearch(false));
            dispatch(setAdvancedSearchObject(null));
            dispatch(setAdvancedSearchString(""));
            dispatch(setSearchCustomer(""));
            dispatch(setSearchPlant(""));
            dispatch(setSearchPlantGroup(""));
            dispatch(setSearchCustomerGroup(""));
            dispatch(setSearchUnitTypeGroup(""));
            dispatch(setPageNumber(0));
            dispatch(setSelectId(null));
          }}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvanceSearch}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
        />
      }
      TableListingComponent={<CustomerRatesListing loading={loading} setLoading={setLoading} />}
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
          fiveFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Customer"}
          secondFieldName={"Plant"}
          thirdFieldName={"Plant Group"}
          fourthFieldName={"Customer Group"}
          fifthFieldName={"Unit Type Group"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(setSearchCustomer(advancedSearchObject.firstField));
            dispatch(setSearchPlant(advancedSearchObject.secondField));
            dispatch(setSearchPlantGroup(advancedSearchObject.thirdField));
            dispatch(setSearchCustomerGroup(advancedSearchObject.fourthField));
            dispatch(setSearchUnitTypeGroup(advancedSearchObject.fifthField));
          }}
        />
      }
    />
  );
}
export default CustomerRatesMainPage;
