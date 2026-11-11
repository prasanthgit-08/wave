import React from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdvancedSearch,
  resetSearchSettings,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvancedSearchByInputs,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setIsActivce,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSearchedDealer,
  setShowAdvancedSearch,
  setShowAdvancedSort,
  setSortFlag,
  setSortValue,
  updateAdvancedSearchByInputs,
} from "../../../../redux/CustomerDealerSlice";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import DealerListing from "./DealerListing";
import { FullScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchByCheckboxes from "../../../common/AdvancedSearchByCheckboxes";

const DealerListingMainPage = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.customerDealersFilter.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDealersFilter.searchCriteria);
  const activestate = useSelector((state) => state.customerDealersFilter.isActive);
  const showAdvancedSearch = useSelector((state) => state.customerDealersFilter.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.customerDealersFilter.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.customerDealersFilter.advancedSearchObject);
  const advanceSortingOrder = useSelector((state) => state.customerDealersFilter.advanceSortingOrder);
  const advanceSortedValue = useSelector((state) => state.customerDealersFilter.advanceSortedValue);
  const advancedSearchString = useSelector((state) => state.customerDealersFilter.advancedSearchString);
  const checkAllAdvancedSearchBy = useSelector(
    (state) => state.customerDealersFilter.checkAllAdvancedSearchBy
  );
  const advancedSearchByInputs = useSelector((state) => state.customerDealersFilter.advancedSearchByInputs);
  const pageNumber = useSelector((state) => state.customerDealersFilter.pageNumber);
  const totalElements = useSelector((state) => state.customerDealersFilter.totalElements);
  const totalPages = useSelector((state) => state.customerDealersFilter.totalPages);
  const dealerData = useSelector((state) => state.customerDealersFilter.dealerData);
  const checkboxesArrayList = [
    { id: "address", label: "Address" },
    { id: "postalCode", label: "Postal Code" },
    { id: "phone", label: "Phone" },
    { id: "contacts", label: "Contacts" },
    { id: "notes", label: "Notes" },
    { id: "storeCode", label: "Store Code" },
  ];

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvancedSearch) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedDealer(null));
      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchByPayload(null));
      dispatch(updateAdvancedSearchByInputs("None"));
    }
    dispatch(setShowAdvancedSearch(!showAdvancedSearch));
  };
  const handleAdvancedSortOnClick = () => {
    if (!showAdvancedSort) {
      dispatch(setSortValue(null));
      dispatch(setSortFlag(false));
    } else {
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
    }
    dispatch(setShowAdvancedSort(!showAdvancedSort));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: dealerData,
    recordsPerPage: FullScreen_RecordsPerPage,
  };

  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          fullScreen
          hasAdvancedSearch
          hasAdvancedSort
          secondRadioGroup
          closeButtonRoute={"/"}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerms}
          setPageNumber={setPageNumber}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={activestate}
          setSecondRadioGroupValue={setIsActivce}
          showAdvancedSearch={showAdvancedSearch}
          showAdvancedSort={showAdvancedSort}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
          handleCloseOnClick={() => {
            dispatch(resetSearchSettings());
            dispatch(clearAdvancedSearch());
          }}
        />
      }
      showAdvancedSearch={showAdvancedSearch}
      showAdvancedSort={showAdvancedSort}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fourFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Name"}
          secondFieldName={"DBA"}
          thirdFieldName={"City"}
          fourthFieldName={"State"}
          customFourthField={(fourthField) => fourthField?.toUpperCase()}
          maxLengthFourthField={2}
          widthFourthField={"40px"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setSearchedDealer({
                name: advancedSearchObject.firstField,
                dba: advancedSearchObject.secondField,
                city: advancedSearchObject.thirdField,
                stateCode: advancedSearchObject.fourthField,
              })
            );
          }}
        />
      }
      AdvancedSortComponent={
        <AdvancedSortComponent
          fourFieldSort
          firstFieldName={"Name"}
          secondFieldName={"DBA"}
          thirdFieldName={"City"}
          fourthFieldName={"State"}
          firstFieldPayload={"name"}
          secondFieldPayload={"dba"}
          thirdFieldPayload={"city"}
          fourthFieldPayload={"stateCode"}
          advancedSortingOrder={advanceSortingOrder}
          setAdvancedSortingOrder={setAdvanceSortingCriteria}
          advancedSortingCombination={advanceSortedValue}
          setAdvancedSortingCombination={setAdvanceSortedValue}
        />
      }
      TableListingComponent={<DealerListing />}
      PaginationComponent={
        <PaginationComponent
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
      hasSearchSidebar
      AdvancedSearchSidebarComponent={
        <AdvancedSearchByCheckboxes
          checkboxesArrayList={checkboxesArrayList}
          advancedSearchString={advancedSearchString}
          setAdvancedSearchString={setAdvancedSearchString}
          checkAllAdvancedSearchBy={checkAllAdvancedSearchBy}
          setCheckAllAdvancedSearchBy={setCheckAllAdvancedSearchBy}
          advancedSearchByInputs={advancedSearchByInputs}
          setAdvancedSearchByInputs={setAdvancedSearchByInputs}
          setPageNumber={setPageNumber}
          updateAdvancedSearchByPayload={() => {
            dispatch(
              setAdvancedSearchByPayload({
                isAddressSelected: advancedSearchByInputs.address,
                isPostalCodeSelected: advancedSearchByInputs.postalCode,
                isPhoneSelected: advancedSearchByInputs.phone,
                isContactsSelected: advancedSearchByInputs.contacts,
                isNotesSelected: advancedSearchByInputs.notes,
                isStoreCodeSelected: advancedSearchByInputs.storeCode,
              })
            );
          }}
        />
      }
    />
  );
};

export default DealerListingMainPage;
