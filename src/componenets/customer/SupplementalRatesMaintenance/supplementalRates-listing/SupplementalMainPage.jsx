import React from "react";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { FullScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import { SupplementalListing } from "./SupplementalListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetStates,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchCustomer,
  setSearchCustomerGroup,
  setSearchDescription,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchTerms,
  setSearchedData,
  setShowAdvanceSearch,
  updateAdvancedSearchByInputs,
  setViewDetail,
  setSelectId,
  setChangeColor,
} from "../../../../redux/SupplementalRatesSlice";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";

function SupplementalMainPage() {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.supplementalRatesReducer.pageNumber);
  const searchTerms = useSelector((state) => state.supplementalRatesReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.supplementalRatesReducer.searchCriteria);
  const showAdvanceSearch = useSelector((state) => state.supplementalRatesReducer.showAdvanceSearch);

  const totalPages = useSelector((state) => state.supplementalRatesReducer.totalPages);
  const supplementalRatesData = useSelector((state) => state.supplementalRatesReducer.supplementalRatesData);
  const totalElements = useSelector((state) => state.supplementalRatesReducer.totalElements);
  const advancedSearchObject = useSelector((state) => state.supplementalRatesReducer.advancedSearchObject);
  const listingLoading = useSelector((state) => state.supplementalRatesReducer.listingLoading);

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedData(null));
      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchByPayload(null));
      dispatch(setSearchDescription(""));
      dispatch(setSearchCustomer(""));
      dispatch(setSearchPlant(""));
      dispatch(setSearchPlantGroup(""));
      dispatch(setSearchCustomerGroup(""));
    }
    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: supplementalRatesData,
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
          newButtonRoute={"/supplemental-rates-customer-new"}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetStates());
            dispatch(setSearchTerms(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setNormalSortValue(null));
            dispatch(setNormalSortFlag(false));
            dispatch(setShowAdvanceSearch(false));
            dispatch(setAdvancedSearchObject(null));
            dispatch(setSearchedData(null));
            dispatch(setAdvancedSearchString(""));
            dispatch(setSearchDescription(""));
            dispatch(setSearchCustomer(""));
            dispatch(setSearchPlant(""));
            dispatch(setSearchPlantGroup(""));
            dispatch(setSearchCustomerGroup(""));
            dispatch(setPageNumber(0));
            dispatch(setSelectId(null));
          }}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetStates());
            dispatch(setViewDetail(false));
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
      TableListingComponent={<SupplementalListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={listingLoading}
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
      quarterScreenWidth
      quarterScreenHeight
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fiveFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Description"}
          secondFieldName={"Customer"}
          thirdFieldName={"Plant"}
          fourthFieldName={"Plant Group"}
          fifthFieldName={"Customer Group"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(setSearchDescription(advancedSearchObject.firstField));
            dispatch(setSearchCustomer(advancedSearchObject.secondField));
            dispatch(setSearchPlant(advancedSearchObject.thirdField));
            dispatch(setSearchPlantGroup(advancedSearchObject.fourthField));
            dispatch(setSearchCustomerGroup(advancedSearchObject.fifthField));
          }}
        />
      }
    />
  );
}

export default SupplementalMainPage;
