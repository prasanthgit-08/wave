import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import PlantToYardTransferListing from "./PlantToYardTransferListing";
// import { setPageNumber } from "../../../../redux/PaginationSlice";
import {
  setViewDetail,
  resetChanges,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setShowAdvanceSearch,
  setAdvanceSearchTermCustomer,
  setAdvanceSearchTermYard,
  setAdvanceSearchTermPlant,
  resetCustomerData,
  setSaveData,
} from "../../../../redux/PlantToYardTransfersSlice";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";

function PlantToYardTransferMainPage() {
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.plantToYardTransfersReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.plantToYardTransfersReducer.searchTerm);
  const pageNumber = useSelector((state) => state.plantToYardTransfersReducer.pageNumber);
  const totalPages = useSelector((state) => state.plantToYardTransfersReducer.totalPages);
  const totalElements = useSelector((state) => state.plantToYardTransfersReducer.totalElements);
  const listingData = useSelector((state) => state.plantToYardTransfersReducer.listingData);
  const showAdvanceSearch = useSelector((state) => state.plantToYardTransfersReducer.showAdvanceSearch);
  const advanceSearchTermCustomer = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermCustomer
  );
  const advanceSearchTermPlant = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermPlant
  );
  const advanceSearchTermYard = useSelector(
    (state) => state.plantToYardTransfersReducer.advanceSearchTermYard
  );
  const customerData = useSelector((state) => state.plantToYardTransfersReducer.customerData);

  const [loading7, setLoading7] = useState(false);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: listingData,
  };

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          newButtonRoute={"/plant-to-yard-transfer-customer"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(resetChanges());
            dispatch(resetCustomerData());
            dispatch(setSaveData(undefined));
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvanceSearch}
          handleAdvancedSearchOnClick={(value) => {
            value
              ? dispatch(setSearchTerm(""))
              : dispatch(setAdvanceSearchTermCustomer("")) &&
                dispatch(setAdvanceSearchTermPlant("")) &&
                dispatch(setAdvanceSearchTermYard(""));
            dispatch(setShowAdvanceSearch(value));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(resetChanges());
            dispatch(resetCustomerData());
          }}
          fullScreen
        />
      }
      TableListingComponent={<PlantToYardTransferListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          threeFieldSearch
          advancedSearchObject={advanceSearchTermCustomer || advanceSearchTermPlant || advanceSearchTermYard}
          setAdvancedSearchObject={
            setAdvanceSearchTermCustomer || setAdvanceSearchTermPlant || setAdvanceSearchTermYard
          }
          firstFieldName={"Customer"}
          secondFieldName={"Plant"}
          thirdFieldName={"Yard"}
          setPageNumber={setPageNumber}
        />
      }
    />
  );
}

export default PlantToYardTransferMainPage;
