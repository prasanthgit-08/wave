import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdvanceSortingCriteria,
  setSearchCriteria,
  setPageNumber,
  setSearchedPostalCode,
  setEditFormData,
  resetChanges,
  setViewDetail,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
  setSearchTerms,
  setShowAdvanceSort,
  setShowAdvanceSearch,
  setSelectedStatus,
  setPostalCodePK,
  setSearchedPostalCodeUpdate,
} from "../../../redux/PostalCodeSlice";

import { No_Of_Record_per_page } from "../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../common/PaginationComponent";
import { PostalCodeAdvanceSearch } from "./PostalCodeAdvanceSearch";
import { PostalCodeAdvanceSort } from "./PostalCodeAdvanceSort";
import PostalCodeListing from "./PostalCodeListing";
import PostalCodeSearchFilter from "./PostalCodeSearchFilter";
import StandardMaintenanceTemplate from "../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../constants/screenSizes";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";

function PostalCodeListingMainPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [firstField, setFirstField] = React.useState(null);
  const [secondField, setSecondField] = React.useState(null);
  const [thirdField, setThirdField] = React.useState(null);
  const listingData = useSelector((state) => state.postalCodeReducer.listingData);
  const pageNumber = useSelector((state) => state.postalCodeReducer.pageNumber);
  const totalPages = useSelector((state) => state.postalCodeReducer.totalPages);
  const totalElements = useSelector((state) => state.postalCodeReducer.totalElements);
  const showAdvanceSearch = useSelector((state) => state.postalCodeReducer.showAdvanceSearch);
  const advanceSortingOrder = useSelector((state) => state.postalCodeReducer.advanceSortingOrder);
  const showAdvanceSort = useSelector((state) => state.postalCodeReducer.showAdvanceSort);
  const postalCode = useSelector((state) => state.postalCodeReducer.postalCode);
  const loader = useSelector((state) => state.postalCodeReducer.loader);

  const searchTerms = useSelector((state) => state.postalCodeReducer.searchTerms);
  const selectedStatus = useSelector((state) => state.postalCodeReducer.selectedStatus);

  const searchCriteria = useSelector((state) => state.postalCodeReducer.searchCriteria);
  const searchedPostalCode = useSelector((state) => state.postalCodeReducer.searchedPostalCode);
  const advanceSortedValue = useSelector((state) => state.postalCodeReducer.advanceSortedValue);

  const handleClose = () => {
    dispatch(setChangeColor(false));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setAdvanceSortingCriteria(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchedPostalCode(null));
    dispatch(setSearchedPostalCodeUpdate(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setShowAdvanceSort(false));
    dispatch(setShowAdvanceSearch(false));
    dispatch(setSelectedStatus("US"));
    dispatch(setPageNumber(0));
    dispatch(setPostalCodePK(""));
  };
  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      // onClick when Advanced Search is hidden
      dispatch(setSearchTerms(""));
    } else {
      // onClick when Advanced Search is shown

      // Clearing values realted with Advanced Search
      dispatch(setSearchedPostalCode(null));
    }
    // toggle Advanced Search
    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvanceSort) {
      // onClick when Advanced Sort is hidden
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
    }
    // toggle Advanced Sort
    dispatch(setShowAdvanceSort(!showAdvanceSort));
  };

  useEffect(() => {
    if (null != advanceSortingOrder) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
      setThirdField(thirdField !== null ? thirdField : advanceSortingOrder.thirdField);
    }
  }, [firstField, secondField, thirdField, advanceSortingOrder]);

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
        thirdField: thirdField,
      })
    );
  }, [firstField, secondField, thirdField]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  return (
    <StandardMaintenanceTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          hasAdvancedSort
          secondRadioGroup
          newButtonRoute={"/postalcode-add"}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetChanges());
            dispatch(setViewDetail(false));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={handleClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          customSecondRadioGroupOptions={["All", "US", "Canadian"]}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvanceSearch}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
        />
      }
      TableListingComponent={<PostalCodeListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={No_Of_Record_per_page}
          loading={loader}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          doubleArrowUp
          doubleArrowDown
          tripleArrowUp
          tripleArrowDown
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          threeFieldSearch
          advancedSearchObject={searchedPostalCode}
          setAdvancedSearchObject={setSearchedPostalCode}
          firstFieldName={"Postal Code"}
          secondFieldName={"City"}
          thirdFieldName={"State"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedPostalCodeUpdate({
                postalCode: searchedPostalCode.firstField,
                city: searchedPostalCode.secondField,
                stateCode: searchedPostalCode.thirdField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvanceSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          threeFieldSort
          firstFieldName={"Postal Code"}
          secondFieldName={"City"}
          thirdFieldName={"State"}
          firstFieldPayload={"postalCode"}
          secondFieldPayload={"city"}
          thirdFieldPayload={"stateCode"}
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortedValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
        />
      }
    />
  );
}

export default PostalCodeListingMainPage;
