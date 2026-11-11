import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StandardMaintenanceTemplate from "../../../Templates/StandardMaintenanceTemplate";
import SearchFilter from "./SearchFilter";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AdvancedSearchComponent from "../../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../../common/AdvancedSortComponent";
import {
  setAdvancedSearchPayload,
  setAdvancedSearchObject,
  setPageNumber,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
} from "../../../../redux/EmanifestChangeRequestSlice";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../services/constants/applicationConstants";

const DispatchBrowseScreen = () => {
  const advancedSearchObject = useSelector((state) => state.emanifestChangeRequest.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.emanifestChangeRequest.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.emanifestChangeRequest.advancedSortingCombination
  );
  const showAdvancedSearch = useSelector((state) => state.emanifestChangeRequest.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.emanifestChangeRequest.showAdvancedSort);
  const pageNumber = useSelector((state) => state.emanifestChangeRequest.pageNumber);
  const totalPages = useSelector((state) => state.emanifestChangeRequest.totalPages);
  const totalElements = useSelector((state) => state.emanifestChangeRequest.totalElements);
  const listingData = useSelector((state) => state.emanifestChangeRequest.listingData);
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
      customFitHeightClass={"fitHeightEManifestDispatchBrowse"}
      customMinimumHeightClass={"eManifestDispatchBrowseMinHeight50"}
      SearchFilterComponent={<SearchFilter closeButtonRoute={`/`} />}
      TableListingComponent={<TableListing />}
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

export default DispatchBrowseScreen;
