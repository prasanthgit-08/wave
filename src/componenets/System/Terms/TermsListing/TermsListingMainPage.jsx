import React, { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import TermsListing from "./TermsListing";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setEditFormData,
  setChangeColor,
  resetChanges,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../redux/TermsSlice";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

function TermsListingMainPage() {
  const [loading, setLoading] = useState(true);

  const listingData = useSelector((state) => state.termsReducer.listingData);
  const searchTerm = useSelector((state) => state.termsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.termsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.termsReducer.pageNumber);
  const totalPages = useSelector((state) => state.termsReducer.totalPages);
  const totalElements = useSelector((state) => state.termsReducer.totalElements);

  const dispatch = useDispatch();

  const handleNewOnClick = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: listingData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/terms-browse/add"}
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TermsListing loading={loading} setLoading={setLoading} />}
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

export default TermsListingMainPage;
