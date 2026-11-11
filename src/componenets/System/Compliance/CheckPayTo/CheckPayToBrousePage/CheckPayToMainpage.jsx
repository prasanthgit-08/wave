import React, { useState } from "react";
import { useEffect } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import CheckPayToListing from "./CheckPayToListing";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import QuarterScreenSearchFilter from "../../../../common/QuarterScreenSearchFilter";
import {
  setCheckPayToData,
  setEditFormData,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  resetChanges,
  resetOrderUsers,
  setNormalSortFlag,
  setNormalSortValue,
  setChangeColor,
} from "../../../../../redux/CheckPayToSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import CheckPayToService from "../../../../../services/CheckPayToService";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { setSearchCriteria, setSortType } from "../../../../../redux/PrinterSearchFilterSlice";
import { useParams } from "react-router-dom";
import { resetNew } from "../../../../../redux/ReservesSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
const CheckPayToMainpage = () => {
  const searchTerms = useSelector((state) => state.checkPayToReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.checkPayToReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.checkPayToReducer.pageNumber);
  const totalPages = useSelector((state) => state.checkPayToReducer.totalPages);
  const checkPayToData = useSelector((state) => state.checkPayToReducer.checkPayToData);
  const totalElements = useSelector((state) => state.checkPayToReducer.totalElements);
  const viewDetail = useSelector((state) => state.checkPayToReducer.viewDetail);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: checkPayToData,
    loading,
  };

  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(false));
    dispatch(resetChanges());
  };
  const onHandleChangeClose = () => {
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setChangeColor(false));
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/check-pay-to/add"}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => onHandleChangeClose()}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CheckPayToListing loading={loading} setLoading={setLoading} />}
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

export default CheckPayToMainpage;
