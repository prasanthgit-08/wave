import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import styles from "../../../../styles/QuarterScreen.module.css";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/HolidaysSlice";
import { useEffect } from "react";
import HolidaysService from "../../../../services/HolidaysService";
import HolidaysListing from "./HolidaysListing";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

function HolidaysMainPage() {
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.holidaysReducer.listingData);
  const searchTerm = useSelector((state) => state.holidaysReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.holidaysReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.holidaysReducer.pageNumber);
  const totalPages = useSelector((state) => state.holidaysReducer.totalPages);
  const totalElements = useSelector((state) => state.holidaysReducer.totalElements);
  let sortFlag = useSelector((state) => state.holidaysReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.holidaysReducer.normalSortValue);
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/holidays-add"}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setSearchTerm(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setPageNumber(0));
            dispatch(setChangeColor(false));
            dispatch(setNormalSortValue(null));
            dispatch(setNormalSortFlag(false));
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<HolidaysListing customerURL={``} loading={loading} setLoading={setLoading} />}
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
}

export default HolidaysMainPage;
