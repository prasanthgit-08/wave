import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import {
  resetChanges,
  resetClose,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setViewDetail,
} from "../../../../../redux/DeleaseCodeSlice";
import DeleaseCodeList from "./DeleaseCodeList";
import { PaginationComponent } from "../../../../common/PaginationComponent";
const DeleaseCodeMainPage = () => {
  const searchTerm = useSelector((state) => state.deleaseCodeReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.deleaseCodeReducer.selectedSearchCriteria);
  const deleaseCodeData = useSelector((state) => state.deleaseCodeReducer.deleaseCodeData);
  const pageNumber = useSelector((state) => state.deleaseCodeReducer.pageNumber);
  const totalPages = useSelector((state) => state.deleaseCodeReducer.totalPages);
  const totalElements = useSelector((state) => state.deleaseCodeReducer.totalElements);
  const selectedStatus = useSelector((state) => state.deleaseCodeReducer.selectedStatus);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleNewOnClick = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
  };
  const onClose = () => {
    dispatch(resetClose());

    dispatch(resetChanges());
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: deleaseCodeData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup
          newButtonRoute={`/delease-code-new`}
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<DeleaseCodeList loading={loading} setLoading={setLoading} />}
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

export default DeleaseCodeMainPage;
