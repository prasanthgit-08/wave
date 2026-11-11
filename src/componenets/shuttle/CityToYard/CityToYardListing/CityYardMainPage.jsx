import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import CityYardAdvanceSearchFilter from "./CityYardAdvanceSearchFilter";
import CityYardListing from "./CityYardListing";
import CityYardSearchFilter from "./CityYardSearchFilter";
import {
  resetChanges,
  setChangeColor,
  setCity,
  setDescription,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCity,
  setSearchCriteria,
  setSearchDescription,
  setSearchTerm,
  setShowAdvanceSearch,
  setViewDetail,
} from "../../../../redux/CityToYardSlice";
import { No_Of_Record_per_page } from "../../../../services/constants/applicationConstants";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { useEffect } from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
function CityYardMainPage() {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.cityToYardReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.cityToYardReducer.searchCriteria);
  const listingData = useSelector((state) => state.cityToYardReducer.listingData);
  const pageNumber = useSelector((state) => state.cityToYardReducer.pageNumber);
  const totalPages = useSelector((state) => state.cityToYardReducer.totalPages);
  const totalElements = useSelector((state) => state.cityToYardReducer.totalElements);
  const showAdvanceSearch = useSelector((state) => state.cityToYardReducer.showAdvanceSearch);
  const city = useSelector((state) => state.cityToYardReducer.city);
  const description = useSelector((state) => state.cityToYardReducer.description);

  const [loading7, setLoading7] = useState(false);

  const onClose = async () => {
    dispatch(setShowAdvanceSearch(false));
    dispatch(setCity(""));
    dispatch(setDescription(""));
    dispatch(setSearchCity(""));
    dispatch(setSearchDescription(""));
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
  };
  const onChangeShowAdvanceSearch = (value) => {
    dispatch(setSearchTerm(""));
    dispatch(setSearchDescription(""));
    dispatch(setSearchCity(""));

    if (value === true) {
      dispatch(setSearchTerm(""));
      dispatch(setSearchDescription(""));
      dispatch(setSearchCity(""));
    } else {
      dispatch(setSearchDescription(""));
      dispatch(setSearchCity(""));
    }
    dispatch(setShowAdvanceSearch(value));
  };
  useEffect(() => {
    if (!showAdvanceSearch) {
      dispatch(setCity(""));
      dispatch(setDescription(""));
    }
  }, [showAdvanceSearch, city, description]);
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
          newButtonRoute={"/city-to-yard/add"}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetChanges());
            dispatch(setViewDetail(false));
          }}
          fullScreen
          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          showAdvancedSearch={showAdvanceSearch}
          handleAdvancedSearchOnClick={onChangeShowAdvanceSearch}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CityYardListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={<CityYardAdvanceSearchFilter />}
    />
  );
}

export default CityYardMainPage;
