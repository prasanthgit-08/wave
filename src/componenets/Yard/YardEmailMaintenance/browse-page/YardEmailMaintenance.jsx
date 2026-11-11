import React, { useEffect, useState } from "react";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import styles from "../../../../styles/QuarterScreen.module.css";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  resetChanges,
  setEditFormData,
  setListingData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setChangeColor,
  setYardFK,
  resetYardEmail,
  setNormalSortValue,
  setNormalSortFlag,
  setIsEmailUnique,
} from "../../../../redux/YardEmailSlice";
import { useDispatch, useSelector } from "react-redux";
import TableListing from "./TableListing";
import YardEmailService from "../../../../services/YardEmailService";
import { useNavigate, useParams } from "react-router-dom";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const YardEmailMaintenance = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const yardFK = params.id;

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const listingData = useSelector((state) => state.yardEmailReducer.listingData);
  const searchTerm = useSelector((state) => state.yardEmailReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.yardEmailReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.yardEmailReducer.pageNumber);
  const totalPages = useSelector((state) => state.yardEmailReducer.totalPages);
  const totalElements = useSelector((state) => state.yardEmailReducer.totalElements);
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
  };

  useEffect(() => {
    if (yardFK) dispatch(setYardFK(yardFK));
  }, [yardFK]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  const onClose = () => {
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/yard-email-maintenance/new-record/${yardFK}/${pageNumber}`}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/add-yard-maintenance/${yardFK}/${pageNumber}`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loader={loader} setLoader={setLoader} />}
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

export default YardEmailMaintenance;
