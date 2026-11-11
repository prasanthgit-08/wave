import React, { useState } from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { FullScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetStates,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setEditFormData,
  setPageNumber,
  setSearchCriteria,
  setSearchCustomer,
  setSearchCustomerGroup,
  setSearchDescription,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchTerms,
  setSearchedData,
  setShowAdvanceSearch,
  updateAdvancedSearchByInputs,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setSelectId,
  setMotorized,
  setUnitTypeGroupData,
  setRadioValue,
  resetClose,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import { TableListing } from "./TableListing";

function CustomerUtGroupsMainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // List API pending: drives the listing loader and disables the pagination buttons.
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumber);
  const searchTerms = useSelector((state) => state.customerUnitTypeGroupReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerUnitTypeGroupReducer.searchCriteria);
  const showAdvanceSearch = useSelector((state) => state.customerUnitTypeGroupReducer.showAdvanceSearch);

  const totalPages = useSelector((state) => state.customerUnitTypeGroupReducer.totalPages);
  const customerUnitTypeGroupData = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerUnitTypeGroupData
  );
  const totalElements = useSelector((state) => state.customerUnitTypeGroupReducer.totalElements);
  const advancedSearchObject = useSelector(
    (state) => state.customerUnitTypeGroupReducer.advancedSearchObject
  );

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      dispatch(setSearchTerms(""));
    } else {
      // Clearing values realted with Advanced Search
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedData(null));
      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchByPayload(null));
      dispatch(setSearchDescription(""));
      dispatch(setSearchCustomer(""));
      dispatch(setSearchPlant(""));
      dispatch(setSearchPlantGroup(""));
      dispatch(setSearchCustomerGroup(""));
    }
    // toggle Advanced Search
    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerUnitTypeGroupData,
    recordsPerPage: FullScreen_RecordsPerPage,
  };
  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          fullScreen
          newButtonRoute={"/customer-unit-type-groups-selection"}
          closeButtonRoute={"/"}
          handleNewOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetStates());
            dispatch(setViewDetail(false));
            dispatch(setUnitTypeGroupData([]));
            dispatch(setRadioValue("Motorized"));
          }}
          handleCloseOnClick={() => {
            dispatch(setEditFormData(undefined));
            dispatch(resetStates());
            dispatch(resetClose());
          }}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvanceSearch}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loading}
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
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fiveFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Description"}
          secondFieldName={"Customer"}
          thirdFieldName={"Plant"}
          fourthFieldName={"Plant Group"}
          fifthFieldName={"Customer Group"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(setSearchDescription(advancedSearchObject.firstField));
            dispatch(setSearchCustomer(advancedSearchObject.secondField));
            dispatch(setSearchPlant(advancedSearchObject.thirdField));
            dispatch(setSearchPlantGroup(advancedSearchObject.fourthField));
            dispatch(setSearchCustomerGroup(advancedSearchObject.fifthField));
          }}
        />
      }
    />
  );
}

export default CustomerUtGroupsMainPage;
