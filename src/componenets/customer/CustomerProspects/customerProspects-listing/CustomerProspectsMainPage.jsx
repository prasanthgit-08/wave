import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetStates,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setViewDetail,
} from "../../../../redux/CustomerProspectsSlice";
import { PaginationComponent } from "../../../common/PaginationComponent";

import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import TableListing from "./TableListing";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";

function CustomerProspectsMainPage() {
  const [loader, setLoader] = useState(true);
  const listingData = useSelector((state) => state.customerProspectsReducer.listingData);
  const pageNumber = useSelector((state) => state.customerProspectsReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerProspectsReducer.totalPages);
  const totalElements = useSelector((state) => state.customerProspectsReducer.totalElements);
  const dispatch = useDispatch();
  const searchTerms = useSelector((state) => state.customerProspectsReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerProspectsReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.customerProspectsReducer.selectedStatus);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetStates());
    dispatch(setViewDetail(false));
  };
  const onClose = () => {
    dispatch(resetChanges());
  };
  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup
          newButtonRoute={"/customer-prospects/add"}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loader={loader} setLoader={setLoader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default CustomerProspectsMainPage;
