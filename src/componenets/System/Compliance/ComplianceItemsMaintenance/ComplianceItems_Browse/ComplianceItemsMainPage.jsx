import React, { useState } from "react";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import ComplianceItemsList from "./ComplianceItemsList";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  resetChanges,
  resetClose,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedStatus,
  setViewDetail,
} from "../../../../../redux/ComplianceItemsSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../constants/screenSizes";
const ComplianceItemsMainPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const pageNumber = useSelector((state) => state.complianceItemsReducer.pageNumber);
  const totalElements = useSelector((state) => state.complianceItemsReducer.totalElements);
  const totalPages = useSelector((state) => state.complianceItemsReducer.totalPages);
  const searchTerm = useSelector((state) => state.complianceItemsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.complianceItemsReducer.searchCriteria);
  const complianceItemsData = useSelector((state) => state.complianceItemsReducer.complianceItemsData);
  const selectedStatus = useSelector((state) => state.complianceItemsReducer.selectedStatus);

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const onClose = () => {
    dispatch(resetClose());
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: complianceItemsData,
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
          fullScreen
          secondRadioGroup
          newButtonRoute={"/compilance-items-add"}
          handleNewOnClick={handleClickNew}
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
      TableListingComponent={<ComplianceItemsList loading={loading} setLoading={setLoading} />}
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
      quarterScreenWidth
      quarterScreenHeight
    />
  );
};

export default ComplianceItemsMainPage;
