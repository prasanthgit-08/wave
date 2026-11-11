import React from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPageValues,
  setAdvanceSearchFK1,
  setAdvanceSearchFK2,
  setAdvanceSearchTermOne,
  setAdvanceSearchTermTwo,
  setChangeColor,
  setPageNumber,
  setSort,
  setSortValue,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";

import {
  setSearchTerm,
  setSearchCriteria,
  setAdvanceSearch,
  setAdvancedSearchObject,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import DealerConnectionsListing from "./DealerConnectionsListing";
import { useNavigate } from "react-router-dom";
import DealerConnectionsAdvancedSearch from "./DealerConnectionsAdvancedSearch";
import { QUARTER_SCREEN_HEIGHT, QUARTER_SCREEN_WIDTH } from "../../../../constants/screenSizes";

function DealerConnectionsMainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dealerLoading = useSelector((state) => state.dealerConnectionReducer.dealerLoading);
  const dealerConnectionData = useSelector((state) => state.dealerConnectionReducer.listingData);
  const showAdvancedSearch = useSelector((state) => state.dealerConnectionReducer.advanceSearch);
  const pageNumber = useSelector((state) => state.dealerConnectionReducer.pageNumber);
  const { totalPages, totalElements } = useSelector((state) => state.paginationReducer);
  const globalSearchTerm = useSelector((state) => state.dealerConnectionReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dealerConnectionReducer.searchCriteria);
  const advancedSearchObject = useSelector((state) => state.dealerConnectionReducer.advancedSearchObject);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: dealerConnectionData,
  };
  const handleAdvancedSearchOnClick = (value) => {
    if (value) {
      dispatch(setSearchTerm(""));
    } else {
      dispatch(setAdvanceSearchTermOne(""));
      dispatch(setAdvanceSearchTermTwo(""));
      dispatch(setAdvanceSearchFK1(""));
      dispatch(setAdvanceSearchFK2(""));
      dispatch(setAdvanceSearch(false));
    }
    dispatch(setAdvanceSearch(value));
  };

  const handleClose = () => {
    dispatch(setSearchTerm(""));
    dispatch(setAdvanceSearchTermOne(""));
    dispatch(setAdvanceSearchTermTwo(""));
    dispatch(setAdvanceSearchFK1(""));
    dispatch(setAdvanceSearchFK2(""));
    dispatch(setAdvanceSearch(false));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSort(false));
    dispatch(setSortValue(null));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <StandardMaintenanceTemplate
        // horizontalScrollMinWidth={"1400px"}
        SearchFilterComponent={
          <SearchFilterComponent
            hasAdvancedSearch
            newButtonRoute={"/add-dealer-connections"}
            handleNewOnClick={() => {}}
            closeButtonRoute={"/"}
            handleCloseOnClick={() => dispatch(resetPageValues())}
            globalSearchTerm={globalSearchTerm}
            setGlobalSearchTerm={setSearchTerm}
            firstRadioGroupValue={searchCriteria}
            setFirstRadioGroupValue={setSearchCriteria}
            showAdvancedSearch={showAdvancedSearch}
            handleAdvancedSearchOnClick={handleAdvancedSearchOnClick}
            setPageNumber={setPageNumber}
            fullScreen
          />
        }
        TableListingComponent={<DealerConnectionsListing />}
        PaginationComponent={
          <PaginationComponent
            loading={dealerLoading}
            {...paginationProps}
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
        showAdvancedSearch={showAdvancedSearch}
        AdvancedSearchComponent={<DealerConnectionsAdvancedSearch />}
        screenHeight={QUARTER_SCREEN_HEIGHT}
        screenWidth={QUARTER_SCREEN_WIDTH}
        tableListingHeight={"448px"}
      />
    </div>
  );
}

export default DealerConnectionsMainPage;
