import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import {
  resetChanges,
  setChangeColor,
  setGarnishmentDataById,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedStatus,
  setViewDetail,
} from "../../../../../redux/DriverGarnishmentsSlice";
import { useParams } from "react-router-dom";

const DriverGarnishmentsBrowse = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const pageNumber = useSelector((state) => state.driverGarnishmentsReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverGarnishmentsReducer.totalPages);
  const totalElements = useSelector((state) => state.driverGarnishmentsReducer.totalElements);
  const searchTerm = useSelector((state) => state.driverGarnishmentsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverGarnishmentsReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.driverGarnishmentsReducer.selectedStatus);
  const garnishmentData = useSelector((state) => state.driverGarnishmentsReducer.garnishmentData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: garnishmentData,
  };
  const handleClickNew = () => {
    dispatch(setGarnishmentDataById(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("Active"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-garnishment/add/${id}`}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/driver-maintenance-add/${id}/0`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          secondRadioGroup
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
        />
      }
      TableListingComponent={<TableListing loader={loader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          loading={loader}
        />
      }
    />
  );
};

export default DriverGarnishmentsBrowse;
