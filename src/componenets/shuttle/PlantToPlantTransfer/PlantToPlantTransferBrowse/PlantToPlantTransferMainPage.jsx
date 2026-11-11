import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import PlantToPlantTransferListing from "./PlantToPlantTransferListing";
import {
  resetCustomerData,
  resetData,
  setAdvancedSearchObject,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setShowAdvancedSearch,
  setViewDetail,
} from "../../../../redux/PlantToPlantTransferSlice";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";

function PlantToPlantTransferMainPage() {
  const dispatch = useDispatch();

  const {
    pageNumber,
    totalPages,
    totalElements,
    searchTerm,
    searchCriteria,
    showAdvancedSearch,
    plantToPlantTransferData,
    advancedSearchObject,
  } = useSelector((state) => state.plantToPlantTransferReducer);
  const [loading7, setLoading7] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: plantToPlantTransferData,
  };

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          newButtonRoute={"/plant-to-plant-transfer-customer"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(resetCustomerData());
            dispatch(resetData());
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvancedSearch}
          handleAdvancedSearchOnClick={(value) => {
            value ? dispatch(setSearchTerm("")) : dispatch(setAdvancedSearchObject(null));
            dispatch(setShowAdvancedSearch(value));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(resetData());
          }}
          fullScreen
        />
      }
      TableListingComponent={<PlantToPlantTransferListing loading7={loading7} setLoading7={setLoading7} />}
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
      showAdvancedSearch={showAdvancedSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          threeFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Customer"}
          secondFieldName={"Plant #1"}
          thirdFieldName={"Plant #2"}
          setPageNumber={setPageNumber}
        />
      }
    />
  );
}

export default PlantToPlantTransferMainPage;
