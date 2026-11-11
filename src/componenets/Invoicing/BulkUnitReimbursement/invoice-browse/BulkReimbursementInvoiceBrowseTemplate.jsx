import React, { useState } from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import BulkReimbursementInvoiceBrowse from "./BulkReimbursementInvoiceBrowse";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  resetState,
} from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";

const BulkReimbursementInvoiceBrowseTemplate = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.bulkUnitReimbursementReducer.listingData);
  const pageNumber = useSelector((state) => state.bulkUnitReimbursementReducer.pageNumber);
  const totalPages = useSelector((state) => state.bulkUnitReimbursementReducer.totalPages);
  const totalElements = useSelector((state) => state.bulkUnitReimbursementReducer.totalElements);
  const searchTerm = useSelector((state) => state.bulkUnitReimbursementReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.bulkUnitReimbursementReducer.searchCriteria);

  const paginationProps = {
    pageNumber,
    setPageNumber: (value) => dispatch(setPageNumber(value)),
    totalPages,
    totalElements,
    listingData,
    loading,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter

          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(setPageNumber(0));
            dispatch(resetState());
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<BulkReimbursementInvoiceBrowse loading={loading} setLoading={setLoading} />}
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
};

export default BulkReimbursementInvoiceBrowseTemplate;
