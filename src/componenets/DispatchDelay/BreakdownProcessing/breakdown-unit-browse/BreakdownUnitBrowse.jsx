import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../componenets/EditMaster/UnitSelection/EditMasterUnitSelection.css";
import { PaginationComponent } from "../../../common/PaginationComponent";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  resetEmailChanges,
  resetResourceList,
  setAddFlag,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
  resetBreakdowbBrowsePage,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListingBreakdown from "./TableListingBreakdown";
import { useNavigate, useParams } from "react-router-dom";
import { setUndispatchBreakdownFlag } from "../../../../redux/UndispatchSlice";

const BreakdownUnitBrowse = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  // Redux selectors
  const pageNumber = useSelector((state) => state.delaybreakdown.pageNumber);
  const totalPages = useSelector((state) => state.delaybreakdown.totalPages);
  const totalElements = useSelector((state) => state.delaybreakdown.totalElements);
  const searchTerm = useSelector((state) => state.delaybreakdown.searchTerm);
  const searchCriteria = useSelector((state) => state.delaybreakdown.searchCriteria);
  const damageData = useSelector((state) => state.delaybreakdown.damageData);
  const breakdownData = useSelector((state) => state.delaybreakdown.breakdownBrowseData);

  const navigate = useNavigate();
  const handleClickNew = () => {
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
    dispatch(setUndispatchBreakdownFlag(false));
  };
  const handleClose = () => {
    dispatch(resetBreakdowbBrowsePage());
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber: (page) => dispatch(setPageNumber(page)),
    totalPages,
    totalElements,
    listingData: breakdownData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/new-breakdown/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(
            delayedUnitPK
          )}`}

          closeButtonRoute={`/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(
            delayedUnitPK
          )}`}
          handleNewOnClick={handleClickNew}
          handleCloseOnClick={handleClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={(term) => dispatch(setSearchTerm(term))}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={(criteria) => dispatch(setSearchCriteria(criteria))}
          setPageNumber={(page) => dispatch(setPageNumber(page))}
        />
      }
      TableListingComponent={<TableListingBreakdown />}
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

export default BreakdownUnitBrowse;
