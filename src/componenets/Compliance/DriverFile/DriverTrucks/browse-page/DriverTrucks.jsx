import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setPageNumber,
  setSearchCriteria,
  setSelectedStatus,
  setSearchTerm,
  setViewDetails,
  setFormData,
  resetDriverTrucks,
} from "../../../../../redux/DriverTrucksSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import TableListing from "./TableListing";
import { useParams } from "react-router-dom";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";

const DriverTrucks = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.driverTrucks.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTrucks.searchCriteria);
  const selectedStatus = useSelector((state) => state.driverTrucks.selectedStatus);
  const listingData = useSelector((state) => state.driverTrucks.listingData);
  const pageNumber = useSelector((state) => state.driverTrucks.pageNumber);
  const totalPages = useSelector((state) => state.driverTrucks.totalPage);
  const totalElements = useSelector((state) => state.driverTrucks.totalElement);
  const [loading7, setLoading7] = useState(false);

  const { driverId } = useParams();

  const handleNewOnClick = () => {
    dispatch(setViewDetails(false));
    dispatch(setFormData(null));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  const onClose = () => {
    dispatch(resetDriverTrucks());
  };
  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-trucks/add/${driverId}`}
          handleNewOnClick={handleNewOnClick}
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
      TableListingComponent={<TableListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
    />
  );
};

export default DriverTrucks;
