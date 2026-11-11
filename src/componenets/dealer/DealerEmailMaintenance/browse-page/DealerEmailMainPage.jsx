import React, { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  resetChanges,
  setViewDetail,
  setEmailData,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setSaveFormData,
  setEditEmailData,
  setIsNameUnique,
  setIsEmailUnique,
} from "../../../../redux/DealerEmailSlice";
import DealerEmailList from "./DealerEmailList";
import DealerEmailMaintenanceService from "../../../../services/DealerEmailMaintenanceService";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { useParams } from "react-router-dom";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
const DealerEmailMainPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.dealerEmailReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.dealerEmailReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.dealerEmailReducer.pageNumber);
  const totalPages = useSelector((state) => state.dealerEmailReducer.totalPages);
  const emailData = useSelector((state) => state.dealerEmailReducer.emailData);
  const totalElements = useSelector((state) => state.dealerEmailReducer.totalElements);
  let sortFlag = useSelector((state) => state.dealerEmailReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.dealerEmailReducer.normalSortValue);
  const viewDetail = useSelector((state) => state.dealerEmailReducer.viewDetail);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: emailData,
  };
  const onClose = () => {
    dispatch(setSearchTerm(""));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
  };
  const handleClickNew = () => {
    dispatch(setIsNameUnique(true));
    dispatch(setIsEmailUnique(true));

    dispatch(setEditEmailData(null));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/add-dealer-email-maintenance/${id}`}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/add-dealer/${id}/${pageNumber}`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<DealerEmailList />}
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

export default DealerEmailMainPage;
