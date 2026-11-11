import React, { useState } from "react";
import StandardMaintenanceTemplate from "../../../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setSearchCriteria2,
  setSearchCriteria3,
  setFormData,
  setViewDetail,
  setShowAdvancedSearch,
  setSortFlag,
  setSortValue,
  setShowAdvancedSort,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  resetPermissionsMaintenance,
} from "../../../../../redux/PermissionsMaintenanceSlice";
import PermissionListing from "./PermissionListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import AdvancedSearchComponent from "../../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../../common/AdvancedSortComponent";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";

const PermissionMainPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.permissionsMaintenance.listingData);
  const pageNumber = useSelector((state) => state.permissionsMaintenance.pageNumber);
  const totalElements = useSelector((state) => state.permissionsMaintenance.totalElements);
  const totalPages = useSelector((state) => state.permissionsMaintenance.totalPages);
  const searchTerm = useSelector((state) => state.permissionsMaintenance.searchTerm);
  const searchCriteria = useSelector((state) => state.permissionsMaintenance.searchCriteria);
  const searchCriteria2 = useSelector((state) => state.permissionsMaintenance.searchCriteria2);
  const searchCriteria3 = useSelector((state) => state.permissionsMaintenance.searchCriteria3);
  const showAdvancedSearch = useSelector((state) => state.permissionsMaintenance.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.permissionsMaintenance.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.permissionsMaintenance.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.permissionsMaintenance.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.permissionsMaintenance.advancedSortingCombination
  );

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvancedSearch) {
      // onClick when Advanced Search is hidden
      dispatch(setSearchTerm(""));
    } else {
      // onClick when Advanced Search is shown
      dispatch(setAdvancedSearchPayload(null));
      dispatch(setAdvancedSearchObject(null));
    }
    // toggle Advanced Search
    dispatch(setShowAdvancedSearch(!showAdvancedSearch));
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvancedSort) {
      // onClick when Advanced Sort is hidden
      dispatch(setSortValue(null));
      dispatch(setSortFlag(false));
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvancedSortingCombination(null));
      dispatch(setAdvancedSortingOrder(null));
    }
    // toggle Advanced Sort
    dispatch(setShowAdvancedSort(!showAdvancedSort));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    recordsPerPage: 13,
    loading,
  };

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          newButtonRoute={"/permissions-maintenance/add"}
          handleNewOnClick={() => {
            dispatch(setFormData(null));
            dispatch(setViewDetail(false));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(resetPermissionsMaintenance());
          }}
          hasAdvancedSearch
          hasAdvancedSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          customSecondRadioGroupOptions={["All", "Enabled", "Disabled"]}
          secondRadioGroupValue={searchCriteria2}
          setSecondRadioGroupValue={setSearchCriteria2}
          customThirdRadioGroupOptions={["All", "Override", "Non Override"]}
          thirdRadioGroupValue={searchCriteria3}
          setThirdRadioGroupValue={setSearchCriteria3}
          showAdvancedSearch={showAdvancedSearch}
          showAdvancedSort={showAdvancedSort}
          setPageNumber={setPageNumber}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
        />
      }
      TableListingComponent={<PermissionListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
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
      showAdvancedSearch={showAdvancedSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          twoFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Description"}
          secondFieldName={"Object Key"}
          maxLengthFourthField={2}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setAdvancedSearchPayload({
                description: advancedSearchObject.firstField,
                objectKey: advancedSearchObject.secondField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvancedSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          twoFieldSort
          firstFieldName={"Description"}
          secondFieldName={"Object Key"}
          /**Back end payload */
          firstFieldPayload={"description"}
          secondFieldPayload={"objectKey"}
          advancedSortingOrder={advancedSortingOrder}
          setAdvancedSortingOrder={setAdvancedSortingOrder}
          advancedSortingCombination={advancedSortingCombination}
          setAdvancedSortingCombination={setAdvancedSortingCombination}
        />
      }
    />
  );
};

export default PermissionMainPage;
