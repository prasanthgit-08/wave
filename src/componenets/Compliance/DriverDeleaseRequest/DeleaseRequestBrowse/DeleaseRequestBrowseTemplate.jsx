import React from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import TableListing from "./TableListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDeleaseRequest,
  setPageNumber,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../../redux/Compliance/DriverDeleaseRequestSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

const DeleaseRequestBrowseTemplate = () => {
  const dispatch = useDispatch();

  const searchTerms = useSelector((state) => state.deleaseRequestReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.deleaseRequestReducer.selectedSearchCriteria);
  const deleaseRequestData = useSelector((state) => state.deleaseRequestReducer.deleaseRequestData);
  const pageNumber = useSelector((state) => state.deleaseRequestReducer.pageNumber);
  const totalPages = useSelector((state) => state.deleaseRequestReducer.totalPages);
  const totalElements = useSelector((state) => state.deleaseRequestReducer.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: deleaseRequestData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={"/"}
          handleCloseOnClick={() => dispatch(resetDeleaseRequest())}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default DeleaseRequestBrowseTemplate;
