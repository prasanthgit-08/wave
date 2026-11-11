import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import ReserveTypesListing from "./ReserveTypesListing";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import {
  setEditFormData,
  setViewDetail,
  setPageNumber,
  resetOrderUsers,
  resetChanges,
  setSearchTerm,
  setSelectedSearchCriteria,
} from "../../../../../redux/ReserveTypesSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
const ReserveTypesMainpage = () => {
  const searchTerm = useSelector((state) => state.reserveTypesReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.reserveTypesReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.reserveTypesReducer.pageNumber);
  const totalPages = useSelector((state) => state.reserveTypesReducer.totalPages);
  const reserveTypesData = useSelector((state) => state.reserveTypesReducer.reserveTypesData);
  const totalElements = useSelector((state) => state.reserveTypesReducer.totalElements);
  const viewDetail = useSelector((state) => state.reserveTypesReducer.viewDetail);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: reserveTypesData,
    loading,
  };

  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(false));
    dispatch(resetChanges());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/reserve-types/add"}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => dispatch(resetOrderUsers())}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<ReserveTypesListing loading={loading} setLoading={setLoading} />}
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
export default ReserveTypesMainpage;
