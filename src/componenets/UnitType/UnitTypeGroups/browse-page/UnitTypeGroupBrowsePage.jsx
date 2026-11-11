import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetClose,
  setEditFormData,
  setPageNumber,
  setRadioValue,
  setSearchTerm,
  setSelectedSearchCriteria,
  setUnitTypeList,
  setViewDetail,
} from "../../../../redux/UnitTypeGroupSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import UnitTypeGroupTableListing from "./UnitTypeGroupTableListing ";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const UnitTypeGroupBrowsePage = () => {
  const searchTerm = useSelector((state) => state.unitTypeGroupReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupReducer.selectedSearchCriteria);
  const groupsData = useSelector((state) => state.unitTypeGroupReducer.groupsData);
  const pageNumber = useSelector((state) => state.unitTypeGroupReducer.pageNumber);
  const totalPages = useSelector((state) => state.unitTypeGroupReducer.totalPages);
  const totalElements = useSelector((state) => state.unitTypeGroupReducer.totalElements);

  const dispatch = useDispatch();
  const [loading7, setLoading7] = useState(false);

  const handleNewOnClick = () => {
    dispatch(setEditFormData(null));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
    dispatch(setUnitTypeList([]));
    dispatch(setRadioValue("towable"));
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
    listingData: groupsData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/unit-type-groups/add`}
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<UnitTypeGroupTableListing loading7={loading7} setLoading7={setLoading7} />}
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
export default UnitTypeGroupBrowsePage;
