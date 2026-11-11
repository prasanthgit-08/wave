import React, { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import { setEditFormData } from "../../../../redux/AlternateContactSlice";
import AlternateContactService from "../../../../services/AlternateContactService";
import AlternateContactList from "./AlternateContactList";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setPageNumber,
  resetChanges,
  setViewDetail,
  resetAlternateContact,
} from "../../../../redux/AlternateContactSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const AlternateContactMainPage = () => {
  const searchTerm = useSelector((state) => state.alternateContactReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.alternateContactReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.alternateContactReducer.pageNumber);
  const totalPages = useSelector((state) => state.alternateContactReducer.totalPages);
  const alternateContactData = useSelector((state) => state.alternateContactReducer.alternateContactData);
  const totalElements = useSelector((state) => state.alternateContactReducer.totalElements);
  const viewDetail = useSelector((state) => state.alternateContactReducer.viewDetail);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: alternateContactData,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(null));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };
  const onClose = () => {
    dispatch(resetAlternateContact());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/add-alternate-contacts"}
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
      TableListingComponent={<AlternateContactList loader={loader} setLoader={setLoader} />}
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

export default AlternateContactMainPage;
