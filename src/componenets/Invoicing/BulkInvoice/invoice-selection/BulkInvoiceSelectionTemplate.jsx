import React from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import BulkInvoiceListing from "./BulkInvoiceListing";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
} from "../../../../redux/Invoicing/BulkInvoiceSlice";

function BulkInvoiceSelectionTemplate() {
  const dispatch = useDispatch();

  const { searchCriteria, pageNumber, totalPages, totalElements, listingData, searchTerm } = useSelector(
    (state) => state.bulkInvoiceReducer
  );

  const paginationProps = {
    pageNumber,
    setPageNumber: (value) => dispatch(setPageNumber(value)),
    totalPages,
    totalElements,
    listingData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setPageNumber(0));
            dispatch(setSearchTerm(""));
            dispatch(updateField({ field: "editFormData", value: null }));
            dispatch(updateField({ field: "selectedId", value: null }));
            dispatch(updateField({ field: "sortType", value: false }));
            dispatch(updateField({ field: "sortValue", value: "" }));
            dispatch(setPageNumber(0));
            dispatch(setSearchCriteria("Beginning"));
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<BulkInvoiceListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default BulkInvoiceSelectionTemplate;
