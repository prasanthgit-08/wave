import React, { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import DriverRserveListing from "./DriverRserveListing";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import {
  resetDriverReserves,
  setDriverReserves,
  setFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../../redux/DriverReserveSlice";

import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { useParams } from "react-router-dom";

function DriverRserveMainPage() {
  const { id, driverFK } = useParams();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.driverReserveReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverReserveReducer.totalPages);
  const totalElements = useSelector((state) => state.driverReserveReducer.totalElements);
  const searchTerm = useSelector((state) => state.driverReserveReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverReserveReducer.searchCriteria);
  const listingData = useSelector((state) => state.driverReserveReducer.listingData);

  const handleClickNew = () => {
    dispatch(setFormData(undefined));
    dispatch(setDriverReserves(null));
    dispatch(setViewDetail(undefined));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: listingData,
    loading,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-reserve-main/edit/${driverFK}`}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/driver-maintenance-add/${driverFK}`}
          handleCloseOnClick={() => {
            dispatch(resetDriverReserves());
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<DriverRserveListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
        />
      }
    />
  );
}

export default DriverRserveMainPage;
