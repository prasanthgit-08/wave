import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Col } from "react-bootstrap";
import YardListing from "./YardListing";
import YardSearchFilter from "./YardSearchFilter";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import {
  resetChanges,
  resetYard,
  setEditYardData,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
  setSelectedStatus,
  setNormalSortFlag,
  setNormalSortValue,
  setChangeColor,
} from "../../../redux/YardMaintenanceSlice";
import { PaginationComponent } from "../../common/PaginationComponent";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../constants/screenSizes";
const YardMainPage = () => {
  const pageNumber = useSelector((state) => state.yardMaintenanceReducer.pageNumber);
  const totalPages = useSelector((state) => state.yardMaintenanceReducer.totalPages);
  const selectedSearchCriteria = useSelector((state) => state.yardMaintenanceReducer.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.yardMaintenanceReducer.searchTerm);
  const selectedStatus = useSelector((state) => state.yardMaintenanceReducer.selectedStatus);
  const totalElements = useSelector((state) => state.yardMaintenanceReducer.totalElements);
  const yardData = useSelector((state) => state.yardMaintenanceReducer.yardData);
  const loader = useSelector((state) => state.yardMaintenanceReducer.loader);
  const [loading7, setLoading7] = useState(false);
  const dispatch = useDispatch();
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: yardData,
  };
  const onClick = () => {
    dispatch(setViewDetail(undefined));
    dispatch(setEditYardData(undefined));
    dispatch(resetYard());
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("Active"));
    dispatch(setChangeColor(false));
  };
  const onCloseNew = () => {
    dispatch(setSelectedStatus("Active"));
    dispatch(setPageNumber(0));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          fullScreen
          newButtonRoute={"/add-yard-maintenance"}
          handleNewOnClick={onClick}
          closeButtonRoute={"/"}
          handleCloseOnClick={onCloseNew}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroup={selectedStatus}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<YardListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={12}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
      quarterScreenWidth
      quarterScreenHeight
    />
  );
};

export default YardMainPage;
