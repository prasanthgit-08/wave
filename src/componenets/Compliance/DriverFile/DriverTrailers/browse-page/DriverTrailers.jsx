import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSelectedStatus,
  setSearchTerm,
  setViewDetail,
  setFormData,
  resetDriverTrailers,
} from "../../../../../redux/DriverTrailersSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import TableListing from "./TableListing";
import { useParams } from "react-router-dom";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";

const DriverTrailers = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.driverTrailers.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrailers.searchCriteria);
  const selectedStatus = useSelector((state) => state.driverTrailers.selectedStatus);
  const listingData = useSelector((state) => state.driverTrailers.listingdata);
  const pageNumber = useSelector((state) => state.driverTrailers.pageNumber);
  const totalPages = useSelector((state) => state.driverTrailers.totalPages);
  const totalElements = useSelector((state) => state.driverTrailers.totalElements);
  const paginationLoading = useSelector((state) => state.driverTrailers.paginationLoading);

  const { driverId } = useParams();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const onClose = () => {
    dispatch(resetDriverTrailers());
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-trailers/add/${driverId}`}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(setFormData(null));
          }}
          closeButtonRoute={`/driver-maintenance-add/${driverId}/0`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={paginationLoading}
        />
      }
    />
  );
};

export default DriverTrailers;
