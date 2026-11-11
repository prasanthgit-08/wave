import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import YardToYardListing from "./YardToYardListing";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setAdvanceSearchObject,
  setAdvanceSearch,
  setAdvanceSearchTermOne,
  setAdvanceSearchTermTwo,
  setSaveData,
  resetPageValues,
  setViewDetail,
} from "../../../../redux/YardToYardShuttleSlice";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";

function YardToYardMainPage() {
  const dispatch = useDispatch();

  const {
    searchCriteria,
    pageNumber,
    totalPages,
    totalElements,
    listingData,
    advanceSearch,
    advanceSearchObject,
    searchTerm,
  } = useSelector((state) => state.yardToYardShuttleReducer);
  const [loading7, setLoading7] = useState(false);

  // props for pagenation
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  useEffect(() => {
    dispatch(setAdvanceSearchTermOne(advanceSearchObject != null ? advanceSearchObject.firstField : ""));
    dispatch(setAdvanceSearchTermTwo(advanceSearchObject != null ? advanceSearchObject.secondField : ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advanceSearchObject]);

  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          newButtonRoute={"/yard-to-yard-shuttle/add"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setSaveData(null));
          }}
          fullScreen
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          showAdvancedSearch={advanceSearch}
          handleAdvancedSearchOnClick={(value) => {
            value ? dispatch(setSearchTerm("")) : dispatch(setAdvanceSearchObject(null));
            dispatch(setAdvanceSearch(value));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setSaveData(null));
            dispatch(resetPageValues());
          }}
        />
      }
      TableListingComponent={<YardToYardListing loading7={loading7} setLoading7={setLoading7} />}
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
      showAdvancedSearch={advanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          twoFieldSearch
          advancedSearchObject={advanceSearchObject}
          setAdvancedSearchObject={setAdvanceSearchObject}
          firstFieldName={"Yard #1"}
          secondFieldName={"Yard #2"}
          setPageNumber={setPageNumber}
        />
      }
    />
  );
}

export default YardToYardMainPage;
