import React from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import TableListing from "./TableListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDelayUnitCheck,
  setDelayRequestRecord,
  setDescription,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { useParams } from "react-router-dom";

const DelayUnitCheckRequest = () => {
  const dispatch = useDispatch();
  const { id, driverfk } = useParams();
  const params = useParams();
  const searchTerm = useSelector((state) => state.delayCheckRequest.searchTerm);
  const searchCriteria = useSelector((state) => state.delayCheckRequest.searchCriteria);
  const delayCheckRequestData = useSelector((state) => state.delayCheckRequest.delayCheckRequestData);
  const pageNumber = useSelector((state) => state.delayCheckRequest.pageNumber);
  const totalPages = useSelector((state) => state.delayCheckRequest.totalPages);
  const totalElements = useSelector((state) => state.delayCheckRequest.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: delayCheckRequestData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/delay-unit-check-request/${driverfk}/${id}/add`}
          handleNewOnClick={() => {
            dispatch(setDelayRequestRecord(null));
            dispatch(setViewDetail(false));
            dispatch(setDescription(null));
          }}
          closeButtonRoute={"/damage-processing/view-damage/" + id}
          handleCloseOnClick={() => dispatch(resetDelayUnitCheck())}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
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
        />
      }
    />
  );
};

export default DelayUnitCheckRequest;
