import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSearchCriteria,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setPageNumber,
  setEditFormData,
  setViewDetail,
  setDriverFK,
  setDriverComplianceItemFK,
} from "../../../../../redux/DriverComplianceItemsSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import DriverComplianceListing from "./DriverComplianceListing";
import { useParams } from "react-router-dom";

function DriverComplianceListingMainPage() {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const pageNumberForDriverComplianceItem = localStorage.getItem("pageNumberForDriverComplianceItem");

  const listingData = useSelector((state) => state.DriverComplianceItemsReducer.listingData);
  const pageNumber = useSelector((state) => state.DriverComplianceItemsReducer.pageNumber);
  const totalPages = useSelector((state) => state.DriverComplianceItemsReducer.totalPages);
  const searchTerm = useSelector((state) => state.DriverComplianceItemsReducer.searchTerm);

  const totalElements = useSelector((state) => state.DriverComplianceItemsReducer.totalElements);
  const searchCriteria = useSelector((state) => state.DriverComplianceItemsReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.DriverComplianceItemsReducer.selectedStatus);
  const pageNumberForDriver = useSelector((state) => state.DriverComplianceItemsReducer.pageNumberForDriver);

  const onClose = async () => {
    dispatch(setSearchTerm(""));
    const pageNumberForDriverComplianceItem = localStorage.getItem("pageNumberForDriverComplianceItem");
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setDriverComplianceItemFK(null));
  };
  useEffect(() => {
    return () => {
      dispatch(setEditFormData(undefined));
    };
  }, []);
  useEffect(() => {
    dispatch(setDriverFK(driverId)); // Dispatch the action to set the driverId
  }, [driverId, dispatch]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={`/driver-maintenance-add/${driverId}/${pageNumberForDriverComplianceItem || pageNumberForDriver}`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={
        <DriverComplianceListing customerURL={``} loading={loading} setLoading={setLoading} />
      }

      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading}
        />
      }
    />
  );
}

export default DriverComplianceListingMainPage;
