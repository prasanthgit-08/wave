import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditMasterUnitSelection.css";
import StandardMaintenanceTemplate from "../../Templates/StandardMaintenanceTemplate";
import SearchFilter from "./SearchFilter";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";
import AdvancedSearchByCheckboxes from "../../common/AdvancedSearchByCheckboxes";
import {
  setAdvancedSearchByInputs,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSearchString,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCheckAllAdvancedSearchBy,
  setPageNumber,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../services/constants/applicationConstants";
import AdvancedSearchMiscContent from "./AdvancedSearchMiscContent";

const EditMasterUnitSelection = () => {
  const listingData = useSelector((state) => state.unitSelection.listingData);
  const pageNumber = useSelector((state) => state.unitSelection.pageNumber);
  const totalElements = useSelector((state) => state.unitSelection.totalElements);
  const totalPages = useSelector((state) => state.unitSelection.totalPages);
  const showAdvancedSearch = useSelector((state) => state.unitSelection.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.unitSelection.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.unitSelection.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.unitSelection.advancedSortingOrder);
  const advancedSortingCombination = useSelector((state) => state.unitSelection.advancedSortingCombination);
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

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <StandardMaintenanceTemplate
      extraLargeScreen
      customMinimumHeightClass={"editMasterMinHeight50"}
      SearchFilterComponent={<SearchFilter componentType={"Maintenance"} />}
      TableListingComponent={<TableListing componentType={"Maintenance"} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
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
        // <AdvancedSearchSidebar />
        <AdvancedSearchByCheckboxes
          checkboxesArrayList={checkboxesArrayList}
          advancedSearchString={advancedSearchString}
          setAdvancedSearchString={setAdvancedSearchString}
          checkAllAdvancedSearchBy={checkAllAdvancedSearchBy}
          setCheckAllAdvancedSearchBy={setCheckAllAdvancedSearchBy}
          advancedSearchByInputs={advancedSearchByInputs}
          setAdvancedSearchByInputs={setAdvancedSearchByInputs}
          setPageNumber={setPageNumber}
          MiscellaneousContent={<AdvancedSearchMiscContent componentType={"Maintenance"} />}
        />
      }
    />
  );
};

export default EditMasterUnitSelection;
