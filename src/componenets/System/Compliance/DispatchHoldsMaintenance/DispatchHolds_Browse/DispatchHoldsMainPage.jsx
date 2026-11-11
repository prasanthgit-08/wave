import React from "react";
import { useParams } from "react-router-dom";
import {
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import DispatchHoldsList from "./DispatchHoldsList";
import {
  resetChanges,
  setEditFormData,
  setViewDetail,
  setDispatchPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  resetClose,
} from "../../../../../redux/DispatchHoldSearchSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";

const DispatchHoldsMainPage = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const dispatchPageNumber = useSelector((state) => state.dispatchHoldSearchSliceReducer.dispatchPageNumber);
  const dispatchTotalElements = useSelector(
    (state) => state.dispatchHoldSearchSliceReducer.dispatchTotalElements
  );
  const dispatchTotalPages = useSelector((state) => state.dispatchHoldSearchSliceReducer.dispatchTotalPages);
  const dispatchHoldData = useSelector((state) => state.dispatchHoldSearchSliceReducer.dispatchHoldData);
  const searchTerm = useSelector((state) => state.dispatchHoldSearchSliceReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dispatchHoldSearchSliceReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.dispatchHoldSearchSliceReducer.selectedStatus);
  const listingData = useSelector((state) => state.dispatchHoldSearchSliceReducer.listingData);
  const data = useSelector((state) => state.dispatchHoldSearchSliceReducer.data);
  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
  };
  const onClose = () => {
    dispatch(resetClose());
  };
  const paginationProps = {
    pageNumber: dispatchPageNumber,
    setPageNumber: setDispatchPageNumber,
    totalPages: dispatchTotalPages,
    totalElements: dispatchTotalElements,
    listingData: data,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup
          newButtonRoute={"/dispatch-hold-new"}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setDispatchPageNumber}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
        />
      }
      TableListingComponent={<DispatchHoldsList loading={loading} setLoading={setLoading} />}
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

export default DispatchHoldsMainPage;
