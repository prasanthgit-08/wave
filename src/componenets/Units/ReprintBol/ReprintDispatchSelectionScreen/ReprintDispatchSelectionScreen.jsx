/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import TableListing from "./TableListing";
import SearchFilter from "./SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  setDispatchPageNumber,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
} from "../../../../redux/ReprintBolSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ReprintDispatchSelectionScreen = () => {
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.reprintBolReducer.listingData);
  const dispatchPageNumber = useSelector((state) => state.reprintBolReducer.dispatchPageNumber);
  const dispatchTotalElements = useSelector((state) => state.reprintBolReducer.dispatchTotalElements);
  const dispatchTotalPages = useSelector((state) => state.reprintBolReducer.dispatchTotalPages);
  const advancedSearchObject = useSelector((state) => state.reprintBolReducer.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.reprintBolReducer.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.reprintBolReducer.advancedSortingCombination
  );
  const showAdvancedSearch = useSelector((state) => state.reprintBolReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.reprintBolReducer.showAdvancedSort);
  const loading = useSelector((state) => state.reprintBolReducer.loading);
  const navigate = useNavigate();

  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  const paginationProps = {
    pageNumber: dispatchPageNumber,
    setPageNumber: setDispatchPageNumber,
    totalPages: dispatchTotalPages,
    totalElements: dispatchTotalElements,
    listingData: listingData,
  };

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <StandardMaintenanceTemplate
      customFitHeightClass
      tableStyle={{ height: "90%" }}
      SearchFilterComponent={<SearchFilter />}

      customMinimumHeightClass={"bolReprintBrowseMinHeight50"}
      TableListingComponent={<TableListing />}
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
          loading={loading}
        />
      }
      showAdvancedSearch={showAdvancedSearch}
      AdvancedSearchComponent={
        <AdvancedSearchComponent
          sixFieldSearch={true}
          advancedSearchObject={advancedSearchObject}
          setAdvancedSearchObject={setAdvancedSearchObject}
          firstFieldName={"Unit Number"}
          secondFieldName={"Customer"}
          thirdFieldName={"Pickup"}
          fourthFieldName={"Delivery"}
          fifthFieldName={"Unit Type"}
          sixthFieldName={"Special Code"}
          maxLengthFifthField={2}
          setPageNumber={setDispatchPageNumber}
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
          firstFieldName={"Driver"}
          secondFieldName={"Unit Number"}
          thirdFieldName={"Customer"}
          fourthFieldName={"Pickup"}
          fifthFieldName={"Delivery"}
          firstFieldPayload={"driver"}
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
    />
  );
};

export default ReprintDispatchSelectionScreen;
