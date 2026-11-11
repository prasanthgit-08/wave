import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import DeleaseItemsListing from "./DeleaseItemsListing";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import {
  resetChanges,
  resetDeleaseItems,
  setChangeColor,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelecteActiveType,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../../redux/DeleaseItemsSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";

const DeleaseItemsMainPage = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.deleaseItemsReducer.searchTerm);
  const pageNumber = useSelector((state) => state.deleaseItemsReducer.pageNumber);
  const totalElements = useSelector((state) => state.deleaseItemsReducer.totalElements);
  const totalPages = useSelector((state) => state.deleaseItemsReducer.totalPages);
  const deleaseItemsData = useSelector((state) => state.deleaseItemsReducer.deleaseItemsData);
  const selectedSearchCriteria = useSelector((state) => state.deleaseItemsReducer.selectedSearchCriteria);
  const selecteActiveType = useSelector((state) => state.deleaseItemsReducer.selecteActiveType);
  const [loading, setLoading] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: deleaseItemsData,
    loading,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/delease-items/add`}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={`/`}
          handleCloseOnClick={() => dispatch(resetDeleaseItems())}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroup
          secondRadioGroupValue={selecteActiveType}
          customSecondRadioGroupOptions={["All", "Active", "Inactive"]}
          setSecondRadioGroupValue={setSelecteActiveType}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<DeleaseItemsListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={QuarterScreen_RecordsPerPage}
        />
      }
    />
  );
};

export default DeleaseItemsMainPage;
