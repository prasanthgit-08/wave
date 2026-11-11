import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import {
  resetChanges,
  setEditFormData,
  setViewDetail,
  setPageNumber,
  setSearchTerms,
  setSearchCriteria,
  setSelectedStatus,
  setNormalSortValue,
  setNormalSortFlag,
  setIsDescriptionUnique,
  setIsUnitCodeUnique,
  setChangeColor,
} from "../../../redux/UnitTypeSlice";
import UnitTypeListing from "./UnitTypeListing";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_WIDTH,
  PRINTER_TABLE_LISTING_HEIGHT,
} from "../../../constants/screenSizes";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";

function UnitTypeListingMainPage() {
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.unitTypeReducer.listingData);
  const pageNumber = useSelector((state) => state.unitTypeReducer.pageNumber);
  const totalPages = useSelector((state) => state.unitTypeReducer.totalPages);
  const totalElements = useSelector((state) => state.unitTypeReducer.totalElements);
  const dispatch = useDispatch();
  const searchTerms = useSelector((state) => state.unitTypeReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.unitTypeReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.unitTypeReducer.selectedStatus);

  const onClose = async () => {
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("All"));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={PRINTER_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/unit-type-new"}
          handleNewOnClick={() => {
            dispatch(resetChanges());
            dispatch(setEditFormData(undefined));
            dispatch(setViewDetail(false));
            dispatch(setIsDescriptionUnique(true));

            dispatch(setIsUnitCodeUnique(true));
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
      TableListingComponent={<UnitTypeListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          loading={loading}
          {...paginationProps}
          recordsPerPage={13}
          firstPage
          lastPage
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default UnitTypeListingMainPage;
