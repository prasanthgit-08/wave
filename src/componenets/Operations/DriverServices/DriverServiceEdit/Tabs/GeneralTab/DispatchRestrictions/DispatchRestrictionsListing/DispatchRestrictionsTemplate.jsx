import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import QuarterScreenTemplate from "../../../../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../../services/constants/applicationConstants";
import {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setStateCode,
  setDealerId,
  setCustomerId,
  setSpecialCodeId,
  setDealerName,
  setCustomerName,
  setSpecialCodeDescription,
  setStateCodeName,
  setNormalSortFlag,
  setNormalSortValue,
  setNotes,
  resetCloseChanges,
  setDispatchRestrictionsPK,
  setSelectedId,
} from "../../../../../../../../redux/DispatchRestrictionsSlice";
import TableListing from "./TableListing";
import { useParams } from "react-router-dom";

function DispatchRestrictionsTemplate() {
  const params = useParams();
  const driverId = params.driverId;
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.dispatchRestrictionsReducer.listingData);
  const searchTerm = useSelector((state) => state.dispatchRestrictionsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dispatchRestrictionsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.dispatchRestrictionsReducer.pageNumber);
  const totalPages = useSelector((state) => state.dispatchRestrictionsReducer.totalPages);
  const totalElements = useSelector((state) => state.dispatchRestrictionsReducer.totalElements);

  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(setDispatchRestrictionsPK(null));
    dispatch(setSelectedId(null));
    dispatch(setStateCode(""));
    dispatch(setStateCodeName(""));
    dispatch(setDealerId(null));
    dispatch(setCustomerId(null));
    dispatch(setSpecialCodeId(null));
    dispatch(setDealerName(""));
    dispatch(setCustomerName(""));
    dispatch(setSpecialCodeDescription(""));
    dispatch(setDispatchRestrictionsPK(null));
    dispatch(setNotes(""));
  };
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
          newButtonRoute={`/dispatch-restrictions-new/${driverId}`}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/driver-service-selection/${driverId}/form`}
          handleCloseOnClick={() => {
            dispatch(resetCloseChanges());
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default DispatchRestrictionsTemplate;
