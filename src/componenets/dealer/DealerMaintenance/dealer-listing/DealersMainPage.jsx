/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAdvancedSearch,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvancedSearchByInputs,
  setAdvancedSearchByPayload,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setSearchTerms,
  setSearchedDealer,
  setSelectedDealerStatus,
  setSelectedSearchCriteria,
  setSelectedStatus,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  updateAdvancedSearchByInputs,
  setChangeColor,
} from "../../../../redux/DealerSearchFilterSlice";
import {
  resetChangesforAutoCompletes,
  setContactOnDelivery,
  setDeliveryPhone,
  setEditDealer,
  setFaxBolAtDispatch,
  setFaxBolAtOrderEntry,
  setLastOrderDate,
  setViewDetail,
} from "../../../../redux/EditDealerSlice";
import { setPageNumber } from "../../../../redux/PaginationSlice";
import { FullScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { DealerListing } from "./DealerListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import DealerAdvancedSearchSidebar from "./DealerAdvancedSearchSidebar";
import { setSearchCriteria } from "../../../../redux/CustomerOrderUsersSlice";
import AdvancedSearchByCheckboxes from "../../../common/AdvancedSearchByCheckboxes";
import { useNavigate } from "react-router-dom";

const DealersMainPage = () => {
  const showAdvanceSearch = useSelector((state) => state.dealerSearchReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.dealerSearchReducer.showAdvanceSort);
  const dealerData = useSelector((state) => state.dealerSearchReducer.dealerData);
  const advanceSortingOrder = useSelector((state) => state.dealerSearchReducer.advanceSortingOrder);
  const advanceSortedValue = useSelector((state) => state.dealerSearchReducer.advanceSortedValue);
  const advancedSearchObject = useSelector((state) => state.dealerSearchReducer.advancedSearchObject);
  const globalSearchTerm = useSelector((state) => state.dealerSearchReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.dealerSearchReducer.selectedSearchCriteria);
  const selectedStatus = useSelector((state) => state.dealerSearchReducer.selectedStatus);
  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);
  const normalSortValue = useSelector((state) => state.dealerSearchReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.dealerSearchReducer.normalSortFlag);
  const advancedSearchString = useSelector((state) => state.dealerSearchReducer.advancedSearchString);
  const checkAllAdvancedSearchBy = useSelector((state) => state.dealerSearchReducer.checkAllAdvancedSearchBy);
  const advancedSearchByInputs = useSelector((state) => state.dealerSearchReducer.advancedSearchByInputs);
  const fetchLoad = useSelector((state) => state.editDealerReducer.fetchLoad);

  const checkboxesArrayList = [
    { id: "address", label: "Address" },
    { id: "postalCode", label: "Postal Code" },
    { id: "phone", label: "Phone" },
    { id: "contacts", label: "Contacts" },
    { id: "notes", label: "Notes" },
    { id: "storeCode", label: "Store Code" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
    dispatch(setId(null));
    dispatch(setEditDealer(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(setSearchTerms(""));
    dispatch(setAdvancedSearchObject(null)); // for clearing value in UI
    dispatch(setSearchedDealer(null)); // for clearing payload for API call
    dispatch(setAdvancedSearchString(""));
    dispatch(setAdvancedSearchByPayload(null));
    dispatch(updateAdvancedSearchByInputs("None"));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("Active"));
    dispatch(setSelectedDealerStatus("Complete"));
    dispatch(setShowAdvanceSearch(false));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setShowAdvanceSort(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setPageNumber(0));
  };

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvanceSearch) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(clearAdvancedSearch());
    }
    dispatch(setShowAdvanceSearch(!showAdvanceSearch));
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvanceSort) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
    }
    dispatch(setShowAdvanceSort(!showAdvanceSort));
  };

  const handleClose = () => {
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setAdvanceSortingCriteria(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setShowAdvanceSort(false));
    dispatch(setSearchTerms(""));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSelectedStatus("Active"));
    dispatch(setSelectedDealerStatus("Complete"));
    dispatch(setAdvancedSearchObject(null)); // for clearing value in UI
    dispatch(setSearchedDealer(null)); // for clearing payload for API call
    dispatch(setAdvancedSearchString(""));
    dispatch(setAdvancedSearchByPayload(null));
    dispatch(updateAdvancedSearchByInputs("None"));
    dispatch(setShowAdvanceSearch(false));
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
          hasAdvancedSearch
          hasAdvancedSort
          secondRadioGroup
          thirdRadioGroup
          newButtonRoute={"/add-dealer"}
          handleNewOnClick={() => {
            dispatch(setEditDealer(undefined));
            dispatch(setViewDetail(undefined));
            dispatch(resetChangesforAutoCompletes());
            dispatch(setContactOnDelivery(""));
            dispatch(setDeliveryPhone(""));
            dispatch(setFaxBolAtOrderEntry(false));
            dispatch(setFaxBolAtDispatch(false));
            dispatch(setLastOrderDate(null));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={handleClose}
          globalSearchTerm={globalSearchTerm}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          thirdRadioGroupValue={selectedDealerStatus}
          setThirdRadioGroupValue={setSelectedDealerStatus}
          setPageNumber={setPageNumber}
          showAdvancedSearch={showAdvanceSearch}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
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
          loading={fetchLoad}
        />
      }
      showAdvancedSearch={showAdvanceSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fourFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Name"}
          secondFieldName={"DBA"}
          thirdFieldName={"City"}
          fourthFieldName={"State"}
          customFourthField={(fourthField) => fourthField.toUpperCase()}
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
      showAdvancedSort={showAdvanceSort}
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
      hasSearchSidebar
      AdvancedSearchSidebarComponent={
        // <DealerAdvancedSearchSidebar />
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

export default DealersMainPage;
