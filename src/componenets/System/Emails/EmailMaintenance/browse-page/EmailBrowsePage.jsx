import React, { useState } from "react";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import TableListing from "./TableListing";
import {
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  resetChanges,
  setViewDetail,
} from "../../../../../redux/EmailFormatsSlice";
import { useDispatch, useSelector } from "react-redux";

const EmailBrowsePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.emailFormats.pageNumber);
  const totalPages = useSelector((state) => state.emailFormats.totalPages);
  const totalElements = useSelector((state) => state.emailFormats.totalElements);
  const listingData = useSelector((state) => state.emailFormats.listingData);
  const searchTerm = useSelector((state) => state.emailFormats.searchTerm);
  const searchCriteria = useSelector((state) => state.emailFormats.searchCriteria);

  const handleClickNew = () => {
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
          newButtonRoute={"/email-maintenance/add"}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
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

export default EmailBrowsePage;
