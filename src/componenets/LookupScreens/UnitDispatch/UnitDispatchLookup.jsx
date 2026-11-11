/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullScreenLookupTemplate from "../Templates/FullScreenLookupTemplate";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";
import "../../EditMaster/UnitSelection/EditMasterUnitSelection.css";
import {
  resetUnitSelectionFilters,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setPageNumber,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import { UnitSelectionLookup_RecordsPerPage } from "../../../services/constants/applicationConstants";
import SearchFilter from "./SearchFilter";
import TableListing from "./TableListing";

const UnitDispatchLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram = false,
  PaperworkProcessing = false,
  selectedCompanyName,
  selectedCompanyFK,
  customFetchFunction,
  purgeReturnUnit,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    PaperworkProcessing,
    selectedCompanyName,
    selectedCompanyFK,
    customFetchFunction,
    purgeReturnUnit,
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
      customFitHeightClass="unitDispatchLookupFitHeight"
      customMinimumHeightClass="unitDispatchLookupMinHeight50"
      SearchFilterComponent={
        <SearchFilter
          onHide={onHide}
          handleClose={onHide}
          selectedCompanyName={selectedCompanyName}
          selectedCompanyFK={selectedCompanyFK}
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
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
                customerName: advancedSearchObject.secondField,
                pickup: advancedSearchObject.thirdField,
                delivery: advancedSearchObject.fourthField,
                unitTypeDescription: advancedSearchObject.fifthField,
                specialCodeDescription: advancedSearchObject.sixthField,
              })
            );
          }}
        />
      }
      showAdvancedSort={showAdvancedSort}
      AdvancedSortComponent={
        <AdvancedSortComponent
          fourFieldSort
          zoomOut
          firstFieldName={"Unit Number"}
          secondFieldName={"Customer"}
          thirdFieldName={"Pickup"}
          fourthFieldName={"Delivery"}
          firstFieldPayload={"unitNumber"}
          secondFieldPayload={"customerName"}
          thirdFieldPayload={"pickup"}
          fourthFieldPayload={"delivery"}
          advancedSortingOrder={advancedSortingOrder}
          setAdvancedSortingOrder={setAdvancedSortingOrder}
          advancedSortingCombination={advancedSortingCombination}
          setAdvancedSortingCombination={setAdvancedSortingCombination}
        />
      }
    />
  );
};

export default UnitDispatchLookup;
