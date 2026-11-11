/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullScreenLookupTemplate from "../Templates/FullScreenLookupTemplate";
import SearchFilter from "../../EditMaster/UnitSelection/SearchFilter";
import TableListing from "../../EditMaster/UnitSelection/TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";
import AdvancedSearchByCheckboxes from "../../common/AdvancedSearchByCheckboxes";
import AdvancedSearchMiscContent from "../../EditMaster/UnitSelection/AdvancedSearchMiscContent";
import "../../EditMaster/UnitSelection/EditMasterUnitSelection.css";
import {
  resetUnitSelectionFilters,
  setAdvancedSearchByInputs,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSearchString,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCheckAllAdvancedSearchBy,
  setPageNumber,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import { UnitSelectionLookup_RecordsPerPage } from "../../../services/constants/applicationConstants";

const UnitSelectionLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  EditYardUnit,
  YardCheckin,
  unitCompanyName,
  EditShuttle,
  ShuttleInquiry,
  driverFK,
  companyName,
  customFetchFunction,
  customServiceCallback,
  UnitActivation,
  selectedDriverFK,
  driverCompanyName,
  fromDate,
  toDate,
  EquipmentCheckOut,
  PlantRelease,
  miscInvoice,
  isShuttleFlag,
  lookupIncludingCROSSDB,
  dpuInstructions,
  motorized,
  towable,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    EditYardUnit,
    YardCheckin,
    unitCompanyName,
    EditShuttle,
    ShuttleInquiry,
    driverFK,
    companyName,
    customFetchFunction,
    customServiceCallback,
    UnitActivation,
    selectedDriverFK,
    driverCompanyName,
    fromDate,
    toDate,
    EquipmentCheckOut,
    PlantRelease,
    miscInvoice,
    isShuttleFlag,
    lookupIncludingCROSSDB,
    dpuInstructions,
    motorized,
    towable,
  };
  const listingData = useSelector((state) => state.unitSelection.listingData);
  const pageNumber = useSelector((state) => state.unitSelection.pageNumber);
  const totalElements = useSelector((state) => state.unitSelection.totalElements);
  const totalPages = useSelector((state) => state.unitSelection.totalPages);
  const showAdvancedSearch = useSelector((state) => state.unitSelection.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.unitSelection.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.unitSelection.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.unitSelection.advancedSortingOrder);
  const advancedSortingCombination = useSelector((state) => state.unitSelection.advancedSortingCombination);
  const isInnerLookupsOpen = useSelector((state) => state.unitSelection.isInnerLookupsOpen);
  const advancedSearchString = useSelector((state) => state.unitSelection.advancedSearchString);
  const checkAllAdvancedSearchBy = useSelector((state) => state.unitSelection.checkAllAdvancedSearchBy);
  const advancedSearchByInputs = useSelector((state) => state.unitSelection.advancedSearchByInputs);

  const checkboxesArrayList = [
    { id: "pars", label: "PARS" },
    { id: "bolNumber", label: "BOL Number" },
    { id: "vin", label: "VIN" },
    { id: "stockNumber", label: "Stock Number" },
    { id: "projectCode", label: "Project Code" },
    { id: "poNumber", label: "PO Number" },
    { id: "serialNumber", label: "Serial Number" },
    { id: "model", label: "Model" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      dispatch(resetUnitSelectionFilters());
    }
  }, [show]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <FullScreenLookupTemplate
      show={show}
      onHide={onHide}
      lookupTitle="Unit Selection Lookup"
      extraLargeScreen
      customFitHeightClass="unitSelectionLookupFitHeight"
      customMinimumHeightClass="unitSelectionLookupMinHeight50"
      minWidthClassName="unitSelectionLookupMinWidth"
      isInnerLookupsOpen={isInnerLookupsOpen}
      SearchFilterComponent={
        <SearchFilter
          componentType={"Lookup"}
          onHide={onHide}
          handleClose={onHide}
          dpuInstructions={dpuInstructions}
        />
      }
      TableListingComponent={<TableListing componentType={"Lookup"} {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={UnitSelectionLookup_RecordsPerPage}
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
          sixFieldSearch
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Unit Number"}
          secondFieldName={"Customer"}
          thirdFieldName={"Pickup"}
          fourthFieldName={"Delivery"}
          fifthFieldName={"Unit Type"}
          sixthFieldName={"Special Code"}
          setPageNumber={setPageNumber}
          updateAdvancedSearchPayload={() => {
            dispatch(
              setAdvancedSearchPayload({
                unitNumber: advancedSearchObject.firstField,
                customer: advancedSearchObject.secondField,
                pickup: advancedSearchObject.thirdField,
                delivery: advancedSearchObject.fourthField,
                unitType: advancedSearchObject.fifthField,
                specialCode: advancedSearchObject.sixthField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvancedSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          fiveFieldSort
          zoomOut
          firstFieldName={"Date"}
          secondFieldName={"Unit Number"}
          thirdFieldName={"Customer"}
          fourthFieldName={"Pickup"}
          fifthFieldName={"Delivery"}
          firstFieldPayload={"date"}
          secondFieldPayload={"unitNumber"}
          thirdFieldPayload={"customer"}
          fourthFieldPayload={"pickup"}
          fifthFieldPayload={"delivery"}
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
          checkAllAdvancedSearchBy={checkAllAdvancedSearchBy}
          setCheckAllAdvancedSearchBy={setCheckAllAdvancedSearchBy}
          advancedSearchByInputs={advancedSearchByInputs}
          setAdvancedSearchByInputs={setAdvancedSearchByInputs}
          setPageNumber={setPageNumber}
          MiscellaneousContent={<AdvancedSearchMiscContent componentType={"Lookup"} />}
        />
      }
    />
  );
};

export default UnitSelectionLookup;
