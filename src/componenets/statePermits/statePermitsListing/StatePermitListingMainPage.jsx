import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setIsStateAndTowableUnique,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setViewDetail,
} from "../../../redux/StatePermitsSlice";
import { PaginationComponent } from "../../common/PaginationComponent";

import { ThreeForthScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import StatePermitsListing from "./StatePermitsListing";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";

function StatePermitListingMainPage() {
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.statePermitsReducer.listingData);
  const pageNumber = useSelector((state) => state.statePermitsReducer.pageNumber);
  const totalPages = useSelector((state) => state.statePermitsReducer.totalPages);
  const searchTerms = useSelector((state) => state.statePermitsReducer.searchTerms);

  const totalElements = useSelector((state) => state.statePermitsReducer.totalElements);
  const searchCriteria = useSelector((state) => state.statePermitsReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.statePermitsReducer.selectedStatus);

  const [loader, setLoader] = useState(false);

  const onClose = async () => {
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("All"));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
  };
  useEffect(() => {
    return () => {
      dispatch(setEditFormData(undefined));
      dispatch(resetChanges());
    };
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/state-permits-edit"}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetChanges());
            dispatch(setViewDetail(false));
            dispatch(setSearchTerms(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setSelectedStatus("All"));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroup
          secondRadioGroupValue={selectedStatus}
          customSecondRadioGroupOptions={["All", "Motorized", "Towable"]}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<StatePermitsListing customerURL={``} loader={loader} setLoader={setLoader} />}

      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loader}
        />
      }
    />
  );
}

export default StatePermitListingMainPage;
