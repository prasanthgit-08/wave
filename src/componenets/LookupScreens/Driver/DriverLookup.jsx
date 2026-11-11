/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";
import {
  FullScreenLookup_RecordsPerPage,
  UnitSelectionLookup_RecordsPerPage,
} from "../../../services/constants/applicationConstants";
import FullScreenLookupTemplate from "../Templates/FullScreenLookupTemplate";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import AdvancedSearchByCheckboxes from "../../common/AdvancedSearchByCheckboxes";
import {
  clearAdvancedSearch,
  resetDriverLookup,
  setAdvancedSearchByInputs,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSearchString,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCheckAllAdvancedSearchBy,
  setCityType,
  setDriverType,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setStatusType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
} from "../../../redux/LookupScreens/DriverLookupSlice";
import { useState } from "react";

const DriverLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  showActiveOnly = false,
  YardCheckin,
  companyName,
  EditShuttle,
  EditYardUnit,
  UnitActivation,
  ExcludeDriver,
  excludeDriverId,
  setNameFirst,
  setNameSecond,
  recruitingDriver,
  shuttleReport,
  unitException,
  DamageReport,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  renderCol4,
  // processShuttleFlag
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customServiceCallback,
    showActiveOnly,
    YardCheckin,
    companyName,
    EditShuttle,
    EditYardUnit,
    UnitActivation,
    ExcludeDriver,
    excludeDriverId,
    setNameFirst,
    setNameSecond,
    recruitingDriver,
    shuttleReport,
    unitException,
    DamageReport,
    fetchFunction,
    renderCol1,
    renderCol2,
    renderCol3,
    renderCol4,
    // processShuttleFlag
  };

  const listingData = useSelector((state) => state.driverLookup.listingData);
  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);
  const totalElements = useSelector((state) => state.driverLookup.totalElements);
  const totalPages = useSelector((state) => state.driverLookup.totalPages);

  const searchTerm = useSelector((state) => state.driverLookup.searchTerm);
  const showAdvancedSearch = useSelector((state) => state.driverLookup.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.driverLookup.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.driverLookup.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.driverLookup.advancedSortingOrder);
  const advancedSortingCombination = useSelector((state) => state.driverLookup.advancedSortingCombination);
  const advancedSearchString = useSelector((state) => state.driverLookup.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.driverLookup.advancedSearchByInputs);
  const checkAllAdvancedSearchBy = useSelector((state) => state.driverLookup.checkAllAdvancedSearchBy);

  /**variables for radiogroups */
  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);
  const driverType = useSelector((state) => state.driverLookup.driverType);
  const statusType = useSelector((state) => state.driverLookup.statusType);
  const cityType = useSelector((state) => state.driverLookup.cityType);

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      dispatch(resetDriverLookup());
    }
  }, [show]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
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

  /**
   * Sets Active as default statusType
   */
  useEffect(() => {
    if (showActiveOnly) {
      dispatch(setStatusType("Active"));
    }
  }, [show]);

  return (
    <FullScreenLookupTemplate
      show={show}
      onHide={onHide}
      lookupTitle={"Driver Selection"}
      extraLargeScreen
      customFitHeightClass="driverLookupFitHeight"
      customMinimumHeightClass="driverLookupMinHeight50"
      SearchFilterComponent={
        <SearchFilterComponent
          hasAdvancedSearch
          hasAdvancedSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          customSecondRadioGroupOptions={["All", "Active", "Inactive", "Deleased"]}
          secondRadioGroupValue={statusType}
          setSecondRadioGroupValue={setStatusType}
          disableSecondRadioGroup={showActiveOnly}
          customThirdRadioGroupOptions={["All", "Motorized", "Towable", "Shuttle"]}
          thirdRadioGroupValue={driverType}
          setThirdRadioGroupValue={setDriverType}
          customFourthRadioGroupOptions={["Mailing", "Physical"]}
          fourthRadioGroupValue={cityType}
          setFourthRadioGroupValue={setCityType}
          showAdvancedSearch={showAdvancedSearch}
          setPageNumber={setPageNumber}
          onClickAdvancedSearch={handleAdvancedSearchOnClick}
          onClickAdvancedSort={handleAdvancedSortOnClick}
          handleCloseOnClick={onHide}
          preventMultipleWhitespaces
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={FullScreenLookup_RecordsPerPage}
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

export default DriverLookup;
