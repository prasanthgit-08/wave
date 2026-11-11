import React, { useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import ReservesListing from "./ReservesListing";
import { useSelector } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setIsDescriptionUnique,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setReservePK,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
  setSelectedStatus,
  setViewDetail,
} from "../../../../../redux/ReservesSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";

const ReservesMainPage = () => {
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.reservesReducer);
  const { reservesData } = useSelector((state) => state.reservesReducer);
  const params = useParams();
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const [loading, setLoading] = useState(false);
  const searchCriteria = useSelector((state) => state.reservesReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.reservesReducer.searchTerm);
  const selectedStatus = useSelector((state) => state.reservesReducer.selectedStatus);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setSelectedId(null));
    dispatch(setSelectedStatus("Active"));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: reservesData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup
          newButtonRoute={"/reserves/add"}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(setViewDetail(false));
            dispatch(resetChanges());
            dispatch(setIsDescriptionUnique(false));
          }}
          fullScreen
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<ReservesListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};
export default ReservesMainPage;
