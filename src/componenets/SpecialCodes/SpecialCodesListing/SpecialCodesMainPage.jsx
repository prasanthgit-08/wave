import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import { PaginationComponent } from "../../common/PaginationComponent";
import SpecialCodesListing from "./SpecialCodesListing";
import QuarterScreenSearchFilter from "../../common/QuarterScreenSearchFilter";
import SpecialCodesService from "../../../services/SpecialCodesService";
import {
  setTotalElements,
  setTotalPages,
  setSpecialCodesData,
  setEditFormData,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetChanges,
  setViewDetail,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../redux/SpecialCodesSlice";
import { toast } from "react-hot-toast";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";

const SpecialCodesMainPage = () => {
  const searchTerm = useSelector((state) => state.specialCodesReducer.searchTerm);
  const pageNumber = useSelector((state) => state.specialCodesReducer.pageNumber);
  const totalElements = useSelector((state) => state.specialCodesReducer.totalElements);
  const totalPages = useSelector((state) => state.specialCodesReducer.totalPages);
  const viewDetail = useSelector((state) => state.specialCodesReducer.viewDetail);
  const specialCodesData = useSelector((state) => state.specialCodesReducer.specialCodesData);
  const selectedSearchCriteria = useSelector((state) => state.specialCodesReducer.selectedSearchCriteria);

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: specialCodesData,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/special-codes-maintenance/add`}
          handleNewOnClick={onHandleChangeView}
          handleCloseOnClick={onClose}
          closeButtonRoute={`/`}

          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<SpecialCodesListing loader={loader} setLoader={setLoader} />}

      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={QuarterScreen_RecordsPerPage}
          loading={loader}
        />
      }
    />
  );
};

export default SpecialCodesMainPage;
