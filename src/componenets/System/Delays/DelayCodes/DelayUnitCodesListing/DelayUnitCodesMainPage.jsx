import React, { useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import DelayUnitCodesListing from "./DelayUnitCodesListing";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../../redux/DelayUnitCodesSlice";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";

const DelayUnitCodesMainPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.delayedUnitCodesReducer.pageNumber);
  const totalPages = useSelector((state) => state.delayedUnitCodesReducer.totalPages);
  const totalElements = useSelector((state) => state.delayedUnitCodesReducer.totalElements);
  const searchTerm = useSelector((state) => state.delayedUnitCodesReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.delayedUnitCodesReducer.searchCriteria);
  const delayedUnitsData = useSelector((state) => state.delayedUnitCodesReducer.delayedUnitsData);

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
    listingData: delayedUnitsData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/delay-unit-codes/add"}
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
      TableListingComponent={<DelayUnitCodesListing loading={loading} setLoading={setLoading} />}
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
export default DelayUnitCodesMainPage;
