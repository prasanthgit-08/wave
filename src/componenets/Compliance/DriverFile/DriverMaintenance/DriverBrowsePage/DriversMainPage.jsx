import React, { useState } from "react";
import { useSelector } from "react-redux";
import DriversListing from "./DriversListing";
import {
  clearAdvancedSearch,
  resetDriver,
  setAdsLogin,
  setAdsLoginValid,
  setAdvancedSearchByInputs,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSearchString,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCheckAllAdvancedSearchBy,
  setCheckDriverDeleaseExist,
  setCityType,
  setDisplayFlag,
  setDocumentFile,
  setDriverType,
  setEditFormData,
  setFileType,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setPictureFile,
  setSaveFormData,
  setSearchTerm,
  setSelectedSearchCriteria,
  setStatusType,
  setViewDetail,
  toggleAdvancedSearch,
  toggleAdvancedSort,
} from "../../../../../redux/DriverMaintenanceSlice";

import { useDispatch } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import StandardMaintenanceTemplate from "../../../../Templates/StandardMaintenanceTemplate";
import { FullScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import AdvancedSearchComponent from "../../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../../common/AdvancedSortComponent";
import AdvancedSearchByCheckboxes from "../../../../common/AdvancedSearchByCheckboxes";
const DriversMainPage = () => {
  const dispatch = useDispatch();
  const listingData = useSelector((state) => state.driverMaintenanceReducer.listingData);
  const pageNumber = useSelector((state) => state.driverMaintenanceReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverMaintenanceReducer.totalElements);
  const totalPages = useSelector((state) => state.driverMaintenanceReducer.totalPages);

  const searchTerm = useSelector((state) => state.driverMaintenanceReducer.searchTerm);
  const showAdvancedSearch = useSelector((state) => state.driverMaintenanceReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.driverMaintenanceReducer.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.driverMaintenanceReducer.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.driverMaintenanceReducer.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.driverMaintenanceReducer.advancedSortingCombination
  );
  const advancedSearchString = useSelector((state) => state.driverMaintenanceReducer.advancedSearchString);
  const advancedSearchByInputs = useSelector(
    (state) => state.driverMaintenanceReducer.advancedSearchByInputs
  );
  const checkAllAdvancedSearchBy = useSelector(
    (state) => state.driverMaintenanceReducer.checkAllAdvancedSearchBy
  );

  const selectedSearchCriteria = useSelector(
    (state) => state.driverMaintenanceReducer.selectedSearchCriteria
  );
  const driverType = useSelector((state) => state.driverMaintenanceReducer.driverType);
  const statusType = useSelector((state) => state.driverMaintenanceReducer.statusType);
  const cityType = useSelector((state) => state.driverMaintenanceReducer.cityType);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const driverLoader = useSelector((state) => state.driverMaintenanceReducer.driverLoader);

  const checkboxesArrayList = [
    { id: "dba", label: "DBA" },
    { id: "address", label: "Address" },
    { id: "ssn", label: "SSN/EIN" },
    { id: "phone", label: "Phone" },
    { id: "email", label: "Email" },
    { id: "vin", label: "VIN" },
    { id: "licensePlate", label: "License Plate #" },
    { id: "nickName", label: "Nickname" },
    { id: "driversLicense", label: "Drivers License #" },
    { id: "notes", label: "Notes" },
  ];
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    recordsPerPage: FullScreen_RecordsPerPage,
  };
  const handleAdvancedSearchOnClick = () => {
    if (!showAdvancedSearch) {
      // onClick when Advanced Search is hidden
      dispatch(setSearchTerm(""));
    } else {
      // onClick when Advanced Search is shown

      // Clearing values related with Advanced Search
      dispatch(clearAdvancedSearch());
    }
    // toggle Advanced Search
    dispatch(toggleAdvancedSearch());
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvancedSort) {
      // onClick when Advanced Sort is hidden
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }

    dispatch(toggleAdvancedSort());
  };
  return (
    <StandardMaintenanceTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          newButtonRoute={"/driver-maintenance-new"}
          handleNewOnClick={() => {
            dispatch(setViewDetail(undefined));
            dispatch(setEditFormData(null));
            dispatch(setCheckDriverDeleaseExist(false));

            dispatch(setPictureFile([]));
            dispatch(setDocumentFile(null));
            dispatch(setFileType(""));
            dispatch(setDisplayFlag(false));
            dispatch(setSaveFormData(null));
            dispatch(setAdsLogin(""));
            dispatch(setAdsLoginValid(true));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setPictureFile([]));
            dispatch(setPageNumber(0));
            dispatch(resetDriver());
            dispatch(setCheckDriverDeleaseExist(false));
          }}
          hasAdvancedSearch
          hasAdvancedSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          customSecondRadioGroupOptions={["All", "Active", "Inactive", "Deleased"]}
          secondRadioGroupValue={statusType}
          setSecondRadioGroupValue={setStatusType}
          customThirdRadioGroupOptions={["All", "Motorized", "Towable", "Flatbed", "Shuttle"]}
          thirdRadioGroupValue={driverType}
          setThirdRadioGroupValue={setDriverType}
          customFourthRadioGroupOptions={["Mailing", "Physical"]}
          fourthRadioGroupValue={cityType}
          setFourthRadioGroupValue={setCityType}
          showAdvancedSearch={showAdvancedSearch}
          setPageNumber={setPageNumber}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
        />
      }
      TableListingComponent={<DriversListing loader={driverLoader} />}
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
          loading={driverLoader}
        />
      }
      showAdvancedSearch={showAdvancedSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          fourFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"First Name"}
          secondFieldName={"Last Name"}
          thirdFieldName={"City"}
          fourthFieldName={"State"}
          customFourthField={(fourthField) => fourthField.toUpperCase()}
          maxLengthFourthField={2}
          widthFourthField={"40px"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setAdvancedSearchPayload({
                firstName: advancedSearchObject.firstField,
                lastName: advancedSearchObject.secondField,
                city: advancedSearchObject.thirdField,
                stateCode: advancedSearchObject.fourthField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvancedSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          fourFieldSort
          firstFieldName={"First Name"}
          secondFieldName={"Last Name"}
          thirdFieldName={"City"}
          fourthFieldName={"State"}
          /**Back end payload */
          firstFieldPayload={"firstName"}
          secondFieldPayload={"lastName"}
          thirdFieldPayload={"city"}
          fourthFieldPayload={"stateCode"}
          advancedSortingOrder={advancedSortingOrder}
          setAdvancedSortingOrder={setAdvancedSortingOrder}
          advancedSortingCombination={advancedSortingCombination}
          setAdvancedSortingCombination={setAdvancedSortingCombination}
        />
      }
      hasSearchSidebar
      AdvancedSearchSidebarComponent={
        <AdvancedSearchByCheckboxes
          checkboxesArrayList={checkboxesArrayList}
          advancedSearchString={advancedSearchString}
          setAdvancedSearchString={setAdvancedSearchString}
          advancedSearchByInputs={advancedSearchByInputs}
          setAdvancedSearchByInputs={setAdvancedSearchByInputs}
          checkAllAdvancedSearchBy={checkAllAdvancedSearchBy}
          setCheckAllAdvancedSearchBy={setCheckAllAdvancedSearchBy}
          setPageNumber={setPageNumber}
        />
      }
    />
  );
};

export default DriversMainPage;
