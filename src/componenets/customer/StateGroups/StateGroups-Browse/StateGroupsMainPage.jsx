import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setViewDetail,
  setPageNumber,
  setEditFormData,
  setSelectedSearchCriteria,
  setSearchTerm,
  resetClose,
  resetChanges,
} from "../../../../redux/StateGroupsSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import StateGroupsList from "./StateGroupsList";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
const StateGroupsMainPage = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.stateGroupReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.stateGroupReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.stateGroupReducer.pageNumber);
  const totalPages = useSelector((state) => state.stateGroupReducer.totalPages);
  const stateGroupsData = useSelector((state) => state.stateGroupReducer.stateGroupsData);
  const totalElements = useSelector((state) => state.stateGroupReducer.totalElements);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: stateGroupsData,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(null));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };
  const onClose = () => {
    dispatch(resetClose());
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/state-groups/add"}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<StateGroupsList loader={loader} setLoader={setLoader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
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

export default StateGroupsMainPage;
