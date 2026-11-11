import React, { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import ShuttleCitysListing from "./ShuttleCitysListing";
import ShuttleCitysService from "../../../../services/ShuttleCitysService";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setShuttleCitysData,
  resetChanges,
  setViewDetail,
  setEditFormData,
  setRadioValue,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  resetShuttleCity,
} from "../../../../redux/ShuttleCitysSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const ShuttleCitysMainPage = () => {
  const searchTerm = useSelector((state) => state.shuttleCitysReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.shuttleCitysReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.shuttleCitysReducer.pageNumber);
  const totalPages = useSelector((state) => state.shuttleCitysReducer.totalPages);
  const shuttleCitysData = useSelector((state) => state.shuttleCitysReducer.shuttleCitysData);
  const totalElements = useSelector((state) => state.shuttleCitysReducer.totalElements);
  const [loader, setLoader] = useState(true);
  const [loading7, setLoading7] = useState(false);
  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: shuttleCitysData,
  };

  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(setRadioValue("outbound"));
    dispatch(resetChanges());
  };

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
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
          newButtonRoute={`/add-shuttle-citys`}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<ShuttleCitysListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
    />
  );
};

export default ShuttleCitysMainPage;
