import React, { useEffect } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { useDispatch, useSelector } from "react-redux";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import UnitSelectionSearchFilter from "./UnitSelectionSearchFilter";
import UnitSelectionBrowseListing from "./UnitSelectionBrowseListing";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import AdvancedSearchByCheckboxes from "../../../common/AdvancedSearchByCheckboxes";
import UnitStatusService from "../../../../services/Units/UnitStatusService";
import {
  setBrowsePageNumber,
  setAdvancedSearchByInputs,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSearchString,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCheckAllAdvancedSearchBy,
  setUnitSelectionData,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import AdvancedSearchMiscContent from "../../../EditMaster/UnitSelection/AdvancedSearchMiscContent";
import UnitStatusAdvancedSearchMiscContent from "./UnitStatusAdvancedSearchMiscContent";

function UnitSelectionBrowse() {
  const dispatch = useDispatch();
  const unitSelectionData = useSelector((state) => state.unitStatusReducer.unitSelectionData);
  const browseTotalPages = useSelector((state) => state.unitStatusReducer.browseTotalPages);
  const browseTotalElements = useSelector((state) => state.unitStatusReducer.browseTotalElements);
  const browsePageNumber = useSelector((state) => state.unitStatusReducer.browsePageNumber);

  const showAdvancedSearch = useSelector((state) => state.unitStatusReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.unitStatusReducer.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.unitStatusReducer.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.unitStatusReducer.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.unitStatusReducer.advancedSortingCombination
  );
  const advancedSearchString = useSelector((state) => state.unitStatusReducer.advancedSearchString);
  const checkAllAdvancedSearchBy = useSelector((state) => state.unitStatusReducer.checkAllAdvancedSearchBy);
  const advancedSearchByInputs = useSelector((state) => state.unitStatusReducer.advancedSearchByInputs);
  const loading = useSelector((state) => state.unitStatusReducer.loading);

  const checkboxesArrayList = [
    { id: "pars", label: "PARS" },
    { id: "bolNumber", label: "BOL Number" },
    { id: "vin", label: "VIN" },
    { id: "stockNumber", label: "Stock Number" },
    { id: "projectCode", label: "Project Code" },
    { id: "poNumber", label: "PO Number" },
    { id: "serialNumber", label: "Serial Number" },
    { id: "model", label: "Model" },
    { id: "invoiceNumber", label: "Invoice Number" },
  ];

  const paginationProps = {
    pageNumber: browsePageNumber,
    setPageNumber: setBrowsePageNumber,
    totalPages: browseTotalPages,
    totalElements: browseTotalElements,
    listingData: unitSelectionData,
  };

  return (
    <StandardMaintenanceTemplate
      extraLargeScreen
      customMinimumHeightClass={"editMasterMinHeight50"}
      SearchFilterComponent={<UnitSelectionSearchFilter />}
      TableListingComponent={<UnitSelectionBrowseListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={18}
          firstPage
          lastPage
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
          loading={loading}
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
          setPageNumber={setBrowsePageNumber}
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
          setPageNumber={setBrowsePageNumber}
          MiscellaneousContent={<UnitStatusAdvancedSearchMiscContent componentType={"Maintenance"} />}
          unitStatus
        />
      }
    />
  );
}

export default UnitSelectionBrowse;
