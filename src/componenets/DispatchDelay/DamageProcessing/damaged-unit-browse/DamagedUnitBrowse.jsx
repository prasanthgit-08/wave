import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setDamageData,
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
  resetDamageBrowsePage,
} from "../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import TableListingDamage from "./TableListingDamage";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { useNavigate, useParams } from "react-router-dom";
import { setUndispatchdelayFlag } from "../../../../redux/UndispatchSlice";
const DamagedUnitBrowse = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  // Redux selectors
  const pageNumber = useSelector((state) => state.damageReducer.pageNumber);
  const totalPages = useSelector((state) => state.damageReducer.totalPages);
  const totalElements = useSelector((state) => state.damageReducer.totalElements);
  const searchTerm = useSelector((state) => state.damageReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.damageReducer.searchCriteria);
  const damageData = useSelector((state) => state.damageReducer.damageData);
  const damageBrowseloading = useSelector((state) => state.damageReducer.damageBrowseloading);
  const handleClickNew = () => {
    dispatch(setDamageData(null));
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
    dispatch(setUndispatchdelayFlag(false));
  };

  const handleClose = () => {
    dispatch(resetDamageBrowsePage());
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
    listingData: damageData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/new-damage/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(
            delayedUnitPK
          )}`}
          closeButtonRoute={`/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(
            driverfk
          )}/${Number(delayedUnitPK)}`}
          handleNewOnClick={handleClickNew}
          handleCloseOnClick={handleClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={(term) => dispatch(setSearchTerm(term))}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={(criteria) => dispatch(setSearchCriteria(criteria))}
          setPageNumber={(page) => dispatch(setPageNumber(page))}
        />
      }
      TableListingComponent={<TableListingDamage />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          numberOfElements={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={damageBrowseloading}
        />
      }
    />
  );
};

export default DamagedUnitBrowse;
